<%@ page language="java" autoFlush="true" contentType="text/html; charset=UTF-8" %>
<%@ page import="nesstar.webclient.utils.HTMLUtils" %>

<%
	String defaultheaderlink=HTMLUtils.getWebViewHeaderLanguage(request);
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN"
"http://www.w3.org/TR/html4/frameset.dtd">
<html>
<head>
</head>
<frameset border="0">

      <frame scrolling="no" marginwidth="30px" marginheight="30px" name="MultipleLanguageHeader" src="<%=defaultheaderlink%>" />
</frameset>
</html>
