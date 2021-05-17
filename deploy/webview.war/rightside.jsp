<%@ page import="nesstar.webclient.utils.ServletUtils" %>
<%@ page import="nesstar.webclient.common.WebProperties"%>
<%@ page import="nesstar.webclient.utils.HTMLUtils" %>
<%@ page language="java" autoFlush="true" contentType="text/html; charset=UTF-8" %>
<%
   String scrolling = "";
   String user_agent = request.getHeader("User-Agent");
   if (user_agent.indexOf("MSIE 5") != -1 || user_agent.indexOf("MSIE 6") != -1 || user_agent.indexOf("MSIE 7") != -1) {
      if (user_agent.indexOf("Opera") == -1) {
         scrolling = "scrolling=\"auto\"";
      }
   }
   //The servlet prefix
   String prefix = ServletUtils.getServletUrlPrefix(request, "/velocity");
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN"
"http://www.w3.org/TR/html4/frameset.dtd">
<html>
<head>
</head>
<frameset border="0">
    <%
       String welcomePageUri = request.getParameter("welcomepageuri");

        String query = request.getQueryString();
        if (query == null) query = "";

        try {
            if (query.charAt(0) != '?') query = "?" + query;
        } catch (Exception e) {
        }

        query = HTMLUtils.escapeHtmlBrackets(query);

    if(welcomePageUri != null){
        welcomePageUri = HTMLUtils.escapeHtmlBrackets(welcomePageUri);
    %>
      <frame name="rightside" src="welcomepagehandler.jsp?welcomepageuri=<%=welcomePageUri%>&<%=query%>" marginwidth="0" <%=scrolling%>/>
    <%
       }else{
    %>
      <frame name="rightside" src="<%=prefix%><%=query%>" marginwidth="0" <%=scrolling%>/>
    <%
       }
    %>
</frameset>
</html>
