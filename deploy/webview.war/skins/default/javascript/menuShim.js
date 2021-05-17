
function initMenuShim(){
 if (document.getElementById("mainmenu")){ // does #nav element exist?  
  var sfEls = document.getElementById("mainmenu").getElementsByTagName("LI");
  for (var i=0; i<sfEls.length; i++){   
   sfEls[i].addEventListener("onmouseover",useMenuShim, false);
   sfEls[i].addEventListener("onmouseout",dropMenuShim,false);
  }
  createMenuShim();
 }
}

if (document.all && window.attachEvent){
 window.attachEvent("onload", initMenuShim);
}

function createMenuShim(){ // create the hidden iframe if needed
 if (!document.getElementById("menuShim")){ // does 'menuShim' exist already?
  // 1) Let's prep the styles of the sub-nav LI's
  var nav = document.getElementById("mainmenu");
  var navLIs = nav.getElementsByTagName("LI");
  var navLIsL = navLIs.length; // cache
  for (var i=0;i<navLIsL;i++){
   navLIs[i].style.zIndex = "1"; // set z-index to show above iframe
  }
  // 2) Let's create the menu shim
  var menuShim = document.createElement("iframe");
  menuShim.src = "javascript:false"; // dummy URL
  menuShim.style.position = "absolute";
  menuShim.style.zIndex = "0";
  menuShim.style.display = "none";
  menuShim.id = "menuShim";
  var dBody = document.getElementsByTagName('body').item(0);
  dBody.appendChild(menuShim); // append iframe to body node tree
  isMenuShimCreated = true; // set flag to true
 }
}

function useMenuShim(e){
 var eSrc = getTargetElement(window.event);
 while(eSrc.parentNode.parentNode.id != "mainmenu"){ // get top <LI> in node tree under #nav
  eSrc = eSrc.parentNode;
 }
 var menuUL = eSrc.getElementsByTagName("UL").item(0); // get subnav UL
 var menuShim = document.getElementById("menuShim"); // conform menu shim to UL dimensions
 menuShim.style.top = DL_GetElementTop(menuUL);
 menuShim.style.left = DL_GetElementLeft(menuUL);
 menuShim.style.width = menuUL.offsetWidth;
 menuShim.style.height = menuUL.offsetHeight;
 menuShim.style.display = "block";
}

function dropMenuShim(){
 if (typeof(document.all) != "undefined"){ // support .all? assume IE
  document.getElementById("menuShim").style.display = "none";
 }
}

function getTargetElement(evt){
 var elem;
 if (evt.target) {
  elem = (evt.target.nodeType == 3) ? evt.target.parentNode : evt.target;
 } else {
  elem = evt.srcElement;
 }
 return elem;
}

/*
 The following functions are included with much thanks to the tutorial from DHTML Lab/DHTML Diner
 http://www.webreference.com/dhtml/diner/realpos1/7.html
*/

function DL_GetElementLeft(eElement)
{
    var nLeftPos = eElement.offsetLeft;          // initialize var to store calculations
    var eParElement = eElement.offsetParent;     // identify first offset parent element  
    while (eParElement != null)
    {                                            // move up through element hierarchy
        nLeftPos += eParElement.offsetLeft;      // appending left offset of each parent
        eParElement = eParElement.offsetParent;  // until no more offset parents exist
    }
    return nLeftPos;                             // return the number calculated
}

function DL_GetElementTop(eElement)
{
    var nTopPos = eElement.offsetTop;            // initialize var to store calculations
    var eParElement = eElement.offsetParent;     // identify first offset parent element  
    while (eParElement != null)
    {                                            // move up through element hierarchy
        nTopPos += eParElement.offsetTop;        // appending top offset of each parent
        eParElement = eParElement.offsetParent;  // until no more offset parents exist
    }
    return nTopPos;                              // return the number calculated
}