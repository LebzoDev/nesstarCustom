var stubSorter;
var headSorter;
var focusedCell;
var previouselement;
var hiCells = new Array(0);
var hiCellsItem = new Array(0);
var sumCells = new Array(0);
var header = new Array(0);
var headerItem = new Array(0);
var stub = new Array(0);
var stubItem = new Array(0);
var td;

function rowAverage(node) {
   var rowaverage = document.getElementById('averagerow');
   var colaverage = document.getElementById('averagecol');
   if (rowaverage) rowaverage.disabled = '';
   if (colaverage) colaverage.disabled = 'true';
}

function colAverage(node) {
   var rowaverage = document.getElementById('averagerow');
   var colaverage = document.getElementById('averagecol');
   if (rowaverage) rowaverage.disabled = 'true';
   if (colaverage) colaverage.disabled = '';
}

function init() {
   hiCells = new Array(0);
   hiCellsItem = new Array(0);
   sumCells = new Array(0);
   header = new Array(0);
   headerItem = new Array(0);
   stub = new Array(0);
   stubItem = new Array(0);
}


function doTableHighlight(e) {
   if (!e)
      e = window.event;
   if (e.target)
      target = e.target;
   else if (e.srcElement)
      target = e.srcElement;


   //Make sure it is not the text node in mozilla
   target = getParent(target);
   //alert(target.className);
   if (isChildOfNode(target, 'tabell') || target.id == 'tabell') {
      if (target.nodeName == 'td' || target.nodeName == 'TD') resetHighlight();
      if (target.className == '' || target.className == 'item' || target.className == 'highlight' || target.className == 'focus' || target.className == 'sum') {
         hl(target, true, true);
      } else if (target.className == 'stub' || target.className == 'stub item') {
         if (!target.rowSpan || target.rowSpan == '1') {
            hl(target, false, true);
         }
      } else if (target.className == 'headerlast' || target.className == 'headerlast item') {
         hl(target, true, false);
      } else if (target.className == 'empty') {
         findIfSortable(target, 'header');
      } else if (target.className == 'emptystub') {
         findIfSortable(target, 'stub');
      }
   } else {
      //Get rid of old highlight-stuff
      resetHighlight();
   }
}

function findIfSortable(target, stubOrHeader) {
   //  alert("findifsortable " + target.className);
   var elements = target.childNodes;
   //var elements target.getElementsByTagName('img');
   for (var i = 0; i < elements.length; i++) {
      if (elements[i].nodeName == 'IMG' || elements[i].nodeName == 'img') {
         if (elements[i].alt == 'sort') {
            if (previouselement) {
               elements[i].style.visibility = 'hidden';
            }
            if (stubOrHeader == 'stub') {
               stubSorter = elements[i];
               elements[i].style.visibility = 'visible';
               elements[i].style.display = 'inline';
            }
            else if (stubOrHeader == 'header') {
               headSorter = elements[i];
               elements[i].style.visibility = 'visible';
            }
         }
      }
   }
}

function hlRow(target) {

}

function resetHighlight() {
   //Clear highlighted cells
   if (hiCells) {
      var lengde = hiCells.length;
      for (i = 0; i < lengde; i++) {
         var node = hiCells[i];
         if (node != null) {
            node.className = '';
         }
      }
   }
   if (hiCellsItem) {
      var lengde = hiCellsItem.length;
      for (i = 0; i < lengde; i++) {
         var node = hiCellsItem[i];
         if (node != null) {
            node.className = 'item';
         }
      }
   }
   if (headerItem) {
      var lengde = headerItem.length;
      for (i = 0; i < lengde; i++) {
         var node = headerItem[i];
         if (node != null) {
            node.className = 'headerlast item';
         }
      }
   }
   if (header) {
      var lengde = header.length;
      for (i = 0; i < lengde; i++) {
         var node = header[i];
         if (node != null) node.className = 'headerlast';
      }
   }
   if (stub) {
      var lengde = stub.length;
      for (i = 0; i < lengde; i++) {
         var node = stub[i];
         if (node != null) node.className = 'stub';
      }
   }

   if (stubItem) {
      var lengde = stubItem.length;
      for (i = 0; i < lengde; i++) {
         var node = stubItem[i];
         if (node != null) node.className = 'stub item';
      }
   }

   if (sumCells) {
      var lengde = sumCells.length;
      for (i = 0; i < lengde; i++) {
         var node = sumCells[i];
         if (node != null) node.className = 'sum';
      }
   }

   if (headSorter) {
      headSorter.style.visibility = 'hidden';
   }
   if (stubSorter) {
      stubSorter.style.visibility = 'hidden';
   }
   if (previouselement) previouselement.style.visibility = 'hidden';
   init();
}

function hl(focusedCell, cross, useRow) {
   //If it is not a td, dont highlight
   if (focusedCell.nodeName != 'td' && focusedCell.nodeName != 'TD') return;
   //Get rid of old highlight-stuff
   resetHighlight();
   var focusedHasItemMeta = false;
   if (focusedCell.className == 'item') {
      hiCellsItem[hiCellsItem.length] = focusedCell;
      focusedHasItemMeta = true;
   } else if (focusedCell.className == 'headerlast item') {
      headerItem[headerItem.length] = focusedCell;
      focusedHasItemMeta = true;
   } else if (focusedCell.className == 'stub item') {
      stubItem[stubItem.length] = focusedCell;
      focusedHasItemMeta = true;
   }  else {
      hiCells[hiCells.length] = focusedCell;
   }

   var row = focusedCell.parentNode;
   if (useRow) {
      var cells = row.getElementsByTagName('td');
      var lengde = cells.length;
      for (i = 0; i < lengde; i++) {
         if (!cells[i].rowSpan || cells[i].rowSpan == '1') {
            if (cells[i].className == 'stub') {
               cells[i].className = 'stubHigh';
               stub[stub.length] = cells[i];
               findIfSortable(cells[i], 'stub');
            } else if (cells[i].className == 'stub item') {
               cells[i].className = 'stubHigh item';
               stubItem[stubItem.length] = cells[i];
               findIfSortable(cells[i], 'stub');
            }  else if (cells[i].className == 'sum') {
               cells[i].className = 'highlight';
               sumCells[sumCells.length] = cells[i];
            }
            else if (cells[i].className == 'emptystub') {
               //hiCells[hiCells.length] = cells[i];
               findIfSortable(cells[i], 'stub');
            } else if (cells[i].className == 'item') {
               cells[i].className = 'highlight item';
               hiCellsItem[hiCellsItem.length] = cells[i];
            } else if (cells[i].className == 'headerlast item') {
               cells[i] = "headerlastHigh item";
               headerItem[headerItem.length] = cells[i];
            } else {
               cells[i].className = 'highlight';
               hiCells[hiCells.length] = cells[i];
            }
         }
      }
   }

   if (cross) {
      //Find the index from the last node, to take into account
      //rowspan/colspan
      var focusedIndex = 0;
      var next = focusedCell;
      while (next) {
         focusedIndex++;
         next = next.nextSibling;
         if (next) {
            while (next && typeof(next.ELEMENT_NODE) != "undefined" && next.nodeType != next.ELEMENT_NODE) {
               next = next.nextSibling;
            }
         }
      }

      row = row.parentNode.firstChild;

      while (row) {
         try {
            var cells = row.getElementsByTagName('td');
            var current = cells[cells.length - focusedIndex];
            if (current) {
               //Regular cell-td?
               if (current.className == '') {
                  current.className = 'highlight';
                  hiCells[hiCells.length] = current;
                  //Special td (like head or highlight)
               } else if (current.className == 'item') {
                  current.className = 'highlight item';
                  hiCellsItem[hiCellsItem.length] = current;
                  //Special td (like head or highlight)
               } else {
                  var stubOrHeader = 'stub';
                  if (current.className == 'headerlast') {
                     current.className = 'headerlastHigh';
                     header[header.length] = current;
                     stubOrHeader = 'header';
                  } else if (current.className == 'headerlast item') {
                     current.className = 'headerlastHigh item';
                     headerItem[headerItem.length] = current;
                     stubOrHeader = 'header';
                  }  else if (current.className == 'stub') {
                     current.className = 'stubHigh';
                     stub[stub.length] = current;
                  }  else if (current.className == 'stub item') {
                     current.className = 'stubHigh item';
                     stubItem[stubItem.length] = current;
                  } else if (current.className == 'sum') {
                     current.className = 'highlight';
                     sumCells[sumCells.length] = current;
                  }
                  //Check if this is a sortable element
                  findIfSortable(current, stubOrHeader);
               }
            }
         } catch (error) {
         }
         row = row.nextSibling;
      }
   } //if cross

   //Highlight clicked cell specifically
   if (useRow && cross) {
      if (focusedHasItemMeta) {
         focusedCell.className = 'focus item';
      }
      else focusedCell.className = 'focus';
   }
   else if (useRow && !cross) {
      if (focusedHasItemMeta) {
         focusedCell.className = 'focusStub item';
      } else {
         focusedCell.className = 'focusStub';
      }
      findIfSortable(focusedCell, 'stub');
   } else if (!useRow && cross) {
      if (focusedHasItemMeta) {
         focusedCell.className = 'focusHead item';
      } else {
         focusedCell.className = 'focusHead';
      }
   }
}

function openMenu(id, event) {
   var element = document.getElementById(id);
   if (element) {
      if (previouselement) {
         previouselement.style.display = 'none';
      }
      element.style.display = 'block';
      move(element, event);
   }
   previouselement = element;
}

function move(menu, event) {
   var x, y;
   if (!event) event = window.event;
   if (!event) return false;

   if (event.x && event.y) {
      x = event.x;
      y = event.y;
   } else if (event.pageX && event.pageY) {
      x = event.pageX;
      y = event.pageY;
   }

   var div = document.getElementById('exploder');


   if (typeof event.pageY == 'number') {    //mozilla  Netscape
      //Check if it is outside screen
      if ((x + menu.offsetWidth) > window.document.body.offsetWidth) {
         x = x - ( (x + menu.offsetWidth) - window.document.body.offsetWidth);
      }
      if ((y + menu.offsetHeight) > window.document.body.offsetHeight) {
         y = y - ( (y + menu.offsetHeight) - window.document.body.offsetHeight);
      }
   } else {  // IE
      if (!top.opera) {
         if ((!window.document.compatMode) || (window.document.compatMode == 'BackCompat')) {
            x += window.document.body.scrollLeft;
            y += window.document.body.scrollTop;
            //Check if it is outside screen
            if ((x + menu.offsetWidth) > window.document.body.offsetWidth) {
               x = x - ( (x + menu.offsetWidth) - window.document.body.offsetWidth);
               if (browser.isIE55) {
                  x -= 18;
               }
            }
            if (!browser.isIE55) {
               var windowHeight = window.document.body.offsetHeight;
               //if (browser.isIE55) {
               //windowHeight -= 38;
               //}
               if ((y + menu.offsetHeight) > windowHeight) {
                  y = y - ( (y + menu.offsetHeight) - windowHeight);
                  // 	if (browser.isIE55) {
                  //y -= 10;
                  //	}
               }
            } else {
               var windowHeight = div.offsetHeight + div.scrollTop;

               if ((y + menu.offsetHeight) > windowHeight) {
                  y = y - ( (y + menu.offsetHeight) - windowHeight);

               }
               y -= 30;
            }
         } else {
            x += window.document.documentElement.scrollLeft;
            y += window.document.documentElement.scrollTop;
            //Check if it is outside screen
            if ((x + menu.offsetWidth) > document.documentElement.offsetWidth) {
               x = x - ( (x + menu.offsetWidth) - document.documentElement.offsetWidth);
            }
            if ((y + menu.offsetHeight) > document.documentElement.offsetHeight) {
               y = y - ( (y + menu.offsetHeight) - document.documentElement.offsetHeight);
            }
         }
      }
   }


   menu.style.top = y + toCompensateY() + 'px';
   menu.style.left = x + toCompensateX() + 'px';
}

