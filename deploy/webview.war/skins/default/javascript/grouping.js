
var separator = "|";

function addGroup(varCode, type, catCode, isLayer) {

	//Add the new catCode to the subset in the form
	addToSubset(varCode, catCode);
	if (isLayer) {
		addSlice(varCode, catCode);
	}

	if (!type) type = "add";
	if (type == 'agg' || type == 'avg') {
		return createAggregatedGroup(varCode, type, null, true, catCode);
	} else if (type == 'add' || type == 'mul') {
		return createAddOrMulGroup(varCode, type, null, true, catCode);
	} else if (type == 'sub' || type == 'div' || type == 'pc' || type == 'pcGrow' || type == 'pcTot') {
	    return createSubandDivGroup(varCode, type, null, true, catCode);
	}
	return false;
}

function createSubandDivGroup(varCode, type, edit, visible, catCode) {
    var categories = document.getElementById('categories');
    var inputs = categories.getElementsByTagName('input');
    var firstIsCat = true;
    var secondIsCat = true;
    var label = getLabel();
	//If no label is set
	if (!label || label.length == 0) {
		alert(translation.group_no_label);
		return false;
	}

    for (var i=0; i < inputs.length; i++) {
        if (inputs[i].type == 'radio') {
            if (inputs[i].checked) {
                if (inputs[i].name == 'first') {
                    if (inputs[i].id == 'firstnumber') firstIsCat = false;
                } else if (inputs[i].name == 'second') {
                    if (inputs[i].id == 'secondnumber') secondIsCat = false;
                }
            }
        }
    }

    if (type == 'pcTot') secondIsCat = false;

	if (!firstIsCat && !secondIsCat) {
		alert(translation.group_both_numbers);
		return false;
	}

    if (firstIsCat && secondIsCat) {
        var firstList = document.getElementById('firstCategoryList');
        var secondList = document.getElementById('secondCategoryList');
        if (firstList.selectedIndex == secondList.selectedIndex) {
            alert(translation.group_same_cat_selected);
            return false;
        }
    }
    var first = "";
    var second = "";
    if (firstIsCat) {
        var firstList = document.getElementById('firstCategoryList');
        var value = firstList.options[firstList.selectedIndex].value;
        first = "C:"+value;
    } else {
        first = "N:";
        var num = document.getElementById('firstnumberText');
        if (checkNumber(num.value)) {
            first += num.value;
        } else {
            alert(translation.group_first_NAN);
            return false;
        }
    }

    var decimals = document.getElementById('decimal');
	if (!isProperDecimal(decimals)) return false;

    if (type == 'pcTot') {
        var grouped = type+ separator +varCode + separator + decimals.value +separator+first+separator+label+separator+visible;
        if (catCode) {
    		grouped += separator+catCode;
    	}
        return updateTable(grouped, edit);
    }

    if (secondIsCat) {
        var secondList = document.getElementById('secondCategoryList');
        var value = secondList.options[secondList.selectedIndex].value;
        second = "C:"+value;
    } else {
        second = "N:";
        var num = document.getElementById('secondnumberText');
        if (checkNumber(num.value)) {
            second += num.value;
        } else {
            alert(translation.group_second_NAN);
            return false;
        }
    }
    var group = type+ separator+varCode + separator + decimals.value + separator+first+separator+second+separator+label+separator+visible;
    if (catCode) {
    	group += separator+catCode;
    }
    return updateTable(group, edit);
}

function createAddOrMulGroup(varCode, type, edit, visible, catCode) {

	var cats = getSelectedCategories();

    if (cats.length == 0)  {
		alert(translation.group_nocats);
		return false;
	}

	var label = getLabel();
	//If no label is set
	if (!label || label.length == 0) {
		alert(translation.group_no_label);
		return false;
	}
    var number = getNumber(type);
    if (!checkNumber(number)) {
        alert(translation.group_NAN);
        return false;
    }
    var decimals = document.getElementById('decimal');
	if (!isProperDecimal(decimals)) return false;

    var group = type+ separator+varCode + separator+ decimals.value + separator+cats+separator+number+separator+label+separator+visible;
    if (catCode) {
    	group += separator+catCode;
    }
    return updateTable(group, edit);

}

function createAggregatedGroup(varCode, type, edit, visible, catCode) {
    var cats = getSelectedCategories();
    if (cats.length == 0)  {
		alert(translation.group_nocats);
		return false;
	}
    var label = getLabel();
    //If no label is set
	if (!label || label.length == 0) {
		alert(translation.group_no_label);
		return false;
	}
	var decimals = document.getElementById('decimal');
	if (!isProperDecimal(decimals)) return false;

    var group = type+ separator+varCode + separator + decimals.value + separator +cats+separator+label+separator+visible;
    if (catCode) {
    	group += separator+catCode;
    }
    return updateTable(group, edit);
}

function updateTable(group, edit) {
	var form = document.getElementById('hiddenform');
	if (edit) edit.value = group;
    else appendToFormGroup(form, 'group', group);

    removeFromForm(form);
    form.submit();
    try {
    hideTheViewArea();
    } catch (error) {
      //alert(error);
    }
    window.close();
    return false;
}


function ToggleAllTreeCalc(checked) {

	var form = document.getElementById('categories');
	var inputs = form.getElementsByTagName('input');

    len = inputs.length;
    var i = 0;
    for(i = 0; i < len; i++) {
    	if (inputs[i].type == 'checkbox') {
        	inputs[i].checked = checked;
        }
    }
}


function URLencode(sStr) {
    return escape(sStr).replace(/\,/g, '%2C').replace(/\+/g, '%2B').replace(/\"/g,'%22').replace(/\'/g, '%27');
}




function addToSubset(varCode, catCode) {
	var key = varCode + 'subset';
	var form = document.getElementById('hiddenform');
	var elements = form.elements;
	var length = elements.length;
	for (var i=0; i < length; i++) {
		if (elements[i].name == key) {
			elements[i].value += ','+catCode;
		}
	}
}

function isProperDecimal(decimals) {
	if (decimals) {
		if (!checkNumber(decimals.value)) {
        	alert(translation.group_NAN);
        	return false;
    	}
    	return true;
	} else {
		return false;
	}
}

function resetSubset(varCode, varSubset) {

	var key = varCode + 'subset';

	var form = document.getElementById('hiddenform');
	var elements = form.elements;
	var length = elements.length;
	for (var i=0; i < length; i++) {
		if (elements[i].name == key) {
			elements[i].value = varSubset;
		}
	}
}


function addSlice(varCode, catCode) {
	var key = varCode + 'slice';
	var form = document.getElementById('hiddenform');
	var elements = form.elements;
	var length = elements.length;
	for (var i=0; i < length; i++) {
		if (elements[i].name == key) {
			elements[i].value = catCode;
		}
	}
}

function getNumber(type) {
	if (!type) type = '';
	var number = document.getElementById('number').value;
    if (!number) {
    	if (type == 'mul') number = 1;
    	else number = 0;
    }

    try {
    	parseInt(number);
    } catch (e) {
    	if (type == 'mul') number = 1;
    	else number = 0;
    }
    return number;
}

function getLabel() {
	var label = document.getElementById('label').value;

	if (label) {
	    //Replace | if it has been used.
	    //label = replace(label, '|', '%26%23124%3B');
	    label = replace(label, '|', '&#124;');
	}

    //if (!label) label = ' ';
    return label;
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

function getSelectedCategories() {
	var categories = document.getElementById('categories');
    var inputs = categories.getElementsByTagName('input');
    var cats = "";
    for (var i=0; i < inputs.length; i++) {
        if (inputs[i].checked) {
            if (cats.length > 0) cats += ",";
            cats += inputs[i].value;
        }
    }
    return cats;
}

function changeEditCategory(select) {
	id = select.options[select.selectedIndex].id;
	value = select.options[select.selectedIndex].value;

	//The hiddenform
	var hiddenform = document.getElementById('hiddenform');

	if (hiddenform) {
		var elements = hiddenform.elements;
		var length = elements.length;
		var found = false;
		for (var i=0; i < length; i++) {
			if (elements[i].name == 'toedit') {
				found = true;
				if (value == 'nothing') {
					elements[i].name = 'remove';
					elements[i].value = 'remove';
				} else {
					elements[i].value = value;
				}
			}
		}
		if (!found) {
			if (value != 'nothing') appendToFormGroup(hiddenform, 'toedit',value);
		}
		hiddenform.target = '';
	}
	hiddenform.submit();
}

function editGroup(varCode, index, catCode, type) {

	var group = new Array();
	var hiddenform = document.getElementById('hiddenform');

	var elements = hiddenform.elements;
	var length = elements.length;
	for (var i=0; i < length; i++) {
		if (elements[i].name == 'group') group[group.length] = elements[i];
	}

	var edit = group[parseInt(index)];


	if (type == 'agg' || type == 'avg') {
		return createAggregatedGroup(varCode, type, edit, true, catCode);
	} else if (type == 'add' || type == 'mul') {
		return createAddOrMulGroup(varCode, type, edit, true, catCode);
	} else if (type == 'sub' || type == 'div' || type == 'pc' || type == 'pcGrow' || type == 'pcTot') {
	    return createSubandDivGroup(varCode, type, edit, true, catCode);
	}

	return false;
}

function deleteGroupDirectly(index, varCode, varSubset) {
   var dialogFrame = top.main.rightsidemainframe.rightside;
   var handleYes = function() {
      resetSubset(varCode, varSubset);

      var group = new Array();
      var hiddenform = document.getElementById('hiddenform');

      var elements = hiddenform.elements;
      var length = elements.length;
      for (var i=0; i < length; i++) {
         if (elements[i].name == 'group') group[group.length] = elements[i];
      }

      var edit = group[parseInt(index)];
      if (edit) {
         edit.name = 'remove';
         edit.value = 'remove';
      }

      removeFromForm(hiddenform);
      hiddenform.submit();
      hideTheViewArea();
      window.close();
      this.hide();
      return false;

   };
   dialogFrame.setDialogButtons(handleYes, null, translation.confirm_delete_calculated_category + "?");
   return false;
}

function deleteGroupIndirectly(varCode, index, catCode, type, cats, varSubset) {

	resetSubset(varCode, varSubset);

	var group = new Array();
	var hiddenform = document.getElementById('hiddenform');

	var elements = hiddenform.elements;
	var length = elements.length;
	for (var i=0; i < length; i++) {
		if (elements[i].name == 'group') group[group.length] = elements[i];
	}
	//The element in the form to edit
	var edit = group[parseInt(index)];

    if (type == 'agg' || type == 'avg') {
		return createAggregatedGroup(varCode, type, edit, false, catCode);
	} else if (type == 'add' || type == 'mul') {
		return createAddOrMulGroup(varCode, type, edit, false, catCode);
	} else if (type == 'sub' || type == 'div' || type == 'pc' || type == 'pcGrow' || type == 'pcTot') {
	    return createSubandDivGroup(varCode, type, edit, false, catCode);
	}

	return false;
}

function changeTypes(select) {
	id = select.options[select.selectedIndex].id;
	value = select.options[select.selectedIndex].value;

	//The hiddenform
	var hiddenform = document.getElementById('hiddenform');

	if (hiddenform) {
		var elements = hiddenform.elements;
		var length = elements.length;
		var found = false;
		for (var i=0; i < length; i++) {
			if (elements[i].name == 'calType') {
				found = true;
				elements[i].value = value;
			}
		}
		if (!found) {
			appendToFormGroup(hiddenform, 'calType',value);
		}
		hiddenform.target = '';
	}
	hiddenform.submit();

}



function removeFromForm(form) {
    var elements = form.elements;
    for (var i=0; i < elements.length; i++) {
        if (elements[i].name == 'togroup'  || elements[i].name == 'insertmode' || elements[i].name == 'edit' || elements[i].name == 'toedit' || elements[i].name == 'calType') {
            elements[i].name = 'remove';
            elements[i].value = 'remove';
        }
    }
}

function appendToFormGroup(form, name, value) {
	 //create for element
      var oInputMon = document.createElement("INPUT");
      oInputMon.type = "hidden";
      oInputMon.name = name;
      oInputMon.value = value;

      form.appendChild(oInputMon);
}



function checkNumber(value){
    //var anum=/(^\d+$)|(^\d+\.\d+$)/
     var anum  =  /(^-?\d\d*\.\d*$)|(^-?\d\d*$)|(^-?\.\d\d*$)/;
    if (anum.test(value)) {
        testresult=true
    }
    else{
        testresult=false
    }
    return (testresult);
}
