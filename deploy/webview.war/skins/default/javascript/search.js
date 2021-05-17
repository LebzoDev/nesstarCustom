function moreFields(id, index) {
	//If no prefix is set, set to empty
	if (!id) id = "";

	var isOkDate = getIfDateIsOk(id);
	if (!isOkDate) return false;

	var addrowafter = xGetElementById("addrowafter");
	if (addrowafter)
		addrowafter.value = index;
	document.forms['advancedform'].submit();
	return false;
}

function lessFields(id, index) {
	var removerow = xGetElementById("removerow");
	if (removerow)
		removerow.value = index;
	
	document.forms['advancedform'].submit();
	
	return false;
}

function getIfDateIsOk(id) {
	for (var i=1; i <= 4; i++) {
		var line = document.getElementById(id+'ad'+i);
		if (line == null) return true; //no need to continue
		if (line.style && line.style == 'visibility: none') {}
		else {
			var text = document.getElementById(id+'t'+i);
			var field = document.getElementById(id+'f'+i);
			if (fields[field.selectedIndex]) {
				//It is a date field
				if (!isDate(text.value, true)) {
					text.style.background = 'red';
					return false;
				}
			}
			text.style.background = 'white';
		}
	}
	return true;
}


function setExecute(id) {
	//If no prefix is set, set to empty
	if (!id) id = "";

	var isOkDate = getIfDateIsOk(id);
	if (!isOkDate) return false;

	var element = document.getElementById('execute');
	if (element) {
		element.value = 'true';
	}
	return true;
}

function executeOnKey(id, e) {
	if (!e) e = window.event;
	if (!id) id = "";

	for (var i=1; i <= 4; i++) {
		var text = document.getElementById(id+'t'+i);
		if (text) text.style.background = 'white';
	}


    if (e.keyCode == '13') {
		return setExecute();
	}
}

function setAdvancedExecute() {
	

}

var awin = "";

function openAdvancedSearch(link) {
   if(awin.closed || awin == "") {
      awin = window.open(link,'advancedsearch','toolbar=no,location=no,directories=no,status=yes,menubar=no,resizable=yes,copyhistory=no,scrollbars=yes,width=670,height=375');
   }
   if (awin) {
      awin.focus();
   }
}


function fieldChanged(select, id) {
	var text = document.getElementById(id);

	if (fields[select.selectedIndex]) {
		if (text.value.length > 0 && !isDate(text.value, false)) {
			//text.value = "yyyy/mm/dd";
			text.style.background = 'red';
			text.title = translation.dateformat;
			text.focus();
		} else {
			text.style.background = 'white';
			text.title = '';
		}
	  	//alert("It is date");
	 } else {
	 	text.style.background = 'white';
		text.title = '';
	 }
}


/**
 * DHTML date validation script. Courtesy of SmartWebby.com (http://www.smartwebby.com/dhtml/)
 */
// Declaring valid date character, minimum year and maximum year
var dtCh= "/";
var minYear=1000;
var maxYear=9999;

function isInteger(s){
	var i;
    for (i = 0; i < s.length; i++){
        // Check that current character is number.
        var c = s.charAt(i);
        if (((c < "0") || (c > "9"))) return false;
    }
    // All characters are numbers.
    return true;
}

function stripCharsInBag(s, bag){
	var i;
    var returnString = "";
    // Search through string's characters one by one.
    // If character is not in bag, append to returnString.
    for (i = 0; i < s.length; i++){
        var c = s.charAt(i);
        if (bag.indexOf(c) == -1) returnString += c;
    }
    return returnString;
}

function daysInFebruary (year){
	// February has 29 days in any year evenly divisible by four,
    // EXCEPT for centurial years which are not also divisible by 400.
    return (((year % 4 == 0) && ( (!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28 );
}
function DaysArray(n) {
	for (var i = 1; i <= n; i++) {
		this[i] = 31
		if (i==4 || i==6 || i==9 || i==11) {this[i] = 30}
		if (i==2) {this[i] = 29}
   }
   return this
}

function isDate(dtStr, doAlert){
	var daysInMonth = DaysArray(12)
	var pos1=dtStr.indexOf(dtCh);
	if (pos1 == -1) {
		var strYear=dtStr;
		if (!isInteger(strYear)) {
			if (doAlert)  alert(translation.dateformat)
			return false
		}
		strMonth = '01';
		strDay = '01';
	} else {
		var pos2=dtStr.indexOf(dtCh,pos1+1)
		if (pos2 == -1) {
			var strYear=dtStr.substring(0,pos1)
			var strMonth=dtStr.substring(pos1+1)
			strDay = '01';
		} else {
			var strYear=dtStr.substring(0,pos1)
			var strMonth=dtStr.substring(pos1+1,pos2)
			var strDay=dtStr.substring(pos2+1)
		}
	}


	strYr=strYear
	if (strDay.charAt(0)=="0" && strDay.length>1) strDay=strDay.substring(1)
	if (strMonth.charAt(0)=="0" && strMonth.length>1) strMonth=strMonth.substring(1)
	for (var i = 1; i <= 3; i++) {
		if (strYr.charAt(0)=="0" && strYr.length>1) strYr=strYr.substring(1)
	}


	if (!isInteger(strYr)) {
		if (doAlert)  alert(translation.dateformat)
		return false
	}

	if (!isInteger(strMonth)) {
		if (doAlert)  alert(translation.dateformat)
		return false
	}

	if (!isInteger(strDay)) {
		if (doAlert)  alert(translation.dateformat)
		return false
	}

	month=parseInt(strMonth);
	day=parseInt(strDay);
	year=parseInt(dtStr);
	//if (pos1==-1 || pos2==-1){
	//	if (doAlert) alert("The date format should be : yyyy/mm/dd")
	//	return false
	//}
	if (strMonth.length<1 || month<1 || month>12){
		if (doAlert)  alert(translation.dateformatmonth)
		return false
	}
	if (strDay.length<1 || day<1 || day>31 || (month==2 && day>daysInFebruary(year)) || day > daysInMonth[month]){
		if (doAlert) alert(translation.dateformatday)
		return false
	}
	if (strYear.length != 4 || year==0 || year<minYear || year>maxYear){
		if (doAlert)  alert("Please enter a valid 4 digit year between "+minYear+" and "+maxYear);
		return false
	}
	//if (dtStr.indexOf(dtCh,pos2+1)!=-1 || isInteger(stripCharsInBag(dtStr, dtCh))==false){
	//	if (doAlert)  alert("Please enter a valid date")
	//	return false
	//}
	return true
}

function ValidateForm(){
	var dt=document.frmSample.txtDate
	if (isDate(dt.value)==false){
		dt.focus()
		return false
	}
    return true
 }

//Toggle the visibility to the div sibling of the current image
function toggleVisibility(image) {
  var div = image.nextSibling;
   while(!document.all && div.nodeType != div.ELEMENT_NODE) {
      div = div.nextSibling;
  }
  var isRoot = false;
  if (!div.tagName) div = div.nextSibling;
  if (image.tagName == 'A' || image.tagName == 'a') isRoot = true;
  if (div.style.display == 'none') {
    div.style.display = 'block';
    if(isRoot) {
      var childImage = getChildImage(image);
      childImage.src = pics[1].src;
    } else {
      var li = getParentLi(image);
      li.className = 'studyopen';
    }
  } else {
    div.style.display = 'none';

    if(isRoot) {
      var childImage = getChildImage(image);
      childImage.src = pics[0].src;
    } else {
      var li = getParentLi(image);
      li.className = 'studyclosed';
    }
  }
}

function getParentLi(node) {
  if (node.tagName == 'LI' || node.getTagName == 'li') return node;
  var li = node.parentNode;
  while (li.tagName != 'LI' && li.tagName != 'li') {
    li = li.parentNode;
  }
  return li;
}


function getChildImage(image) {
   var childImage = image.firstChild;
    while(!document.all && childImage.nodeType != childImage.ELEMENT_NODE) {
        childImage = childImage.firstChild;
   }
   return childImage;
}
