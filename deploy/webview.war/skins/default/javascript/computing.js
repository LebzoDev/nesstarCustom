function removeSelectedVariables() {
    var changed = false;
    var form = document.getElementById('computeRemove');
    var removeform = document.getElementById('computeAdd');
    var cells = form.getElementsByTagName('input');
    for (var i=0; i < cells.length; i++) {
        if (cells[i].type == 'checkbox') {
            if (cells[i].checked) {
                var removecells = removeform.getElementsByTagName('input');
                for (var j=0; j < removecells.length; j++) {
                    if (removecells[j].name == 'compVar') {
                        if (removecells[j].value == cells[i].value) {
                            removecells[j].name = 'remove';
                            removecells[j].value = 'remove';
                            changed = true;
                        }
                    }
                }
            }
        }
    }
    if (changed) removeform.submit();
}

function submitForm() {
	var form = document.getElementById('computeSub');
	if (form) form.submit();
}

function setExecuteBit() {
   var ok = checkName();
	if (!ok) return false;



	var form = document.getElementById('computeAdd');
	appendToForm(form, 'true', 'execute');
	return true;
}

function setExecuteBitSub() {
	var ok = checkName();
	if (!ok) return false;
	var form = document.getElementById('computeSub');
	appendToForm(form, 'true', 'execute');
	return true;
}

function setExecuteBitRecode() {
	var ok = checkName();
	if (!ok) return false;
	ok = checkOtherValue();
	if (!ok) return false;
	setFormSubmitAllowed();

	var form = document.getElementById('recodeForm');
	appendToForm(form, 'true', 'execute');
	return true;
}

function setFormSubmitAllowed() {
	var form = document.getElementById('recodeForm');
	form.onsubmit  = function()
    {
        return true;
    }
}

function checkRecodeFormValidity() {
	ok = checkNewValue();
	if (!ok) return false;

	ok = checkOldValues();
	if (!ok) return false;

	return setFormSubmitAllowed();
}

function checkOldValues() {
	var value = document.getElementById("recode_value_id");
	if (document.getElementById("recode_value_id") && document.getElementById("recode_value_id").checked ) {
		var value = document.getElementById("value_value_id");
		if (!checkNumber(value.value)) {
		   alert(translation.recode_no_value_given);
			return false;
		}
		return true;
	} else if (document.getElementById("recode_range_id") && document.getElementById("recode_range_id").checked) {
		var start = document.getElementById("value_range_id");
		var end = document.getElementById("value_through_id");
		if (!checkNumber(start.value)) {
         alert(translation.recode_no_start_value_given);
			return false;
		}
		if (!checkNumber(end.value)) {
		   alert(translation.recode_no_end_value_given);
			return false;
		}
		return true;
	} else if (document.getElementById("recode_range_lo_id") && document.getElementById("recode_range_lo_id").checked) {
		var end = document.getElementById("lo_through_value_id");
		if (!checkNumber(end.value)) {
		   alert(translation.recode_no_end_value_given);
			return false;
		}
		return true;
	} else if (document.getElementById("recode_range_hi_id") && document.getElementById("recode_range_hi_id").checked) {
		var start = document.getElementById("value_through_hi_id");
      if (!checkNumber(start.value)) {
		   alert(translation.recode_no_start_value_given);
			return false;
		}
		return true;
	}

	return false;
}


function checkNewValue() {
	var value = document.getElementById('new_value_id');
	if (value) {
		if (!checkNumber(value.value)) {
            alert(translation.recode_new_value_not_ok);
			return false;
		}
		return true;
	} else return false;
}


function checkOtherValue() {
	var other_value_recode = document.getElementById('other_value_recode_id');

	if (other_value_recode) {
		if (other_value_recode.checked) {
			var value = document.getElementById('other_value_id');
			if (value) {
				if (!checkNumber(value.value)) {
					alert(translation.recode_other_value_not_ok);
					return false;
				}
				return true;
			} else return false;
		}
	}
	return true;
}


function checkName() {
	var label = document.getElementById('varname_id');
	if (label) {
      if (label.value.length == 0) {
			alert(translation.compute_name_not_ok);
			return false;
		}
		return true;
	} else return false;
}

function setToCancelSub() {
	var form = document.getElementById('computeSub');
	removeFromForm(form);
}

function setToCancel() {
	var form = document.getElementById('computeAdd');
	removeFromForm(form);
}

function setToCancelRecode() {
	var form = document.getElementById('recodeForm');
	removeFromForm(form);
	appendToForm(form, 'true', 'remove_recode');
	setFormSubmitAllowed();
	return true;
}

function removeFromForm(form) {
	var cells = form.getElementsByTagName('input');
	var length = cells.length;
	for (var i=0; i < length; i++) {
		if (toRemove(cells[i].name)) {
			cells[i].name = 'remove';
			cells[i].value = '';
		}
	}
}

function toRemove(key) {
	var length = remove.length;
	for (var j=0;j < length; j++) {
		if (remove[j] == key) return true;
	}
	return false;
}


function appendToForm(form, variable, newname) {
	 //create element
      var oInputMon = document.createElement("INPUT");
      oInputMon.type = "hidden";
      oInputMon.name = newname;
	   oInputMon.value = variable;

      form.appendChild(oInputMon);
}


function checkNumber(value){
    var anum  =  /(^-?\d\d*\.\d*$)|(^-?\d\d*$)|(^-?\.\d\d*$)/;
    if (anum.test(value)) {
        testresult=true;
    }
    else{
        testresult=false;
    }
    return (testresult);
}


function checkIfOthersDisabled(radio, others) {
	var value = document.getElementById('other_value_id');
	var label = document.getElementById('other_label_id');
	var missing = document.getElementById('other_missing_box_id');
	if (others) {
		value.disabled = false;
		label.disabled = false;
		missing.disabled = false;
	} else {
		value.disabled = true;
		label.disabled = true;
		missing.disabled = true;
	}
}

function deleteComputeDialog(question) {
   var handleYes = function() {
      var form = xGetElementById('deleteComputeForm');
      //The following lines add a hidden input to the form to "simulate" the submit button
      var hidden = xCreateElement("input");
      hidden.type = "hidden";
      hidden.name = "delete";
      hidden.value = "Delete";
      xAppendChild(form, hidden);
      form.submit();
   }
   setDialogButtons(handleYes, null, question);
   return false;
}


remove = new Array();
remove[remove.length] = "_opID";
remove[remove.length] = "_cancelled";
remove[remove.length] = "scheme";
remove[remove.length] = "execute";
remove[remove.length] = "compVar";
remove[remove.length] = "label";
remove[remove.length] = "numValue";
remove[remove.length] = "first";
remove[remove.length] = "firstNum";
remove[remove.length] = "second";
remove[remove.length] = "secondNum";
remove[remove.length] = "firstVar";
remove[remove.length] = "secondVar";
