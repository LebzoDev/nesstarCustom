<%@ page import="nesstar.webclient.common.Config" %>
<%@ page language="java" autoFlush="true" contentType="text/html; charset=UTF-8" %>
<%
   //A file that is used for the server, to check if webview is running.
   // Do a Init so it is ready when the first user starts it.
   try {
      nesstar.server.ServletUtils.setProtocol(session);
      Config.getInstance();
   } catch (Exception e) {
      e.printStackTrace();
   }
   //WebInit.getInstance();
%>