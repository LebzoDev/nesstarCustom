var mainframe;
var previousname = "";
var emailDialog;

function findMainFrame(frame) {
   if (!frame) return null;
   //When a single frame the frameset repeats
   if (previousname == frame.name) {
      return;
   }
   previousname = frame.name;
   if (frame.name == 'main') {
      mainframe = frame;
      return;
   }
   findMainFrame(frame.parent);
}

function removeSubsetBox(e) {
   findMainFrame(parent);
   try {
      var target;
      if (!e) e = window.event;
      if (e.target) target = e.target;
      else if (e.srcElement) target = e.srcElement;
      if (mainframe) {
         if (mainframe.content.tree.previousmenu) {
            isChildOf(target, mainframe.content.tree.previousmenu);
            if (!isChild) mainframe.content.tree.previousmenu.style.display = 'none';
         }
      }
   } catch (error) {
   }

   var icons = document.getElementById('charticons');
   if (icons) {
      if (target) {
         isChildOf(target, icons);
         if (!isChild) icons.style.display = 'none';
      }
   }

   removeBookmarkBox(e);
   removeLanguageBox(e);
   removeEmailBox(e);
   removeIndicatorPanels(e);

   if (domTT_selectElements) {
      for (var cnt = 0; cnt < domTT_selectElements.length; cnt++) {
         var thisSelect = domTT_selectElements[cnt];
         thisSelect.style.visibility = 'visible';
      }
   }
}

function removeBookmarkBox(e) {
   var target;
   if (!e) e = window.event;
   if (e.target) target = e.target;
   else if (e.srcElement) target = e.srcElement;

   isChildOf(target, bookmarkDialog);
   if (!isChild && YAHOO.lang.isObject(bookmarkDialog)) {
	   bookmarkDialog.hide();
   }
}

function removeLanguageBox(e) {
   var target;
   if (!e) e = window.event;
   if (e.target) target = e.target;
   else if (e.srcElement) target = e.srcElement;

   var bookmarkmenu = document.getElementById('languagemenu');
   if (bookmarkmenu) {
      isChildOf(target, bookmarkmenu);
      if (!isChild && bookmarkmenu.style.display == 'block') bookmarkmenu.style.display = 'none';
   }
}

function removeEmailBox(e) {
	var target;
	if (!e) e = window.event;
	if (e.target) target = e.target;
	else if (e.srcElement) target = e.srcElement;

	isChildOf(target, emailDialog);
	if (!isChild && YAHOO.lang.isObject(emailDialog)) {
		emailDialog.hide();
	}
}

/**
 * Displays documentation panels for indicators in certain cubes.
 * @param e Event
 * @param panelId Id of panel to show.
 * @return
 */
function showIndicatorPanel(e, panelId) {
    if (YAHOO.lang.isObject(indicatorOverlayManager)) {
       indicatorOverlayManager.hideAll();
       var panel = indicatorOverlayManager.find(panelId);
       if (panel) {
          var event = new xEvent(e);
          panel.moveTo(event.pageX, event.pageY);
          panel.show();
          indicatorOverlayManager.focus(panel);
       }
    }
    return false;
 }

/**
 * Hides any open YUI panels registered in the indicators overlay manager.
 * @return
 */
function removeIndicatorPanels(e) {
	var target;
	if (!e) e = window.event;
	if (e.target) target = e.target;
	else if (e.srcElement) target = e.srcElement;
	
	if (YAHOO.lang.isObject(indicatorOverlayManager)) {
		var activePanel = indicatorOverlayManager.getActive();
		isChildOf(target, activePanel);
		if (!isChild)
			activePanel.hide();
	}
}

function isChildOf(node, what) {
   isChild = false;
   if (null == node || null == what) {
	   return false;
   }

   while (node) {
      node = node.parentNode;
      if (!node) break;
      if (node && node.nodeType == 9) break;
      if (node.id == what.id) {
         isChild = true;
         break;
      }
   }

}


/**
 * Opens an empty window with a target which can be invoked by a href-call later on
 */
function openEmptyWindow(target) {
   awin = window.open('', target, 'toolbar=yes,location=yes,directories=no,status=yes,menubar=yes,resizable=yes,copyhistory=no,scrollbars=yes,width=800,height=600');
   if (awin) awin.focus();
   return true;
}


function setScrollableSize() {
  //For some reason this must be set
  if (browser.isIE && !browser.isIE7up && !isEmbedded) {
     var exploder = xGetElementById('exploder');
     if (exploder) {
        var newSizeY = xClientHeight() - (xPageY(exploder));
        var newSizeX = xClientWidth() - (xPageX(exploder));

        // adjust the size of the table to take into account the added size of a scrollbar
        var metadata = xGetElementById('metadata');
        if(metadata) {
           xHeight(metadata, newSizeX - 10);
        }

        var metadataview = xGetElementById('metadataview');
        if (metadataview) {
           newSizeY -= xHeight(metadataview);
        }

        // Sets the dimensions of the element to see if scrollbars are removed
        newSizeX = xClientWidth() - (xPageX(exploder));
        xWidth(exploder, newSizeX);
        newSizeY = xClientHeight() - (xPageY(exploder));
        xHeight(exploder, newSizeY);

        // Do the same operation again to place scrollbars correctly
        newSizeX = xClientWidth() - (xPageX(exploder));
        xWidth(exploder, newSizeX);
        newSizeY = xClientHeight() - (xPageY(exploder));
        xHeight(exploder, newSizeY);
     }
  }
}

function highlightSearch() {
   term = "";
   try{
      searchFrame = parent.parent.content.simpleSearch;

      indicatorField = false;
      searchField = false;

      if (searchFrame) {
         indicatorField = searchFrame.document.getElementById('lastClickInSearchIndicator');
         searchField = searchFrame.document.getElementById('currentSearchTerm');
      }

      if (!indicatorField || indicatorField.value != "true") return;

      if (searchField) {
         term = searchField.value;
      }

      var terms = term.split(' ');
      var finalterms=new Array()
      var inquotes="";
      var j=0;
      for (i = 0; i < terms.length; i++) {
         term=trim(terms[i]);
         if (term.indexOf("-") == 0 ) {
            term=term.substring(1,term.length);
            if (inquotes != "" ) i++;
            break;
         }

         if (term.indexOf("+") == 0) term=term.substring(1,term.length);

         if (term.indexOf("\"") == 0) {
            inquotes="\"";
            term=term.substring(1,term.length);

         }
         /* NOTE: This does not fit with java implementation. Only " counts as a quote
         if (term.indexOf("\'") == 0) {
            inquotes="\'";
            term=term.substring(1,term.length)
         }

         if (inquotes == "\'" && term.indexOf("\'") == term.length-1) {
            inquotes="end";
            term=term.substring(0,term.length-1);
         }
         */

         if (inquotes == "\"" && term.indexOf("\"") == term.length-1) {
            inquotes="end";
            term=term.substring(0,term.length-1);
            //console.info("Term ved quote end: "+term);
         }

         if (term == "NOT" && inquotes == "" ) {
            i++;
            break;
         }

         if (term == "AND") break;
         if (term == "OR") break;

         if (term != "") {
            if (inquotes == "") {
               finalterms[j++] = term;
            } else {
               if (undefined != finalterms[j]) {
                  finalterms[j] = finalterms[j] + " " + term;
               } else {
                  finalterms[j] = term;
               }
            }
         }
         if (finalterms[j]) trim(finalterms[j])
         if (inquotes == "end") {
            inquotes="";
            j++;
         }
      }
      highlightSearchTerms(finalterms);
   }catch(e){
      var a="Just to create a breakpoint for the debuger";
      //alert(e);
      //Do nothing
   }
}

// Removes leading whitespaces
function LTrim(value) {
   var re = /\s*((\S+\s*)*)/;
   return value.replace(re, "$1");

}

// Removes ending whitespaces
function RTrim(value) {
   var re = /((\s*\S+)*)\s*/;
   return value.replace(re, "$1");

}

// Removes leading and ending whitespaces
function trim(value) {

   return LTrim(RTrim(value));

}

function toCompensateY() {
   //If it is not IE, then no need to compensate
   if (!browser.isIE || browser.isIE7up) return 0;

   var topstrip = xGetElementById('topstrip');
   //Firs a negative compensated
   var compensated = 0 - xHeight(topstrip);
   //The IE scrollable area
   var exploder = xGetElementById('exploder');
   //Append the scroll to the compensated
   compensated += xScrollTop(exploder);
   return compensated;
}

function toCompensateX() {
   //If it is not IE, then no need to compensate
   if (!browser.isIE || browser.isIE7up) return 0;
   //The IE scrollable area
   var exploder = xGetElementById('exploder');
   if (!exploder) return 0;
   //Append the scroll to the compensated
   return xScrollLeft(exploder);
}

// helper method for customGetElementById
function getElementByIdInNode(node,id)
{
	if (node.id == id)
		return node;
	var childNode = node.firstChild;
	while (childNode != null) {
		var result = getElementByIdInNode(childNode,id)
		if (result != null)
			return result;
		childNode = childNode.nextSibling;
	}
	return null;
}

// document.getElementById(id) that works as it should for IE: an element where only name equals id is not returned
function customGetElementById(id)
{
	if (browser.isIE) {
		//							root element
		return getElementByIdInNode(document.documentElement,id);
	}
	else
		return document.getElementById(id);
}

/***********************************************************
 **
 **
 ** E-mail verification
 **
 **
 **
 *************************************************************/

function getAndValidateEmail(formid, link) {
   var form = xGetElementById(formid);
   var isOk = validate(form);
   if (!isOk) return false;

   link.href = link.href + "&email=" + form.email.value;
   return true;
}

function validate(form) {
   return emailCheck(form.email.value);
}


function emailCheck(emailStr) {

   /* The following variable tells the rest of the function whether or not
to verify that the address ends in a two-letter country or well-known
TLD.  1 means check it, 0 means don't. */

   var checkTLD = 1;

   /* The following is the list of known TLDs that an e-mail address must end with. */

   var knownDomsPat = /^(com|net|org|edu|int|mil|gov|arpa|biz|aero|name|coop|info|pro|museum)$/;

   /* The following pattern is used to check if the entered e-mail address
fits the user@domain format.  It also is used to separate the username
from the domain. */

   var emailPat = /^(.+)@(.+)$/;

   /* The following string represents the pattern for matching all special
characters.  We don't want to allow special characters in the address.
These characters include ( ) < > @ , ; : \ " . [ ] */

   var specialChars = "\\(\\)><@,;:\\\\\\\"\\.\\[\\]";

   /* The following string represents the range of characters allowed in a
username or domainname.  It really states which chars aren't allowed.*/

   var validChars = "\[^\\s" + specialChars + "\]";

   /* The following pattern applies if the "user" is a quoted string (in
which case, there are no rules about which characters are allowed
and which aren't; anything goes).  E.g. "jiminy cricket"@disney.com
is a legal e-mail address. */

   var quotedUser = "(\"[^\"]*\")";

   /* The following pattern applies for domains that are IP addresses,
rather than symbolic names.  E.g. joe@[123.124.233.4] is a legal
e-mail address. NOTE: The square brackets are required. */

   var ipDomainPat = /^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/;

   /* The following string represents an atom (basically a series of non-special characters.) */

   var atom = validChars + '+';

   /* The following string represents one word in the typical username.
For example, in john.doe@somewhere.com, john and doe are words.
Basically, a word is either an atom or quoted string. */

   var word = "(" + atom + "|" + quotedUser + ")";

   // The following pattern describes the structure of the user

   var userPat = new RegExp("^" + word + "(\\." + word + ")*$");

   /* The following pattern describes the structure of a normal symbolic
domain, as opposed to ipDomainPat, shown above. */

   var domainPat = new RegExp("^" + atom + "(\\." + atom + ")*$");

   /* Finally, let's start trying to figure out if the supplied address is valid. */

   /* Begin with the coarse pattern to simply break up user@domain into
different pieces that are easy to analyze. */

   var matchArray = emailStr.match(emailPat);

   if (matchArray == null) {

      /* Too many/few @'s or something; basically, this address doesn't
even fit the general mould of a valid e-mail address. */

      alert(translation.message_8);
      return false;
   }
   var user = matchArray[1];
   var domain = matchArray[2];

   // Start by checking that only basic ASCII characters are in the strings (0-127).

   for (i = 0; i < user.length; i++) {
      if (user.charCodeAt(i) > 127) {
         alert(translation.message_9);
         return false;
      }
   }
   for (i = 0; i < domain.length; i++) {
      if (domain.charCodeAt(i) > 127) {
         alert(translation.message_10);
         return false;
      }
   }

   // See if "user" is valid

   if (user.match(userPat) == null) {

      // user is not valid

      alert(translation.message_8);
      return false;
   }

   /* if the e-mail address is at an IP address (as opposed to a symbolic
host name) make sure the IP address is valid. */

   var IPArray = domain.match(ipDomainPat);
   if (IPArray != null) {

      // this is an IP address

      for (var i = 1; i <= 4; i++) {
         if (IPArray[i] > 255) {
            alert(translation.message_8);
            return false;
         }
      }
      return true;
   }

   // Domain is symbolic name.  Check if it's valid.

   var atomPat = new RegExp("^" + atom + "$");
   var domArr = domain.split(".");
   var len = domArr.length;
   for (i = 0; i < len; i++) {
      if (domArr[i].search(atomPat) == -1) {
         alert(translation.message_8);
         return false;
      }
   }

   // Make sure there's a host name preceding the domain.

   if (len < 2) {
      alert(translation.message_8);
      return false;
   }

   // If we've gotten this far, everything's valid!
   return true;
}


function createCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  } else var expires = "";

  var ck = name+"="+value+expires+"; path=/";
  document.cookie = ck;
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i<ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}


function eraseCookie(name) {
  createCookie(name,"",-1);
}

var navigationFrame;
var navigationReady = false;

/**
 * Either collapse or show the navigation tree.
 * @param element The link that was clicked
 * @return null
 */
function swapNavigation(element) {
  navigationFrame = top.frames.main.document.getElementById('set');

  var searchform = getSearchForm();
  var simpleSearchExists = false;
  if(searchform){
     simpleSearchExists = true;
  }
  var browselist = getBrowselistFrame();
  var treeBody;
  var treeHtml;

  treeBody = browselist.document.body;
  treeHtml = browselist.document.documentElement;

  var navigationCollapsed = false;
  if (navigationFrame.cols) {
	  navigationCollapsed = (navigationFrame.cols.substring(0,navigationFrame.cols.indexOf('%')) == '0') ? true : false;
  }

  if (navigationCollapsed) {
    //SHOW
    navigationCollapsed = false;
    animateNavigationTree(250, 0, treeWidth, animateExpand);
    //Use a timer to revert the DOM in the tree to allow scrollbars etc again.
    var waitTimer = setInterval(function() {
    	if (navigationReady == true) {
    		navigationReady = false;
    		element.className = "navigationvisible"; //changes the icon
    		element.title = translation.collapse_navigation_tree_tooltip;
    		if(simpleSearchExists) {
                searchform.style.overflow = "";
                searchform.style.width = "2000px";
            }
    	    browselist.scrolling = "no";
    	    treeBody.style.overflow = "";
    	    treeBody.style.width = "";
    	    treeHtml.style.overflow = "";
    	    treeHtml.style.width ="100%";
    	    element.blur();
    	    clearInterval(waitTimer);
    	}
    }, 50);
  } else {
    //HIDE
	//Alter the DOM in the treeview to avoid scrollbars and contents tumbling when animating the tree.
    navigationCollapsed = true;
    if(simpleSearchExists) {
        searchform.style.overflow = "hidden";
        searchform.style.width = "2000px";
    }
    browselist.scrolling = "no";
    treeBody.style.overflow = "hidden";
    treeBody.style.width = "2000px"; //Using an excessive amount to avoid it from showing.
    treeHtml.style.overflow = "hidden";
    treeHtml.style.width = "2000px";
    navigationReady = false;
    animateNavigationTree(250, 30, 0, animateCollapse);
    //Use a timer to reset the navigationReady flag when the animation is done.
    var waitTimer = setInterval(function() {
    	if (navigationReady == true) {
    		navigationReady = false;
    		element.className="navigationhidden";
    		element.title = translation.expand_navigation_tree_tooltip;
    		element.blur();
    		clearTimeout(waitTimer);
    	}
    }, 50);
  }
}

function getSearchForm(){

   try{
      //Trying first the conventional frameset-structure
      var searchFormContainer = top.frames.main.content.simpleSearch;
      if(typeof(searchFormContainer) == "undefined"){
            return null;
      }

      //Getting the searchform-element out of the container (whatever it is)
      searchform = searchFormContainer.document.getElementById("thesearchform");

      return searchform;

   }catch(err) {
         return null;
   }
}

function getBrowselistFrame(){

   try{
      //Vanilla WebView
      var temp = top.frames.main.content.tree.document.body;
      return top.frames.main.content.tree;
      }catch(err){
       //Do nothing
      }

   try{
      //The KHP-generation
      var temp = top.frames.main.leftside.leftside.document.body;
      return top.frames.main.leftside.leftside;
      }catch(err){
       //Do nothing
      }

   return null;
}

/**
 * Animate the collapse
 * @param uTime The duration of the animation (in msecs)
 * @return null
 */
function animateCollapse(f, cols, targetCols) {
	cols = Math.round((1 - f) * 30);
    return cols;
}

/**
 * Animate the opening of the tree.
 * @param uTime The duration of the animation (in msecs)
 * @return
 */
function animateExpand(f, cols, targetCols) {
	if (cols >= targetCols)
		return targetCols;

	cols = Math.round(f * targetCols);
	if (cols > targetCols) {
		return targetCols;
	}
	return cols;
}

/**
 * General animation engine
 * @param uTime The duration of the animation
 * @param cols The current value of the columns (as it should be)
 * @param targetCols The value of the columns when the animation is done
 * @param onAnimate Callback function for calculating the new values for cols.
 * @return nuthin'
 */
function animateNavigationTree(uTime, cols, targetCols, onAnimate) {
	var freq = Math.PI / (2 * uTime);
	var startTime = new Date().getTime();

	var tmr = setInterval(function() {
		var elapsedTime = new Date().getTime() - startTime;
		if (elapsedTime < uTime) {
			var f = Math.abs(Math.sin(elapsedTime * freq));
			if (onAnimate) { cols = onAnimate(f, cols, targetCols); }
		} else {
			navigationReady = true;
			clearInterval(tmr);
			cols = targetCols;
		}
		navigationFrame.cols = "" + cols + "%,*";
	}, 10);
}

var helphref;
/**
 * Opens a panel for email notification
 * @return true :-P
 */
function openEmailWindow(headertitle) {

   var helpLink = xGetElementById('imagehelp');
   if (helpLink) {
      helphref = helpLink.href;
      helpLink.href = "help/5-7.html"
   }

   if (YAHOO.lang.isObject(emailDialog)) {
		if (!emailDialog.cfg.getProperty("visible")) {
			emailDialog.show();
		}
		return false;
	}
	try {
		if (!YAHOO.lang.isObject(overlayManager)) {
			overlayManager = new YAHOO.widget.OverlayManager();
			overlayManager.initDefaultConfig();
       }
		var pane = xGetElementById("emailDialog");
		if (pane && !YAHOO.lang.isObject(emailDialog)) {
			var parent = xGetElementById("imageemail");
			var left, top;
			var fixedcenter = false;
			if (parent) {
				var totalWidth = xClientWidth();
				var dLeft = xPageX(parent);
				left = ((dLeft + 350) > totalWidth) ? totalWidth - 350 - 10 : dLeft;
				top = 22;
			} else {
				fixedcenter = true;
			}

			emailDialog = new YAHOO.widget.Panel(pane, {
				width: 350 + "px",
				height: 192 + "px",
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
			var overlayRegistered = overlayManager.register(emailDialog);
           if (!overlayRegistered)
              alert("Panel was not registered to overlay.");

           emailDialog.render();
           emailDialog.show();
           YAHOO.util.Event.on(emailDialog.close, "mousedown", closeEmailWindow);
		}
	} catch (e) {
		alert("YAHOO-feil: " + e.message);
	}
	return false;
}

/**
 * Closes the panel for email notification
 * @return true :-P
 */
function closeEmailWindow() {
   var helpLink = xGetElementById('imagehelp');
   if (helpLink && helphref) {
      helpLink.href = helphref;
   }
}

/**
 * Generic method for positioning a menu relative to its parent icon.
 * @param element The element to position.
 * @param parent Id of the parent icon.
 */
function placeMenu(element, parent) {
   var image = xGetElementById(parent);
   var left = xPageX(parent);
   var top = xPageY(image);
   var totalWidth = xClientWidth();

   var menuwidth = 0;
   var child = xFirstChild(element);
   if (child)
	   menuWidth = xWidth(child);

   if ((left + menuWidth) > totalWidth)
	   left = totalWidth - left - menuWidth - 10;
   else
	   left = left - totalWidth;

   xLeft(element, left);
   xTop(element, top);
   xZIndex(element, 10);
}

function deleteGroupingCat(index) {
    var dialogFrame = top.main.rightsidemainframe.rightside;
    var handleYes = function() {
        var form = xGetElementById("hiddenform");
        var item;
        var indexLen = index.length;

        for (var i=0; i < form.length; i++) {
            item = form.elements[i];
            if (item.name == 'group') {
                if(item.value.substring(item.value.length-indexLen, item.value.length) == index) {
                    item.name = "remove";
                    item.value = "remove";
                }
            }
        }
        form.submit();
        hideTheViewArea();
        this.hide();
        return false;
    };

    dialogFrame.setDialogButtons(handleYes, null, translation.confirm_delete_calculated_category + "?");
    return false;
}

function openChartIcons() {
	var icons = document.getElementById('charticons');
	if (icons) {
		try {
			closeEmailWindow();
		} catch(ex) {
		}
		icons.style.display = 'block';
		icons = icons.getElementsByTagName('ul')[0];
		maybeKillSelectsIcons(icons);
		return false;
	}
	return true;
}

var domTT_userAgent = navigator.userAgent.toLowerCase();
var domTT_isOpera = domTT_userAgent.indexOf('opera 7') != -1 ? 1 : 0;
var domTT_isKonq = domTT_userAgent.indexOf('konq') != -1 ? 1 : 0;
var domTT_isIE = !domTT_isKonq && !domTT_isOpera && domTT_userAgent.indexOf('msie 5.0') == -1 && document.all ? 1 : 0;
var domTT_isGecko = domTT_userAgent.indexOf('gecko') != -1 ? 1 : 0;
var domTT_selectElements;

/* Hide selects when dragging over them*/
function maybeKillSelectsIcons(node) {
	// no need to do anything for opera
	if (domTT_isOpera) {
		return;
	}

	if (typeof(domTT_selectElements) == 'undefined') {
		domTT_selectElements = document.getElementsByTagName('select');
	}

	var tipOffsets = domTT_getOffsets(node);

	for (var cnt = 0; cnt < domTT_selectElements.length; cnt++) {
		var thisSelect = domTT_selectElements[cnt];
		// mozilla doesn't have a problem with regular selects
		if (domTT_isGecko && thisSelect.size <= 1 && !thisSelect.multiple) {
			continue;
		}

		var selectOffsets = domTT_getOffsets(thisSelect);
		// for mozilla we only have to worry about the scrollbar itself
		if (domTT_isGecko) {
			selectOffsets.setItem('left', selectOffsets.items['left'] + thisSelect.offsetWidth - domTT_scrollbarWidth);
			selectOffsets.setItem('leftCenter', selectOffsets.items['left'] + domTT_scrollbarWidth / 2);
			selectOffsets.setItem('radius', Math.max(thisSelect.offsetHeight, domTT_scrollbarWidth / 2));
		}

		var center2centerDistance = Math.sqrt(Math.pow(selectOffsets.items['leftCenter'] - tipOffsets.items['leftCenter'], 2) + Math.pow(selectOffsets.items['topCenter'] - tipOffsets.items['topCenter'], 2));
		var radiusSum = selectOffsets.items['radius'] + tipOffsets.items['radius'];
		// the encompassing circles are overlapping, get in for a closer look
		if (center2centerDistance < radiusSum) {
			// tip is left of select
			if (tipOffsets.items['leftCenter'] <= selectOffsets.items['leftCenter'] && tipOffsets.items['right'] < selectOffsets.items['left']) {
				thisSelect.style.visibility = 'visible';
			}
			// tip is right of select
			else if (tipOffsets.items['leftCenter'] > selectOffsets.items['leftCenter'] && tipOffsets.items['left'] > selectOffsets.items['right']) {
				thisSelect.style.visibility = 'visible';
			}
			// tip is above select
			else if (tipOffsets.items['topCenter'] <= selectOffsets.items['topCenter'] && tipOffsets.items['bottom'] < selectOffsets.items['top']) {
				thisSelect.style.visibility = 'visible';
			}
			// tip is below select
			else if (tipOffsets.items['topCenter'] > selectOffsets.items['topCenter'] && tipOffsets.items['top'] > selectOffsets.items['bottom']) {
				thisSelect.style.visibility = 'visible';
			}
			else {
				thisSelect.style.visibility = 'hidden';
			}
		}
	}
}


function domTT_getOffsets(in_object)
{
	var originalObject = in_object;
	var originalWidth = in_object.offsetWidth;
	var originalHeight = in_object.offsetHeight;
	var offsetLeft = 0;
	var offsetTop = 0;

	while (in_object) {
		offsetLeft += in_object.offsetLeft;
		offsetTop += in_object.offsetTop;
		in_object = in_object.offsetParent;
	}

	return new domTT_Hash(
			'left', offsetLeft,
			'top', offsetTop,
			'right', offsetLeft + originalWidth,
			'bottom', offsetTop + originalHeight,
			'leftCenter', offsetLeft + originalWidth / 2,
			'topCenter', offsetTop + originalHeight / 2,
			'radius', Math.max(originalWidth, originalHeight)
	);
}


function domTT_Hash()
{
	this.length = 0;
	this.items = new Array();
	for (var i = 0; i < arguments.length; i += 2) {
		if (typeof(arguments[i + 1]) != 'undefined') {
			this.items[arguments[i]] = arguments[i + 1];
			this.length++;
		}
	}

	this.getItem = function(in_key)
	{
		return this.items[in_key];
	}

	this.removeItem = function(in_key)
	{
		var tmp_value;
		if (typeof(this.items[in_key]) != 'undefined') {
			this.length--;
			tmp_value = this.items[in_key];
			delete this.items[in_key];
		}

		return tmp_value;
	}

	this.setItem = function(in_key, in_value)
	{
		if (typeof(in_value) != 'undefined') {
			if (typeof(this.items[in_key]) == 'undefined') {
				this.length++;
			}

			return this.items[in_key] = in_value;
		}

		return false;
	}

	this.hasItem = function(in_key)
	{
		return typeof(this.items[in_key]) != 'undefined';
	}
}
