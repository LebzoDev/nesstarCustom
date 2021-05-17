//
// Define a list of Microsoft XML HTTP ProgIDs.
//
var XMLHTTPREQUEST_MS_PROGIDS = new Array(
   "Msxml2.XMLHTTP.7.0",
   "Msxml2.XMLHTTP.6.0",
   "Msxml2.XMLHTTP.5.0",
   "Msxml2.XMLHTTP.4.0",
   "MSXML2.XMLHTTP.3.0",
   "MSXML2.XMLHTTP",
   "Microsoft.XMLHTTP"
   );

//
// Define ready state constants.
//
var XMLHTTPREQUEST_READY_STATE_UNINITIALIZED = 0;
var XMLHTTPREQUEST_READY_STATE_LOADING = 1;
var XMLHTTPREQUEST_READY_STATE_LOADED = 2;
var XMLHTTPREQUEST_READY_STATE_INTERACTIVE = 3;
var XMLHTTPREQUEST_READY_STATE_COMPLETED = 4;

var loginframesize = null;
var canDecompress = false;
//The element that is waiting for login
var elementWaitingForLogin = null;

var iframes = new Array();
var iframessrc = new Array();
//The last element opened
var openedelement;
var xmlhttp = getXMLHttpRequest() != null;

var exploderReady = false;
function openWithHttpRequest(image, link, insideStudy, checkForNextLevel) {
    //Refresh the emtpy login page so that the login form can be re-injected.
   parent.parent.login.src = "skins/default/jsp/empty.jsp";
   var xmlhttpCon = getXMLHttpRequest();
   //Get the div top put the next level in
   var div = getDivToOpen(image);
   
   if (div) {
      if (xGetComputedStyle(div, 'display') == 'none') {
         if (insideStudy) {
        	var element = document.getElementById('studyload');
        	if (element) div.innerHTML = element.innerHTML;
         } else {
        	 var element = document.getElementById('load');
        	 if (element) div.innerHTML = element.innerHTML;
         }
         var url = link;
         if (link.href) url = link.href;
         xmlhttpCon.open("GET", url + "&chunked=true&gzip=false", true);
         if (canDecompress) {
            xmlhttpCon.setRequestHeader("accept-encoding", "gzip,deflate");
         } else {
            xmlhttpCon.setRequestHeader("accept-encoding", "deflate");
         }
         div.style.display = 'block';
         xmlhttpCon.onreadystatechange = function() {
            if (xmlhttpCon.readyState == XMLHTTPREQUEST_READY_STATE_COMPLETED) {
            	if (xmlhttpCon.status != 200) {
            		//If the resource isn't found or a server error occurred
            		if (xmlhttpCon.status == 404)
            			div.innerHTML = "<p>Resource not found.</p>";
            		else
            			div.innerHTML = "<p>An error occurred while retrieving the resource (" + xmlhttpCon.status + ").</p>";
            		return false;
            	} 
               var login;
               try {
                  login = xmlhttpCon.getResponseHeader("Login");
               } catch (error) {
               }
               if (login) {
                  exploderReady = false;
                  waitForEmptyLoginPage(parent.parent.login);
                  if (insideStudy) {
                     div.innerHTML = document.getElementById('loginstudy').innerHTML;
                  } else {
                     div.innerHTML = document.getElementById('login').innerHTML;
                  }
                  //Store the div that is waiting for a login.
                  elementWaitingForLogin = div;
                  //Display the frameset
                  var frameset = parent.parent.document.getElementById('set');
                  loginframesize = frameset.cols;
                  var firstSize = loginframesize.split(",")[0];
                  frameset.cols = firstSize + ", 0px, *";
                  //Add the login form
                  //parent.parent.login.document.getElementById('exploder').innerHTML = xmlhttpCon.responseText;
                  explodeLoginFormContent(xmlhttpCon.responseText);
                  if (parent.parent.login.document.forms['logonForm_new']) {
                     parent.parent.login.document.forms['logonForm_new'].submit();
                  }
               } else {
                  div.innerHTML = xmlhttpCon.responseText;
               }
               openedelement = div;
               openImage(image);
               //Get the next level
            }
         }
         xmlhttpCon.send(null);
      } else {
         div.style.display = 'none';
         openImage(image);
         return false;
      }
   }
}

/**
 * This method inserts the server response into the div labelled "exploder"
 * in the right hand frame. The insertion has been isolated in this method
 * in order to make it wait (setTimeout) for the DOM in the frame to be ready.
 * @param response The response holding the login form.
 */
var exploderContent;
function explodeLoginFormContent(content) {
   if (!exploderReady) {
      if ((!this.exploderContent || this.exploderContent == null || typeof this.exploderContent == 'undefined') && typeof content != 'undefined') {
         this.exploderContent = content;
      } else {
         //alert("content needed"); //TODO: How can we gracefully fail here (not that it should happen...)?
      }
      setTimeout("explodeLoginFormContent()", 501); //Should at least be larger than the waitForEmptyLoginPage-wait.
      return false;
   } else {
      if ((!this.exploderContent || this.exploderContent == null || typeof this.exploderContent == 'undefined') && typeof content != 'undefined') {
         this.exploderContent = content;
      }
      parent.parent.login.document.getElementById('fillmeup').innerHTML = this.exploderContent;
      this.exploderContent = null;
      exploderReady = false;
      return false;
   }
}

/**
 * Checks to see if the DOM is loaded and ready in a given frame.
 ******************************************************
   DOM scripting by brothercake -- http://www.brothercake.com/
   GNU Lesser General Public License -- http://www.gnu.org/licenses/lgpl.html
 ******************************************************
 * @param parentElement The frame to check for availability.
 */
function waitForEmptyLoginPage(parentElement) {
    //start or increment the counter
	this.n = typeof this.n == 'undefined' ? 0 : this.n + 1;
    if ((typeof this.readyElement == 'undefined') || (this.readyElement == null)) {
       this.readyElement = parentElement;
    }
	if (typeof this.readyElement.document.getElementsByTagName != 'undefined'
		&& (this.readyElement.document.getElementsByTagName('html')[0] != null || this.readyElement.document.body != null)) {
        exploderReady = true;
        this.readyElement = null;
        this.n = 0;
        return false;
    }
	else if(this.n < 15) {
		setTimeout('waitForEmptyLoginPage()', 250);
	}
    else {
       //This shouldn't happen but just in case we try to load the frame again and restart.
       parent.parent.login.href = "skins/default/jsp/empty.jsp";
       this.n = 0;
       setTimeout("waitForEmptyLoginPage()", 250);
    }
}

/**
 * A method that opens up the treeview
 * TODO: Create a fallback solution that will use the link itself, with anchor
 */

var prevCatalog;

function openView(image, link, closePreviousCatalog) {
   checkIfLogin();
   updateActiveBrowseListElement(image);
   var hasLink = image.href.length > 0;

   var div = getDivToOpen(image);
   checkIfSearchResult(div);
   //Is the div closed?
   var closed = xGetComputedStyle(div, 'display') == 'none';
   //If the catalog is a top catalog, close the other catalogs
   //but only if the one clicked is closed.
   if (closePreviousCatalog && closed) {
      closeRootNodes(image);
   }
   //Get the child image object
   image = getImage(image);

   if (xmlhttp) {
      openWithHttpRequest(image, link, false, false);
   }
   if (hasLink && closed) return true;
   return false;
}

function getImage(image) {
   if (image && ( image.tagName == 'A' || image.tagName == 'a')) {
      if (image.getElementsByTagName('img').length > 0) {
         image = image.getElementsByTagName('img')[0];
      } else {
    	  //Go up one level and check for siblings
    	  var parent = image.parentNode;
    	  if (parent) {
	    	  var children = parent.getElementsByTagName("img");
	    	  if (children.length > 0)
	    		  image = children[0];
    	  }
      }
   }
   return image;
}

function closeRootNodes(nodeClicked) {
   //alert(nodeClicked.parentNode.tagName);
   //Get the children of the top ul
   var children = nodeClicked.parentNode.parentNode.childNodes;
   for (var i = 0; i < children.length; i++) {
      var child = children[i];
      if (child.tagName == 'li' || child.tagName == 'LI') {
         var grandChildren = child.childNodes;
         for (var j = 0; j < children.length; j++) {
            var link = grandChildren[j];
            if (link.tagName == 'a' || link.tagName == 'A') {
               var div = getDivToOpen(link);
               if (xGetComputedStyle(div, 'display') == 'block') {
                  //It is open. Close it
                  div.style.display = 'none';
                  var image = getImage(link);
                  openImage(image);
               }
               break;
            }
         }
      }
   }

}

function openVariableSearchStudyWrapper(image, link) {
   openView(image, link, false);
   var li = getContainingLI(image);

   var div = getDivToOpen(image);

   if (xGetComputedStyle(div, 'display') == 'block') {
      if (li) li.className = 'studyopen';
   } else {
      if (li) li.className = 'studyclosed';
   }

}

var bookmarkImage;
var bookmarkDiv;
var bookmarkLink;
function openDrilldownBookmark(image, link) {
   bookmarkImage = image;
   bookmarkDiv = getDivToOpen(image);
   bookmarkLink = link;
   return openView(image, link, false);
}


var openUserDefinedNode;
var openUserDefinedDiv;
var openUserDefinedImage;

function openUserDefined(node) {
   checkIfLogin();

   var image = node.getElementsByTagName('img')[0];
   if (!image) {
	   image = node;
   }
   var div = getDivToOpen(image);
   checkIfSearchResult(div);
   if (xmlhttp) {
      openWithHttpRequest(image, node.href, false, false);
   }

   openUserDefinedNode = node;
   openUserDefinedDiv = div;
   openUserDefinedImage = image;

   return false;
}


function getDivToOpen(image) {

   var parent = getContainingLI(image);

   var children = parent.childNodes;
   for (var i = 0; i < children.length; i++) {
      var child = children[i];
      if (child.tagName && ( child.tagName == 'div' || child.tagName == 'DIV')) return children[i];
   }
   return null;
}

function getContainingLI(node) {
   var parent = node.parentNode;
   while (parent && (parent.tagName != 'li' && parent.tagName != 'LI')) {
      parent = parent.parentNode;
   }

   return parent;
}


var prevstudyid;
var prevobject;


function createBookmark() {
   var url = "";

   for (var i = 0; i < openobj.length; i++) {
      if (i > 0) url += "&";
      url += "open=";
      url += openobj[i];
   }
   return url;
}

function openStudyWithCube(id, object, cube) {
   var link = document.getElementById(id + 'href');
   var url = 'velocity?mode=cube&study=' + object + '&cube=' + cube;
   openStudy(link, id, url, object);
   return false;
}

//Checks given node is in a search result and sets a field in the search frame to 
//reflect this. Used for highlighting searchterms.
function checkIfSearchResult(element) {
   var isSearch=false;
   while (element) {
      element = element.parentNode;
      if (!element)  break;     
      if (element && element.nodeType == 9)   break;
      
      if (element.id == 'searchdivinsert') {         
         isSearch=true;
         break;         
      } 
   }  
   
   searchIndicator=parent.parent.content.simpleSearch.document.getElementById('lastClickInSearchIndicator');
   if (searchIndicator){
      if (isSearch) {
         searchIndicator.value="true";
      } else {
         searchIndicator.value="false";
      }
   }
}

function checkIfLogin() {
   if (loginframesize) {
      var frameset = parent.parent.document.getElementById('set');
      if (frameset) {
         frameset.cols = loginframesize;
         if (openedelement) {
            var element = document.getElementById(openedelement + 'divinsert');
            if (element) {
               element.style.display = 'none';
               openImage(openedelement);
            }
         }
      }
   }
   loginframesize = null;
   loggedinsize = null;
   islogin = false;
}


// The previous image that was opened
var previousImage;
//The previous study that was opened
var previousStudy;

function closePreviousStudy(div) {
   //If there is a new to open
   if (div) {
      //It is the current node that is the previous too, since it is open
      if (xGetComputedStyle(div, 'display') == 'block') return;
   }

   if (previousStudy) {
      previousStudy.style.display = 'none';
   }
   if (previousImage) {
      openImage(previousImage);
      var li = getContainingLI(previousImage);
      if (li) li.className = '';
   }
   previousImage = null;
   previousStudy = null;
   openUserDefinedNode = null;
   openUserDefinedDiv = null;
   openUserDefinedImage = null;
}


function openStudy(image, link) {
   checkIfLogin();
   
   var div = getDivToOpen(image);
   var li = getContainingLI(image);
   closePreviousStudy(div);
   checkIfSearchResult(div);
   previousStudy = div;
   previousImage = image;

   if (xmlhttp) {
      if (xGetComputedStyle(div, 'display') == 'none') {
         if (li) li.className = 'studyopen';
      } else {
         if (li) li.className = 'studyclosed';
      }
      openWithHttpRequest(image, link, true, false);
   }
   return true;
}

function closeCatalog(element) {
	
}

function displayEGMSResource(resource) {
   checkIfLogin();
   updateActiveBrowseListElement(resource);
   var li = getContainingLI(resource);
   var div = getDivToOpen(resource);
   checkIfSearchResult(div);
   closePreviousStudy(div);

   previousStudy = div;
   previousImage = resource;
   if (xGetComputedStyle(div, 'display') == 'none') {
      if (li) li.className = 'studyopen';
   }

   return true;
}

/**
 * Common method for opening DDI elements in the browse tree.
 * @param element The HTML element that was clicked.
 * @param order
 * @param link The link to the DDI element.
 * @param closeDown
 * @param extras Additional data needed. Useful if you need to pass extra
 * 	parameters in the future without having to change the entire method signature.
 * @return
 */
function displayDDIelement(element, order, link, closeDown, extras) {
	checkIfLogin();
	checkIfSearchResult(getDivToOpen(element));
	updateActiveBrowseListElement(element);
	var className = element.className;
	var div = getDivToOpen(element);
	if (div && xGetComputedStyle(div, 'display') == 'none' && (className && className.indexOf('leafnode') == -1)) {
		openView(element, link, closeDown);
	}
	
	var othersideurl = getRightFrameHref();
	var element = othersideurl.split('?');
	
	//Catalogs need some extra stuff removed from URL. It is added here
	var toRemoveFromURL = remove;
	if (extras.remove)
		toRemoveFromURL = toRemoveFromURL.concat(extras.remove);
	
	var chopped = chopUrl(element[1], toRemoveFromURL);

	var sign = "&";
	if (chopped.length == 0) sign = "";

	var url = element[0] + '?' + chopped + sign + "mode=documentation";
	if (extras.submode) {
		url += "&" + extras.submode.key + "=" + extras.submode.value;
	}
	if (extras.type) {
		url += "&" + extras.type.key + "=" + escapeURL(extras.type.value);
	}
	if (order) {
		if (order.length > 0) url += "&node=" + order;
	}

	setRightFrameHref(url);
	return false;
}

function displayCatalog(element, catalog, link, closeDown) {
	var extras = {
		"submode" : {
			"key" : "submode",
			"value" : "catalog"
		},
		"type" : {
			"key" : "catalog",
			"value" : catalog
		},
		"remove" : new Array("cube", "study")
	};

	return displayDDIelement(element, null, link, closeDown, extras);
}

function displayStudy(element, study, showEntireDDI) {
	var extras = {
		"submode" : {
			"key" : "submode",
			"value" : "abstract"
		},
		"type" : {
			"key" : "studydoc",
			"value" : "study"
		}
	};
   ;
   if(showEntireDDI){
      extras.submode.value = "ddi";
   }

   return displayDDIelement(element, null, link, closeDown, extras);
}

function displayDdi(element, order, link, closeDown) {
	var extras = { "submode" : { "key" : "submode", "value" : "ddi" } };
   return displayDDIelement(element, order, link, closeDown, extras);
}

function displaySection(element, section, e, link, closeDown) {
   checkIfLogin();
   checkIfSearchResult(getDivToOpen(element));
   var othersideurl = getRightFrameHref();

   if (getRightsideMode() == 'variables') {
      addMenuClicksVariables('', section, true, e, section);
   } else if (getRightsideMode() == 'shoppingcart') {
      if (parent.parent.rightsidemainframe.rightside.displayCartMenuFor(section) == true) {
         var men = document.getElementById('shoppingcart');
         if (men) addShoppingCartMenu(section, e, true, null);
      }
      else openView(element, link, closeDown);
   } else {
      openView(element, link, closeDown);
      
      if (getRightsideMode() == 'documentation') {
	      var element = othersideurl.split('?');
	      var chopped = chopUrl(element[1], remove);
	      var sign = "&";
	      if (chopped.length == 0) sign = "";
	      var url = element[0] + '?' + chopped + sign + "mode=documentation&submode=section&section=" + escapeURL(section);
	      
	      if(othersideurl!=url) setRightFrameHref(url);
      }
   }
   return false;
}


/**
 * A function that open the cube.
 * If a cube is on top, there is a drill down link.
 * If the cube is nested within the study, there is no drilldown link.
 */
function openCube(node, drillDownLink, secondCubeUrl, event) {
   checkIfLogin();
   updateActiveBrowseListElement(node);
   //Find if a ddi node is in the url
   var othersideurl = getRightFrameHref();
   var elements = othersideurl.split('?');
   var right = elements[1];
   var parameters = right.split('&');
   var nodetext = "";
   //Is this the second cube?
   var secondCube = false;
   for (var i = 0; i < parameters.length; i++) {
      //if (parameters[i].indexOf("node=") == 0) nodetext += "&" + parameters[i];
      if (parameters[i].indexOf("cube=") == 0 || parameters[i].indexOf("ref=") == 0) secondCube = true;
   }

   var menu = xGetElementById('hinge');
   //If there is no hinge menu in the markup, hinge is disabled
   if (!menu) secondCube = false;

   if (secondCube) {
      closeBookmarkMenu();
      setPreviousMenu(menu,event);

      //Set the link to the menu entry
      var display = xGetElementById('displayCube');
      display.onclick = function() {
         doCubeLoad(node, drillDownLink, nodetext);
         display.href = node.href;
         closeBookmarkMenu();
         return true;
      }

      var hinged = xGetElementById('hingeCube');
      hinged.onclick = function() {
         hinged.href = othersideurl + "&cube=" + secondCubeUrl;
         closeBookmarkMenu();
         return true;
      }

      menu.style.display = 'block';
      try {
         move(menu, event);
      } catch(error) {
         //alert(error);
      }
      return false;
   } else {
      return doCubeLoad(node, drillDownLink, nodetext);
   }
}

function doCubeLoad(node, drillDownLink, nodetext) {
   //The link to the cube
   node.href = node.href + nodetext;

   try {
      //Display the loading if possible
      parent.parent.rightsidemainframe.rightside.hideTheViewArea();
   } catch (error) {
   }

   var li = getContainingLI(node);
   var div = getDivToOpen(node);

   closePreviousStudy(div);

   previousStudy = div;
   previousImage = node;
   if (xGetComputedStyle(div, 'display') == 'none') {
      if (li) li.className = 'studyopen';
      if (drillDownLink) {
         div.innerHTML = document.getElementById('studyload').innerHTML;
         div.style.display = 'block';
         waitForDefaultTableLoad(div, node, drillDownLink);
      }
   }

   return true;
}

function waitForDefaultTableLoad(div, node, drillDownLink) {
   if (getRightFrameHref() == node.href) {
      //Close the div, else the openView will close it.
      if (xGetComputedStyle(div, 'display') == 'block') {
         div.style.display = 'none';
      }
      openView(node, drillDownLink, false);
   } else {
      next = function() {
         waitForDefaultTableLoad(div, node, drillDownLink);
      }
      setTimeout(next, 200);
   }
}


var selectedvariable;
var previousmenu;


function openBookmark(node, object, removeLink, event) {
   checkIfLogin();
   updateActiveBrowseListElement(node);
   if (!event) event = window.event;

   closeBookmarkMenu();

   var menu = xGetElementById('bookmark');
   if (menu) {
      menu.style.display = 'block';
      //Set the apply
      var apply = xGetElementById('bookmarkapply');
      apply.href = node.href;

      try {
         var bookmarkremove = xGetElementById('bookmarkremove');
         bookmarkremove.onclick = function() {
            removeBookmarkDialog(removeLink);
            closeBookmarkMenu();
         };
      } catch(error) {
         //alert("Second: " + error.description);
      }

      try {
         move(menu, event);
      } catch(error) {
         //alert(error);
      }
      setPreviousMenu(menu,event);


   }
   return false;
}

function removeBookmarkDialog(removeLink) {
   var dialogFrame = top.main.rightsidemainframe.rightside;
   var handleYes = function() {
      try {
         if (xmlhttp) {
            var element = getDivToOpen(bookmarkImage);
               //Close the node
            element.style.display = 'none';
            openImage(bookmarkImage);
               //Request the removal
            openWithHttpRequest(bookmarkImage, removeLink, false, false);
         }
         closeBookmarkMenu();
      } catch(error) {
         alert("Error deleting bookmark: " + error);
      }
      this.hide();
   };
   dialogFrame.setDialogButtons(handleYes, null, translation.confirm_delete_bookmark + "?");
}


function removeBookmark(node, target, e) {
   if (xmlhttp) {
      //Close the node
      var element = document.getElementById(target + 'divinsert');
      element.style.display = 'none';
      openImage(target);
      //Request the removal
      openWithHttpRequest(target, node, false, false);
   } else {
      var iframe = document.getElementById(target + 'iframe');
      //TODO: What to do if iframe is null?
      if (!iframe) {
         createIframe(node, target);
      }
      else iframe.src = node.href;
   }
   closeBookmarkMenu();

   return false;
}

/**
 * Hides the current treeMenu
 */
function closeBookmarkMenu() {
   if (previousmenu) previousmenu.style.display = 'none';
}

/**
 * Sets active treeMenu and disable event bubbling
 */
function setPreviousMenu(menu,event){
   previousmenu = menu;
   event.cancelBubble = true;
 	if (event.stopPropagation) event.stopPropagation();
}

function createIframe(link, id) {
   if (!browser.isIE) {
      iframe = document.createElement("iframe");
      iframe.src = link.href;
      iframe.height = '0px';
      iframe.width = '0px';
      iframe.id = id + 'iframe';
      iframe.name = id + 'iframe';
      //iframe.style.visibility = 'hidden';
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
   } else {
      var dv = document.createElement('div');
      dv = document.body.appendChild(dv);
      dv.innerHTML = '<iframe id="TheIframe"></iframe>'
      var iframe = document.getElementById("Theiframe")
      iframe.src = link.href;
      iframe.height = '0px';
      iframe.width = '0px';
      iframe.id = id + 'iframe';
      iframe.name = id + 'iframe';
      iframe.style.visibility = 'hidden';
   }
}

var cleared = false;
function clearSelected() {

   //If allready cleared then return
   if (cleared) return;
   cleared = true;
   //When clicking on a variable inside a study, the previous study set
   // is in fact the current.
   var study = document.getElementById(prevstudyid);
   if (!study) study = document;
   if (study) {
      var links = study.getElementsByTagName('a');
      var lengde = links.length;
      for (i = 0; i < lengde; i++) {
         var link = links[i];
         if (link.className) {
            if (link.className == 'nodetextSelected') {
               link.className = 'nodetextVariable';
            }
         }
      }
   }

}


function displayVariable(id, variable, type, shortid, inVariableSearch, e, varGrp) {
	updateActiveBrowseListElement(id);
   checkIfLogin();
   //For regressions in advanced search
   if (shortid == "") {shortid = variable.substring(variable.lastIndexOf("_") + 1, variable.length);}
   checkIfSearchResult(id);
   if (!e) e = window.event;
   clearSelected();

   if (inVariableSearch) {
      applyMetadata(variable, false, varGrp);
      return false;
   }

   //The variable to use when opening the menu
   selectedvariable = variable;

   closeBookmarkMenu();

   if (parent.parent.rightsidemainframe.rightside) {
      if (!type) type = "";

      if (parent.parent.rightsidemainframe.rightside.computetype) {

         if (parent.parent.rightsidemainframe.rightside.computetype == 'add') {
            if (type == 'character') {
               alert(translation.compute_alpha);
               return false;
            }
            addComputeAdd(id, variable, e);
         } else if (parent.parent.rightsidemainframe.rightside.computetype == 'sub') {
            if (type == 'character') {
               alert(translation.compute_alpha);
               return false;
            }
            addComputeSub(id, variable, e);
         } else if (parent.parent.rightsidemainframe.rightside.computetype == 'recode') {
            if (type == 'character') {
               alert(translation.recode_alpha);
               return false;
            }
            addRecode(id, variable, e);
         }
      } else if (parent.parent.rightsidemainframe.rightside.mode) {
         if (parent.parent.rightsidemainframe.rightside.mode == 'subset') {
            addMenuClicks(id, variable, e);
         } else if (parent.parent.rightsidemainframe.rightside.mode == 'weight') {
            addMenuClicksWeighting(id, variable, e);
         } else if (parent.parent.rightsidemainframe.rightside.mode == 'cases') {
            addMenuClicks(id, variable, e);
         } else if (parent.parent.rightsidemainframe.rightside.mode == 'variables') {
            addMenuClicksVariables(id, variable, false, e, varGrp);
         } else if (parent.parent.rightsidemainframe.rightside.mode == 'table') {
            var men = document.getElementById('tabulation');
            if (men) addTabulationMenu(id, variable, e);
            else applyMetadata(variable, false, varGrp);
         } else if (parent.parent.rightsidemainframe.rightside.mode == 'graph') {
            var men = document.getElementById('tabulation');
            if (men) addTabulationMenu(id, variable, e);
            else applyMetadata(variable, false, varGrp);
         } else if (parent.parent.rightsidemainframe.rightside.mode == 'shoppingcart') {
            var men = document.getElementById('shoppingcart');
            if (men) addShoppingCartMenu(variable, e, false, varGrp);
         } else if (parent.parent.rightsidemainframe.rightside.mode == 'regression') {
            if (type == 'character') {
               alert(translation.tree_noalphanumeric);
               return false;
            }
            var men = document.getElementById('regression');
            if (men) addRegressionMenu(id, variable, e);
            else applyMetadata(variable, false, varGrp);
         } else if (parent.parent.rightsidemainframe.rightside.mode == 'correlation') {
            if (type == 'character') {
               alert(translation.tree_noalphanumeric);
               return false;
            }
            var men = document.getElementById('correlation');
            if (men) addCorrelationMenu(id, shortid, e);
            else applyMetadata(variable, false, varGrp);
         } else {
            applyMetadata(variable, false, varGrp);
         }
      } else {
         applyMetadata(variable, false, varGrp);
      }
   }

   return false;
}

function getRightFrameHref() {
    return removeBookmarkFromURL(parent.parent.rightsidemainframe.rightside.location.href);
}

function setRightFrameHref(url) {
    parent.parent.rightsidemainframe.rightside.location.href = url;
}

function removeBookmarkFromURL(url) {
    var startCut = url.indexOf("openBookmark");
    // if openBookmark exists as a URL argument, continue in here to remove it
    if(startCut > 0) {
        var stopCut = url.indexOf("&", startCut);
        // if the openBookmark is in between all the other url arguments, remove it from the lot
        if(stopCut > 0) {
            return url.substring(0, startCut) + url.substring(stopCut);
        }
        // if openBookmark is at the end, just return everything before openBookmark
        else {
            return url.substring(0, startCut);
        }
    }
    // there is no openBookmark url argument, return the untouched url
    else {
        return url;
    }
}

function findIndexOf(string, othersideurl) {

   //Find the index of the string.
   //If no index, then it is -1
   var index = othersideurl.indexOf(string);
   if (index != -1) {
      //Make sure it is not a previous mode
      try {
         if (othersideurl.charAt(index - 1) == 's') return -1;
         else return 1;
      } catch (e) {
         return 1;
      }
   }
   return -1;
}

function addCorrelationMenu(id, variable, event) {
   var menu = document.getElementById('correlation');
   if (menu) menu.style.display = 'block';
   try {
      move(menu, event);
   } catch(error) {
   }

   var dep = document.getElementById('corr');
   dep.onclick = function() {
      applyCorrelationVariable(variable);
      return false;
   };

   if (menu) {
      setPreviousMenu(menu,event);
   }

}

function addRegressionMenu(id, variable, event) {
   var menu = document.getElementById('regression');
   if (menu) menu.style.display = 'block';
   try {
      move(menu, event);
   } catch(error) {
   }

   var dep = document.getElementById('dep');
   dep.onclick = function() {
      applyRegressionVariable(variable, id, "dep");
      return false;
   };

   var indep = document.getElementById('indep');
   indep.onclick = function() {
      applyRegressionVariable(variable, id, "indeps");
      return false;
   };

   if (menu) setPreviousMenu(menu,event);
}

function addTabulationMenu(id, variable, event) {
   var menu = document.getElementById('tabulation');
   if (menu) menu.style.display = 'block';
   try {
      move(menu, event);
   } catch(error) {
   }

   var row = document.getElementById('row');
   row.onclick = function() {
      applyVariable(variable, id, "stubs");
      return false;
   };

   var col = document.getElementById('col');
   col.onclick = function() {
      applyVariable(variable, id, "headers");
      return false;
   };

   var lay = document.getElementById('lay');
   lay.onclick = function() {
      applyVariable(variable, id, "layers");
      return false;
   };

   var measure = document.getElementById('measure');
   measure.onclick = function() {
      applyVariable(variable, id, "measure");
      return false;
   };

   setPreviousMenu(menu,event);
}

function addShoppingCartMenu(object, event, confirm, varGrp) {
   var menu = document.getElementById('shoppingcart');
   if (menu) menu.style.display = 'block';
   try {
      move(menu, event);
   } catch(error) {
   }

   var cart = document.getElementById('cart');
   cart.onclick = function() {
      if (confirm) {
         confirmAddToCart(object,varGrp);
      } else {
         addToCart(object,varGrp);
      }
      return false;
   };

   if (menu) {
      setPreviousMenu(menu,event);
   }

}

function applyCorrelationVariable(variable) {
   var othersideurl = getRightFrameHref();
   var add = allowAddCorrelation(variable);
   if (!add) {
      alert(translation.tree_alreadyintable);
   }
   else {
      var element = othersideurl.split('?');
      var chopped = "";
      var where = "c";
      chopped = chopUrl(element[1], removeCorr);

      var sign = "&";
      if (chopped.length == 0) sign = "";
      if (sign.charAt(sign.length - 1) != '&') where = "&" + where;

      var url = element[0] + '?' + chopped + sign + where + "=" + escapeURL(variable);
      setRightFrameHref(url);

   }

   var menu = document.getElementById('correlation');
   if (menu) menu.style.display = 'none';
   return false;
}

function applyRegressionVariable(variable, id, where) {
   var othersideurl = getRightFrameHref();
   var add = allowAddRegression(variable);
   if (!add) {
      alert(translation.tree_alreadyintable);
//   } else if (where != "dep" && !allowAddToScatterplot()) {
//      alert(tree_maxindepvars);
   }
   else {

      var element = othersideurl.split('?');
      var chopped = "";

      if (where == 'dep') {
         chopped = chopUrl(element[1], removeDep);
      } else {
         if (!allowAddToScatterplot())
            chopped = chopUrl(element[1], removeIndep.concat('indeps'));
         else
            chopped = chopUrl(element[1], removeIndep);
      }

      var sign = "&";
      if (chopped.length == 0) sign = "";
      if (sign.charAt(sign.length - 1) != '&') where = "&" + where;

      var url = element[0] + '?' + chopped + sign + where + "=" + escapeURL(variable);
      setRightFrameHref(url);
   }

   var menu = document.getElementById('regression');
   if (menu) menu.style.display = 'none';
   return false;

}

function applyVariable(variable, id, where) {

   var othersideurl = getRightFrameHref();
   var add = allowAdd(variable);
   if (!add) {
      alert(translation.tree_alreadyintable);
   }
   else {
      try {
         //Display the loading
         parent.parent.rightsidemainframe.rightside.hideTheViewArea();
      } catch (error) {
      }

      var element = othersideurl.split('?');
      var chopped = "";

      var analysistype = 0;

      if (where == 'measure') {
         analysistype = 1;
         chopped = chopUrl(element[1], remove3);
      } else {
         analysistype = 0;
         chopped = chopUrl(element[1], remove31);
      }

      //change chart type for pie charts
      if ((where == 'stubs' || where == 'headers') && chopped.length > 0) {
         var query = chopped.split('&');
         for (var x = 0; x < query.length; x++) {
            var pair = query[x].split('=');
            if (pair[0] == "charttype") {
               if (pair[1] == "T13") {
                  query[x] = "charttype=T25";
               } else if (pair[1] == "T25") {
                  query[x] = "charttype=T13";
               }
            }
         }
         chopped = query.join('&');
      } else if ((where == "measure") && chopped.length > 0) {
    	  var query = chopped.split('&');
    	  for (var x = 0; x < query.length; x++) {
    		  var pair = query[x].split('=');
    		  if (pair[0] == "charttype") {
    			  if (pair[1] == "T21") {
    				  query[x] = "charttype=D33";
    			  } else if (pair[1] == "T11") {
    				  query[x] = "charttype=D27";
    			  } else if (pair[1] == "T12") {
    				  query[x] = "charttype=D21";
    			  }
    		  }
    	  }
    	  chopped = query.join('&');
      }

      var sign = "&";
      if (chopped.length == 0) sign = "";

      if (sign.charAt(sign.length - 1) != '&') where = "&" + where;

      var url = element[0] + '?' + chopped + sign + where + "=" + escapeURL(variable);
      if (where == 'measure') url += "&analysistype=1";

      setRightFrameHref(url);
   }
   var menu = document.getElementById('tabulation');
   if (menu) menu.style.display = 'none';
   return false;
}

function confirmAddToCart(object,varGrp) {
   var alertElement = document.getElementById('alertText');
   var alertText = alertElement.innerHTML;

   if (confirm (alertText)) {
      return addToCart(object,varGrp);
   } else {
      var menu = document.getElementById('shoppingcart');
      if (menu) menu.style.display = 'none';
      return false;
   }
}

function addToCart(object,varGrp) {
   var othersideurl = getRightFrameHref();;
   var element = othersideurl.split('?');
   var chopped = chopUrl(element[1], removeCart);
   var url = element[0] + '?' + chopped + '&' + "addVariableToCart=" + escapeURL(object)+ "&addVG=" + varGrp;

   parent.parent.rightsidemainframe.rightside.hideTheViewArea();
   setRightFrameHref(url);
   var menu = document.getElementById('shoppingcart');
   if (menu) menu.style.display = 'none';
   return false;
}

function escapeURL(url) {
   var newurl = "";
   var length = url.length;
   for (var i = 0; i < length; i++) {
      if (url.charAt(i) == ':') {
         newurl += "%3A";
      } else if (url.charAt(i) == '/') {
         newurl += "%2F";
      } else {
         newurl += url.charAt(i);
      }
   }
   return newurl;
}

function allowAdd(variable) {
   if (isInAnalysis("stubs", variable)) return false;
   if (isInAnalysis("headers", variable)) return false;
   if (isInAnalysis("layers", variable)) return false;
   if (isInAnalysis("measure", variable)) return false;

   return true;
}

function allowAddCorrelation(variable) {
   if (isInAnalysis("c", variable)) return false;

   return true;
}

function allowAddRegression(variable) {
   if (isInAnalysis("dep", variable)) return false;
   if (isInAnalysis("indeps", variable)) return false;

   return true;
}

function isInAnalysis(prefix, url) {
   var othersideurl = getRightFrameHref();

   var stuburl = prefix + '=' + url;
   var stubindex = othersideurl.indexOf(stuburl);

   while (stubindex != -1) {
      var next = othersideurl.charAt(stuburl.length + stubindex);

      if (!next) next = "&";
      if ((stuburl.length + stubindex >= othersideurl.length) || next == "&") {
         return true;
      }
      stubindex = othersideurl.indexOf(stubindex, stuburl);
   }
   url = myEscape(url);

   stuburl = prefix + "=" + url;
   stubindex = othersideurl.indexOf(stuburl);

   while (stubindex != -1) {
      var next = othersideurl.charAt(stuburl.length + stubindex);

      if (!next) next = "&";
      if ((stuburl.length + stubindex >= othersideurl.length) || next == "&") {
         return true;
      }
      stubindex = othersideurl.indexOf(stubindex, stuburl);
   }

   return false;
}

function allowAddToScatterplot() {
   var rightside = parent.parent.rightsidemainframe.rightside;
   var allow = true;
   if (typeof rightside.isScatterplot == 'boolean') {
      allow = !rightside.isScatterplot;
   }
   return allow;
}

/**
 * Displays a variablesubset menu
 * @param id the clicked element
 * @param object the object we to add to subset
 * @param isSection is the object a section?
 * @param event
 * @param varGrp the varGroup the variable belongs to, if any
 */
function addMenuClicksVariables(id, object, isSection, event, varGrp) {
   var menu = document.getElementById('varsubset');
   if (menu) menu.style.display = 'block';
   move(menu, event);
   try {
   } catch(error) {
   }

   setPreviousMenu(menu,event);
   var filter = document.getElementById('varfilter');
   if (filter) {
      filter.onclick = function() {
         applySubsetVariable(object, id, varGrp);
         return false;
      };
   }
   var docu = document.getElementById('vardocu');
   if (docu) {
      docu.onclick = function() {
         applyMetadata(object, isSection, varGrp);
         return false;
      };
   }
}

function addComputeAdd(id, variable, event) {
   var menu = document.getElementById('compAdd');
   if (menu) menu.style.display = 'block';
   try {
      move(menu, event);
   } catch(error) {
   }
   setPreviousMenu(menu,event);
   var add = document.getElementById('comAddVar');
   add.onclick = function() {
      applyComputeAdd(variable, id);
      return false;
   };
}

function addComputeSub(id, variable, event) {
   var menu = document.getElementById('compSub');
   if (menu) menu.style.display = 'block';
   try {
      move(menu, event);
   } catch(error) {
   }

   setPreviousMenu(menu,event);
   var add = document.getElementById('comSubVar1');
   add.onclick = function() {
      applyComputeSub(variable, id, 'firstVar');
      return false;
   };

   add = document.getElementById('comSubVar2');
   add.onclick = function() {
      applyComputeSub(variable, id, 'secondVar');
      return false;
   };
}


function addRecode(id, variable, event) {
   var menu = document.getElementById('recode');
   if (menu) menu.style.display = 'block';
   try {
      move(menu, event);
   } catch(error) {
   }


   setPreviousMenu(menu,event);
   var add = document.getElementById('recodeVar');
   add.onclick = function() {
      applyRecode(variable, id, 'recodeVar');
      return false;
   };

}

/**
 * Attaches a function event to a menu
 * @param id 
 * @param variable
 * @param event
 */
function addMenuClicks(id, variable, event) {
   var mode = 'menu';
   var prefix = '';
   try {
      if (parent.parent.rightsidemainframe.rightside.inDownload) {
         mode = 'varsubset';
         prefix = 'var';
      }
   } catch (error) {
   }

   var menu = document.getElementById(mode);
   if (menu) menu.style.display = 'block';
   try {
      move(menu, event);
   } catch(error) {
   }
   setPreviousMenu(menu,event);
   var filter = document.getElementById(prefix + 'filter');
   if (filter) {
      filter.onclick = function() {
         applySubset(variable, id);
         return false;
      };
   }

   var docu = document.getElementById(prefix + 'docu');
   if (docu) {
      docu.onclick = function() {
         applyMetadata(variable, false, null);
         return false;
      };
   }
}


function addMenuClicksWeighting(id, variable, event) {
   var menu = document.getElementById('weighting');
   if (menu) menu.style.display = 'block';
   try {
      move(menu, event);
   } catch(error) {
   }
   setPreviousMenu(menu,event);
   var filter = document.getElementById('weight');
   filter.onclick = function() {
      applyWeight(variable, id);
      return false;
   };
   var docu = document.getElementById('weightdocu');
   docu.onclick = function() {
      applyMetadata(variable, false, null);
      return false;
   };
}


function hideMenu(menu) {
   menu.style.display = 'none';
}

function getParent(node) {
   while (!document.all && node.nodeType != node.ELEMENT_NODE) {
      node = node.parentNode;
   }

   return node;
}

function doNothing() {

}

function applyComputeAdd(variable, id) {
   var form = parent.parent.rightsidemainframe.rightside.document.getElementById('computeAdd');
   var cells = form.getElementsByTagName('input');
   for (var i = 0; i < cells.length; i++) {
      if (cells[i].name == 'compVar') {
         if (cells[i].value == variable) {
            alert(translation.compute_var_in);
            var menu = document.getElementById('compAdd');
            if (menu) menu.style.display = 'none';
            return;
         }
      }
   }

   appendToForm(form, variable, 'compVar');
   form.submit();
   var menu = document.getElementById('compAdd');
   if (menu) menu.style.display = 'none';
}

function applyComputeSub(variable, id, name) {
   var added = false;
   var form = parent.parent.rightsidemainframe.rightside.document.getElementById('computeSub');
   var cells = form.getElementsByTagName('input');
   for (var i = 0; i < cells.length; i++) {
      if (cells[i].name == name) {
         cells[i].value = variable;
         added = true;
      }
   }
   if (!added) appendToForm(form, variable, name);
   form.submit();
   var menu = document.getElementById('compSub');
   if (menu) menu.style.display = 'none';
}

function applyRecode(variable, id, name) {
   var added = false;
   var form = parent.parent.rightsidemainframe.rightside.document.getElementById('recodeForm');
   var cells = form.getElementsByTagName('input');
   for (var i = 0; i < cells.length; i++) {
      if (cells[i].name == name) {
         cells[i].value = variable;
         added = true;
      }
   }

   if (!added) appendToForm(form, variable, name);
   form.submit();
   var menu = document.getElementById('recode');
   if (menu) menu.style.display = 'none';

}


function appendToForm(form, variable, newname) {
   //create element
   var oInputMon = parent.parent.rightsidemainframe.rightside.document.createElement("INPUT");
   oInputMon.type = "hidden";
   oInputMon.name = newname;
   oInputMon.value = variable;

   form.appendChild(oInputMon);
}


function applyMetadata(variable, isSection, varGrp) {
   try {
      var othersideurl = getRightFrameHref();
      var element = othersideurl.split('?');
      var chopped = chopUrl(element[1], remove);
      var varGroupInSub = "";

      var sign = "&";
      if (chopped.length == 0) sign = "";
      var submode = 'variable';
      if (isSection) submode = 'section';
      if (varGrp) varGroupInSub = "&gs=" + varGrp.split("_VG")[1];

      var url = element[0] + '?' + chopped + sign + "mode=documentation&submode=" + submode + "&" + submode + "=" + escapeURL(variable) + varGroupInSub;
      setRightFrameHref(url);

      var menu = document.getElementById('menu');
      if (menu) menu.style.display = 'none';
      menu = document.getElementById('varsubset');
      if (menu) menu.style.display = 'none';
   } catch (error) {
      alert(error);
   }
}

function applySubsetVariable(variable, id, varGrp) {
   var othersideurl = getRightFrameHref();
   var element = othersideurl.split('?');
   var varGrpID = varGrp.split("_VG")[1]

   var url = element[0];
   url += '?';

   var elements = element[1].split('&');
   var i = 0;
   //Is it the first added?
   var first = true;

   for (i = 0; i < elements.length; i++) {
      var s = elements[i];
      if (s.indexOf('_opID=') == -1 && s.indexOf('_cancelled=') == -1) {
         if (!first) url += "&";
         url += s;
         first = false;
      }
   }
   url += "&s=" + escapeURL(variable);
   url += "&gs=" + varGrpID;
   setRightFrameHref(url);

   var menu = document.getElementById(id + 'varsubset');
   if (menu) menu.style.display = 'none';
}


function applySubset(variable, id) {

   var othersideurl = getRightFrameHref();
   var element = othersideurl.split('?');

   var url = element[0];
   url += '?';

   var elements = element[1].split('&');
   var i = 0;

   var count = 0;
   for (i = 0; i < elements.length; i++) {
      var s = elements[i];
      if (s.indexOf('count=') != -1) {
         var cou = s.split('=');
         count = parseInt(cou[1]);
      }
   }

   var remove = 'cases' + (count + 1) + '=';
   var vari = 'var' + (count + 1) + '=';

   var first = true;
   for (i = 0; i < elements.length; i++) {
      var s = elements[i];
      if (s.indexOf('_opID=') == -1 && s.indexOf('_cancelled=') == -1 && s.indexOf('head=') == -1 && s.indexOf(remove) == -1 && s.indexOf(vari) == -1) {
         if (!first) url += "&";
         url += s;
         first = false;
      }
   }
   url += '&' + vari + escapeURL(variable);
   setRightFrameHref(url);

   var mode = 'menu';
   try {
      if (parent.parent.rightsidemainframe.rightside.inDownload) {
         mode = 'varsubset';
      }
   } catch (error) {
   }

   var menu = document.getElementById(mode);
   if (menu) menu.style.display = 'none';
}

function applyWeight(variable, id) {

   if (isInAnalysis("weights", variable)) {
      alert(translation.tree_alreadyinweight);
      var menu = document.getElementById('weighting');
      if (menu) menu.style.display = 'none';
      return;
   }


   var othersideurl = getRightFrameHref();
   var element = othersideurl.split('?');

   var url = element[0];
   url += '?';

   var elements = element[1].split('&');
   var i = 0;


   for (i = 0; i < elements.length; i++) {
      var s = elements[i];
      if (s.indexOf('_opID=') == -1 && s.indexOf('_cancelled=') == -1) {
         if (i > 0) url += "&";
         url += s;
      }
   }
   //TODO: Do we need to check if it has been added?
   url += '&weights=' + escapeURL(variable);
   setRightFrameHref(url);

   var menu = document.getElementById('weighting');
   if (menu) menu.style.display = 'none';
}


function chopUrl(url, what) {
   if (!url) return "";
   var chop = "";
   var element = url.split('&');

   var i = 0;
   for (i = 0; i < element.length; i++) {
      var s = element[i];
      if (!toRemove(s, what)) {
         chop += "&";
         chop += s;
      }
   }
   if (chop.charAt(0) == '&') chop = chop.substring(1);
   return chop;
}


//These arrays are used to clean urls from unwanted params
remove = new Array();
remove[remove.length] = "_opID";
remove[remove.length] = "_cancelled";
remove[remove.length] = "mode";
remove[remove.length] = "submode";
remove[remove.length] = "catalog";
remove[remove.length] = "section";
remove[remove.length] = "variable";
remove[remove.length] = "studydoc";
remove[remove.length] = "resource";
remove[remove.length] = "node";
remove[remove.length] = "charttype";
remove[remove.length] = "add";
remove[remove.length] = "bookmark";
remove[remove.length] = "doBookmark";
remove[remove.length] = "addVariableToCart";
remove[remove.length] = "addVG";
remove[remove.length] = "gs";
remove[remove.length] = "sobject";
remove[remove.length] = "email";
remove[remove.length] = "subscribe";

remove2 = new Array();
remove2[remove2.length] = "_opID";
remove2[remove2.length] = "_cancelled";
remove2[remove2.length] = "mode";
remove2[remove2.length] = "submode";
remove2[remove2.length] = "catalog";
remove2[remove2.length] = "section";
remove2[remove2.length] = "variable";
remove2[remove2.length] = "studydoc";
remove2[remove2.length] = "resource";
remove2[remove2.length] = "node";
remove2[remove2.length] = "analysistype";
remove2[remove2.length] = "add";
remove2[remove2.length] = "bookmark";
remove2[remove2.length] = "doBookmark";
remove2[remove2.length] = "addVariableToCart";
remove2[remove2.length] = "addVG";
remove2[remove2.length] = "sobject";
remove2[remove2.length] = "email";
remove2[remove2.length] = "subscribe";

//Use this so you can add variables to graphs directly
remove31 = new Array();
remove31[remove31.length] = "_opID";
remove31[remove31.length] = "_cancelled";
//remove31[remove31.length] = "mode";
remove31[remove31.length] = "submode";
remove31[remove31.length] = "catalog";
remove31[remove31.length] = "section";
remove31[remove31.length] = "variable";
remove31[remove31.length] = "studydoc";
remove31[remove31.length] = "resource";
remove31[remove31.length] = "node";
remove31[remove31.length] = "add";
remove31[remove31.length] = "bookmark";
remove31[remove31.length] = "doBookmark";
remove31[remove31.length] = "addVariableToCart";
remove31[remove31.length] = "addVG";
remove31[remove31.length] = "sobject";
remove31[remove31.length] = "email";
remove31[remove31.length] = "subscribe";

remove3 = new Array();
remove3[remove3.length] = "_opID";
remove3[remove3.length] = "_cancelled";
remove3[remove3.length] = "submode";
remove3[remove3.length] = "catalog";
remove3[remove3.length] = "section";
remove3[remove3.length] = "variable";
remove3[remove3.length] = "studydoc";
remove3[remove3.length] = "resource";
remove3[remove3.length] = "node";
remove3[remove3.length] = "analysistype";
remove3[remove3.length] = "measure";
remove3[remove3.length] = "add";
remove3[remove3.length] = "bookmark";
remove3[remove3.length] = "doBookmark";
remove3[remove3.length] = "addVariableToCart";
remove3[remove3.length] = "addVG";
remove3[remove3.length] = "sobject";
remove3[remove3.length] = "email";
remove3[remove3.length] = "subscribe";

removeCart = new Array();
removeCart[removeCart.length] = "addVariableToCart";
removeCart[removeCart.length] = "addVG";
removeCart[removeCart.length] = "removeVariableFromCart";
removeCart[removeCart.length] = "downloadCart";
removeCart[removeCart.length] = "clearCart";
removeCart[removeCart.length] = "sobject";
removeCart[removeCart.length] = "email";
removeCart[removeCart.length] = "subscribe";

removeDep = new Array();
removeDep[removeDep.length] = "_opID";
removeDep[removeDep.length] = "_cancelled";
removeDep[removeDep.length] = "submode";
removeDep[removeDep.length] = "catalog";
removeDep[removeDep.length] = "section";
removeDep[removeDep.length] = "variable";
removeDep[removeDep.length] = "studydoc";
removeDep[removeDep.length] = "resource";
removeDep[removeDep.length] = "node";
removeDep[removeDep.length] = "dep";
removeDep[removeDep.length] = "charttype";
removeDep[removeDep.length] = "add";
removeDep[removeDep.length] = "bookmark";
removeDep[removeDep.length] = "doBookmark";
removeDep[removeDep.length] = "addVariableToCart";
removeDep[removeDep.length] = "addVG";
removeDep[removeDep.length] = "sobject";
removeDep[removeDep.length] = "email";
removeDep[removeDep.length] = "subscribe";

removeIndep = new Array();
removeIndep[removeIndep.length] = "_opID";
removeIndep[removeIndep.length] = "_cancelled";
removeIndep[removeIndep.length] = "submode";
removeIndep[removeIndep.length] = "catalog";
removeIndep[removeIndep.length] = "section";
removeIndep[removeIndep.length] = "variable";
removeIndep[removeIndep.length] = "studydoc";
removeIndep[removeIndep.length] = "resource";
removeIndep[removeIndep.length] = "node";
removeIndep[removeIndep.length] = "charttype";
removeIndep[removeIndep.length] = "add";
removeIndep[removeIndep.length] = "bookmark";
removeIndep[removeIndep.length] = "doBookmark";
removeIndep[removeIndep.length] = "addVariableToCart";
removeIndep[removeIndep.length] = "addVG";
removeIndep[removeIndep.length] = "sobject";
removeIndep[removeIndep.length] = "email";
removeIndep[removeIndep.length] = "subscribe";


removeCorr = new Array();
removeCorr[removeCorr.length] = "_opID";
removeCorr[removeCorr.length] = "_cancelled";
removeCorr[removeCorr.length] = "catalog";
removeCorr[removeCorr.length] = "section";
removeCorr[removeCorr.length] = "variable";
removeCorr[removeCorr.length] = "studydoc";
removeCorr[removeCorr.length] = "resource";
removeCorr[removeCorr.length] = "node";
removeCorr[removeCorr.length] = "charttype";
removeCorr[removeCorr.length] = "add";
removeCorr[removeCorr.length] = "bookmark";
removeCorr[removeCorr.length] = "doBookmark";
removeCorr[removeCorr.length] = "addVariableToCart";
removeCorr[removeCorr.length] = "addVG";
removeCorr[removeCorr.length] = "sobject";
removeCorr[removeCorr.length] = "email";
removeCorr[removeCorr.length] = "subscribe";

function toRemove(s, what) {
   for (var j = 0; j < what.length; j++) {
      if (s.indexOf(what[j] + '=') == 0) return true;
   }
   return false;
}

function openImage(image) {
   if (image) {
      image = getImage(image);
      if (image.src == pics[0].src) image.src = pics[1].src;
      else if (image.src == pics[1].src) image.src = pics[0].src;
      else if (image.src == pics[2].src) image.src = pics[3].src;
      else if (image.src == pics[3].src) image.src = pics[2].src;
      else if (image.src == pics[7].src) image.src = pics[8].src;
      else if (image.src == pics[8].src) image.src = pics[7].src;
      else if (image.src == pics[11].src) image.src = pics[12].src;
      else if (image.src == pics[12].src) image.src = pics[11].src;
      else {
         //is ddi do nothing
      }
   }
}

function addVariable() {
   if (selectedvariable) {
      var url = parent.box.location.href;
      url += "&row=" + escapeURL(selectedvariable);
      parent.box.location.href = url;
   }
}

function moveNew(menu, e) {
   // let's not forget poor Explorer
   // which doesn't pass the event as a parameter
   if (!e)
      e = window.event;

   if (e.x && e.y) {
      newX = e.x + document.body.scrollLeft;
      newY = e.y + document.body.scrollTop;
   } else if (e.pageX && e.pageY) {
      newX = e.pageX;
      newY = e.pageY;
   }

   newX = newX + 5;
   newY = newY + 5;

   menu.style.top = newY + "px";
   menu.style.left = newX + "px";
   menu.style.position = "absolute";
}

function getXY(e) {
   if (e.y && e.x) {
      mouseY = e.y + document.body.scrollTop;
      mouseX = e.x + document.body.scrollLeft;
   } else if (e.pageY && e.pageX) {
      mouseY = e.pageY;
      mouseX = e.pageX;
   }

   var array = new Array(2);
   array[0] = mouseX;
   array[1] = mouseY;
   return array;
}

function getPageScroll() {
   var scrOfX = 0, scrOfY = 0;

   if (typeof( window.pageYOffset ) == 'number') {
      scrOfY = window.pageYOffset;
      scrOfX = window.pageXOffset;
   } else if (document.body && ( document.body.scrollLeft || document.body.scrollTop )) {
      scrOfY = document.body.scrollTop;
      scrOfX = document.body.scrollLeft;
   } else if (document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop )) {
      scrOfY = document.documentElement.scrollTop;
      scrOfX = document.documentElement.scrollLeft;
   }

   var array = new Array(2);
   array[0] = scrOfX;
   array[1] = scrOfY;
   return array;
}

function getElementScroll(element) {
   var scrOfX = 0, scrOfY = 0;

   if (element && ( element.scrollLeft || element.scrollTop )) {
      scrOfY = element.scrollTop;
      scrOfX = element.scrollLeft;
   }

   var array = new Array(2);
   array[0] = scrOfX;
   array[1] = scrOfY;
   return array;
}

function move(menu, event) {
   try {
      var totalWidth = xClientWidth();
      var totalHeight = xClientHeight();
      var menuWidth = xWidth(menu);
      var menuHeight = xHeight(menu);
      //Get the crossbrowser event
      eve = new xEvent(event);
      var mouseX = eve.pageX;
      var mouseY = eve.pageY;
      //Append the window scroll for mozilla.
      //For IE6 this does not need to be added because it is the div that scroll, not the document
      //For IE this method returns 0, so it is safe to always do it.
      var append = xScrollTop(null, true);
      //But for IE 5.5 somehow the div scroll is involved.
      if (browser.isIE5x) {
         //Add the length of the scrolled area, and remove the search field above
         //mouseY += (xScrollTop(xGetElementById('exploder'), false) - xHeight(xGetElementById('headerTree')));
         mouseY -= xHeight(xGetElementById('headerTree'));
         //append += (xScrollTop(xGetElementById('exploder'), false) - xHeight(xGetElementById('headerTree')));
         append -= xHeight(xGetElementById('headerTree'));
      }

      //Add the style
      (menuWidth + mouseX) > totalWidth  ? xLeft(menu, (mouseX - ((mouseX + menuWidth) - totalWidth) ) - 10) : xLeft(menu, mouseX);
      (menuHeight + mouseY) > (totalHeight + append) ? xTop(menu, (mouseY - ((mouseY + menuHeight) - (totalHeight + append)))): xTop(menu, mouseY);
   } catch (error) {
      alert(error.description);
   }
}


function moveOld(menu, event) {
   var x, y;
   if (!event) event = window.event;

   var xy = getXY(event);
   x = xy[0];
   y = xy[1];

   var scroll = new Array(2);
   scroll[0] = 0;
   scroll[1] = 0;

   if (browser.isIE5x) {
      scroll = getElementScroll(document.getElementById("exploder"));
      scroll[1] = scroll[1] - 25;
      x = x + scroll[0];
      y = y + scroll[1];
   } else {
      scroll = getPageScroll();
   }

   if ((x + menu.offsetWidth) > document.body.offsetWidth + scroll[0]) {
      x = x - ( (x + menu.offsetWidth) - document.body.offsetWidth) + scroll[0];
   }

   if ((y + menu.offsetHeight) > (window.document.body.offsetHeight + scroll[1])) {
      y = y - ( (y + menu.offsetHeight) - window.document.body.offsetHeight) + scroll[1];
   }
   menu.style.top = y + 'px';
   menu.style.left = x + 'px';


}

function setSources() {
   var iframesTmp = new Array();
   var iframesSrcTmp = new Array();
   for (var i = 0; i < iframes.length; i++) {
      iframesTmp[i] = iframes[i];
      iframesSrcTmp[i] = iframessrc[i];
   }
   //Reset
   iframes = new Array();
   iframessrc = new Array();

   for (var i = 0; i < iframesTmp.length; i++) {
      setSrc(iframesTmp[i], iframesSrcTmp[i]);
      setScrollableSize();
   }

   //If there is newly added entries
   if (iframes.length > 0) setSources();
   setScrollableSize();
}

function setSrc(id, src) {
   createIframe(id, src);
}

function createIframe(id, link) {
   if (xmlhttp) {
      openWithHttpRequest(id, link, false, true);

   } else {
      id = id + 'iframe';
      if (!browser.isIE) {
         iframe = document.createElement("iframe");
         iframe.src = link;
         iframe.height = '0px';
         iframe.width = '0px';
         iframe.id = id;
         iframe.name = id;
         //iframe.style.visibility = 'hidden';
         iframe.style.display = 'none';
         document.body.appendChild(iframe);
      } else {
         var dv = document.createElement('div');
         dv = document.body.appendChild(dv);
         dv.innerHTML = '<iframe id="TheIframe"></iframe>'
         var iframe = document.getElementById("Theiframe")
         iframe.src = link;
         iframe.height = '0px';
         iframe.width = '0px';
         iframe.id = id;
         iframe.name = id;
         iframe.style.visibility = 'hidden';
      }
   }
}


function openCloseStudyVarSearch(id, url) {
   var image = document.getElementById(id + 'img');
   var div = document.getElementById(id + 'divinsert');
   var studyli = document.getElementById(id + 'li');
   if (div) {
      if (div.style.display == 'none') {
         div.style.display = 'block';
         studyli.className = 'studyopen';
         image.src = pics[3].src;
      } else {
         image.src = pics[2].src;
         div.style.display = 'none';
         studyli.className = 'studyclosed';

      }
   }

   var iframe = document.getElementById(id + 'iframe');

   if (iframe && iframe.src.length == 0) iframe.src = url;
   else if (!iframe) {
      if (!browser.isIE) {
         iframe = document.createElement("iframe");
         iframe.src = url;
         iframe.height = '0px';
         iframe.width = '0px';
         iframe.id = id + 'iframe';
         iframe.name = id + 'iframe';
         //iframe.style.visibility = 'hidden';
         iframe.style.display = 'none';
         document.body.appendChild(iframe);
      } else {
         var dv = document.createElement('div');
         dv = document.body.appendChild(dv);
         dv.innerHTML = '<iframe id="Theiframe"></iframe>'
         var iframe = document.getElementById("Theiframe")
         //iframe = document.createElement("iframe");
         iframe.src = url;
         iframe.height = '0px';
         iframe.width = '0px';
         iframe.style.visibility = 'hidden';
         iframe.id = id + 'iframe';
         iframe.name = id + 'iframe';
      }
   }

   return false;
}

//Helper methods for determing if a variable is in the analysis, escaped or not

function myEscape(url) {
   var escaped = url;
   var kolon = '%3A';
   var slash = '%2F';
   escaped = replace(escaped, ':', '%3A');
   escaped = replace(escaped, '/', '%2F');
   return escaped;
}

function replace(string, text, by) {
   // Replaces text with by in string
   var strLength = string.length, txtLength = text.length;
   if ((strLength == 0) || (txtLength == 0)) return string;

   var i = string.indexOf(text);
   if ((!i) && (text != string.substring(0, txtLength))) return string;
   if (i == -1) return string;

   var newstr = string.substring(0, i) + by;

   if (i + txtLength < strLength)
      newstr += replace(string.substring(i + txtLength, strLength), text, by);

   return newstr;
}

function applySearch(searchterm) {
   parent.tree.closeAllTopNodes();
   
   var searchdiv = parent.tree.document.getElementById('searchdivinsert');   
   if (searchdiv) {
      var text = parent.tree.document.getElementById('searching');
      searchdiv.innerHTML = text.innerHTML;
      searchdiv.style.display = 'block';
   }   
}

function applyAdvancedSearch(link) {
   document.getElementById('searchit').src = link;
}


function closeResult(image) {
   var result = document.getElementById('resultset');
   if (result) {
      if (result.style.display == 'block') {
         result.style.display = 'none';
         image.src = pics[0].src;
      } else {
         result.style.display = 'block';
         image.src = pics[1].src;
      }
   }
}

var topnodes = new Array();

function registerTopNodes(node) {
   topnodes[topnodes.length] = node;
}

function closeAllTopNodes() {
   var toCopy = parent.tree.document.getElementById('topcopy');

   var elements = toCopy.childNodes;
   var ul;
   for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      if (element && (element.tagName == 'ul' || element.tagName == 'UL')) {
         ul = element;
         break;
      }
   }

   var list = ul.childNodes;
   for (var i = 0; i < list.length; i++) {
      var li = list[i];
      if (li && (li.tagName == 'li' || li.tagName == 'LI')) {
         var links = li.childNodes;
         for (var j = 0; j < links.length; j++) {
            var link = links[j];
            if (link && (link.tagName == 'a' || link.tagName == 'A')) {
               if(link.className == 'icon'){
                  var div = getDivToOpen(link);
                  if (xGetComputedStyle(div, 'display') == 'block') {
                     div.style.display = 'none';
                     var image = getImage(link);
                     openImage(image);
                     break;
                  }
               }
            }
         }
      }
   }
}


function displayBookmarkComment(object) {

   var othersideurl = getRightFrameHref(); 
   var element = othersideurl.split('?');
   var chopped = chopUrl(element[1], remove);

   var sign = "&";
   if (chopped.length == 0) sign = "";

   var url = element[0] + '?' + chopped + sign + "mode=documentation&submode=bookmark&bookmark=" + escapeURL(object);
   setRightFrameHref(url);

   //Close the menu
   closeBookmarkMenu();
   return false;
}

function setLoginContent(content) {
   if (elementWaitingForLogin) {
      var frameset = parent.parent.document.getElementById('set');
      frameset.cols = loginframesize;
      elementWaitingForLogin.innerHTML = content;
   }
}


//
// Returns XMLHttpRequest object.
//
function getXMLHttpRequest() {
   var httpRequest = null;
   // Create the appropriate HttpRequest object for the browser.
   if (window.XMLHttpRequest != null) {
      httpRequest = new window.XMLHttpRequest();
      canDecompress = true;
   } else if (window.ActiveXObject != null) {
      // Must be IE, find the right ActiveXObject.
      var success = false;
      for (var i = 0; i < XMLHTTPREQUEST_MS_PROGIDS.length && !success; i++) {
         try
         {
            httpRequest = new ActiveXObject(XMLHTTPREQUEST_MS_PROGIDS[i]);
            success = true;
         }
         catch (ex)
         {
         }
      }
   }

   // Return it.
   return httpRequest;
}

//
//Opens EGMS-resources in separate popup-window
//The openEgmsParam-variable is set in jsproperties.vm
//
function openEGMS(url) {
    awin = window.open(url,'EGMS', openEgmsParam);
    if (awin) awin.focus();
    return false;
}

/**
 * The following methods are wrapper methods that make
 * sure that any submenu under the clicked element in the
 * browse list stays open if it is open already.
 * This is used on the text part of entries in the browse list.
 * @param obj
 * @param id
 * @param drilldownLink
 * @param closeDown
 * @return
 */
function openRootCatalogWithCatalogComment(obj, id, drilldownLink, closeDown) {
	if (!isChildOpen(obj)) {
		openView(obj, drilldownLink, false);
	} else {
		displayCatalog(obj, id, drilldownLink, closeDown);
	}
	return false;
}


function openRootCatalogWithoutCatalogComment(obj, drilldownLink, closeDown) {
	if (!isChildOpen(obj)) {
		openView(obj, drilldownLink, closeDown);
	}
	return false;
}

function openBookmarkTextlink(obj, link) {
	if (!isChildOpen(obj)) {
		openDrilldownBookmark(image, link);
	}
	return false;
}

function openStudyTextlink(obj, drilldownLink) {
	updateActiveBrowseListElement(obj);
	if (!isChildOpen(obj)) {
		openStudy(obj, drilldownLink);
	}
	return true;
}

function openUserDefinedTextlink(obj) {
	if (!isChildOpen(obj)) {
		openUserDefined(obj);
	}
	return false;
}
/* end browselist wrappers */

/**
 * Marks the active element in the browselist by adding the class 'nodetextSelected'
 * to it and removing it from the previous element(s).
 */
function updateActiveBrowseListElement(e) {
	//Find existing elements that has the class name and remove it
	var previousSelectedNodes = xGetElementsByClassName("nodetextSelected");
	for (i = 0; i < previousSelectedNodes.length; i++) {
		previousSelectedNodes[i].className = previousSelectedNodes[i].className.replace(/nodetextSelected/gi, "");
	}
	
	//In case the icon was clicked instead of the text, get a hold on the text link.
	var firstChild = xFirstChild(e);
	if (firstChild != null) {
		e = xNextSib(e);
	}
	
	//Add the class name
	if ("" == e.className)
		e.className = "nodetextSelected";
	else
		e.className = e.className + " nodetextSelected";
}

/**
 * 
 * Wrapper function that checks whether the child of a given node in the
 * tree is open (ie is the submenu of the given element visible?).
 * 
 * @param node The element to check
 * @return False if the submenu is not visible, true otherwise.
 */
function isChildOpen(node) {
	var div = getDivToOpen(node);
	if (div && xGetComputedStyle(div, 'display') == 'none')
		return false;
	return true;
}

/**
 * Convenience function to get the mode of the content frame. Checks that mode is set.
 * @return The mode as a string or an empty string if mode isn't set.
 */
function getRightsideMode() {
	if (parent.parent.rightsidemainframe.rightside.mode)
		return parent.parent.rightsidemainframe.rightside.mode;
	return "";
}
