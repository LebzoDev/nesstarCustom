var xmlhttp = false;
var skinPath;

/*@cc_on @*/
/*@if (@_jscript_version >= 5)
// JScript gives us Conditional compilation, we can cope with old IE versions.
// and security blocked creation of the objects.
 try {
  xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
 } catch (e) {
  try {
   xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  } catch (E) {
   xmlhttp = false;
  }
 }
@end @*/
if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
  xmlhttp = new XMLHttpRequest();
}

function openNextLevel(node, href) {

  var elements = node.parentNode.childNodes;
  var count = 0;
  for (i = 0; i < elements.length; i++) {
    if (elements[i].tagName) count++;
  }
  if (count == 2) {

    xmlhttp.open("GET", href, true);
    if (!browser.isIE5x) {
      xmlhttp.setRequestHeader("Accept-Encoding", "gzip");
    }

    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4) {
        node.parentNode.innerHTML = node.parentNode.innerHTML + xmlhttp.responseText;
        calculateDropDownSize(xGetElementById('categoryDropDown'));
      }
      node.src = skinPath + 'images/minus.gif';
    }
    xmlhttp.send(null);
  } else {
    elements = node.parentNode.childNodes;
    for (i = 0; i < elements.length; i++) {
      if (elements[i].tagName && (elements[i].tagName == 'ul' || elements[i].tagName == 'UL')) {
        if (elements[i].style.display == 'none') {
          elements[i].style.display = 'block';
           node.src = skinPath + 'images/minus.gif';
        } else {
          elements[i].style.display = 'none';
           node.src = skinPath + 'images/plus.gif';
        }
        //Recalculate the size
        calculateDropDownSize(xGetElementById('categoryDropDown'));
      }
    }
  }
  return false;
}

function calculateDropDownSize(node) {
  if (node) {
    var top = xPageY(node);
    var child = getFirstChild(node);
    var height = xHeight(child);
    var totalHeight = xClientHeight();
    if (( (top + height) > totalHeight)) {
      xHeight(node, (totalHeight - top))
    } else {
      if (height < 50) height = 50;
      xHeight(node, (height + 18));
    }
  }
}

function getFirstChild(node) {
  if (node) {
    var child = node.firstChild;
    if (!child.tagName) {
      child = child.nextSibling;
    }
    return child;
  }
  return null;
}

function openDrowDownMenu(nodeid) {
  var menu = xGetElementById(nodeid);
  if (menu) {
    if (menu.style.display == 'block') {
      menu.style.display = 'none';
    } else {
      placeDropDownMenu(menu);
      menu.style.display = 'block';
      calculateDropDownSize(menu);
    }
  }

  //The anonymous function that shuts down the menu
  func = function(event) {
    //If windows, get the event from the window
    if (!event) event = window.event;
    var target;
    if (event.target) target = event.target;
    else if (event.srcElement) target = event.srcElement;

    if (isChildOfMenu(menu, target)) return;
    menu.style.display = 'none';
    xRemoveEventListener(document, 'mousedown', func, false);
  }

  //Add a mousedown
  xAddEventListener(document, 'mousedown', func, false);
}


function placeDropDownMenu(menu) {
  if (menu) {
    //The element where you click to get the menu
    var topelement = xGetElementById('areamenu');
    if (topelement) {
      xTop(menu, xPageY(topelement) + xHeight(topelement));
      xLeft(menu, xPageX(topelement));
    }
  }
}

/**
* Is the target a child of the menu
*/

function isChildOfMenu(menu, target) {

  while (target) {
    if (!target) break;
    if (target && target.nodeType == 9) break;
    if (target.id == menu.id) {
      return true;
    }
    target = target.parentNode;
  }
  return false;
}

