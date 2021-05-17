<%@ page import="nesstar.webclient.common.WebProperties,
				 nesstar.webclient.velocity.help.Help"%>
<%@ page language="java" autoFlush="true" contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html>
	<head>
		<title>Nesstar Light</title>
		<link href="icons/SmallN1.ico" rel="shortcut icon"/>
		 <link href="<%=WebProperties.getInstance(true).getSkinPath()%>css/top.css" rel="stylesheet" type="text/css"/>
		<script language="javascript">
			function setUrl(url) {
				awin = window.open(url,'help');
             	if (awin) awin.focus();
			}
		</script>
	</head>

	<body style="background-color: #ffffff; color: #d4d4d4; padding: 0px; margin: 0px; font-family: arial">
		<table style="margin: 0px; padding:0px" border="0" cellpadding="0" cellspacing="0" width="100%">
			<tr>
				<td style="padding-top: 0px"><a href="http://www.nesstar.com" style="padding-left: 10px" target="nesstar"><img border="0" src="<%=WebProperties.getInstance(true).getSkinPath()%>images/LogoWhiteBg.gif" /></a></td>
				<td class="background">
					<a style="color: #808080; font-size: 11px; text-decoration: none" href="mailto:%6E%65%73%73%74%61%72%2D%73%75%70%70%6F%72%74%40%6E%65%73%73%74%61%72%2E%63%6F%6D">Contact us</a>
					|
					<a id="texthelp" href="#" style="color: #808080; font-size: 11px; text-decoration: none; cursor: hand" onclick="setUrl('<%=WebProperties.getInstance(true).getByKey(Help.DEFAULT)%>')">Help</a>
					|
					<a href="http://www.nesstar.com/support/faq.shtml" style="color: #808080; cursor: hand; font-size: 11px; text-decoration: none; padding-right: 10px" target="faq">FAQ</a>
				</td>
			</tr>
		</table>
	</body>
</html>