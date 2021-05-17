var previousothernode;
var otherurl;
var previousweightnode;
var weighturl;
var previousremovenode;
var removequery;

function selectWeightVariable(node,url) {
	if (node) node.style.backgroundColor = '#c0c0c0';

	if (previousweightnode) {
	 	if (previousweightnode.id != node.id) previousweightnode.style.backgroundColor = '#ffffff';
	}
	previousweightnode = node;
	weighturl = url;
}

function selectOtherVariable(node, url) {
	if (node) node.style.backgroundColor = '#c0c0c0';

	if (previousothernode) {
	 	if (previousothernode.id != node.id) previousothernode.style.backgroundColor = '#ffffff';
	}
	previousothernode = node;
	otherurl = url;
}

function selectToRemove(node,query) {
	if (node) node.style.backgroundColor = '#c0c0c0';

	if (previousremovenode) {
	 	if (previousremovenode.id != node.id) previousremovenode.style.backgroundColor = '#ffffff';
	}
	previousremovenode = node;
	removequery = query;
}

function selectOneWeight() {
	if (!weighturl) alert(translation.weight_error_noweightvar);
	else {
		addToUrl(weighturl);
	}
}

function selectOneOther() {
	if (!otherurl) alert(translation.weight_error_novar);
	else {
		addToUrl(otherurl);
	}
}


function addToUrl(what) {
	var theurl = document.location.href;

	var url = "";

	var elemente = theurl.split('?');
    url += elemente[0];
    url += '?';
    var element = elemente[1].split('&');

    var i=0;
    for ( i=0;i<element.length;i++) {
        var s = element[i];
        if (s.indexOf('_opID=') == -1 && s.indexOf('_cancelled=') == -1) {
        	if (i == 0) url += s;
        	else url += "&"+s;
        }
    }

	url += "&weights="+what;

	document.location.href = url;
}

function removeAllDialog(query, question) {
   var handleYes = function() {
      removeAll(query);
      this.hide();
   }
   setDialogButtons(handleYes, null, question);
}

function removeAll(query) {
    var theurl = document.location.href;

	var url = "";

	var elemente = theurl.split('?');
    url += elemente[0];
    url += '?';
    url += query;

    document.location.href = url;
}

function remove() {
	if (!removequery) alert(translation.weight_error_novar);
	else {
		removeAll(removequery);
	}
}

function setUrl(url) {
	document.location.href = url;
	return false;
}
