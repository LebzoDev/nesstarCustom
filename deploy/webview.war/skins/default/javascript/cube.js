//For enabling possible resize-operations
var enableResize = true;

var spinnerImage = new Image();
spinnerImage.src = skinPath + "images/spinner.gif";

var urlPrefix;

function submitForm(formname) {
   var form = document.getElementById(formname);
   if (form) {
      hideTheViewArea();
      form.submit();
   }
}

function changeForm(select, link, code, hasMap) {
   selected = select.name;
   id = select.options[select.selectedIndex].id;
   value = select.options[select.selectedIndex].value;
   if (!urlPrefix) urlPrefix = "";

   //If sepearators is selected
   if (id == 'nothing') {
      select.selectedIndex = selected;
      return false;
   }

   if (id != 'choosecat' && id != 'insertgroup') hideTheViewArea();

   var form = document.getElementById('hiddenform');
   if (id == 'stubs' || id == 'headers' || id == 'layers') {
      var variables = form.elements;
      for (var i = 0; i < variables.length; i++) {
         if (variables[i].value == value) {
            appendToForm(form, variables[i], id);
            break;
         }
      }

      form.submit();
   } else if (id == 'remove') {
      var objId = urlPrefix + value;
      var subset = value + 'subset';
      var slice = value + 'slice';
      var found = false;
      for (var i = 0; i < form.elements.length; i++) {
         var name = form.elements[i].name;
         if (name == 'stubs' || name == 'headers' || name == 'layers') {
            if (form.elements[i].value == objId) {
               form.elements[i].value = 'remove';
               form.elements[i].name = 'remove';
            } else found = true;
         } else if (name == subset || name == slice) {
            form.elements[i].value = 'remove';
            form.elements[i].name = 'remove';
         }
      }
      if (!found) {
         for (var i = 0; i < form.elements.length; i++) {
            if (form.elements[i].name == 'mode') {
               form.elements[i].value = 'table';
            }
         }
      }
      form.submit();
   }
   else if (id == 'choosecat') {
      link += "&subseton=" + code;
      try {
         if (parent.subsetwin) {
            var location = parent.subsetwin.document.location;
            parent.subsetwin.focus();
         }
      } catch (error) {
         parent.subsetwin = null;
      }

      if (parent.subsetwin) {
         awin = parent.subsetwin;
      } else {
         awin = window.open(link, 'subset', 'toolbar=no,location=no,directories=no,status=yes,menubar=no,resizable=yes,copyhistory=no,scrollbars=yes,width=330,height=490');
         parent.subsetwin = awin;
      }

      if (awin) {
         awin.focus();
      }

      select.selectedIndex = selected;
   } else if (id == 'insertgroup') {
      awin = window.open(value, 'subset', 'toolbar=no,location=no,directories=no,status=yes,menubar=no,resizable=yes,copyhistory=no,scrollbars=yes,width=330,height=490');
      if (awin) awin.focus();
      select.selectedIndex = selected;
   }
   else if (id == 'removemeasure') {
      var variables = form.elements;
      for (var i = 0; i < variables.length; i++) {
         if (variables[i].name == 'measure') {
            variables[i].name = 'remove';
            variables[i].value = 'remove';
         } else if (variables[i].name == 'measuretype') {
            variables[i].name = 'remove';
            variables[i].value = 'remove';
         } else if (variables[i].name == 'analysistype') {
            variables[i].name = 'remove';
            variables[i].value = 'remove';
         }
         //else if (variables[i].name == 'charttype') {
         //	variables[i].name = 'remove';
         //	variables[i].value = 'remove';
         //}
      }
      form.submit();
   }
   else if (id == 'measuretype' || id == 'measure') {
      var elements = value.split('|');

      var variables = form.elements;
      for (var i = 0; i < variables.length; i++) {
         if (variables[i].name == 'measure') {
            variables[i].value = urlPrefix + elements[0];
         } else if (variables[i].name == 'measuretype') {
            variables[i].value = elements[1];
         } else if (variables[i].name == 'min' || variables[i].name == 'max') {
            variables[i].name = 'remove';
            variables[i].value = 'remove';
         }
      }
      form.submit();

   } else if (id == 'tabcontenttype') {
      var variables = form.elements;
      var found = false;
      for (var i = 0; i < variables.length; i++) {
         if (variables[i].name == 'tabcontenttype') {
            variables[i].value = value;
            found = true;
         }
      }
      if (!found) {
         appendToForm(form, value, 'tabcontenttype');
      }
      form.submit();
   }
   else if (form) {
      var variables = form.elements;
      var found = false;
      for (var i = 0; i < variables.length; i++) {
         if (variables[i].name == id) {
            variables[i].value = value;
            found = true;
         }
      }
      if (!found) appendToForm(form, value, id);
      form.submit();
   }
}


function hideTheViewArea(tooLarge) {

   //Disable resizing
   setResizeEnabled(false);

   //If it is not set, defaults to false
   if (!tooLarge) tooLarge = false;
   //If there is a ajaxloader set, then it is a geowise incremental ajax update. Do not shade.
   try {
      if (ajaxLoader) return;
   } catch (error) {
      //alert(error);
   }
   if (tooLarge) {

      createHideArea();
      var theAlert = translation.too_large_table_explanation + '\n' + translation.too_large_table_maxcount_prefix + ' ' +  maxNumCellsParam;
      alert(theAlert);
      removeHideArea();

      return false;
   }

   if (window.opener && this.name != "mapview") {
      //If it is a popup run this code in the main window
      window.opener.hideTheViewArea();
      return;
   } else if (this.name == "inlinePopupContents"){
      window.parent.hideTheViewArea();
      return;      
   }

   //Add an spinner-image
   var spinner = document.createElement("img");
   spinner = spinnerImage;
   createHideArea(spinner);


   //Dont allow images and links to be clicked while loading
   var topstrip = xGetElementById('topstrip');
   if (topstrip) {
      var as = topstrip.getElementsByTagName('a');
      if (as) {
         var length = as.length;
         for (var i = 0; i < length; i++) {
            as[i].onclick = function() {
               return false;
            }
         }
      }
      as = topstrip.getElementsByTagName('img');
      if (as) {
         length = as.length;
         for (var i = 0; i < length; i++) {
            as[i].onclick = function() {
               return false;
            }
         }
      }
   }
   //Hide combo-boxes from IE
   hideComboBoxes();
   //If it is too large do not allow the link to execute
   if (tooLarge) return false;
   //Execute the link
   return true;
}

function createHideArea(elementToBePlaced){
   //The margin-top of the hidden area must equal the header size so that the header is
   //always visible
   var headerElement = document.getElementById('topstrip');
   var headerHeight = '0';
   //Reasonable default
   if (headerElement) {
      headerHeight = xHeight(headerElement);
   }

   //Append the window scroll for mozilla.
   //For IE6 this does not need to be added because it is the div that scroll, not the document
   //For IE this method returns 0, so it is safe to always do it.  var append = xScrollTop(null, true);
   var appendTop = xScrollTop(null, true);
   var appendLeft = xScrollLeft(null, true);

   hideArea = document.createElement("div");
   hideArea.className = 'hideClass';
   hideArea.id = 'theHideArea';
   //Set the margin-top:
   hideArea.style.marginTop = headerHeight + appendTop + 'px';
   hideArea.style.marginLeft = appendLeft + 'px';

   //Set the height of the transparent area to avoid scrollbars
   var transparentHeight = xClientHeight() - headerHeight - 1;
   hideArea.style.height = transparentHeight + 'px';

   if(elementToBePlaced){
      elementToBePlaced.style.top = transparentHeight / 3 + 'px';
      hideArea.appendChild(elementToBePlaced);
   }

   // insert the new node into the current document
   document.body.appendChild(hideArea);
}

function removeHideArea(){
   var hideArea = xGetElementById('theHideArea');
   theParentElement = hideArea.parentNode;
   theParentElement.removeChild(hideArea);
}

function appendToForm(form, variable, newname) {

   //create for element
   var oInputMon = document.createElement("INPUT");
   oInputMon.type = "hidden";
   oInputMon.name = newname;
   if (variable.value) oInputMon.value = variable.value;
   else if (variable) oInputMon.value = variable;

   //remove the old
   if (variable) {
      variable.value = 'remove';
      variable.name = 'remove';
   }

   form.appendChild(oInputMon);
}

var images = new Array();
images[0] = new Image();
images[0].src = skinPath + "images/minus.gif";
images[1] = new Image();
images[1].src = skinPath + "images/plus.gif";

function openFolder(image, id) {
   var element = document.getElementById(id);
   if (element) {
      if (element.style.display == 'block') element.style.display = 'none';
      else element.style.display = 'block';
      if (image) {
         if (image.src == images[0].src) image.src = images[1].src;
         else image.src = images[0].src;
      }
   }
}

function ToggleAllTree(checked) {
   var form = document.getElementById('treeform');
   if (!form ) var form = document.getElementById('categories');
   if (!form) return;
   len = form.elements.length;
   var i = 0;
   for (i = 0; i < len; i++) {
      form.elements[i].checked = checked;
   }
}

function executeTree() {
   var form = document.getElementById('treeform');
   if (!form ) var form = document.getElementById('categories');
   if (!form) return;

   len = form.elements.length;

   var variable;

   for (var i = 0; i < len; i++) {
      if (form.elements[i].name == 'subseton') {
         variable = form.elements[i].value;
      }
   }

   var found = false;

   for (var i = 0; i < len; i++) {
      if (form.elements[i].value == variable) {
         if (form.elements[i].name == 'layers') {
            found = true;
            appendToForm(form, form.elements[i], 'stubs');
         }
      }
   }

   if (!found) {
      //If not found try the code at the end of the url
      for (var i = 0; i < len; i++) {
         if (form.elements[i].value.indexOf("_" + variable) != -1) {
            if (form.elements[i].name == 'layers') {
               found = true;
               appendToForm(form, form.elements[i], 'stubs');
            }
         }
      }
   }
   
   if (parent.window.opener && parent.window.opener.document.calculatesubsetpopup) {
      form.target = 'calculatesubsetpopup';
   }
   
   form.submit();
   parent.window.close();
}

function executeTreeOld() {

   var subset = "";
   var first = true;

   len = document.treeform.elements.length;
   for (var i = 0; i < len; i++) {
      if (document.treeform.elements[i].checked) {
         if (!first) subset += ",";
         else first = false;
         subset += document.treeform.elements[i].value;
      }
   }

   var variable;

   len = document.hiddenform.elements.length;
   for (var i = 0; i < len; i++) {
      if (document.hiddenform.elements[i].name == 'subseton') {
         variable = document.hiddenform.elements[i].value;
         document.hiddenform.elements[i].value = "remove";
         document.hiddenform.elements[i].name = "remove";
      }
   }

   //Find the subset form
   var key = variable + 'subset';
   for (var i = 0; i < len; i++) {
      if (document.hiddenform.elements[i].name == key) {
         document.hiddenform.elements[i].value = subset;
      }
   }
   var found = false;

   for (var i = 0; i < len; i++) {
      if (document.hiddenform.elements[i].value == variable) {
         if (document.hiddenform.elements[i].name == 'layers') {
            found = true;
            appendToForm(document.hiddenform, document.hiddenform.elements[i], 'stubs');
         }
      }
   }
   if (!found) {
      //If not found try the code at the end of the url
      for (var i = 0; i < len; i++) {
         if (document.hiddenform.elements[i].value.endsWith("_" + variable)) {
            if (document.hiddenform.elements[i].name == 'layers') {
               found = true;
               appendToForm(document.hiddenform, document.hiddenform.elements[i], 'stubs');
            }
         }
      }
   }


   document.hiddenform.submit();
   parent.window.close();
}

function showSortingImage(node, attribute) {
   resetHighlight();
   node.src = 'skins/default/images/updown.gif';
   node.onclick = function() {
      openMenu(attribute);
   }
}

function hideSortingImageUp(node) {
   node.src = 'skins/default/images/sortup.gif';
}

function hideSortingImageDown(node) {
   node.src = 'skins/default/images/sortdown.gif';
}

function hideComboBoxes() {
   //Hide combo-boxes from IE
   if (domTT_isIE) {
      var selects = document.getElementsByTagName('select');
      var length = selects.length;
      for (var i = 0; i < length; i++) {
         selects[i].style.visibility = 'hidden';
      }
   }
}

/** Inline documentation stuff **/
/** In combination with multicube.vm **/
function setupInlineDocumentation()
{
   var ele, i = 0;
   do {
      ele = xGetElementById('cubeTrigger_' + i);
      if (ele) {
         ele.panelId = 'cube_' + i++;
         ele.onclick = inlineDocOnClick;
      }
   } while (ele);
}

function getInlineDocumentationTriggers(){
   var triggers = new Array();
   var ele, i = 0;
   do {
      ele = xGetElementById('cubeTrigger_' + i);
      if (ele) {
         triggers[i] = ele;
         i++;
      }
   } while (ele);

   return triggers;
}


function inlineDocOnClick() {
   //Get the panel we want to display
   var panel = xGetElementById(this.panelId);
   //Hide active panel if visible
   var doContinue = maybeHideActiveInlineDocPanel(panel);

   if (!doContinue)
      return;
   //Obtaining the position of the trigger-icon
   var eleX = xPageX(this);
   var eleY = xPageY(this);

   //IE7 must subtract twice (don't ask why, it likely is a coincidence) the xPageY of the exploder-element
   if(browser.isIE7x){
       var exploder = xGetElementById('exploder');
       var exploderY = xPageY(exploder);
       eleY = eleY - 2*exploderY;
   }

   //Obtaining height and widht of trigger-icons for offset-use
   var widthX = xWidth(this);
   var heightY = xHeight(this);

   var topStripHeight = 0;

   //If IE 5 or 6 subtract the fixed top-size
   if (browser.isIE5x || browser.isIE6x) {
      var topStrip = xGetElementById('topstrip');
      if (topStrip) {
         topStripHeight = xHeight(topStrip);
      }
   }

   if (panel) {
      panel.className = "inlinedocumentation";
      panel.style.top = eleY + heightY - topStripHeight + "px";
      panel.style.left = eleX + widthX + "px";

      //Setting the current panel as active panel
      activePanel = panel;
   }
}

function maybeHideActiveInlineDocPanel(newPanel) {
   if (activePanel) {
      hideActiveInlineDocPanel();
      if (activePanel.id == newPanel.id) {
         activePanel = null;
         return false;
      }
   }
   return true;
}

function hideActiveInlineDocPanel() {
   activePanel.className = "hide";
}

var previousVar;

function openWindow(id) {
   var element = xGetElementById(id);
   if (previousVar) {
      previousVar.style.display = "none";
   }
   if (element) {
      var myDialog = new YAHOO.widget.Dialog(id,{constraintoviewport: true, fixedcenter: true, monitorresize: true});
      element.style.display = 'block';
      myDialog.render();
      myDialog.show();
      previousVar = element;
   }
}

function setResizeEnabled(doEnableResize){
   enableResize = doEnableResize;
}

function getResizeEnabled(){
   return enableResize;
}
