<%@ page import="nesstar.webclient.velocity.servlet.Request" %>
<%@ page import="java.util.*" %>
<%@ page language="java" autoFlush="true" contentType="text/css; charset=UTF-8" %>
<%
String language = request.getParameter("language");
if (language == null) {
	language = "en";
}
response.setStatus(HttpServletResponse.SC_OK);
%>
.imagelanguage_<%= language %> {
   background-image:url(../images/menu/language/lang_<%=language%>.png);
}