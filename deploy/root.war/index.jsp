<%@ page language="java" autoFlush="true" contentType="text/html; charset=UTF-8"%><%

   //Path to webview
   String applicationPath = "/webview/";

   //Setting http status to moved permanently (301)
   response.setStatus(HttpServletResponse.SC_MOVED_PERMANENTLY);

   //Setting the header, making the redirect happen
   response.setHeader("Location", applicationPath);
%>