//the windows
var embedPanel;
var embedPreviewPanel;


//Dimensions of the embedded object.
var objectHeight = parseInt(0);
var objectWidth = parseInt(0);

//bits for representing states
var bitpattern = 1;
var TITLE = 1;
var ICON_MAP = 2;
var ICON_GRAPH = 4;
var ICON_TIMELINE_GRAPH = 8;
var ICON_TABLE = 16;
var MAP_NO_LEGEND = 32;
var MAP_NO_CONTROLS = 64;
var ICON_SCATTER_PLOT = 128;

//Other global variables
var embeddingMode = -1;

var frameHeight = parseInt(0);
var frameWidth = parseInt(0);

var manualHeight = parseInt(0);
var manualWidth = parseInt(0);

var addHeight = parseInt(0);
var addWidth = parseInt(0);

var minHeight = parseInt(200);
var minWidth = parseInt(200);

var baseUrl = "";
var newUrl = "";
var spinnerUrl = "";

var alignment = "left";

/**
 * For analysis we need to calculate the height of the variable listings
 */
function calcVariableHeight() {
   // Add for title and buttons and "Open original"
   var tmpHeight = 0;
   tmpHeight += calcMandatorySizes();

   //If mode is set, it's either regression or correlation
   if(isMicrodata()) {
      // Add height to make room for variable listings
      tmpHeight += variableInfoHeight();

      // Compensate for margins
      tmpHeight += 10;
   }
   return tmpHeight;
}

/**
 * For the table, graph or map - use this to get the height
 */
function calcStrictHeight() {
   var tabelldiv = xGetElementById('tabell');
   var diagramdiv = xGetElementById('diagram');
   var mapdiv = xGetElementById('mapdiv');
   var correlationdiv = xGetElementById('correlation');
   var multigraphs = xGetElementById('multigraphs');

   var tmpHeight = 0;

   //If mode is set, it's either regression or correlation
   if(multigraphs) {
      tmpHeight += xHeight(multigraphs);
   } else if (diagramdiv) {
      var child = xFirstChild(diagramdiv);
      tmpHeight += xHeight(child);
   } else if (mapdiv) {
      tmpHeight += xHeight(mapdiv);
   } else if(isRegression()) {
      // Add height for the table, map or image
      tmpHeight += xHeight(tabelldiv);
   } else if (isCorrelation()) {
      // Add height for the table, map or image
      tmpHeight += xHeight(correlationdiv);
   } else if (tabelldiv) {
      tmpHeight += xHeight(tabelldiv);
   }
   return tmpHeight;
}

/**
 * For the table, graph or map - use this is get the width
 */
function calcStrictWidth() {
   var tabelldiv = xGetElementById('tabell');
   var diagramdiv = xGetElementById('diagram');
   var mapdiv = xGetElementById('mapImage');
   var correlationdiv = xGetElementById('correlation');
   var legenddiv = xGetElementById('legend');
   var multigraphsdiv = xGetElementById('multigraphs');

   var tmpWidth = 0;
   var child = 0;

   if (multigraphsdiv) {
      child = xFirstChild(multigraphsdiv);
      child = xFirstChild(child);
      tmpWidth += xWidth(child);
   } else if (diagramdiv) {
      child = xFirstChild(diagramdiv);
      tmpWidth += xWidth(child);
   } else if (mapdiv) {
      tmpWidth += xWidth(mapdiv);
      // Size of legend
      tmpWidth += $("div.sidebar").width();
      // Safety margins (to prevent scroll bars)
      tmpWidth += 8;
   }
   else if(isRegression()) {
      // Add width for the table, map or image
      tmpWidth += xWidth(tabelldiv);
   } else if (isCorrelation()) {
         //If mode is set, it's either regression or correlation
      tmpWidth += xWidth(correlationdiv);
      tmpWidth += xWidth(legenddiv);
      tmpWidth += 5; // margin between correlationdiv and legenddiv
   } else if (tabelldiv) {
      tmpWidth += xWidth(tabelldiv);
   }
   return tmpWidth;
}

/**
 * For all embedding, there is always options to choose title, buttons and such. Get the height they require.
 */
function calcMandatorySizes() {
   var retHeight = 0;
   if ((bitpattern & TITLE) != 0) {
      retHeight += getEstHeight("topspan","toptitle");
   }

   // Add more height if there is a measureVarText
   if(xGetElementById("measureVarID")){
      //Using the textElement instead of its container for calculation
      retHeight += getEstHeight("measureVarID","measureVarID");
   }

   //Maps suck
   if (embeddingMode == ICON_MAP) {
	   retHeight += 0;
   }
   //If at least one icon have been selected, it subtracts 26 pixels.
   if (anyIcons()) {
      retHeight += 26;
   }
   retHeight += 20; // remove 20 pixels to make room for "Open original" link

   return retHeight;
}

function calcHeightAddons() {
   addHeight = 0;
   var border = xGetElementById("embed_border");
   var scrollbars = xGetElementById("embed_scrollbars");

   // if borders, add 3 to the height
   if(border && border.checked) {
      addHeight += 3;
   }
   // if scrollbars add 15 to the height
   if(scrollbars && scrollbars.checked) {
      addHeight += 15;
   }
   return addHeight;
}

function calcWidthAddons() {
   addWidth = 0;
   var border = xGetElementById("embed_border");
   var scrollbars = xGetElementById("embed_scrollbars");

   if(border && border.checked) {
      addWidth += 3;
   }
   if(scrollbars && scrollbars.checked) {
      addWidth += 15;
   }
   return addWidth;
}

/**
 * Finds the size of the iframe
 */
function calcFrameSize() {
   //Find the size of the object that is about to be embedded.
   if(manualHeight > 0) {
      frameHeight = parseInt(manualHeight);
   }
   else {
      //Reset frameHeight
      frameHeight = 0;

      // Add for title and buttons and "Open original" and variable listings
      frameHeight += calcVariableHeight();

      // Add more height if you're having scroll bars or borders
      frameHeight += calcHeightAddons();

      // Get the height of the table, graph or map
      frameHeight += calcStrictHeight();

      // Tables equals pain. Adjust size to fit the tallest rendering engine (firefox2)
      if((embeddingMode & ICON_TABLE) != 0) {
          // Firefox 2 is the browser that writes the tallest tables.
          // compensate when embedding in IE
          if(browser.isIE) {
             frameHeight = Math.ceil(frameHeight / 0.952);
          }
          // compensate when embedding in FF3 and up
          if(browser.isFF3up) {
            frameHeight = Math.ceil(frameHeight / 0.9685);
          }
      }
   }

   if(manualWidth > 0) {
      frameWidth = parseInt(manualWidth);
   }
   else {
      //Reset frameWidth
      frameWidth = 0;

      // Get the width of the table, graph or map
      frameWidth += calcStrictWidth();

      // Get additional width forced from scroll bars and borders
      frameWidth += calcWidthAddons();

      // Compensate for IE and FF2 wrapping without any reason at all
      frameWidth += 10;
   }
}

/**
 * Calculate the size of the object. This is used for maps and graphs to draw within the iframe.
 */
function calcObjectSize() {
   objectHeight = frameHeight;
   if(isFreqChart()) {
       // the extra box adds 100px to the frame, we need to subtract that from the main image
       objectHeight -= 100;
   }
   objectHeight -= calcVariableHeight();

   objectWidth = frameWidth;
   if ($("#mapImage").length > 0) {
       objectWidth -= $("div.sidebar").width() + 20;
   }
}

function reset() {
   manualWidth = 0;
   manualHeight = 0;
   setSizes();
}

/**
 * The frame should never be less than 200x200 (minWidth x minHeight)
 */
function checkMinimalSizes() {
   //Setting a minimum size of the iframe/panel.
   if (typeof frameWidth != 'number' || frameWidth < minWidth) {
      if(manualWidth == 0) {
         frameWidth = minWidth;
      }
   }
   if (typeof frameHeight != 'number' || frameHeight < minHeight) {
      if(manualHeight == 0) {
         frameHeight = minHeight;
      }
   }
}

/**
 * Calculate all the sizes and put them into the embed form
 */
function setSizes() {
   calcFrameSize();
   checkMinimalSizes();
   calcObjectSize();

   var widthInput = xGetElementById("frameWidth");
   var heightInput = xGetElementById("frameHeight");
   widthInput.value = parseInt(frameWidth);
   heightInput.value = parseInt(frameHeight);
   manualWidth = parseInt(frameWidth);
   manualHeight = parseInt(frameHeight);
}

/**
 * Opens the dialog
 * @param title The title to put in the title bar.
 */
function embedDialog(title) {
   var bookmarkmenu = document.getElementById('bookmarkmenu');
   if (bookmarkmenu) {
      if (bookmarkmenu.style.display == 'block') bookmarkmenu.style.display = 'none';
   }

   //Return if the panel is already showing.
   if (embedPanel && embedPanel.cfg.getProperty("visible")) {
      return false;
   }

   setSizes();

   try {
      if (YAHOO) {
         var height = 150;
         var width = 400;
         var x = 100;
         var y = 100;

         height = height + "px";
         width = width + "px";

         //The overlaymanager controls overlapping, focusing etc.
         if (!YAHOO.lang.isObject(overlayManager)) {
            overlayManager = new YAHOO.widget.OverlayManager();
            overlayManager.initDefaultConfig();
         }

         //Get the panel element and initialize it.
         var tmpPanel = xGetElementById("embedDialog");
         if (!YAHOO.lang.isObject(embedPanel)) {
            embedPanel = new YAHOO.widget.Panel(tmpPanel, {
               width: width,
               height: height,
               x: x,
               y: y,
               draggable: true,
               close: true,
               modal: false,
               fixedcenter: true,
               constraintoviewport: true,
               zindex: 500
            });
            tmpPanel.style.display = "block";
            var overlayRegistered = overlayManager.register(embedPanel);
            if (!overlayRegistered)
               alert("Panel was not registered to overlay.");
         }

         embedPanel.setHeader(title);
         embedPanel.render();
         embedPanel.show();
         resizeEmbedPopup(400, 130);

         //Listen to when this panel is closed. That lets us close the preview as well.
         YAHOO.util.Event.addListener(embedPanel.close, "mousedown", onHidePanel, embedPanel, true);

         initEmbedding();
         return false;
      }
   } catch(ex) {
      alert("Error: " + ex.message);
   }
   return true;
}

function openAdvancedEmbedding() {
	if (bookmarkDialog) {
		bookmarkDialog.hide();
		
	}
	embedDialog("Embedding");
	swapEmbedding("advanced");
	return false;
}

/**
 * Loads the panel for showing a preview of the embedding.
 * @param title The text to put in the titlebar.
 * @param code URL to embedded data (iframe)
 * @param w Width of preview dialog
 * @param h Height of preview dialog
 */
function openPreviewDialog(title, code, w, h) {
   try {
      if (YAHOO) {
         var popupFrameWidth = w + 40;
         var popupFrameHeight = h + 40;
         popupFrameWidth = "" + popupFrameWidth + "px";
         popupFrameHeight = "" + popupFrameHeight + "px";
         //If the panel was registered to the overlay manager already, then show it
         if (YAHOO.lang.isObject(embedPreviewPanel)) {
            embedPreviewPanel.show();
         } else {
            embedPreviewPanel = new YAHOO.widget.Panel("embedPreviewContainer", {
               width: popupFrameWidth,
               height: popupFrameHeight,
               x: 20,
               y: 100,
               constraintoviewport: true,
               close: true,
               modal: false,
               draggable: true,
               fixedcenter: false,
               zindex: 1001
            });
            var overlayRegistered = overlayManager.register(embedPreviewPanel);
            if (!overlayRegistered)
               alert("Panel was not registered to overlay");
         }

         embedPreviewPanel.setHeader(title);
         embedPreviewPanel.setBody(code);
         embedPreviewPanel.render();
         embedPreviewPanel.show();

         overlayManager.focus(embedPreviewPanel);

         //Listen to when this panel is closed and DESTROY it (bwahahah).
         YAHOO.util.Event.addListener(embedPreviewPanel.close, "mousedown", onHidePreviewPanel, embedPreviewPanel, true);

         return false;
      }
   } catch(ex) {
      alert(ex);
   }
   return true;
}

/**
 * Update the preview window and its contents.
 * @param code The URL to load in the iframe.
 */
function updateEmbedPreview(code) {
   if (embedPreviewPanel && embedPreviewPanel.cfg.getProperty('visible')) {
      embedPreviewPanel.setBody(code);
      fitEmbeddingToContents();
   }
}

/**
 * Resizes the panel to the new size. This method will also add a few pixels to allow padding
 * between the panel borders and the contained iframe.
 * @param w The new width.
 * @param h The new height.
 */
function resizeEmbedPreview(w, h) {
   return resizePanel(w, h, embedPreviewPanel);
}

/**
 * Resizes the inline embed dialog when swapping between simple and advanced settings.
 * @param w New width
 * @param h New height
 */
function resizeEmbedPopup(w, h) {
   return resizePanel(w, h, embedPanel);
}

/**
 * Generic method for resizing panels.
 * @param w The width of the panel.
 * @param h The height of the panel.
 * @param panel The panel to resize.
 */
function resizePanel(w, h, panel) {
   h = (+h);
   w = (+w);
   if (panel) {
      try {
         var panelHeight = h + 20;
         var panelWidth = w + 20;

         //Calculations determining whether the panel will exceed the frame.
         var winHeight = xClientHeight();
         var winWidth = xClientWidth();
         var winY = embedPanel.cfg.getProperty("y");
         var winX = embedPanel.cfg.getProperty("x");
         var totalHeight = winY + panelHeight;
         var totalWidth = winX + panelWidth;

         panel.cfg.setProperty("height", "" + panelHeight + "px");
         panel.cfg.setProperty("width", "" + panelWidth + "px");

         panel.render();
         panel.show();

         //Make sure the titlebar is in the view.
         if (totalHeight > winHeight) {
            panel.cfg.setProperty("y", 30);
         }
         if (totalWidth > winWidth) {
            panel.cfg.setProperty("x", 20);
         }

         return false;
      } catch (ex) {
         alert("Panel resize failed: " + ex);
         return true;
      }
   }
   return true;
}

/**
 * Called when the embed panel is closed.
 */
function onHidePanel() {
   if (embedPanel) {
      swapEmbedding("simple");
      embedPanel.hide();
      if (embedPreviewPanel) {
         embedPreviewPanel.hide();
         onHidePreviewPanel();
      }
   }
}

/**
 * Called when the preview panel is closed. Serves to clean up the preview panel.
 */
function onHidePreviewPanel() {
   embedPreviewPanel.hide();
}

/**
 * Convenience method to create and return a new iframe element. This method sets the basic attributes.
 * @param id The ID to assign to the new element.
 * @return An iframe DOM object.
 */
function createIframe(id) {
   var iframe = xCreateElement("iframe");
   iframe.id = id;
   iframe.border = "0";
   iframe.frameborder = "0";
   iframe.scrolling = "no";
   iframe.style.border = 0;

   return iframe;
}


/**
 * Initialize the damn thing.
 */
function initEmbedding() {
   setObjectValues();
   setSizes();
   updateHTML();
   highlightCode();
}

/**
 * Set initial values.
 */
function setObjectValues() {
   //Update the advanced settings input fields with the dimensions of the embedded object.
   var widthInput = xGetElementById('frameWidth');
   widthInput.value = frameWidth;

   var heightInput = xGetElementById('frameHeight');
   heightInput.value = frameHeight;

   //Disable checkboxes that represent modes the current mode cannot switch to.
   if (allowedEmbeddingModes) {
      if ((allowedEmbeddingModes & ICON_TABLE) == 0) {
         disableBox('embed_icon_table');
      }
      if ((allowedEmbeddingModes & ICON_GRAPH) == 0) {
         if(isRegression() || isCorrelation()) { // if the mode is set, only remove graf icon if scatterplot is illegal
            if((allowedEmbeddingModes & ICON_SCATTER_PLOT) == 0) {
               disableBox('embed_icon_graph');
            }
         }
         else {
            disableBox('embed_icon_graph');
         }
      }
      if ((allowedEmbeddingModes & ICON_TIMELINE_GRAPH) == 0) {
         disableBox('embed_icon_timeline_graph');
      }
      if ((allowedEmbeddingModes & ICON_MAP) == 0) {
         disableBox('embed_icon_map');
         disableBox('embed_map_no_legend');
         disableBox('embed_map_no_controls');
      }
   }
}

/**
 * Disable an element with a given id and add the "disabled" class name to its parent element.
 * @param id ID of the element to disable.
 */
function disableBox(id) {
   var elem = xGetElementById(id);
   if(elem) {
      elem.disabled = true;
      var parentElem = elem.parentNode;
      parentElem.className += (parentElem.className == "") ? "disabled" : " disabled";
   }
}

/**
 * Swaps between simple and advanced mode.
 * @param type A string telling the function what mode to switch to.
 */
function swapEmbedding(type) {
   if (type == "advanced") {
      xDisplay("advancedembedding", "block");
      xDisplay("swapEmbedLinkAdvanced", "none");
      xDisplay("swapEmbedLinkSimple", "inline");
      resizeEmbedPopup(400, 299);
   } else if (type == "simple") {
      xDisplay("advancedembedding", "none");
      xDisplay("swapEmbedLinkAdvanced", "inline");
      xDisplay("swapEmbedLinkSimple", "none");
      resizeEmbedPopup(400, 150);
   }
   highlightCode();
}

/**
 * Update when input fields are altered. Also updates the HTML code.
 * @param element The input field in question.
 */
function updateTextValues(element) {
   var keepRatio = shouldKeepRatio();
   switch (element.name) {
      case "frameWidth":
         var w = element.value;
         if (keepRatio) {
             manualHeight = calculateDimensionFromRatio("frameHeight", manualWidth, w);
         }
         manualWidth = w;
         break;
      case "frameHeight":
         var h = element.value;
         if (keepRatio) {
             manualWidth = calculateDimensionFromRatio("frameWidth", manualHeight, h);
         }
         manualHeight = h;
         break;
   }
   updateHTML();
   highlightCode();
}

function shouldKeepRatio() {
   var ratioButton = xGetElementById("ratiobutton");
   return ratioButton.checked;
}

function calculateDimensionFromRatio(fieldName, oldValue, newValue) {
    var ratio = oldValue/newValue;
    var valueToRecalculate = getNumberValueFromField(fieldName);
    var newDimensionValue = valueToRecalculate / ratio;
    
    return Math.floor(newDimensionValue);
}
/**
 * Calculates bit value for selected settings
 */
function calculateBit() {
   var bitvalue = 0;

   var title = xGetElementById("embed_title");
   var table = xGetElementById("embed_icon_table");
   var graph = xGetElementById("embed_icon_graph");
   var timeline = xGetElementById("embed_icon_timeline_graph");
   var map = xGetElementById("embed_icon_map");
   var nomaplegend = xGetElementById("embed_map_no_legend");
   var nomapcontrols = xGetElementById("embed_map_no_controls");

   if(title && title.checked)
      bitvalue += TITLE;
   if(table && table.checked)
      bitvalue += ICON_TABLE;
   if(graph && graph.checked)
      bitvalue += ICON_GRAPH;
   if(timeline && timeline.checked)
      bitvalue += ICON_TIMELINE_GRAPH;
   if(map && map.checked)
      bitvalue += ICON_MAP;
   if(nomaplegend && nomaplegend.checked)
      bitvalue += MAP_NO_LEGEND;
   if(nomapcontrols && nomapcontrols.checked)
      bitvalue += MAP_NO_CONTROLS;

   //If this is regression or correlation, make sure that graph is scatterplot
   if(isRegression() || isCorrelation()) {
      if(graph && graph.checked) {
         bitvalue -= ICON_GRAPH;
         bitvalue += ICON_SCATTER_PLOT;
      }
   }

   return bitvalue;
}

/**
 * Update when checkboxes are clicked. Alters the bit value and updates HTML.
 * This method also checks if other checkboxes should be set additionally.
 * @param element The checkbox that was clicked.
 * @param bit The bit value this checkbox represents.
 */
function updateValues(element, bit) {
   bit = (+bit);
   //update the bitpattern
   if (bit == -1) {
      //Not all checkboxes are part of the bit pattern thing. These are handled here.
      switch (element.name) {
         case "embed_border":
            if(element)
               border = element.checked;
            break;
         case "embed_scrollbars":
            if(element)
               scrollbars = element.checked;
            break;
      }
   }
   // Set bit pattern
   bitpattern = calculateBit();
   setSizes();
   updateHTML();
   highlightCode();
}

function setAlignment(element) {
   if (element.id == "none")
      alignment = "";
   else
      alignment = element.value;
   updateHTML();
   highlightCode();
}

/**
 * This function checks whether any icon checkboxes have been set at all. This is useful to see if we need to add a
 * litte extra height to the frame.
 */
function anyIcons() {
   var icons = false;
   if (((bitpattern & ICON_TABLE) != 0) ||
       ((bitpattern & ICON_GRAPH) != 0) ||
       ((bitpattern & ICON_SCATTER_PLOT) != 0) ||
       ((bitpattern & ICON_TIMELINE_GRAPH) != 0) ||
       ((bitpattern & ICON_MAP) != 0)) {
      icons = true;
   }
   return icons;
}

/**
 * Make a given box selected if necessary.
 * @param checkBit Check whether this bit represents the object we're embedding.
 * @param id Id of the checkbox representing the object we're embedding.
 */
function setBit(checkBit, id) {
   if (embeddingMode == checkBit) {
      var checkbox = xGetElementById(id);
      if (!checkbox.checked) {
         checkbox.checked = true;
         bitpattern += checkBit;
      }
   }
}

/**
 Updates the code in the input field and refreshes the preview.
 */
function updateHTML() {
   var code = buildCode();

   //Update the code field.
   var codeBox = xGetElementById('codeBox');
   codeBox.value = code;
   codeBox.blur();

   //Send the values to the preview panel. This method will check if the preview panel is visible.
   updateEmbedPreview(code);
}

/**
 * Rebuilds the code for the iframe etc.
 */
function buildCode() {
   /*
   Global variables used here:
   newUrl: The URL representing the settings currently selected.
   baseUrl: The part of the URL that always will be the same for this embedding.
   bitpattern: An integer representing the elements that are activated for this embedding.
   objectWidth, objectHeight: The internal size of the element (not the frame itself).
   border: Use border or not.
   scrollbars: Allow scrollbars or not. If true, scrollbars will only be visible if necessary.
   */
   if ($("#embedBaseUrl").length > 0) {
       baseUrl = $("#embedBaseUrl").val();
   }
   newUrl = baseUrl + "&amp;embed=" + bitpattern;

   //Sizes for graphics elements
   setSizes();
   newUrl += "&amp;width=" + objectWidth;
   newUrl += "&amp;height=" + objectHeight;
   //The styles array holds the CSS rules. Use styles['rule_name'] = "value" to add a new rule.
   var styles = new Array();

   //Adjust margin to suit the alignment.
   if (alignment == "") {
      styles['margin'] = ".6em";
   } else if (alignment == "right") {
      styles['margin'] = "0 0 0 .6em";
   } else if (alignment == "left") {
      styles ['margin'] = "0 .6em 0 0";
   }

   //Do we want a border?
   if (border)
      styles['border'] = "1px solid #CBD4DD";
   
   //Add spinner to background
   styles['background'] = "#fff url(" + spinnerUrl + ") no-repeat center center";

   //do we allow scrollbars?
   var scrollbarsValue = "no";
   if (scrollbars)
      scrollbarsValue = "auto";

   //If IE6 is used for embedding we need to make it a bit higher
   var compensateForIE6 = 0;

   var style = "";
   var firstStyle = true;
   for (var s in styles) {
      if (!firstStyle)
         style += " ";
      style += s + ":" + styles[s] + ";";
      firstStyle = false;
   }
   //Build HTML
   var code = '<iframe src="' + newUrl +
              '" width="' + frameWidth +
              '" height="' + (frameHeight + compensateForIE6) +
              '" scrolling="' + scrollbarsValue +
              '" style="' + style +
              '" frameBorder="0" border="0"';
   //Only add the align attribute if it's there (because there is no "none" in align)
   code += (alignment != "") ? ' align="' + alignment + '"' : "";
   code += '>';
   code += embed_iframe_message + '</iframe>';

   return code;
}

/**
 * highlights the contents of the code field.
 */
function highlightCode() {
   var codeBox = xGetElementById('codeBox');
   codeBox.select();
}

/**
 * Wrapper for the parent function. Prepares the HTML snippet and sends it to the update function.
 */
function openEmbedPreview(title) {
   var code = buildCode();
   openPreviewDialog(title, code, frameWidth, frameHeight);
   fitEmbeddingToContents();
   return false;
}

/**
 * Tries to harmonize everything.
 */
function fitEmbeddingToContents() {
   var widthInput = getNumberValueFromField("frameWidth");
   var heightInput = getNumberValueFromField("frameHeight");
   // Adding 10px for the embedPreview for the i18n-title - embedPreview only
   heightInput+=10;
   resizeEmbedPreview(widthInput, heightInput);
}

function getNumberValueFromField(fieldname) {
	var field = xGetElementById(fieldname);
	var value = field.value;
	var number =  parseInt(value);
	if (isNaN(number)) {
		number = 600; //sensible default ...
	}
	return number;
}

/**
 * Makes sure the code is updated when clicking the "fit" link in the GUI.
 */
function fitAndUpdate() {
   fitEmbeddingToContents();
   updateHTML();
}
/**
 * Finds the height of the text element in the current view.
 * @params textID The actucal textelement
 * @params containerID The container which contains the textID-element 
 * @return The found height or a default height if nothing was found.
 */
function getEstHeight(textID,containerID) {
	var height;
   // The text itself
	var textElement = xGetElementById(textID);
   // The div that contains the text
   var containerElement = xGetElementById(containerID);
   // Multiplyer - used in cases where the title will wrap
   var multiply = 1;
   // Size of the object we're embedding. Need this to check size of title
   var objSize = calcStrictWidth();

	if (textElement) {
      if(xWidth(textElement) > objSize) {
         // The title width is wider than the object size, so we need to set the multiplyer
         multiply = Math.ceil(xWidth(textElement) / (objSize));
      }
		height = xHeight(containerElement) *  multiply;
	}

	if (height && height > 0)
		return height;
	else
		return 26;
}


/**
 * Functions to check if you're in a study, and which part of a study you're in.
 * isMicrodata() returns true if you're in a study/micro data
 * isRegression() returns true if you're in analysis/regression
 * isCorrelation() returns true if you're in analysis/correlation
 */
function isMicrodata() {
   return typeof(mode) != "undefined";
}

function isRegression() {
   if(isMicrodata()) {
      return mode == "regression";
   }
}

function isCorrelation() {
   if(isMicrodata()) {
      return mode == "correlation";
   }
}

function isFreqChart() {
   return typeof(freqchart) != "undefined";
}

/**
 * variableInfoHeight() returns the height of variable information fields in correlation and regression, and
 * should return the size of those fields.
 */
function variableInfoHeight() {
   var infoHeight = 0;
   if(isRegression()) {
      var regressionHeadersdiv = xGetElementById('regressionHeaders');
      infoHeight = xHeight(regressionHeadersdiv);
   } else if (isCorrelation()) {
      var variablesdiv = xGetElementById('variables');
      infoHeight = xHeight(variablesdiv);
      infoHeight += 10; // correct for margins
   }
   return infoHeight;
}