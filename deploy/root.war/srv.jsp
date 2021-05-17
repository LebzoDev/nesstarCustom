<!-- This jsp is used by webview to get the full server object url -->
<%@ page language="java" autoFlush="true" contentType="text/html; charset=UTF-8" import="nesstar.server.ServletUtils,nesstar.server.configuration.NesstarConfig,nesstar.server.configuration.NesstarProperties" %><%

   String serverName = NesstarConfig.getServer();
   String serverID = "/cServer/" + serverName;
   String url = "/obj" + serverID;

   //Setting http status to moved permanently (301)
   response.setStatus(HttpServletResponse.SC_MOVED_PERMANENTLY);

   //Setting the header, making the redirect happen
   response.setHeader("Location", url);
%>
