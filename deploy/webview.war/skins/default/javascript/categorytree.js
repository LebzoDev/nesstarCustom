/**
 * @author kjetil
 */
   	


function openTree(sType, aArgs, oData) {
	clearInput('search_textinput');
	var oAutoComp = aArgs[0];
	var oItem = aArgs[1];
	var code = aArgs[2][1];
	selectAndOpenPath(code, 'topCategoryMenu');
}

function myOnDataReturn(sType, aArgs) {
   //Get the result of the query
   var aResults = aArgs[2];
 	//Reset the assosiative array
 	labels = new Object();
 	//The number of visible items in the drop down box.
 	//Never goes above 10. (index 9)
 	counter = aResults.length > 10 ? 9 : aResults.length-1;
}

function clearInput(inputId){
	var inputBox = xGetElementById(inputId);
	if(inputBox){
  		inputBox.value = '';
	}
}

function selectAndOpenPath(id, scrollArea) {
   var element = xGetElementById(id);
   if (element) {
		var clickedElement = element;
		var listEntry=clickedElement.parentNode;
		element.checked = 'checked';      			
		//Iterate through to the top
		while (element && element.id != 'topCategoryMenu') {         				     			
			if (element.tagName == 'UL') {         			
				element.className="open";
				if (element.parentNode.id != "topCategoryMenu") {
					siblings=element.parentNode.childNodes;
					for (i=0; i<siblings.length; i++) {
						if (siblings[i].tagName == 'A') {
							siblings[i].className="open";
   					}
   				}         				      
				}   				
			}
			element = element.parentNode;
		}
		
		//Scroll to selected element.
		try {
		 	var y = xPageY(clickedElement);
			var dimensions = scrollArea;         		
			var divpos = xPageY(dimensions);         
			var height = xHeight(dimensions);
         element=xGetElementById(dimensions);         			
     	   var scrollTo = 0;
			var currentYPosition = element.scrollTop;//(document.all) ? document.body.scrollTop : window.pageYOffset;
			if (((y - divpos) > (currentYPosition + (height / 2))) || ((y - divpos) < (currentYPosition - (height / 2)))) {
     		   scrollTo = (y - divpos) - (height/2);
			}
	
			if (scrollTo != currentYPosition) {
   				try {            					
            			element.scrollTop=scrollTo;		               			
   				} catch(ex) {
      					alert("Error: "+ex);
         		}
			} 			
   	} catch(ex) {
  	 		//alert("Error: "+ex);
   	}
   	//Highlight selected element.
   	listEntry.style.backgroundColor='#fbff00';
      myAnim = new YAHOO.util.ColorAnim(listEntry, {backgroundColor: { to: '#ffffff' } }); 
      myAnim.animate(); 
   }
}

function setAllBranches(id, value) {
   var tree = xGetElementById(id);
   var uls = tree.getElementsByTagName("ul");
   var as = tree.getElementsByTagName("a");

   for (var pos = 0; pos < uls.length; pos++) {	
      uls[pos].className=value;
   }

   for (var pos = 0; pos < as.length; pos++) {		
      as[pos].className=value;
   }				
}

function expandAll(id) {
   setAllBranches(id, "open");
}

function collapseAll(id) {
   setAllBranches(id, "closed");
}

function toggle(elementid) {
   var element=xGetElementById("ul"+elementid);
   if (element.className=="open") {
   	element.className="closed";
   } else {
   	element.className="open";
   }
   element=xGetElementById("opener"+elementid);
   if (element.className=="open") { 
   	element.className="closed";
   } else {
   	element.className="open";
   }
   element.blur();
}