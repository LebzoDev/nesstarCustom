<?xml version='1.0'?>

<!DOCTYPE xsl:stylesheet [
<!ENTITY rdf "http://www.w3.org/1999/02/22-rdf-syntax-ns#" >
<!ENTITY rdfs "http://www.w3.org/TR/1999/PR-rdf-schema-19990303#" >
<!ENTITY n "http://www.nesstar.org/rdf/" >
<!ENTITY m "http://www.nesstar.org/rdf/Method/" >
<!ENTITY o "http://www.nesstar.org/rdf/Method/obj" >
<!ENTITY srvp "http://www.nesstar.org/rdf/Server#" >
<!ENTITY srv "http://www.nesstar.org/rdf/Server/" >
<!ENTITY ch "http://www.nesstar.org/rdf/Catalog/" >
<!ENTITY ds "http://www.nesstar.org/rdf/Dataset/" >
<!ENTITY se "http://www.nesstar.org/rdf/NSDStatEngine/" >
<!ENTITY on "http://www.nesstar.org/rdf/acu/" >
<!ENTITY op "http://www.nesstar.org/rdf/acu/User#" >

]>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns#'
                xmlns:rdfs='http://www.w3.org/TR/1999/PR-rdf-schema-19990303#'
                xmlns:ds="&ds;"
                xmlns:ch="&ch;"
                xmlns:se="&se;"
                xmlns:n="&n;"
                xmlns:srvp="&srvp;"
                xmlns:srv="&srv;"
				xmlns:r="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
				xmlns:s="http://www.w3.org/TR/1999/PR-rdf-schema-19990303#"
				xmlns:on="&on;"
				xmlns:op="&op;"
                xmlns:saxon="http://icl.com/saxon"
                extension-element-prefixes="saxon"
                version="1.0" >

<xsl:output
	indent="yes"
	encoding="UTF-8"
	media-type="text/html"
	method="html"
	omit-xml-declaration="yes"
	doctype-public="-//W3C//DTD HTML 4.01 Transitional//EN"
	doctype-system="http://www.w3.org/TR/html4/loose.dtd"/>

<xsl:template match="text()"/>

<xsl:template match="on:User"/>

<xsl:template match="/">

<html>
<head>
	<title>User Management Tool</title>
	<style type="text/css">
		html {
			font-size: 100%;
		}
		body {
			font-size: 11px;
			font-family: verdana, helvetica, arial, sans-serif;
			margin: 0;
			padding: 0;
		}
		a:link, a:visited {
			color: #1F3C79;
		}
		h1 {
			font-size: 1.5em;
		}
		h2 {
			font-size: 1.273em;
		}
		h3, th {
			font-size: .9em;
		}
		h1, h2, h3 {
			margin: 0 0 .4em 0;
			font-weight: normal;
		}
		h2, h3, th {
			padding: .909091em;
			color: #666;
		}
		p {
		}
		ul {
			margin: 0;
		}
		li {
			padding: .2em;
		}
		table {
			margin: 2em 0;
			width: 100%;
		}
		th {
			font-weight: normal;
			border-bottom: 1px solid #cecece;
		}
		td {
			vertical-align: top;
			padding: .2em .2em .8em .5em;
		}
		#header {
			margin-bottom: 2em;
			background-color: #00aff9;
		}
		.nesstarlogo {
			height: 20px;
			left: 30px;
			margin-right: 40px;
			margin-top: 5px;
			top: 10px;
			width: 125px;
		}
		.nesstarpayoff {
			height: 12px;
			left: 162px;
			top: 22px;
			width: 173px;
		}
		.nesstarlogo, .nesstarpayoff {
			position: absolute;
		}
		#container {
			width: 89.091em;
			margin: 0 auto;
		}
		#tool {
			margin: 2em 0 2em 0;
			padding: 0;
			border-bottom: 1px solid #cecece;
		}
		#adduser {
			padding: 2em;
			border: 1px solid #cecece;
		}
		#adduser h2, #createhelp h3 {
			margin: -1.6em 0 .4em -1.6em;
		}
		#adduser .form {
			width: 33.455em;
			float: left;
			margin-right: 3.636em;
		}
		#adduser .formrow {
			height: 2.473em;
			margin-bottom: .364em;
		}
		#adduser .textarearow {
			height: 11em;
			margin-bottom: 1em;
		}
		#adduser .formrow label {
			width: 30%;
			float: left;
		}
		#adduser .formrow input, #adduser .formrow textarea, #adduser .formrow select {
			width: 60%;
		}
		#adduser .formrow textarea {
			height: 9.09091em;
		}
		#existingusers {
			margin-top: 3em;
		}
		#startfrom {
			background-color: #f5f7f5;
			border: 1px solid #cecece;
			padding: .4em 1em;
			margin: 1em 0 2em 0;
		}
		#startfrom .list {
			margin-top: 1em;
			text-align: center;
		}
		#startfrom a {
			padding: .2em .8em;
		}
		#startfrom span {
		}
		.req {
			font-size: 1.2em;
			font-weight: bold;
			color: red;
		}
		.clear {
			clear: both;
		}
		.right {
			text-align: right;
		}
		input {
			padding: .273em;
			border: 1px solid #cdcdcd;
			color: #666;
		}
		input.button {
			background-color: #f0f1f1;
			font-weight: bold;
			padding: .182em;
			text-transform: uppercase;
		}
		td input, td textarea {
			width: 9.091em;
		}
		td.userid {
			width: 11em;
		}
		td.date {
			width: 8em;
		}
		td.action {
			width: 7.5em;
		}
		td.userid, td.date {
			padding-top: .6em;
		}
		td.warning {
			color: red;
		}
		td.warning span {
			font-weight: bold;
		}
		#createhelp {
			width: 43em;
			padding: 3em 2em;
			float: left;
			border-left: .09090909em solid #cecece;
		}
		.help {
			width: 46%;
		}
		#modifyhelp {
			float: left;
		}
		#deletehelp {
			margin-left: 50%;
		}

		tr.odd td{
		  border-top: 2px #F5F7F5 solid;
		}
	</style>
</head>
<script>

/*
	Global variables
*/
var FAIL = false;

var agree;
/*
	Main form
*/

function processForm(num) {

	FAIL = false;

	text1 = document.forms[num].id.value;
	text2 = document.forms[num].password.value;
	text3 = document.forms[num].roleid.options[document.forms[num].roleid.selectedIndex].value;

	text1 = checkUser(text1);
	checkText("userid",text1);
	checkText("password",text2);
	checkTextLenght("password",text2);
	checkSelection("role",text3);

	if (FAIL != true) {
		document.forms[num].id.value = text1;
		document.forms[num].startFrom.value = text1.charAt(0);
		document.forms[num].submit();
	}
}

function confirmDelete(name) {
	return confirm("Are you sure you want to delete user "+name+"?");
}

function confirmUpdate(num) {

	FAIL = false;
	text2 = document.forms[num].password.value;
	var name = document.forms[num].id.value;
	if (text2 != "") checkTextLenght("password",text2);

	if (FAIL != true) {
		return confirm("Are you sure you want to update user "+name+"?");
	}
	else
		return false;
}
/*
	check text input
*/
function checkUser(user){
	FAIL = false;
	j=0;
	username = encodeSpecialChars(user);
	if (username == "admin") FAIL = true;
	if (username == "deployer") FAIL = true;
	for (j = 1; j != document.forms.length &amp;&amp; FAIL != true; j++){
		formname = document.forms[j].name;
		name = document.forms[j].id.value;
		if (formname != "create"){
			if (name == username) {
				FAIL = true;
				break;
			}
		}
	}
	if (FAIL == true) alert("user "+user+" already exists in the database. Please use a new name");
	return username;

}

function encodeSpecialChars(string) {
	username = "";
	for (i=0; i != string.length; i++) {
		if (string.charAt(i) == " ") {
			username = username + "_";
		}
		else if (string.charAt(i) == "@") {
			username = username + "*";
		}
		else username = username + string.charAt(i);

	}
	return username;
}

function decodeSpecialChars(string) {
	username = "";
	for (i=0; i != string.length; i++) {
		if (string.charAt(i) == "_") {
			username = username + " ";
		}
		else if (string.charAt(i) == "*") {
			username = username + "@";
		}
		else username = username + string.charAt(i);

	}
	return username;
}

function checkText(name,value) {
	if (FAIL == false){
		detectNotNull(value);
		if (FAIL == true) alert("please, define a "+name+" for the new user");
		else detectWhitespace(name,value);
	}
}

function checkTextLenght(name,value) {
	if (FAIL == false){
		if (value.length&lt;6) FAIL = true;
		if (FAIL == true) alert("please, define a "+name+" for the new user with at least 6 characters");
	}
}

/*
	check selection input
*/
function checkSelection(name,value) {
	if (FAIL == false){
		detectNotNull(value);
		if (FAIL == true) alert("please, choose a "+name+" for the new user");
	}
}

/*
	check not null
*/
function detectNotNull(string) {
	if (string == "") FAIL = true;
}

/*
	check for whitespace
*/
function detectWhitespace(name,string) {

	for (i=0; i != string.length; i++) {
		if (string.charAt(i) == " ") {
			FAIL  = true;
		}
		if (string.charAt(i) == "@") {
			FAIL  = true;
		}

	}
	if (FAIL == true) alert("no characters as space or '@' allowed in "+name);
}

function changeURL(url,path){
	window.status = location.pathname+" - "+path+" - "+url;
	if (location.pathname != path) location.replace(url);
}

function openUrl(letter){
window.status = letter;
	document.location.href="index.jsp?startFrom="+letter;
}

function resetTextArea(area) {
	if (area.value == "A new user")
		area.value = "";
}
</script>


<xsl:apply-templates select="//r:Bag"/>

</html>

</xsl:template>

<xsl:template match="r:Bag">

<xsl:variable name="url" select="@r:about"/>
<xsl:variable name="startletter" select="s:comment"/>

<xsl:variable name="challengedUrl"><xsl:value-of select="$url"/><xsl:text>&amp;onAccessGranted=</xsl:text><xsl:value-of select="$url"/></xsl:variable>

<xsl:variable name="bag" select="document($challengedUrl)"/>

<xsl:message>url: <xsl:value-of select="$challengedUrl"/></xsl:message>

<xsl:variable name="ServerURL" select="substring-before($url,'obj')" />

<xsl:variable name="ServerRolesListURL" select="concat($ServerURL,'obj/aRoleHome/RoleHome?http://www.nesstar.org/rdf/method=http://www.nesstar.org/rdf/acu/RoleHome/findAll')"/>
<xsl:variable name="ServerRolesList" select="document($ServerRolesListURL)" />
<xsl:variable name="roles" select="$ServerRolesList//on:Role[@r:about and substring-after(@r:about,'aRole/')!='anonymous']"/>

<xsl:variable name="ServerPurposesListURL" select="concat($ServerURL,'obj/aPurposeHome/PurposeHome?http://www.nesstar.org/rdf/method=http://www.nesstar.org/rdf/acu/PurposeHome/findAll')"/>
<xsl:variable name="ServerPurposesList" select="document($ServerPurposesListURL)" />
<xsl:variable name="purposes" select="$ServerPurposesList//on:Purpose[@r:about]"/>

<xsl:variable name="path">/admin/index.jsp</xsl:variable>

<xsl:variable name="index"><xsl:value-of select="$ServerURL"/>admin/index.jsp</xsl:variable>

<body onload="changeURL('{$index}','/admin/index.jsp')">
	<div id="header">
		<img src="/nesstar/images/header_background.jpg" id="logo" alt=""/>
		<img class="nesstarlogo" src="/nesstar/images/NesstarLogoTransBg.png" alt=""/>
		<img class="nesstarpayoff" src="/nesstar/images/nesstar_payoff.png" alt=""/>
	</div>

<div id="container">
<h1>Nesstar User Management Tool</h1>
<div id="introduction">
<p>This tool allows you to <a href="#adduser">create</a> and <a href="#existingusers">manage</a> user accounts for your server.</p>

<p><a href="../">Return to the Main Page</a>.</p>
</div>

<div id="tool">
<!-- new user -->
	<div id="adduser">
		<h2>Add new user</h2>
		<div class="form">
		<form action="index.jsp" method="get" name="create">
		<input type="hidden" name="home" value="{$ServerURL}obj/aUserHome/UserHome"/>
		<input type="hidden" name="http://www.nesstar.org/rdf/method" value="http://www.nesstar.org/rdf/acu/UserHome/create"/>
		<input type="hidden" name="OnResult" value="{$index}"/>
		<input type="hidden" name="startFrom" value=""/>
		<div class="formrow">
			<label for="label">Name:</label>
			<input type="Text" name="label" value="" maxlength="100" size="20"/>
		</div>
		<div class="formrow">
			<label for="id">Username:<span class="req">*</span></label>
			<input type="Text" name="id" value="" maxlength="100" size="20"/>
		</div>
		<div class="formrow">
			<label for="password">Password:<span class="req">*</span></label>
			<input type="Text" name="password" value="" maxlength="20" size="20"/>
		</div>
		<div class="formrow">
			<label for="roleid">Role:<span class="req">*</span></label>
			<select name="roleid">
			<option value="">Choose a Class: </option>
			<xsl:call-template name="serverRoles"><xsl:with-param name="rolesList" select="$ServerRolesList"/></xsl:call-template>
			</select>
		</div>
<xsl:if test="count($purposes)>0">
		<div class="formrow">
			<label for="purposeid">Purpose:<span class="req">*</span></label>
			<select name="purposeid">
			<option value="">Choose a purpose: </option>
			<xsl:call-template name="serverPurposes"><xsl:with-param name="purposesList" select="$ServerPurposesList"/></xsl:call-template>
			</select>
		</div>
</xsl:if>
		<div class="formrow textarearow">
			<label>Comment:</label>
			<textarea name="comment" rows="3" cols="20" wrap="physical" onclick="resetTextArea(this);">A new user</textarea>
		</div>
		<div class="right">
			<input type="button" class="button" name="Create" value="Create" onclick="processForm('create')"/>
		</div>
		<div class="clear">
		</div>
		</form>
		</div>
		<div id="createhelp">
			<h3>User Roles</h3>
			<p>Description of the available roles:</p>
			<ul>
			<li><b>Guest</b> users have the same permissions as anonymous users.</li>
			<li><b>Authorised</b> users can access all data and metadata but are not allowed to use the download function; authorised users can also publish cube on the server (except with the Nesstar Publisher client).</li>
			<li><b>Fullauthorised</b> users can access data and metadata and are allowed to use the download function.</li>
			<li><b>Publisher</b> users have rights to publish studies and modify the catalog tree, as well as the rights allowed to full authorised users.</li>
			<li><b>Administrator</b> users have administrator rights: no limitations in any operation.</li>
			</ul>
		</div>
		<div class="clear"></div>
		<p>Fields marked with <span class="req">*</span> are required.</p>
	</div><!-- end adduser -->
<div id="existingusers">
<h2>Existing users</h2>
<div id="startfrom">
	<p>Display only usernames beginning with:</p>
	<p class="list">
		<a href="index.jsp">All</a><span>|</span>
		<a href="index.jsp?startFrom=a">A</a><span>|</span>
		<a href="index.jsp?startFrom=b">B</a><span>|</span>
		<a href="index.jsp?startFrom=c">C</a><span>|</span>
		<a href="index.jsp?startFrom=d">D</a><span>|</span>
		<a href="index.jsp?startFrom=e">E</a><span>|</span>
		<a href="index.jsp?startFrom=f">F</a><span>|</span>
		<a href="index.jsp?startFrom=g">G</a><span>|</span>
		<a href="index.jsp?startFrom=h">H</a><span>|</span>
		<a href="index.jsp?startFrom=i">I</a><span>|</span>
		<a href="index.jsp?startFrom=j">J</a><span>|</span>
		<a href="index.jsp?startFrom=k">K</a><span>|</span>
		<a href="index.jsp?startFrom=l">L</a><span>|</span>
		<a href="index.jsp?startFrom=m">M</a><span>|</span>
		<a href="index.jsp?startFrom=n">N</a><span>|</span>
		<a href="index.jsp?startFrom=o">O</a><span>|</span>
		<a href="index.jsp?startFrom=p">P</a><span>|</span>
		<a href="index.jsp?startFrom=q">Q</a><span>|</span>
		<a href="index.jsp?startFrom=r">R</a><span>|</span>
		<a href="index.jsp?startFrom=s">S</a><span>|</span>
		<a href="index.jsp?startFrom=t">T</a><span>|</span>
		<a href="index.jsp?startFrom=u">U</a><span>|</span>
		<a href="index.jsp?startFrom=v">V</a><span>|</span>
		<a href="index.jsp?startFrom=w">W</a><span>|</span>
		<a href="index.jsp?startFrom=x">X</a><span>|</span>
		<a href="index.jsp?startFrom=y">Y</a><span>|</span>
		<a href="index.jsp?startFrom=z">Z</a>
	</p>
</div>

<table  valign="top" align="bottom" border="0" cellspacing="0" cellpadding="0" width="100%">
	<!-- header -->
	<tr>
		<th>Date</th>
		<th>User</th>
		<th>Userid</th>
		<th>Password</th>
		<th>Classes</th>
<xsl:if test="count($purposes)>0">
		<th>Purposes</th>
</xsl:if>
		<th>Comment</th>
		<th>Action</th>
	</tr>



<!-- existing users-->

<xsl:variable name="user" select="$bag//r:Bag/*[substring-after(@r:resource,'aUser/')!='nobody' and substring-after(@r:resource,'aUser/')!='deployer']"/>

<xsl:if test="count($user)>0">
	<xsl:for-each select="$user">
	    <xsl:sort select="@r:resource"/>
		<xsl:call-template name="userResource">
			<xsl:with-param name="url" select="@r:resource"/>
		</xsl:call-template>
	</xsl:for-each>
</xsl:if>

</table>
</div><!-- end existingusers -->
</div><!-- end tool -->

	<div class="help" id="modifyhelp">
		<h3>To Modify a User Account</h3>

		<ul>
		<li>To change the label, type the new label.</li>
		<li>The userid can not be modified.</li>
		<li>To change the password, type the new password (minimum 6 characters).</li>
		<li>To change the classes of the user:
			<ul>
			<li>to add a new class, select the new class from the ones available in the server.</li>
			<li>to remove a class, select one of the current user's classes.</li>
			</ul>
			Users can have one or more classes. If a user has no defined class in the server, a warning message will be displayed.
		</li>
		<li>
		If a set of purposes is defined in the server, an extra parameter will be displayed.<br/>
		To change the purposes of the user:
			<ul>
			<li>to add a new purpose, select the new purpose from the ones available in the server.</li>
			<li>to remove a purpose, select one of the current user's purposes.</li>
			</ul>
			Users can have one or more purposes.
		</li>
		<li>To change a comment, enter the new comment in the comment box.</li>
		<li>Click on <em>Update</em> to save your changes.</li>
		</ul>
	</div>

	<div class="help" id="deletehelp">
		<h3>To delete a User Account</h3>
		<p>Click on the <em>Delete</em> button next to the user that is to be removed.</p>
	</div>
</div><!-- end container -->
</body>

</xsl:template>

<xsl:template name="userResource">
<xsl:param name="url"/>

<xsl:variable name="root" select="document($url)"/>
<xsl:variable name="users" select="$root//on:User"/>

<xsl:if test="count($users)>0">
<xsl:for-each select="$users">
<xsl:call-template name="userEntry" >
	<xsl:with-param name="node" select="."/>
</xsl:call-template>
</xsl:for-each>
</xsl:if>

</xsl:template>

<xsl:template name="userEntry">
<xsl:param name="node"/>


<xsl:variable name="id" select="$node/@r:about"/>

<xsl:variable name="label" select="$node/s:label"/>
<xsl:variable name="comment" select="$node/s:comment"/>

<xsl:variable name="type" select="$node/op:typeID"/>
<xsl:variable name="date" select="$node/op:modificationDate"/>

<xsl:variable name="ServerURL" select="substring-before($id,'obj')" />

<xsl:variable name="ServerRolesListURL" select="concat($ServerURL,'obj/aRoleHome/RoleHome?http://www.nesstar.org/rdf/method=http://www.nesstar.org/rdf/acu/RoleHome/findAll')"/>
<xsl:variable name="ServerRolesList" select="document($ServerRolesListURL)" />
<xsl:variable name="serverRoles" select="$ServerRolesList//on:Role[@r:about and substring-after(@r:about,'aRole/')!='anonymous']"/>

<xsl:variable name="ServerPurposesListURL" select="concat($ServerURL,'obj/aPurposeHome/PurposeHome?http://www.nesstar.org/rdf/method=http://www.nesstar.org/rdf/acu/PurposeHome/findAll')"/>
<xsl:variable name="ServerPurposesList" select="document($ServerPurposesListURL)" />
<xsl:variable name="serverPurposes" select="$ServerPurposesList//on:Purpose[@r:about]"/>


<xsl:variable name="user_id" select="substring-after($id,'aUser/')"/>
<xsl:variable name="initial" select="substring($user_id,1,1)"/>
<xsl:variable name="index"><xsl:value-of select="$ServerURL"/>admin/index.jsp?startFrom=<xsl:value-of select="$initial"/></xsl:variable>


<xsl:variable name="user">
	<xsl:choose>
	<xsl:when test="string-length($label)>0"><xsl:value-of select="$label"/></xsl:when>
	<xsl:otherwise><xsl:value-of select="$user_id"/></xsl:otherwise>
	</xsl:choose>
</xsl:variable>

<xsl:if test="$user!='deployer' and $user!='admin'">

<xsl:variable name="rolesListURL" select="op:roles/@r:resource"/>
<xsl:variable name="rolesList" select="document($rolesListURL)"/>
<xsl:variable name="roles" select="$rolesList//on:Role"/>

<xsl:if test="count($roles)=0">
<tr><td colspan="7" class="warning"><span>WARNING:</span> user <xsl:value-of select="$user"/> has no active class in the server.</td></tr>
</xsl:if>

<xsl:variable name="color">
	<xsl:choose>
	<xsl:when test="position() mod 2 = 0">
		<xsl:value-of select="'even'"/>
	</xsl:when>
	<xsl:otherwise>
		<xsl:value-of select="'odd'"/>
	</xsl:otherwise>
	</xsl:choose>
</xsl:variable>

  <tr class="row {$color}">
  	<form action="index.jsp" method="get" name="update{$user_id}" onsubmit="return confirmUpdate('update{$user_id}')">
  		<input type="hidden" name="home" value="{$ServerURL}obj/aUserHome/UserHome"/>
  		<input type="hidden" name="http://www.nesstar.org/rdf/method" value="http://www.nesstar.org/rdf/acu/UserHome/update"/>
  		<input type="hidden" name="OnResult" value="{$index}"/>
  		<input type="hidden" name="startFrom" value="{$initial}"/>
  		<input type="hidden" name="id" value="{$user_id}" maxlength="20" size="20"/>

    <td class="date">
	<xsl:value-of select="$date"/>
    </td>

    <td><input type="Text" name="label" value="{$label}" maxlength="100" size="20"/></td>

    <td class="userid"><a href="/browser?FRAMES=false&amp;action=LIST&amp;url={$id}"><xsl:value-of select="$user_id"/></a></td>

    <td><input type="Text" name="password" value="" maxlength="20" size="20"/></td>

    <td>
<xsl:choose>
<xsl:when test="$user!='deployer'">
		<select name="roleid">
<xsl:if test="count($roles)>0">
		<option value="">Current <xsl:value-of select="$user"/>'s Classes</option>
		<xsl:call-template name="roles"><xsl:with-param name="roles" select="$roles"/></xsl:call-template>
		<option value="">-----------------</option>
</xsl:if>
		<option value="">Server Available Classes: </option>
		<xsl:call-template name="serverRoles"><xsl:with-param name="rolesList" select="$ServerRolesList"/></xsl:call-template>
		</select>

<xsl:if test="count($serverPurposes)>0">
		<select name="purposeid">

<xsl:variable name="purposesListURL" select="op:purposes/@r:resource"/>
<xsl:variable name="purposesList" select="document($purposesListURL)"/>
<xsl:variable name="userPurposes" select="$purposesList//on:Purpose"/>

<xsl:if test="count($userPurposes)>0">
			<option value="">Current <xsl:value-of select="$user"/>'s Purposes</option>
			<xsl:call-template name="purposes"><xsl:with-param name="purposes" select="$userPurposes"/></xsl:call-template>
			<option value="">-----------------</option>
</xsl:if>
			<option value="">Server Available Purposes: </option>
			<xsl:call-template name="serverPurposes"><xsl:with-param name="purposesList" select="$ServerPurposesList"/></xsl:call-template>
		</select>
</xsl:if>

</xsl:when>
<xsl:otherwise/>
</xsl:choose>
    </td>

    <td><textarea name="comment" rows="2" cols="20" wrap="physical"><xsl:value-of select="$comment"/></textarea></td>

    <td class="action">
    	<input class="button" type="Submit" name="update" value="Update"/>
    </td>
  	</form> </tr>

<tr>
	<td colspan="7" align="right">
		<xsl:if test="$user!='deployer'">
			<form action="index.jsp" method="get" name="delete" onsubmit="return confirmDelete('{$user_id}')">
				<input type="hidden" name="home" value="{$ServerURL}obj/aUserHome/UserHome"/>
				<input type="hidden" name="http://www.nesstar.org/rdf/method" value="http://www.nesstar.org/rdf/acu/UserHome/delete"/>
				<input type="hidden" name="id" value="{$user_id}" maxlength="20" size="20"/>
				<input type="hidden" name="OnNullResult" value="{$index}"/>
				<input type="hidden" name="startFrom" value="{$initial}"/>
				<input class="button" type="Submit" name="delete" value="Delete"/>
			</form>
		</xsl:if>
	</td>
</tr>

</xsl:if>
</xsl:template>

<xsl:template name="roles">
<xsl:param name="roles"/>

	<xsl:for-each select="$roles">
		<xsl:variable name="label" select="s:label"/>
		<xsl:variable name="id" select="@r:about"/>
		<xsl:variable name="role">
		<xsl:choose>
		<xsl:when test="string-length($label)>0"><xsl:value-of select="$label"/></xsl:when>
		<xsl:otherwise><xsl:value-of select="substring-after($id,'aRole/')"/></xsl:otherwise>
		</xsl:choose>
		</xsl:variable>
		<option VALUE= "{$role}">-<xsl:value-of select="$role"/></option>
	</xsl:for-each>

</xsl:template>

<xsl:template name="purposes">
<xsl:param name="purposes"/>

	<xsl:for-each select="$purposes">
		<xsl:variable name="label" select="s:label"/>
		<xsl:variable name="id" select="@r:about"/>
		<xsl:variable name="purpose">
		<xsl:choose>
		<xsl:when test="string-length($label)>0"><xsl:value-of select="$label"/></xsl:when>
		<xsl:otherwise><xsl:value-of select="substring-after($id,'aPurpose/')"/></xsl:otherwise>
		</xsl:choose>
		</xsl:variable>
		<option VALUE= "{$purpose}">-<xsl:value-of select="$purpose"/></option>
	</xsl:for-each>

</xsl:template>


<xsl:template name="serverRoles">
<xsl:param name="rolesList"/>

<xsl:variable name="roles" select="$rolesList//on:Role[@r:about and substring-after(@r:about,'aRole/')!='anonymous']"/>

<xsl:for-each select="$roles" >
	<xsl:variable name="label" select="s:label"/>
	<xsl:variable name="id" select="@r:about"/>

	<xsl:variable name="role">
	<xsl:choose>
	<xsl:when test="string-length($label)>0"><xsl:value-of select="$label"/></xsl:when>
	<xsl:otherwise><xsl:value-of select="substring-after($id,'aRole/')"/></xsl:otherwise>
	</xsl:choose>
	</xsl:variable>

  	<option VALUE= "{$role}">-<xsl:value-of select="$role"/></option>
</xsl:for-each>

</xsl:template>

<xsl:template name="serverPurposes">
<xsl:param name="purposesList"/>

<xsl:variable name="purposes" select="$purposesList//on:Purpose[@r:about]"/>

<xsl:for-each select="$purposes" >
	<xsl:variable name="label" select="s:label"/>
	<xsl:variable name="id" select="@r:about"/>

	<xsl:variable name="purpose">
	<xsl:choose>
	<xsl:when test="string-length($label)>0"><xsl:value-of select="$label"/></xsl:when>
	<xsl:otherwise><xsl:value-of select="substring-after($id,'aPurpose/')"/></xsl:otherwise>
	</xsl:choose>
	</xsl:variable>

  	<option VALUE= "{$purpose}">-<xsl:value-of select="$purpose"/></option>
</xsl:for-each>

</xsl:template>

</xsl:stylesheet>








