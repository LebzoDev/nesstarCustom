var origx = 0;
var origy = 0;
var previousX = 0;
var previousY = 0;
var maporigx = 0;
var maporigt = 0;
var tooltipTimeout;
var tiphash = {};
var drillhash = {};
var yCompensate = 30; // Compensates Y-position of rubberband
var mouseOverCode = "";
var pendingMapOperation = false;
var activeOperationCounter = 0;
var panable = false;

function pushOperation() {
   activeOperationCounter++;
   if (activeOperationCounter === 1) {
      $('#mapLoadingIndicator').fadeIn();
   }
}

function popOperation() {
   activeOperationCounter--;
   if (activeOperationCounter === 0) {
      $('#mapLoadingIndicator').fadeOut();
      if (pendingMapOperation === true) {
         commitChanges();
      }
   }
}

function getBbox() {
   return $("#bbox").val();
}

function resetMap() {
   $("#bbox").val($("#initbbox").val());
   $('maskorient').val("");
   $('maskratio').val("");
   commitChanges();
}

function panN() {
   north = moveN();
   if (north) commitChanges();
}

function panNE() {
   north = moveN();
   east = moveE();
   if (north || east) commitChanges();
}

function panE() {
   east = moveE();
   if (east) commitChanges();
}

function panSE() {
   south = moveS();
   east = moveE();
   if (south || east) commitChanges();
}

function panS() {
   south = moveS();
   if (south) commitChanges();
}

function panSW() {
   south = moveS();
   west = moveW();
   if (south || west) commitChanges();
}

function panW() {
   west = moveW();
   if (west) commitChanges();
}

function panNW() {
   north = moveN();
   west = moveW();
   if (north || west) commitChanges();
}

function moveN() {
   coords = getBbox().split(',');
   height = parseFloat(coords[3]) - parseFloat(coords[1]);
   move = parseFloat(height) / 4;
   coords[1] = parseFloat(coords[1]) + parseFloat(move);
   coords[3] = parseFloat(coords[3]) + parseFloat(move);

   maxcoords = $('#initbbox').val().split(',');
   if (parseFloat(coords[1]) < parseFloat(maxcoords[1]) || parseFloat(coords[3]) > parseFloat(maxcoords[3])) {
      return false;
   } else {
      $("#bbox").val(coords[0] + "," + coords[1] + "," + coords[2] + "," + coords[3]);
      return true;
   }
}

function moveS() {
   coords = getBbox().split(',');
   height = parseFloat(coords[3]) - parseFloat(coords[1]);
   move = parseFloat(height) / 4;
   coords[1] = parseFloat(coords[1]) - parseFloat(move);
   coords[3] = parseFloat(coords[3]) - parseFloat(move);

   maxcoords = $('#initbbox').val().split(',');
   if (parseFloat(coords[1]) < parseFloat(maxcoords[1]) || parseFloat(coords[3]) > parseFloat(maxcoords[3])) {
      return false;
   } else {
      $("#bbox").val(coords[0] + "," + coords[1] + "," + coords[2] + "," + coords[3]);
      return true;
   }
}

function moveW() {
   coords = getBbox().split(',');
   width = parseFloat(coords[2]) - parseFloat(coords[0]);
   move = parseFloat(width) / 4;
   coords[0] = parseFloat(coords[0]) - parseFloat(move);
   coords[2] = parseFloat(coords[2]) - parseFloat(move);

   //FIXME: Need access to defaultzoom
   maxcoords = $('#initbbox').val().split(',');
   if (parseFloat(coords[0]) < parseFloat(maxcoords[0]) || parseFloat(coords[2]) > parseFloat(maxcoords[2])) {
      return false;
   } else {
      $("#bbox").val(coords[0] + "," + coords[1] + "," + coords[2] + "," + coords[3]);
      return true;
   }
}

function moveE() {
   coords = getBbox().split(',');
   width = parseFloat(coords[2]) - parseFloat(coords[0]);
   move = parseFloat(width) / 4;
   coords[0] = parseFloat(coords[0]) + parseFloat(move);
   coords[2] = parseFloat(coords[2]) + parseFloat(move);

   maxcoords = $('#initbbox').val().split(',');
   if (parseFloat(coords[0]) < parseFloat(maxcoords[0]) || parseFloat(coords[2]) > parseFloat(maxcoords[2])) {
      return false;
   } else {
      $("#bbox").val(coords[0] + "," + coords[1] + "," + coords[2] + "," + coords[3]);
      return true;
   }
}

function submitMap() {
   calculateBbox();
   commitChanges();
}

function removeRubberBand() {
   $('#rubberBand').hide();
}

function findMapClickPosX(e) {
   return e.pageX - $("#mapImage").offset().left;
}

function findMapClickPosY(e) {
   return e.pageY - $("#mapImage").offset().top;
}

function calculateBbox() {
   if ($('#isPan').val() < 1) {
      mapimagewidth = $("#width").val();
      mapimageheight = $("#height").val();
      x1 = $("#mapStartX").val();
      x2 = $("#mapEndX").val();
      y1 = $("#mapStartY").val();
      y2 = $("#mapEndY").val();
      
      x2 = parseInt(x1) + parseInt(x2);
      y2 = parseInt(y1) + parseInt(y2);
      mapimageaspect = mapimagewidth / mapimageheight;

      rubberwidth = parseInt(x2) - parseInt(x1);
      rubberheight = parseInt(y2) - parseInt(y1);
      rubberaspect = rubberwidth / rubberheight;

      if (rubberaspect < mapimageaspect) {
         //Rubberband too narrow
         newrubberwidth = parseInt(rubberheight) * mapimageaspect;
         rubbergrowth = parseInt(newrubberwidth) - parseInt(rubberwidth);
         growleft = parseInt(rubbergrowth) / 2;
         growright = parseInt(rubbergrowth) / 2;

         $('#maskratio').val(1 - (rubberwidth / newrubberwidth));
         $('#maskorient').val("V");

         if (parseInt(x1) > parseInt(growleft)) {
            x1 = parseInt(x1) - parseInt(growleft);
         } else {
            growright = parseInt(growright) - (parseInt(x1) - parseInt(growleft));
            x1 = 0;
         }

         if ((parseInt(mapimagewidth) - parseInt(x2)) >= parseInt(growright)) {
            x2 = parseInt(x2) + parseInt(growright);
         } else {
            growleft = parseInt(growright) - (parseInt(mapimagewidth) - parseInt(x2));
            x2 = parseInt(mapimagewidth);
            x1 = parseInt(x1) - parseInt(growleft);
         }
      } else {
         //Rubberband too low
         newrubberheight = parseInt(rubberwidth) / mapimageaspect;
         rubbergrowth = parseInt(newrubberheight) - parseInt(rubberheight);
         growtop = parseInt(rubbergrowth) / 2;
         growbottom = parseInt(rubbergrowth) / 2;

         $('#maskratio').val(1 - (rubberheight / newrubberheight));
         $('#maskorient').val("H");

         if (parseInt(y1) > parseInt(growtop)) {
            y1 = parseInt(y1) - (parseInt(growtop));
         } else {
            growbottom = parseInt(growbottom) - (parseInt(y1) - parseInt(growtop));
            y1 = 0;
         }

         if ((parseInt(mapimageheight) - parseInt(y2)) >= parseInt(growbottom)) {
            y2 = parseInt(y2) + (parseInt(growbottom));
         } else {
            growtop = (parseInt(y2) + parseInt(growbottom)) - parseInt(mapimageheight);
            y2 = parseInt(mapimageheight);
            y1 = parseInt(y1) - parseInt(growtop);
         }
      }

      rubberwidth = parseInt(x2) - parseInt(x1);
      rubberheight = parseInt(y2) - parseInt(y1);

      //Compute new bbox in map coordinates
      var coords = getBbox().split(',');

      widthshrinkfactor = rubberwidth / mapimagewidth;
      heightshrinkfactor = rubberheight / mapimageheight;

      oldmapwidth = (coords[2] - coords[0]);
      oldmapheight = (coords[3] - coords[1]);

      newmapwidth = oldmapwidth * widthshrinkfactor;
      newmapheight = oldmapheight * heightshrinkfactor;

      xmovefactor = x1 / mapimagewidth;
      ymovefactor = y1 / mapimageheight;

      coords[0] = parseFloat(coords[0]) + (oldmapwidth * xmovefactor);
      coords[3] = parseFloat(coords[3]) - (oldmapheight * ymovefactor);

      coords[2] = parseFloat(coords[0]) + parseFloat(newmapwidth);
      coords[1] = parseFloat(coords[3]) - parseFloat(newmapheight);

      newbbox = "" + coords[0] + "," + coords[1] + "," + coords[2] + "," + coords[3];
      $("#mapForm #bbox").val(newbbox);

      /*
         console.log ("bbox: "+getBbox()+"\n\n"+
         "x1: "+x1+"\n"+
         "x2: "+x2+"\n"+
         "y1: "+y1+"\n"+
         "y2: "+y2+"\n\n"+
         "oldmapwidth: "+oldmapwidth+"\n"+
         "oldmapheight: "+oldmapheight+"\n\n"+
         "xmovefactor: "+xmovefactor+"\n"+
         "ymovefactor: "+ymovefactor+"\n\n"+
         "widthshrinkfactor: "+widthshrinkfactor+"\n"+
         "heightshrinkfactor: "+heightshrinkfactor+"\n\n"+
         "newmapwidth: "+newmapwidth+"\n"+
         "newmapheight: "+newmapheight+"\n\n"+
         "newbbox: "+newbbox + "\n-----------------\n");
        */ 
   }
   return true;
}

function registerRubber(rubberObj) {
   var $rubberBandDiv = $("<div>").attr({
      id: "rubberBand"
   }).
   css("position", "absolute").
      css("display", "none").
      css("border", "1px dashed").
      on("mousemove", followMouse);

   $("body").append($rubberBandDiv);
   rubberObj.on("mousedown", mouseDownEvent);
   rubberObj.on("mousemove", followMouse);
}

function movePan(evt) {
   newxpos = evt.pageX;
   newypos = evt.pageY;
   xdiff = newxpos - origx;
   ydiff = newypos - origy;
   $('#panX').val(xdiff);
   $('#panY').val(ydiff);
   posval = "" + xdiff + "px " + ydiff + "px";
   $('#mapImage').css('backgroundPosition', posval);
}

function stopPan(evt) {
   $(document).off("mouseup");
   $(document).off("mousemove");
   enableSelect();
   movedx = $('#panX').val();
   movedy = $('#panY').val();
   bboxcoords = getBbox().split(',');
   bboxwidth = parseFloat(bboxcoords[2]) - parseFloat(bboxcoords[0]);
   bboxheight = parseFloat(bboxcoords[3]) - parseFloat(bboxcoords[1]);

   xratio = bboxwidth / parseFloat($('#width').val());
   yratio = bboxheight / parseFloat($('#height').val());

   movex = movedx * xratio;
   movey = movedy * yratio;

   bboxcoords[0] = parseFloat(bboxcoords[0]) - parseFloat(movex);
   bboxcoords[2] = parseFloat(bboxcoords[2]) - parseFloat(movex);
   bboxcoords[1] = parseFloat(bboxcoords[1]) + parseFloat(movey);
   bboxcoords[3] = parseFloat(bboxcoords[3]) + parseFloat(movey);

   maxcoords = $('#initbbox').val().split(',');

   // Has it been moved out of this layer?
   if (parseFloat(bboxcoords[0]) < parseFloat(maxcoords[0])) {
      bboxcoords[0] = parseFloat(maxcoords[0]);
      bboxcoords[2] = (parseFloat(maxcoords[0]) + parseFloat(bboxwidth));
   } else if (parseFloat(bboxcoords[2]) > parseFloat(maxcoords[2])) {
      bboxcoords[0] = (parseFloat(maxcoords[2]) - parseFloat(bboxwidth));
      bboxcoords[2] = parseFloat(maxcoords[2]);
   }
   if (parseFloat(bboxcoords[1]) < parseFloat(maxcoords[1])) {
      bboxcoords[1] = parseFloat(maxcoords[1]);
      bboxcoords[3] = (parseFloat(maxcoords[1]) + parseFloat(bboxheight));
   } else if (parseFloat(bboxcoords[3]) > parseFloat(maxcoords[3])) {
      bboxcoords[1] = (parseFloat(maxcoords[3]) - parseFloat(bboxheight));
      bboxcoords[3] = parseFloat(maxcoords[3]);
   }

   $("#bbox").val(bboxcoords[0] + "," + bboxcoords[1] + "," + bboxcoords[2] + "," + bboxcoords[3]);

   submitMap();
}

function isCorner(xclick, yclick) {
   handlesize = 20;
   var img = $('#mapImage');
   xsize = $('#width').val();
   ysize = $('#height').val();
   if ((xclick > (xsize - handlesize)) && (yclick < handlesize)) return true;
   if ((xclick > (xsize - handlesize)) && (yclick > (ysize - handlesize))) return true;
   if ((xclick < handlesize) && (yclick < handlesize)) return true;
   if ((xclick < handlesize) && (yclick > (ysize - handlesize))) return true;
   return false;
}

function mouseDownEvent(evt) {
   if (!evt) evt = window.event;
   if (browser.versionMinor < 9 && ((browser.isIE && evt.button != 1) || (!browser.isIE && evt.button != 0))) {
      return true;
   }
   origx = evt.pageX;
   origy = evt.pageY;
   maporigx = findMapClickPosX(evt);
   maporigy = findMapClickPosY(evt);
   if (isCorner(maporigx, maporigy) && panable) {
      // Pan
      $('#panX').val(0);
      $('#panY').val(0);
      $('#isPan').val(1);
      $('#mapImage').src = "skins/default/images/empty.gif";
      $(document).on("mousemove", movePan);
      $(document).on("mouseup", stopPan);
      disableSelect();
   } else {
      // Zoom
      $('#rubberBand').css("width", 0);
      $('#rubberBand').css("height", 0);
      $('#rubberBand').show();
      $('#mapEndX').val(-1);
      $('#mapEndY').val(-1);
      if (isInternetExplorer7orOlder()) {
         var exploder = $("#exploder");
         origy += exploder.scrollTop();
         origx += exploder.scrollLeft();
         origy -= 25;
      }
      $('#isPan').val(0);
      if (browser.isIE6x || (browser.isIE7x && isEmbedded)){
         origy += yCompensate;
      }
      $('#rubberBand').css("left", origx + 'px');
      $('#rubberBand').css("top", origy + 'px');
      $(document).off("mousemove");
      $('#rubberBand').on("mousemove", moveRubber);
      $('#mapImage').off("mousemove");
      $('#mapImage').on("mousemove", moveRubber);
      $(document).on("mouseup", stopRubber);
      disableSelect();
   }
   //Return false to disable select in Firefox that does not have the onselectstart event
   return false;
}

function registerTooltip(obj) {
   document.write("<div id=\"tooltipdiv\" style=\"position: absolute; display: none;\"></div>");
   obj.on("mouseout", function () {
      $('#mousex').val(-1);
      $('#mousey').val(-1);
   });
}

function hideTooltip() {
   $('#tooltipdiv').hide();
   mouseOverCode="";
}

function showTooltip(message) {
   if (message != "") {
      var x = $('#mousex').val();
      var y = $('#mousey').val();
      if (parseInt(x) > 0 && parseInt(y) > 0) {
         y = parseInt(y) + 10;
         tt = $('#tooltipdiv');
         tt.html(message);
         tt.css("left", x + "px");
         tt.css("top", y + "px");
         tt.show();
      }
   }
}

function followMouse(evt) {
   var currentX = findMapClickPosX(evt);
   var currentY = findMapClickPosY(evt);
   if (!mouseHasReallyMoved(currentX, currentY)) { return false; }
   var x = currentX;
   var y = currentY;
   $('#mousex').val(evt.pageX);
   $('#mousey').val(evt.pageY);
   hideTooltip();
   width = $('#width').val();
   height = $('#height').val();
   if (x > 0 && y > 0 && x < width && y < height) {
      if (isCorner(x, y) && panable) {
         clearTimeout(tooltipTimeout);
         $('#mapImage').css("cursor", "move");
         tooltipTimeout = setTimeout("showTooltip(translation.drag_to_pan)", 500);
      } else {
         $('#mapImage').css("cursor", "pointer");
         $('#mapmousex').val(x);
         $('#mapmousey').val(y);
         clearTimeout(tooltipTimeout);
         tooltipTimeout = setTimeout("getFeatureInfo()", 500);
      }
   }
}

function mouseHasReallyMoved(currentX, currentY) {
   if (currentX != previousX || currentY != previousY) {
      previousX = currentX;
      previousY = currentY;
      return true;
   }
   return false;
}

var setTooltip = function(data) {
   mouseOverCode = data.featureID;
   if (mouseOverCode != "") {
      message = tiphash["code_" + mouseOverCode];
      if (!message) {
         message="";
      } else {
         showTooltip(message);
      }
   } 
   var drillable = drillhash["code_" + mouseOverCode];
   if (drillable) currentcursor = "s-resize";
   else currentcursor = "pointer";
   $('#mapImage').css("cursor", currentcursor);
}

function tryToDrillDown() {
   var drillDownURL = "";
   if (typeof mouseOverCode != "undefined" && mouseOverCode != "") {
      drillDownURL = drillhash["code_" + mouseOverCode];
   }

   if ((typeof drillDownURL != "undefined") && drillDownURL != "") {
      hideTooltip();
      var tooLarge = (drillDownURL == 'toolarge');
      hideTheViewArea(tooLarge);
      if (!tooLarge) {
         this.location.href = drillDownURL;
         return true;
      }
   }
   return false;
}

function getFeatureInfo() {
   mouseOverCode="";
   x = $('#mapmousex').val();
   y = $('#mapmousey').val();

   var url = $('#coordinfourl').val();// + "&x=" + x + "&y=" + y;
   $.getJSON(url, {"x": parseInt(x), "y": parseInt(y)}, setTooltip);
}

function moveRubber(evt) {
   hideTooltip();
   if (!evt) evt = window.event;
   var $r = $('#rubberBand');
   $r.show();
   newxpos = evt.pageX;
   newypos = evt.pageY;

   //IE needs compensating
   if (browser.isIE6x || (browser.isIE7x && isEmbedded))
      newypos += yCompensate;

   if (newxpos < origx) {
      $r.css("width", origx - newxpos + 'px');
      $r.css("left",newxpos + 'px');
   } else {
      $r.css("width", newxpos - origx + 'px');
      $r.css("left", origx + 'px');
   }
   if (newypos < origy) {
      $r.css("height", origy - newypos + 'px');
      $r.css("top", newypos + 'px');
   } else {
      $r.css("height", newypos - origy + 'px');
      $r.css("top", origy + 'px');
   }
}

function zoomBackgroundImageToRubberedArea() {
      var rubberWidth = parseInt($('#rubberBand').css("width"));
      var rubberHeight = parseInt($('#rubberBand').css("height"));

      var imageWidth = $('#mapImage').width();
      var imageHeight = $('#mapImage').height();

      var widthGrowth = imageWidth / rubberWidth;
      var heightGrowth = imageHeight / rubberHeight;
      if (widthGrowth > heightGrowth) {
         var mapGrowth = "" + (widthGrowth * 100) + "%";
         var mapMove = (imageWidth - rubberWidth) / 2;
      } else {
         var mapGrowth = "" + (heightGrowth * 100) + "%";
         var mapMove = (imageHeight - rubberHeight) / 2;
      }

      $('#mapImage').animate({
         'background-size': mapGrowth,
         'background-position-x': (mapMove * -1),
         'background-position-y': (mapMove * -1)
         }, 'fast');
}

function stopRubber(evt) {
   if (typeof evt == 'undefined') evt = window.event;
   $('#rubberBand').off("mousemove");
   $(document).off("mousemove");
   $(document).off("mouseup");
   enableSelect();
   $('#rubberBand').hide();
   $('#mapImage').off("mousemove");
   $('#mapImage').on("mousemove", followMouse);

   var mapclickx = findMapClickPosX(evt);
   var mapclicky = findMapClickPosY(evt);
   if (parseInt(maporigx) < parseInt(mapclickx)) {
      $('#mapStartX').val(maporigx);
   } else {
      $('#mapStartX').val(mapclickx);
   }

   if (parseInt(maporigy) < mapclicky) {
      $('#mapStartY').val(maporigy);
   } else {
      $('#mapStartY').val(mapclicky);
   }

   if (parseInt($("#rubberBand").css("width")) > 20 || parseInt($('#rubberBand').css("height")) > 20) {
      // zoomBackgroundImageToRubberedArea(); //FIXME: Needs tweaking before enabling.

      $('#mapEndX').val(parseInt($('#rubberBand').css("width")));
      $('#mapEndY').val(parseInt($('#rubberBand').css("height")));

      hideTooltip();
      submitMap();
   } else {
      tryToDrillDown();
   }
}



// Disable text selection
function disableSelect() {
   $(document).on("selectstart", false);
}

// Reenable text selection
function enableSelect() {
   $(document).off("selectstart", false);
}

function changeMapSettings(event) {
   $('label[for="'+$(event.target).attr('id')+'"]').toggleClass("selected");
   //Disable selected class in related radiobutton labels if they exist
   $('input:radio[name=' + $(event.target).attr('name') + ']').each( function () {
      if($(this).attr('id') != $(event.target).attr('id')) {
         $('label[for="'+$(this).attr('id')+'"]').removeClass("selected");
      }
   });
   commitChanges();
}

function updateMapLegend(legendItemJSon) {
   $('#legend').empty();
   $('#legend').append("<div id=\"imgLoader\" />");
   $('#legend').append("<h3>" + legendItemJSon.header + "</h3>");
   if (legendItemJSon.thematicLegendItems && legendItemJSon.thematicLegendItems.length > 0) {
      $('#legend').append("<ul id=\"legendlist\" />");
      $.each(legendItemJSon.thematicLegendItems, function(i,item){
         pushOperation();
         $("#imgLoader").append($("<img/>").attr({
            src: item.uri,
            sibling: item.id
         }).imagesLoaded(function( $images, $proper, $broken ){
            $images.each( function() {
              var imgId = "#" + $(this).attr('sibling');
              $(imgId).attr("src", $(this).attr("src"));
              popOperation();
            });
         }));
         $("#legendlist").append(
            $("<li/>").append(
               $("<img/>").attr({
                  src: "skins/default/images/spinner-tiny.gif",
                  id: item.id,
                  alt: item.label
               }),
               $("<span/>").append(item.label))
            );
      });
   }

   if (legendItemJSon.nonThematicLegendItems && legendItemJSon.nonThematicLegendItems.length > 0) {
      $('#legend').append("<hr />");
      $('#legend').append("<ul id=\"nonthematiclegendlist\" />");
      $.each(legendItemJSon.nonThematicLegendItems, function(i,item) {
         pushOperation();
         $("#imgLoader").append($("<img/>").attr({
            src: item.uri,
            sibling: item.id
         }).imagesLoaded(function( $images, $proper, $broken ){
            $images.each( function() {
              var imgId = "#" + $(this).attr('sibling');
              $(imgId).attr("src", $(this).attr("src"));
              popOperation();
            });
         }));
         $("#nonthematiclegendlist").append(
            $("<li/>").append (
               $("<img/>").attr({
                  src: "skins/default/images/spinner-tiny.gif",
                  id: item.id,
                  alt: item.label
               }),
               $("<span/>").append(item.label))
            );
      });
   }
}

function updateMapImage(mapSettings) {
   $('#mapdiv').append("<img id=\"tempMapImage\" src=\"" + mapSettings.mapImageURI + "\" />");
   pushOperation();
   $('#mapdiv').imagesLoaded(function() {
      $('#tempMapImage').fadeIn('slow', function() {
         var imgData;
         if (isInternetExplorer8orOlder()) {
            imgData = $("#tempMapImage").attr("src");
         } else {
            imgData = getBase64Png($('#tempMapImage'));
         }
         $('#mapImage').css('background-image',  'url(' + imgData + ')');
         $('#mapImage').css('background-position', '0 0');
         $('#mapImage').css('background-size', 'auto');
         if ($("#hiddenform input[name=doprint]").val() != "true") {
            $('#tempMapImage').remove();
         }
         popOperation();

         if ($("#hiddenform input[name=doprint]").val() == "true") {
            window.print();
         }
      });
   });
}

function updateLinks(data) {
   pushOperation();
   $('#coordinfourl').val(data.coordinateRequestURI);
   $('#imagepdf').attr("href", data.basePath + data.baseParameters + data.mapURIParams + "&executepdf=true");
   $('#imageprint').attr("href", data.basePath + data.baseParameters + data.mapURIParams + "&doprint=true");
   $('#bookmarkurl').val(data.webViewBasePath + data.baseParameters + data.mapURIParams + "&top=yes");
   $('#embedBaseUrl').val(data.embedBasePath + data.baseParameters + data.mapURIParams);

   popOperation();
}

function setPanable() {
   if ($('#bbox').val() == $('#initbbox').val()) {
      panable = false;
      $('#wmsPanInstructions').fadeOut();
      $('#reset').fadeOut();
   } else {
      panable = true;
      $('#wmsPanInstructions').fadeIn();
      $('#reset').fadeIn();
   }
}

function setMouseOverDictionaries(data) {
   if (data.tipHash) {
      tiphash = data.tipHash;
      //No need to fetch the hashes again
      $('#fetchTooltipHash').remove();
   }

   if (data.drillHash) {
      drillhash = data.drillHash;
   }
}

function setMapSettings(data) {
   var max = data.maxNumGroups;
   var namesLabel = (data.nameLabelsEnabled == "true");
   var valuesLabel = (data.valueLabelsEnabled == "true");
   var numCategories = data.thematicLegendItems.length;
   var shaderType = data.shaderType;

   //FIXME:  The classification needs to be read from the json file too, or it will be lost in bookmarks and print

   if (max < 1) {
      $('#sidebar').fadeOut();
   } else {
      $('#sidebar').fadeIn();
      if (!pendingMapOperation) {
         $('#categoriesslider').slider('option',{min: 2, max: max});
         $('#categoriesslider').slider('value', numCategories);
         $("#number-of-groups-label").text(numCategories);
         $("#number-of-groups").attr("value", numCategories);
      }
   }

   if (!pendingMapOperation) {
      $("#labelname").prop("checked", namesLabel);
      if (namesLabel) {
         $('label[for=labelname]').addClass("selected");
      } else {
         $('label[for=labelname]').removeClass("selected");
      }

      $("#labelval").prop("checked", valuesLabel);
      if (valuesLabel) {
         $('label[for=labelval]').addClass("selected");
      } else {
         $('label[for=labelval]').removeClass("selected");
      }

      $("#labelval").prop("checked", valuesLabel);
      if (valuesLabel) {
         $('label[for=labelval]').addClass("selected");
      } else {
         $('label[for=labelval]').removeClass("selected");
      }

      if (shaderType == 0) {
         $('#shader0').prop("checked", true);
      } else {
         $('#shader1').prop("checked", true);
      }

      $('input:radio[name=shaderType]').each( function () {
         if($(this).attr('id') == "shader" + shaderType) {
            $('label[for="'+$(this).attr('id')+'"]').addClass("selected");
         } else {
            $('label[for="'+$(this).attr('id')+'"]').removeClass("selected");
         }

      });
   }
}

var parseMapDetailsJSon = function(data) {
   updateMapImage(data);
   updateMapLegend(data);
   updateLinks(data);
   setPanable();
   setMouseOverDictionaries(data);
   setMapSettings(data);
   popOperation();
}

var handleForbiddenAjaxRequest = function(jqXHR, textStatus, errorThrown) {
    var bookmarkURL = $("#bookmarkurl").val();
    top.location.replace(bookmarkURL);
}

var handleAjaxErrors = function(jqXHR, textStatus, errorThrown) {
    popOperation();

    pendingMapOperation = false;
    activeOperationCounter = 0;
    $('#mapLoadingIndicator').fadeOut();

    if (textStatus == "timeout") {
        $('#mapLoadingTimeoutIndicator').fadeIn();
        $('#mapLoadingTimeoutIndicator').delay(5000).fadeOut();
    } else {
        $('#genericMapErrorIndicator span').text("An error occurred on the server");
        $('#genericMapErrorIndicator').fadeIn();
        $('#genericMapErrorIndicator').delay(5000).fadeOut();
    }
}

function commitChanges() {
   removeRubberBand();
   if (activeOperationCounter > 0) {
      pendingMapOperation = true;
   } else {
      pushOperation();
      pendingMapOperation = false;

      var mapOperationVals = $('#mapForm').serializeArrayWithUnchecked();
      $.ajax('velocity', {
          dataType: 'json',
          data: mapOperationVals,
          timeout: 15000,
          success: parseMapDetailsJSon,
          error: handleAjaxErrors,
          statusCode: {
             403: handleForbiddenAjaxRequest
          }
      });
   }
}

function getBase64Png(img) {
    // Create an empty canvas element
    var canvas = document.createElement("canvas");
    canvas.width = img.width();
    canvas.height = img.height();

    // Copy the image contents to the canvas
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img.get(0), 0, 0);

    // Get the data-URL formatted image
    var dataURL = canvas.toDataURL("image/png");

    return dataURL;
}

function isInternetExplorer7orOlder() {
    var browser = $.browser;
    if (browser.msie) {
        var version = parseFloat(browser.version);
        return version <= 8.0;
    }
    return false;
}

function isInternetExplorer8orOlder() {
    var browser = $.browser;
    if (browser.msie) {
        var version = parseFloat(browser.version);
        return version <= 8.0;
    }
    return false;
}

//Plug in custom serialize function that keeps unchecked checkboxes
$.fn.serializeArrayWithUnchecked = function(options) {
   var settings = {
      on: 'on',
      off: 'off'
   };

   if (options) {
      settings = $.extend(settings, options);
   }

   var $container = $(this).eq(0),
       $allCheckboxes = $container.find("input[type='checkbox']");
       $filteredCheckboxes = $allCheckboxes.not("input[name='visibleLayer']").each(function() {
          $(this).attr('value', this.checked ? settings.on : settings.off).attr('checked', true);
       });

   var s = ($container.serialize());

   $filteredCheckboxes.each(function() {
      var $this = $(this);
      $this.attr('checked', $this.val() == settings.on ? true : false);
   });

   return s;
};

$(function() {
   $("#reset").click(function() {
      if (panable) resetMap();
   });
})
