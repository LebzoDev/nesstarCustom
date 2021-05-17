var vindu;
var nodeid;
var html;

function displayLogin(ip, id) {
	nodeid = id;

    html = document.getElementById('tocopy').innerHTML;
	
	setTimeout('waitABit()',500);
	vindu = window.open('',id,'toolbar=no,location=no,directories=no,status=yes,menubar=no,resizable=yes,copyhistory=no,scrollbars=yes,width=330,height=490');
	setTimeout('waitABit()',500);
	vindu.document.write("<html><head>");
	vindu.document.write("<script language=\'javascript\' type=\'text/javascript\' src=\'skins/default/javascript/login.js\'></script>");
	vindu.document.write("</head><body>");
	vindu.document.write(html);
	vindu.document.write("</body></html>");
	//vindu.document.close();
	vindu.focus();

	node = parent.document.getElementById(id+'iframe');
    vindu.registerFrame(node);
    //vindu.changeSubmit();
}
function waitABit(){}

var toset;
function registerFrame(node) {
	toset = node;
}

function changeSubmit() {
	document.login.onsubmit = function() {
		try {
			var url = "";
			var variables = document.login.elements;
			for (var i=0;i<variables.length;i++) {
					if (variables[i].type != 'submit') {
						if (i > 0) url += "&";
						url += variables[i].name;
						url += "=";
						url += variables[i].value;
					}
			}
			window.close();
			if (toset) {
				toset.src = document.login.action+"?"+url;
			}
		} catch (error) {
		}
		return false;
	};
}



