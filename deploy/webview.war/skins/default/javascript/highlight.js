function highlightSearchTerms(searchArray) {
  
  if (!document.body) {    
    return false;
  }    
  //console.info("Søketermer " + searchArray);
  highlightTree(document.body, searchArray);
  return true;
}

function highlightNode(node, searchArray) {
  var parentnode=node.parentNode;      
  for (var j=0; j < searchArray.length; j++) {
    var searchTerm = searchArray[j];
    
    var endsWithWild=false;
    var startsWithWild=false;
    if (searchTerm.lastIndexOf('*') == searchTerm.length-1) {
       endsWithWild=true;
    }
    if (searchTerm.indexOf('*') == 0){
        startsWithWild=true;  
    }
    
    searchTerm=searchTerm.replace(/\./g,"\\."); //Wildcard
    searchTerm=searchTerm.replace(/\*/g,"\\S\*"); //Wildcard
    searchTerm=searchTerm.replace(/\?/g,"\.");  //Single character
    searchTerm=searchTerm.replace(/ /g,"\\s"); //Any whitespace
    if (endsWithWild != true) searchTerm=searchTerm+"\\b";
    if (startsWithWild != true) searchTerm="\\b"+searchTerm;
              
    var text = node.nodeValue;
    var hitregexp = new RegExp(searchTerm,"gi");    
    //hitregexp.compile(searchTerm,"gi");    
    var hit = hitregexp.test(text);
    //console.info("Leter etter " + hitregexp.source + " i " +text);
    if (hit == true) {
       //console.info("Fant " + hitregexp.source + " i " +text);
       hitregexp.exec(text);                                                  
       var hittext = RegExp.lastMatch; 
       var pretext = RegExp.leftContext;
       var posttext = RegExp.rightContext;
                 
       var hitnode = document.createTextNode(hittext);
       var hitspan = document.createElement("span");
       hitspan.className = "searchHighlight"+(j % 5);
       hitspan.appendChild(hitnode);
                           
       var prenode = document.createTextNode(""+pretext);                            
       var postnode = document.createTextNode(""+posttext);
       
       if (parent != null) {
          try {         
             parentnode.insertBefore(prenode, node);         
             insertAfter(parentnode, postnode, node);         
             parentnode.replaceChild(hitspan, node);         
          } catch(e) {             
             var a="This is here just to have a breakpoint for the debuger :)";
             //console.info(a+ ": "+e);             
          }
       }
       
       if (trim(postnode.nodeValue) != "") {
          highlightNode(postnode, searchArray);               
       }

       if (trim(prenode.nodeValue) != "") {               
          highlightNode(prenode, searchArray);        
       }
    } 
  } 
}



function highlightTree(currentElement, searchArray) {   
  if (currentElement) {   
    var i=0;
    var currentElementChild=currentElement.childNodes[i];
    while (currentElementChild) {            
      // Recursively traverse the tree structure of the child node
      if (currentElementChild.nodeName == "#text") {
         //Skip empty text nodes. Highlighting the draggable elements make them behave strangely, so skip these too.
         if (trim(currentElementChild.nodeValue) != "" && currentElement.getAttribute("class") != "headlabel" && currentElement.getAttribute("class") != "stublabel" ) {            
            highlightNode(currentElementChild, searchArray);
            i++;
         }
      } else if (currentElementChild.nodeName != "#comment" && currentElementChild.nodeName.toLowerCase() != "script" && currentElementChild.getAttribute("id") != "drop") {            
            highlightTree(currentElementChild, searchArray);         
      }        
      currentElementChild=currentElement.childNodes[++i];      
    }
  }
  return true;
}
   
function insertAfter(parentnode, node, referenceNode) {
  if (referenceNode.nextSibling != null) {
     parentnode.insertBefore(node, referenceNode.nextSibling);
  } else {   
     parentnode.appendChild(node);
  }
}