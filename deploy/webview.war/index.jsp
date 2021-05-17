<%@ page import="nesstar.api.I18n" %>
<%@ page import="nesstar.webclient.common.WebviewTranslation" %>
<%@ page import="nesstar.webclient.common.WebProperties" %>
<%@ page import="nesstar.webclient.utils.HTMLUtils" %>
<%@ page import="nesstar.webclient.velocity.servlet.Request" %>
<%@ page import="javax.servlet.http.HttpServletResponse" %>
<%@ page import="nesstar.util.translation.Translation" %>
<%@ page language="java" autoFlush="true" contentType="text/html; charset=UTF-8" %>
<%
   if (request.getParameter("rightside") != null) {
      response.sendRedirect("index.jsp?" + request.getParameter("rightside"));
      return;
   }

   String query = request.getQueryString();
   if (query == null) query = "";
   try {
      if (query.charAt(0) != '?') query = "?" + query;
   } catch (Exception e) {
   }
   response.setStatus(HttpServletResponse.SC_OK);

   String sessionid = "";
   if (!request.isRequestedSessionIdFromCookie()) {
      sessionid = ";jsessionid=";
      sessionid += request.getSession().getId();
   }

   //Transfer the language if nescesary.
   String language = request.getParameter("language");
   if(language == null){
	   language="";
   }else
       language="?language=" + language;

   String headerLink = WebProperties.getInstance(false).getDefaultHeaderPageLink();

   Request.set(request);
   I18n.setAcceptedLocalesFromRequest(request);
   String htmlTitle = WebviewTranslation.getTranslation().getString("htmlTitle");

   //add the starting point if it is there and not in the bookmark
   if (!request.getParameterMap().containsKey("context")) {
      String start = WebProperties.getInstance(false).getStartingPoint();
      if (start != null) {
   query += (query.length() > 0 ? "&" : "?") + "context=" + HTMLUtils.encode(start);
      }
   }

   query = HTMLUtils.escapeHtmlBrackets(query);

   String topFrameHeight = WebProperties.getInstance(false).getTopFrameHeight();
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN"
"http://www.w3.org/TR/html4/frameset.dtd">
<html>
<head>
   <title><%=htmlTitle%></title>
   <link href="icons/SmallN1.ico" rel="shortcut icon"/>
    <jsp:include page="static/stats.html" />
   <noscript>
      <meta http-equiv="Refresh" content="0; URL=index" />
   </noscript>
</head>
   <frameset rows="<%=topFrameHeight%>px,*" border="0">
   <frame scrolling="no" marginwidth="0px" marginheight="0px" name="header2" src="header.jsp<%=language%>" />
   <frame scrolling="no" name="main" src="main.jsp<%=sessionid%><%=query%>"/>
   </frameset>
</html>
