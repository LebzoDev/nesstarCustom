<%@ page language="java" autoFlush="true" contentType="text/html; charset=UTF-8" import="nesstar.webclient.common.WebProperties"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" lang="en">

    <head>
        <title>The top menu</title>
        <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1"/>
        <meta content="0" http-equiv="expires"/>
        <meta content="no-cache" http-equiv="Pragma"/>
        <link href="../<%=WebProperties.getInstance(true).getSkinPath()%>css/top.css" rel="stylesheet" type="text/css"/>
		<script language="javascript" type="text/javascript" src="../<%=WebProperties.getInstance(true).getSkinPath()%>javascript/bookmark.js"></script>
		<script language="javascript">
			function setUrl(url) {
				awin = window.open(url,'help');
             	if (awin) awin.focus();
			}
		</script>
    </head>

		<jsp:include page="header.html" flush="true" />

</html>
