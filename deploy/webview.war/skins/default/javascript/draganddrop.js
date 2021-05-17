var mouseX, mouseY, dragTag;
var tooLargeHash = {};

var objMoved;
var cellMoved;
//var selectElements;


var dropable = new Array();
// Is it tabulation and not cube?
var tabulation = false;

function getParent(node) {
   while (!document.all && node.nodeType != node.ELEMENT_NODE) {
      node = node.parentNode;
   }

   return node;
}

isChild = false;

function isChildOfNode(node, id) {
   isChild = false;

   while (node) {
      node = node.parentNode;
      if (!node) break;
      if (node && node.nodeType == 9) break;
      if (node.id == id) {
         isChild = true;
         return isChild;
      }
   }
}

// Disable text selection
function disableSelect(node) {
   // Internet explorer
   if (document.all) {
      node.onselectstart = function () {
         return false;
      };
      // w3c DOM
   } else {
      node.onmousedown = function () {
         return false;
      };
   }
}

// Reenable text selection
function enableSelect(node) {
   // Internet explorer
   if (document.all) {
      node.onselectstart = function () {
         return true;
      };
      // w3c DOM
   } else {
      node.onmousedown = function () {
         return true;
      };
   }
}


function makeDraggable(cell, tooLarge, useBackground) {
   if (!tooLarge) tooLarge = false;
   if (!useBackground) useBackground = false;
   //cell= what
   element = document.getElementById(cell);
   if (element.className.indexOf("empty") == -1) {
      element.onmousedown = startDrag;
      element.onmouseover = hover;
      element.onmouseout = stophover;
      document.getElementById("dropzone").onmousemove = drag;
      document.onmouseup = endDrag;
   }
   dropable[dropable.length] = element;
   document.onclick = doTableHighlight;
}

function hover(e) {
   if (!e)
      e = window.event;
   if (e.target)
      target = e.target;
   else if (e.srcElement)
      target = e.srcElement;

   target = getParent(target);

   if (objMoved && target) {
      if (objMoved.id != (target.id + "div")) {
         if (target.className == 'headlabel') {
            target.className = "mouseover";
         } else if (target.className == 'layerlabel') {
            target.className = "mouseoverlayer";
         }
         else target.className = "mouseoverstub";
      }
   } else {
      if (target.className == 'headlabel') {
         target.className = "mouseover";
      } else if (target.className == 'layerlabel') {
         target.className = "mouseoverlayer";
      } else target.className = "mouseoverstub";
   }
}

function stophover(e) {
   if (!e)
      e = window.event;
   if (e.target)
      target = e.target;
   else if (e.srcElement)
      target = e.srcElement;

   target = getParent(target);


   //if (objMoved != null && target != null) {
   if (objMoved && target) {
      if (objMoved.id != (target.id + "div")) {
         if (target.className == "mouseoverstub" || target.className == "stublabel" || target.className == "label stublabel") {
            target.className = "stublabel";
         } else if (target.className == "mouseoverlayer" || target.className == "layerlabel" || target.className == "label layerlabel") {
            target.className = "layerlabel";
         } else {
            target.className = "headlabel";
         }
      }
   } else {
      if (target.className == "mouseoverstub" || target.className == "stublabel" || target.className == "label stublabel") {
         target.className = "stublabel";
      } else if (target.className == "mouseoverlayer" || target.className == "layerlabel" || target.className == "label layerlabel") {
         target.className = "layerlabel";
      } else {
         target.className = "headlabel";
      }
   }
}


function startDrag(e) {
   if (!e) e = window.event;
   if (e.target) target = e.target;
   else if (e.srcElement) target = e.srcElement;

   //Get rid of old highlight-stuff
   resetHighlight();

   while (!target.id) {
      target = getParent(target);
   }

   cellMoved = document.getElementById(target.id);
   //Compensate for the menu on the top and the scroll of the div for IE
   var compensated = toCompensateY();
   xev = new xEvent(e);
   mouseX = xev.pageX + toCompensateX() + 5;
   mouseY = xev.pageY + compensated + 5;

   //TODO: Fix this ugly hack. Should be taken care of in toCompensateY();
   if (browser.isIE7up) mouseY -=25;
    
   if (!cellMoved.id) return;

   var divwidth = 0;
   var sizeElement = null;
   if (cellMoved.tagName == "SPAN") {
	   sizeElement = xGetElementById("anchor-" + cellMoved.id);
   } else {
      sizeElement = cellMoved;
   }
   if (document.defaultView) {
      var divwidth = document.defaultView.getComputedStyle(sizeElement, "").getPropertyValue("width");
   } else {
	   divwidth = sizeElement.offsetWidth;
   }

   if (divwidth == "auto") divwidth = "15em";
   dragTag = true;
   objMoved = document.getElementById(cellMoved.id + "div");
   objMoved.style.top = mouseY + "px";
   objMoved.style.left = mouseX + "px";
   objMoved.style.width = divwidth;
   objMoved.style.display = "block";

   //Add the red frame around the droppable elements
   for (var i = 0; i < dropable.length; i++) {
      isChildOfNode(dropable[i], 'drop');
      if (dropable[i].id != cellMoved.id && !isChild) dropable[i].style.border = "dashed orange 1px";
   }

   var ele = document.getElementById("droptostub");
   if (ele) ele.style.border = "dashed orange 1px";
   ele = document.getElementById("droptoheader");
   if (ele) ele.style.border = "dashed orange 1px";

   document.getElementById("drop").style.border = "dashed orange 1px";

   cellMoved.style.border = "1px solid " + getBgColor(cellMoved);
   
   if (cellMoved.className == "mouseoverstub" || cellMoved.className == 'stublabel') {
      cellMoved.className = 'movingcellstub';
   } else if (cellMoved.className == "mouseoverlayer" || cellMoved.className == 'layerlabel') {
      cellMoved.className = 'movingcelllayer';
      comboid = "li-" + cellMoved.id.substr(3);
      document.getElementById(comboid).style.visibility = "hidden";
   } else {
      cellMoved.className = 'movingcell';
   }
   
   disableSelect(document);
   return false;
}

function drag(e) {
   if (!e) e = window.event;

   if ((dragTag)) {
      //Compensate for the menu on the top and the scroll of the div for IE
      var compensated = toCompensateY();
      xev = new xEvent(e);
      newX = xev.pageX + toCompensateX() + 5;
      newY = xev.pageY + compensated + 5;
      //TODO: Fix this ugly hack. Should be taken care of in toCompensateY();
      if (browser.isIE7up) newY -=25;
      document.getElementById("tabell").style.cursor = "move";
      xLeft(objMoved, newX);
      xTop(objMoved, newY);
      maybeKillSelects();
   }
}

function endDragOtherFrame(e) {
   setEndStyle();
   dragTag = false;
   enableSelect(document);
   stopTheDrag();
   return false;
}

function setEndStyle() {
   document.getElementById("drop").style.border = "solid white 1px";

   for (i = 0; i < dropable.length; i++) {
	   var borderColor = "white";
	   //Draggable cells in the table should use the same color as the background
	   if (dropable[i].className &&
			   (dropable[i].className.indexOf("headlabel") != -1 
				|| dropable[i].className.indexOf("stublabel") != -1
				|| dropable[i].className.indexOf("empty") != -1
				|| dropable[i].className.indexOf("emptystub") != -1
				|| dropable[i].className.indexOf("movingcell") != -1)) {
		   borderColor = getBgColor(dropable[i]);
	   }
	   dropable[i].style.border = "1px solid " + borderColor;
   }

   if (dragTag) {
      if (cellMoved.className == "movingcellstub") {
         cellMoved.className = 'stublabel';
      } else if (cellMoved.className == "movingcelllayer") {
         cellMoved.className = 'layerlabel';
      } else cellMoved.className = 'headlabel';
   }
}


function stopTheDrag() {
   if (objMoved && objMoved.style) objMoved.style.display = "none";
   objMoved = null;
   if (selectElements) {
      for (var cnt = 0; cnt < selectElements.length; cnt++) {
         var thisSelect = selectElements[cnt];
         thisSelect.style.visibility = 'visible';
      }
   }
}

function endDrag(e) {
   if (!e)
      e = window.event;
   if (e.target)
      target = e.target;
   else if (e.srcElement)
      target = e.srcElement;

   document.getElementById("drop").style.border = "solid white 1px";

   for (i = 0; i < dropable.length; i++) {
	  //The draggable cells in the table should have the same border color as the background
	  if (dropable[i].className &&
			   (dropable[i].className.indexOf("headlabel") != -1 
				|| dropable[i].className.indexOf("stublabel") != -1
				|| dropable[i].className.indexOf("empty") != -1
				|| dropable[i].className.indexOf("emptystub") != -1
				|| dropable[i].className.indexOf("movingcell") != -1)) {
		  dropable[i].style.border = "1px solid " + getBgColor(dropable[i]);
	  }
   }

   if (dragTag) {
      target = getParent(target);
      if (cellMoved.className == "movingcellstub") {
         cellMoved.className = 'stublabel';
      } else if (cellMoved.className == "movingcelllayer") {
         cellMoved.className = 'layerlabel';
         comboid = "li-" + cellMoved.id.substr(3);
         document.getElementById(comboid).style.visibility = "visible";
      } else cellMoved.className = 'headlabel';
      if (isTargetDroppable(target)) updateForm(cellMoved, target);
      dragTag = false;
      
      //Make sure the dragged object gets the same border color as the background
      var borderColor = "white";
      borderColor = getBgColor(cellMoved);
      cellMoved.style.border = "1px solid " + borderColor;
      enableSelect(document);
   }

   if (objMoved) {
      objMoved.style.display = "none";
   }
   objMoved = null;
}

function isTargetDroppable(target) {
   if (!tabulation && !isChildOfNode(target, 'drop') && !isChildOfNode(target, 'tabell')) return false;
   return true;
}

var urlPrefix;

function updateForm(from, to) {
   //If they are the same return
   if (from.id == to.id) return;
   //Get the form
   if (!urlPrefix) urlPrefix = '';
   var form = document.getElementById('hiddenform');

   var fromid = from.id;
   if (from.id.substring(0, 3) == 'var') fromid = from.id.substring(3);
   var toid = to.id;
   if (to.id.substring(0, 3) == 'var') toid = to.id.substring(3);

   //If the operation can't be done, stop so that the form is not updated
   var tooLarge = tooLargeHash[fromid];
   if (!tooLarge) tooLarge = false;
   if (tooLarge) {
      return hideTheViewArea(tooLarge);
   }

   if (to && toid == 'tabell') return;
   if (tabulation) {
      if (!isChildOfNode(to, 'tabell') && !isChildOfNode(to, 'drop')) {
         if (form) {
            var element = form.elements;
            var fromtheid = urlPrefix + fromid;
            for (var i = 0; i < element.length; i++) {
               if (element[i].value == fromtheid) {
                  if (element[i].name == 'stubs' || element[i].name == 'headers' || element[i].name == 'layers' || element[i].name == 'measure') {
                     element[i].name = "remove";
                     element[i].value = "remove";
                  }
               } else if (element[i].name == 'charttype') {
                  element[i].name = "remove";
                  element[i].value = "remove";
               }
            }
         }

         hideTheViewArea();
         form.submit();
         return;
      }
   }

   if (toid == 'exploder') return;

   maybelayers = moveToLayers(to);
   if (maybelayers.id == 'drop')   toid = 'drop';
   if (toid == 'mainmenu') toid = 'drop';

   var dropto = "";
   if (toid == 'droptostub' || toid == 'droptoheader' || toid == 'drop' || toid == '') dropto = toid;
   else dropto = urlPrefix + toid;


   var dropfrom = urlPrefix + fromid;

   var stubs = new Array();
   var headers = new Array();
   var layers = new Array();
   var rest = new Array();

   var todim = "";
   var fromdim = "";

   if (form) {
      var oldfrom = fromid;
      var oldto = toid;
      fromid = urlPrefix + fromid;
      if (toid != 'droptostub' && toid != 'droptoheader' && toid != 'drop' && toid != '') toid = urlPrefix + toid;
      var element = form.elements;
      for (var i = 0; i < element.length; i++) {
         //Sort the into different arrays of type.
         if (element[i].name == 'stubs') stubs[stubs.length] = element[i].value;
         else if (element[i].name == 'headers') headers[headers.length] = element[i].value;
         else if (element[i].name == 'layers') layers[layers.length] = element[i].value;
         else rest[rest.length] = element[i];

         //Find the element to drop to
         if (element[i].value == dropto) {
            if (element[i].name == 'stubs' || element[i].name == 'headers' || element[i].name == 'layers') {
               todim = element[i].name;
            }
         }
         //Find the element to drop from
         if (element[i].value == dropfrom) {
            if (element[i].name == 'stubs' || element[i].name == 'headers' || element[i].name == 'layers') {
               fromdim = element[i].name;
            }
         }
      }

      //If it is drop to stub
      if (dropto == 'droptostub') {
         todim = 'stubs';
      } else if (dropto == 'droptoheader') {
         todim = 'headers';
      } else if (dropto == 'drop') {
         todim = 'layers';
      }

      //Set which arrays to use
      var toarray;
      var fromarray;
      if (todim == 'stubs') {
         toarray = stubs;
      } else if (todim == 'headers') {
         toarray = headers;
      } else if (todim == 'layers') {
         toarray = layers;
      }

      if (fromdim.length == 0) fromdim = todim;
      if (todim.length == 0) todim = fromdim;

      //They are not on the same row.
      if (todim != fromdim) {
         if (toarray.length)   toarray[toarray.length] = dropfrom;
         else toarray[0] = dropfrom;

         if (fromdim == 'stubs') {
            stubs = removeFromTable(stubs, dropfrom);
         } else if (fromdim == 'headers') {
            headers = removeFromTable(headers, dropfrom);
         } else if (fromdim == 'layers') {
            layers = removeFromTable(layers, dropfrom);
         }
      }
      //They are the same
      else {
         if (fromdim == 'stubs') {
            stubs = sortTable(stubs, dropfrom, dropto);
         } else if (fromdim == 'headers') {
            headers = sortTable(headers, dropfrom, dropto);
         } else if (fromdim == 'layers') {
            // Moving from layers to layers will not do anything, just return
            return;
         }
      }

      //Build the form again
      //Join the arrays
      var newarray = new Array();
      var newarray2 = new Array();

      for (var i = 0; i < stubs.length; i++) {
         newarray[newarray.length] = 'stubs';
         newarray2[newarray2.length] = stubs[i];
      }
      for (var h = 0; h < headers.length; h++) {
         newarray[newarray.length] = 'headers';
         newarray2[newarray2.length] = headers[h];
      }
      for (var l = 0; l < layers.length; l++) {
         newarray[newarray.length] = 'layers';
         newarray2[newarray2.length] = layers[l];
      }
      for (var r = 0; r < rest.length; r++) {
         newarray[newarray.length] = rest[r].name;
         newarray2[newarray2.length] = rest[r].value;
      }

      var elementer = form.elements;

      for (var b = 0; b < elementer.length; b++) {
         elementer[b].name = newarray[b];
         elementer[b].value = newarray2[b];
      }
      fromid = oldfrom;
      toid = oldto;
      hideTheViewArea();
      form.submit();
      return false;
   }
}

function sortTable(table, from, to) {
   var fromindex = -1;
   var toindex = -1;

   for (var i = 0; i < table.length; i++) {
      if (table[i] == from) fromindex = i;
      if (table[i] == to) toindex = i;
   }

   if (fromindex < toindex) {
      for (var i = fromindex; i < toindex; i++) {
         var tmp = table[i];
         table[i] = table[i + 1];
         table[i + 1] = tmp;
      }
   }
   else if (fromindex > toindex) {
      for (var i = fromindex; i > toindex; i--) {
         var tmp = table[i];
         table[i] = table[i - 1];
         table[i - 1] = tmp;
      }
   }
   return table;
}

function moveToLayers(to) {
   var node = to;
   while (node) {
      if (!node) return to;
      node = node.parentNode;
      if (node && node.id == 'drop') return node;
   }
   return to;
}

function removeFromTable(table, id) {
   var indeks = -1;
   var removed = new Array();

   for (var i = 0; i < table.length; i++) {
      if (table[i] == id) indeks = i;
   }

   for (var i = 0; i < table.length; i++) {
      if (i != indeks) {
         removed[removed.length] = table[i];
      }
   }

   return removed;
}


//----------------------------------------------------------------------------------------------------------
//domTT stuff from this point down, only needed for maybeKillSelects. Ugly stuff. Remove as soon as possible 


var domTT_userAgent = navigator.userAgent.toLowerCase();
var domTT_isOpera = domTT_userAgent.indexOf('opera 7') != -1 ? 1 : 0;
var domTT_isKonq = domTT_userAgent.indexOf('konq') != -1 ? 1 : 0;
var domTT_isIE = !domTT_isKonq && !domTT_isOpera && domTT_userAgent.indexOf('msie 5.0') == -1 && document.all ? 1 : 0;
var domTT_isGecko = domTT_userAgent.indexOf('gecko') != -1 ? 1 : 0;

/* Hide selects when dragging over them 
*/
function maybeKillSelects() {
   // no need to do anything for opera
   if (domTT_isOpera) {
      return;
   }

   if (typeof(selectElements) == 'undefined') {
      selectElements = document.getElementsByTagName('select');
   }

   var tipOffsets = domTT_getOffsets(objMoved);

   for (var cnt = 0; cnt < selectElements.length; cnt++) {
      var thisSelect = selectElements[cnt];
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

function domTT_getOffsets(in_object) {
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

   return new domTT_Hash (
      'left', offsetLeft,
      'top', offsetTop,
      'right', offsetLeft + originalWidth,
      'bottom', offsetTop + originalHeight,
      'leftCenter', offsetLeft + originalWidth / 2,
      'topCenter', offsetTop + originalHeight / 2,
      'radius', Math.max(originalWidth, originalHeight)
      );
}

function domTT_Hash() {
   this.length = 0;
   this.items = new Array();
   for (var i = 0; i < arguments.length; i += 2) {
      if (typeof(arguments[i + 1]) != 'undefined') {
         this.items[arguments[i]] = arguments[i + 1];
         this.length++;
      }
   }

   this.getItem = function(in_key) {
      return this.items[in_key];
   }

   this.removeItem = function(in_key) {
      var tmp_value;
      if (typeof(this.items[in_key]) != 'undefined') {
         this.length--;
         tmp_value = this.items[in_key];
         delete this.items[in_key];
      }

      return tmp_value;
   }

   this.setItem = function(in_key, in_value) {
      if (typeof(in_value) != 'undefined') {
         if (typeof(this.items[in_key]) == 'undefined') {
            this.length++;
         }

         return this.items[in_key] = in_value;
      }
      return false;
   }

   this.hasItem = function(in_key) {
      return typeof(this.items[in_key]) != 'undefined';
   }
}

/**
 * Get the background color assigned to a given element (most likely a table cell.
 * @param element The element to get background color for.
 * @return The background color found or "transparent" if nothing was found.
 */
function getBgColor(element) {
	var propName = (browser.isIE) ? "backgroundColor" : "background-color";
	if (element.currentStyle)
		return element.currentStyle[propName];
	else if (xGetComputedStyle)
		return xGetComputedStyle(element, propName);
	else
		return "transparent";
}