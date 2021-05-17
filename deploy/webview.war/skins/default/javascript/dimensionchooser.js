var opencombo = "";
var justopened=false;
var menutimeout;
var menuhash={};
var baseurls={};
var openmenus=new Array();
var closemenu=-1;
var debugEnabled=false;
var ajaxLoader = null;
var linkUpdater = null;
var activeRoot=null;
function toggleCombo(comboid) {
   combo=xGetElementById(comboid);
   if (combo.style.visibility=='visible') {
      combo.style.visibility='hidden';
   } else {
      if (opencombo != "" && opencombo != comboid) closeCombo();
      combo.style.visibility='visible';
      opencombo=comboid;
      justopened=true;
   }
   return false;
}

function setJustOpened(isOpen){
   justopened=isOpen;   
}

function closeCombo(e) {
   _closeAllMenus();
   if (opencombo != "" && justopened != true) {
      cmb=xGetElementById(opencombo);
      if (cmb) {
         cmb.style.visibility='hidden';
      }
      opencombo="";
   } else {
      justopened=false;
   }
}

function disableHoverPopup(id) {
 if (id != null) {
    combo=xGetElementById(id);
    combo.style.visibility='hidden';
 }
}

function popup(element, w, h) {
 if (w == null)
   w = 330;
 if (h == null)
   h = 490;

 var options = 'toolbar=no,location=no,directories=no,status=yes,menubar=no,resizable=yes,copyhistory=no,scrollbars=no,width=' + w + ',height=' + h ;
 url=element.href;
 awin = window.open(url,'popupwin',options);
 if (awin) awin.focus();
 return false;
}

function inlinePopup (element, title) {
   setJustOpened(false);
   closeCombo(null);
   try {
      popupContents = xGetElementById('inlinePopupContents');
      targetHeight = 470;
      if (self.YAHOOpanel) {
         var winHeight = getHeightOfMainFrame();
         //if the height of the window is lower than the desired target height,
         //use window-height minus a factor for borders and icon-bar
         var height = (winHeight < targetHeight) ? winHeight - 20 : targetHeight;

         //Height of the contents i.e. below the header
         var inlineContentHeight = height - 20;
         height = height + "px";
         popupContainer = xGetElementById('inlinePopupContainer');
         popupContainer.style.display = "block";
         popupContents.src = element.href;
         popupContents.style.height = inlineContentHeight + "px";

         YAHOOpanel.setHeader(title);
         YAHOOpanel.cfg.setProperty("height", height);
         YAHOOpanel.cfg.setProperty("draggable", "true");
         YAHOOpanel.cfg.setProperty("close", "true");
         YAHOOpanel.cfg.setProperty("modal", "true");
         YAHOOpanel.cfg.setProperty("fixedcenter", "true");
         YAHOOpanel.cfg.setProperty("constraintoviewport", "true");

         YAHOOpanel.show();
         
         return false;
      } else {
         return popup(element);
      }
   } catch(ex) {
      var mymsg = "";
      for (var i in ex) mymsg += i + ": " + ex[i] + "\n";
      alert(mymsg);
   }
   return true;

}

function inlineClose (element, title) {
 if (self.YAHOOpanel) {
   YAHOOpanel.close();
 }
}

function getHeightOfMainFrame() {
   if (browser.isIE && !browser.isIE7up) {
      var exploder = xGetElementById('exploder');
      if (exploder) {
         newSize = xClientHeight() - (xPageY(exploder));
         var metadataview = xGetElementById('metadataview');
         if (metadataview) {
            newSize -= xHeight(metadataview);
         }
         return newSize;
      }
   } else {
      return xClientHeight();
   }
}

function insertMenu(menuName) {
   var realName="menuX"+(menuName.substring(2));
   var ln=_getLengthOfOpenMenuArray();
   var parent=xGetElementById(realName).parentNode;
   var parentName=parent.parentNode.id;

   _clearMenuTimeout();
   if (_getMenuPlaceByName(realName) != -1) return;

   for (var i = 0 ; i <= ln; i++) {
      if (openmenus[i]==parentName) {
         _closeMenusFromPoint(i+1);
         ln=_getLengthOfOpenMenuArray();
         break;
      }
   }

   menu=xGetElementById(realName);
   menu.innerHTML=menuhash[menuName];

   menu.style.display="block";
   menu.style.visibility="visible";

   if (browser.isIE) _setParentZIndex(menu, "1000");

   //Figure out if menu should be on right or left
   windowWidth=xClientWidth();
   menuWidth=xWidth(menu);
   parentEdge = xPageX(menu);
   if ((parentEdge + menuWidth) > windowWidth) {
	   var spaceLeft = xPageX(parent);
	   var spaceRight = windowWidth - parentEdge;
	   if (spaceLeft > spaceRight) {
		   if (menuWidth > spaceLeft) {
			   menuWidth = adjustMenuWidth(menu, spaceLeft);
		   }
		   menu.style.left="-"+menuWidth+"px";
	   } else {
		   if (menuWidth > spaceRight) {
			   menuWidth = adjustMenuWidth(menu, spaceRight);
		   }
	   }
   }

   openmenus[ln]=realName;
   _printArray();
}

function removeMenu(menuName) {
   realName="menuX"+(menuName.substring(2));
   closemenu=_getMenuPlaceByName(realName);
   menutimeout = setTimeout(_removeTrigger, 500);
}

function buildHref(node, variable) {
   var arg=node.href.substr(node.href.lastIndexOf("&"));
   arg=arg.replace(/\?/g,"&");
   node.href = baseurls["aX"+variable] + arg;
   if (ajaxLoader) {
      try {
         ajaxLoader.load(node);
         return false;
      } catch(ex) {
         alert(ex.message);
      }
   }
   return true;
}

function _getLengthOfOpenMenuArray() {
   ln=openmenus.length;
   var i = 0;
   for (i; i < ln; i++) {
      if (openmenus[i] == "") return i;
   }
   return i;
}

function _clearMenuTimeout() {
   clearTimeout(menutimeout);
   closemenu=-1;
}


function _closeAllMenus() {
   _closeMenusFromPoint(0);
   openmenus=new Array();
}

function _removeTrigger() {
  if (closemenu > -1) {
    _closeMenusFromPoint(closemenu);
    closemenu=-1;
  }
}

function _closeMenusFromPoint(point) {
  var ln=_getLengthOfOpenMenuArray();
  for (ln; ln >= point; ln-- ) {
    _realRemoveMenu(ln);
  }
}

function _getMenuPlaceByName(menuName) {
   ln=_getLengthOfOpenMenuArray();
   for (var i = ln; i >= 0; i-- ) {
      if (openmenus[i]==menuName) {
        return i;
      }
   }
   return -1;
}

function _realRemoveMenu(num) {
   menuName=openmenus[num];
   menu=xGetElementById(menuName);
   if (menu) {
      menu.style.display="none";
      menu.style.visibility = "hidden";
      menu.style.left = "";
      menu.style.width = "auto";
      menu.innerHTML="";
      if (browser.isIE) _setParentZIndex(menu, "10");
   }

   openmenus[num]="";
   _printArray();
}

function _setParentZIndex(element, index) {
   if (element.parentNode) {
      parentmenu=element.parentNode;
      if (parentmenu != null) parentmenu.style.zIndex=index;
   }
}

function _printArray() {
   if (debugEnabled) {
      msg="";
      ln=openmenus.length;
      var i = 0;
      for (i; i < ln; i++) {
         msg=msg+"->\""+openmenus[i]+"\"";
      }
      msg=msg+"->\""+openmenus[i]+"\" ("+_getLengthOfOpenMenuArray()+")";
      _debug(msg);
   }
}

function _debug(msg) {
  if (debugEnabled) {
    if (!browser.isIE) {
     dump("MenuDebug: "+msg+"\n");
    }
  }
}

/**
 * Checks whether current element is set as active menuroot
 * and if not, closes all menus and sets itself root,
 * and then opens the given menu
 */
function insertTopMenu(root,childMenu){
   if(activeRoot){
      if(activeRoot!=root.className) {
         _closeAllMenus();
      }
   }
   activeRoot=root.className;
   insertMenu(childMenu);
}

function adjustMenuWidth(menu, width) {
	width -= 10;
	
	for (var i = 0; i < menu.childNodes.length; i++) {
		var child = menu.childNodes[i].firstChild; // anchor element
		//We could check the anchor's width here and compare it to the width of the
		//menu but since the anchor has display: block (to make the entire menu entry
		//clickable) it's really no use to do that check here.
		var txt = child.childNodes[0].nodeValue;
		child.title = txt;
	}
	
	menu.style.width = "" + width + "px";
	menu.style.overflow = "hidden";
	return width;
}
