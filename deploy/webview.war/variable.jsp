<%@ page import="nesstar.webclient.common.WebProperties"%>
<%@ page language="java" autoFlush="true" contentType="text/html; charset=UTF-8"%><%
	String query = request.getQueryString();
	if (query == null) query = "";

	try {
		if (query.charAt(0) != '?') query = "?"+query;
	} catch (Exception e) {
	}
	String sessionid = "";
	if (!request.isRequestedSessionIdFromCookie()) {
		sessionid = ";jsessionid="+request.getSession().getId();
	}
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN"
   "http://www.w3.org/TR/html4/frameset.dtd">
<html>
	<head>
		<script language="javascript" type="text/javascript" src="<%=WebProperties.getInstance(true).getSkinPath()%>javascript/frame.js"></script>
	</head>
		<frame scrolling="no" name="content" src="<%=WebProperties.getInstance(true).getSkinPath()%>jsp/content.jsp<%=sessionid%><%=query%>"/>
</html>