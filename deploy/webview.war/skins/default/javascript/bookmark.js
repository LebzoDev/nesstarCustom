var mainframebookmark;
var previousname = "";
function findMainFrameBookmark(frame) {
   if (!frame) return;
   //When a single frame the frameset repeats
   if (previousname == frame.name) return;
   previousname = frame.name;
   if (frame.name == 'main') {
      mainframebookmark = frame;
      return;
   }
   findMainFrameBookmark(frame.parent);
}

function createBookmark(event, node, encodedLink) {
   var menu = document.getElementById('bookmarkmenu');
   if (menu) {
      try {
         closeEmailWindow();
      } catch(ex) {
      }
      menu.style.display = 'block';
      placeMenu(menu, 'imagebookmark');
      return false;
   } else {
      return createBookmarkUrl(node, encodedLink);
   }
}

function doNothing() {
}

function createBookmarkUrl(node, encodedLink) {
   try {
      findMainFrame();
      if (mainframe) {
         if (mainframe.parent.referer) {
            var sep = "?";
            if (mainframe.parent.referer.indexOf('?') != -1) {
               sep = "&";
            }
            node.href = mainframe.parent.referer + sep + "nesstar-url=" + encodedLink;
         }
      }
   } catch (error) {
      alert(error);
   }
   //if not IE, return to a href
   if (!window.external) return true;
   if (window.external) window.external.AddFavorite(node.href, 'Bookmark');
   return false;
}

function createSearchResultBox() {
   if (!mainframebookmark.variable.resultframe.box) return null;
   remove = new Array();
   remove[remove.length] = "_opID";
   remove[remove.length] = "_cancelled";
   return chopUrl(mainframebookmark.variable.resultframe.box.location.href, remove);
}

function createSearchResultTree() {
   remove = new Array();
   remove[remove.length] = "_opID";
   remove[remove.length] = "_cancelled";
   return chopUrl(mainframebookmark.variable.resultframe.tree.location.href, remove);
}

function createSearch() {
   remove = new Array();
   remove[remove.length] = "_opID";
   remove[remove.length] = "_cancelled";
   remove[remove.length] = "execute";
   return chopUrl(mainframebookmark.variable.searchit.location.href, remove);
}


function createBoxView() {
   if (!mainframebookmark.variable.content.box) return null;
   remove = new Array();
   remove[remove.length] = "_opID";
   remove[remove.length] = "_cancelled";
   return chopUrl(mainframebookmark.variable.content.box.location.href, remove);
}

function createTreeView() {
   var remove = new Array();
   remove[remove.length] = "_opID";
   remove[remove.length] = "_cancelled";
   var opens = mainframebookmark.content.tree.createBookmark();
   var url = chopUrl(mainframebookmark.content.tree.location.href, remove);
   return (url + "&" + opens);
}

function createRightSide() {
   var remove = new Array();
   remove[remove.length] = "_opID";
   remove[remove.length] = "_cancelled";
   return chopUrl(mainframebookmark.rightsidemainframe.rightside.location.href, remove);
}


//A helper function to remove unwanted elements on the url
function chopUrl(urltochop, remove) {

   var elementer = urltochop.split('?');
   url = elementer[1];

   if (!url) return "";
   var chop = "";
   var element = url.split('&');

   var i = 0;
   for (i = 0; i < element.length; i++) {
      var s = element[i];
      if (!toRemove(s, remove)) {
         chop += "&";
         chop += s;
      }
   }
   if (chop.charAt(0) == '&') chop = chop.substring(1);
   //return elementer[0]+'?'+chop;
   return chop;
}

function toRemove(s, remove) {

   for (var j = 0; j < remove.length; j++) {
      if (s.indexOf(remove[j] + '=') != -1) return true;
   }
   return false;
}

var bookmarkDialog = null;
var bookmarkDialogExpander = null;
var overlayManager = null;
var bookmarkDialogExpanded = false;

function openBookmarkDialog() {
   //if simpleCodebox exist, give it dynamic embed-iframesizes
   if(xGetElementById("simpleCodebox")){
      xGetElementById("simpleCodebox").value=buildCode();
   }

	if (YAHOO.lang.isObject(bookmarkDialog)) {
		if (!bookmarkDialog.cfg.getProperty("visible")) {
			bookmarkDialog.show();
			highlightText("bookmarkurl");
		}
		return false;
	}
	try {
		if (!YAHOO.lang.isObject(overlayManager)) {
			overlayManager = new YAHOO.widget.OverlayManager();
			overlayManager.initDefaultConfig();
        }
		var pane = xGetElementById("bookmarkDialog");
		if (pane && !YAHOO.lang.isObject(bookmarkDialog)) {
			var parent = xGetElementById("imagebookmark");
			var left, top;
			var fixedcenter = false;
			if (parent) {
				var totalWidth = xClientWidth();
				var dLeft = xPageX(parent);
				left = ((dLeft + bookmarkDialogWidth) > totalWidth) ? totalWidth - bookmarkDialogWidth - 10 : dLeft;
				top = 22;
			} else {
				fixedcenter = true;
			}
			
			bookmarkDialog = new YAHOO.widget.Panel(pane, {
				width: bookmarkDialogWidth + "px",
				height: bookmarkDialogHeight + "px",
				x: left,
				y: top,
				draggable: false,
				close: true,
				modal: false,
				fixedcenter: fixedcenter,
				constraintoviewport: true,
				zindex: 500
			});
			pane.style.display = "block";
			var overlayRegistered = overlayManager.register(bookmarkDialog);
            if (!overlayRegistered)
               alert("Panel was not registered to overlay.");
            
            bookmarkDialog.render();
            highlightText('bookmarkurl');
            bookmarkDialog.show();
		}
	} catch (e) {
		alert("YAHOO-feil: " + e.message);
	}
	return false;
}

function expandBookmarkDialog() {
	var arrow = xGetElementById("togglearrow");
	if (bookmarkDialogExpanded) {
		arrow.className = "toggleright";
		bookmarkDialog.cfg.setProperty("height", bookmarkDialogHeight + "px");
		bookmarkDialogExpanded = false;
	} else {
		arrow.className = "toggledown";
		bookmarkDialog.cfg.setProperty("height", maxBookmarkDialogHeight + "px");
		bookmarkDialogExpanded = true;
	}
	return false;
}

function highlightText(element) {
	var e = null;
	if (typeof(element) == 'string')
		e = xGetElementById(element);
	else
		e = element;
	if (e)
		e.select();
}