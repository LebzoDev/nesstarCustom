function setUrl(url) {
	document.location.href = url;
	return false;
}	

function changeOp(url,id) {
    var op = customGetElementById(id);
    if (op) {
        url += "&"+id+"="+escape(op[op.selectedIndex].value);
        setUrl(url);
    }
}

function changeCon(url,id) {
    var op = customGetElementById(id);
    if (op) {
        url += "&"+id+"="+escape(op[op.selectedIndex].value);
        setUrl(url);
    }
}

categories = new Array(0);
catnode = new Array(0);
var indexofprevious = 0;
var previousnode;



/**
 * Creates and loads a url with submitted cases
 * for a continues variable in a subset
 * @param url
 */
function setIt(url) {

    var expr = "";

   if (continfields) {
      if(isNaN(continfields.value) || continfields.value=="") {
         alert(translation.subset_invalid_value);
         return;
      }

      if(maxConValue && continfields.value > maxConValue) {
         alert(translation.subset_max_too_high+" "+maxConValue);
         return;
      }
      if(minConValue && continfields.value < minConValue) {
         alert(translation.subset_min_too_low+" "+minConValue);
         return;
      }

      categories[categories.length] = continfields.value;
   }

    for (i=0;i < categories.length; i++) {
        if (i > 0) expr += " , ";
        expr += encode(categories[i]);
    }
    url += expr;

    setUrl(url);
}

function encode(expr) {
	expr = replace(expr, ',', '%26%2344%3B');
	expr = replace(expr, '-', '%26%2345%3B');

	return expr;
}

function replace(string,text,by) {
// Replaces text with by in string
    var strLength = string.length, txtLength = text.length;
    if ((strLength == 0) || (txtLength == 0)) return string;

    var i = string.indexOf(text);
    if ((!i) && (text != string.substring(0,txtLength))) return string;
    if (i == -1) return string;

    var newstr = string.substring(0,i) + by;

    if (i+txtLength < strLength)
        newstr += replace(string.substring(i+txtLength,strLength),text,by);

    return newstr;
}



var continfields;
var maxConValue;
var minConValue;

function setMaxMinConVal(max,min){
   if(!maxConValue) maxConValue = max;
   if(!minConValue) minConValue = min;
}

function setList(input) {
   if(!continfields) continfields = input;
}

var multiple = false;

function isMultiple() {
	multiple = true;
}

function select(node,number,e, where) {
     if(!e)
	    e=window.event;


	shift = e.shiftKey;
    ctrl = e.ctrlKey;

    disableSelect(node);

	if (!multiple) {
		ctrl = false;
		shift = false;
	}

    if (ctrl == false && shift == false) {

           for ( i=0; i< catnode.length; i++ ) {
               if(catnode[i] != null) catnode[i].className = "";
           }

           catnode = new Array(1);
           categories = new Array(1);
           catnode[0] = node;
           categories[0] = number;
    }
     else if(ctrl != false){


        tempcats = new Array(categories.length+1);
        var b;
        for (b=0;b< categories.length;b++) {
            tempcats[b] = categories[b];
        }
        tempcats[categories.length] = number;
        categories = tempcats;
        tempnodes = new Array(parseInt(catnode.length)+1);
        var d;
        for (d=0;d< catnode.length;d++) {
            tempnodes[d] =catnode[d];
        }
        tempnodes[catnode.length] = node;
        catnode = tempnodes;

    }
    else if (shift != false) {

        if (parseInt(indexofprevious) > parseInt(where) ) {
            tempnodes = new Array(parseInt(indexofprevious)- parseInt(where)+1);
            tempcats = new Array(parseInt(indexofprevious)- parseInt(where)+1);
            var current = node;
            var teller = 0;
             for (var b=where; b <= indexofprevious; b++) {
                    tempnodes[teller] = current;
                    tempcats[teller] = current.id;
                    current.className = "selected";
                    current = current.nextSibling;
                    //Remove the <br> tag at the end
                    current = current.nextSibling;
                    teller++;
             }
             catnode = tempnodes;
             categories = tempcats;
        }
        else {
            tempnodes = new Array(parseInt(where)- parseInt(indexofprevious)+1);
            tempcats = new Array(parseInt(where)- parseInt(indexofprevious)+1);
            var current = previousnode;
            var teller = 0;

             for (var b=indexofprevious; b <= where;b++) {
                    tempnodes[teller] = current;
                    tempcats[teller] = current.id;
                    current.className = "selected";
                    current = current.nextSibling;
                    teller++;
             }
            catnode = tempnodes;
            categories = tempcats;
        }
      return false;
    }
    node.className = "selected";

    //Set the index of the previousnode
    indexofprevious = where;
    previousnode = node;


}


function makeNotSelectable(id) {

    var element = document.getElementById(id);
    if (element) disableSelect(element);

 }


// Disable text selection
function disableSelect(node) {
    // Internet explorer
    if (document.all) {
        node.onselectstart = function () { return false; };
    // w3c DOM
    } else {
        node.onmousedown =  function () { return false; };
	}
}

// Reenable text selection
function enableSelect(node) {
    // Internet explorer
    if (document.all) {
        node.onselectstart = function () { return true; };
        // w3c DOM
    } else {
        node.onmousedown =  function () { return true; };
    }
}

var previousnode;
var removeurl;

function markForDeletion(node,url) {

	if (previousnode) previousnode.style.backgroundColor = '#ffffff';
	if (node) node.style.backgroundColor = '#c0c0c0';
	previousnode = node;
	removeurl = url;
}

function removeOne() {
    if (!removeurl) {
        alert(translation.variable_subset_notselected);
    } else setUrl(removeurl);
    
	return false;
}

function setExecute() {
	var element = document.getElementById('executedownload');
   if (element) {
		element.value = 'true';
	}
}
