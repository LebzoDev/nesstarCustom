<%@ page import="nesstar.webclient.utils.ServletUtils" %>
<%@ page import="nesstar.webclient.common.WebProperties"%>
<%@ page import="nesstar.webclient.common.WebviewTranslation" %>
<%@ page import="nesstar.webclient.velocity.servlet.Request" %>
<%@ page language="java" autoFlush="true" contentType="text/html; charset=UTF-8" %>

<%
  //The servlet prefix
  String prefix = ServletUtils.getServletUrlPrefix(request, "/velocity");
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN"
"http://www.w3.org/TR/html4/frameset.dtd">
<html>
<head>
</head>
<frameset rows="22px, *" border="0">
<%
   String welcomePageUri =request.getParameter("welcomepageuri");
%>
   <frame name="rightside" src="<%=prefix%><%="?"%><%=request.getQueryString()%>" marginwidth="0" scrolling="no"/>
   <frame name="welcomepage" src="<%=welcomePageUri%>" marginwidth="0" scrolling="auto"/>

</frameset>
</html>
