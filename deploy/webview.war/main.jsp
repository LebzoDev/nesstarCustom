<%@ page import="nesstar.api.Catalog,
                 nesstar.api.Protocol,
                 nesstar.api.I18n,
                 nesstar.api.common.Server,
                 nesstar.api.faster.Cube,
                 nesstar.api.faster.Section,
                 nesstar.api.faster.Study,
                 nesstar.api.faster.Variable,
                 nesstar.rdf.RDFObject,
                 nesstar.api.WebExecutorLog,
                 nesstar.webclient.common.WebInit,
                 nesstar.webclient.common.WebProperties,
                 nesstar.webclient.htmlviewer.WebHTMLViewer,
                 nesstar.webclient.utils.BookmarkObjectLoader,
                 nesstar.webclient.utils.HTMLUtils,
                 nesstar.webclient.utils.URLUtils" %>
<%@ page import="nesstar.webclient.velocity.servlet.Request" %>
<%@ page import="nesstar.webclient.common.WebviewTranslation" %>
<%@ page import="nesstar.util.translation.Translation" %>
<%@ page import="org.apache.log4j.Logger" %>
<%@ page language="java" autoFlush="true" contentType="text/html; charset=UTF-8" %>
<%
   Logger LOGGER = Logger.getLogger("main.jsp");
   LOGGER.info("Running main.jsp...");
   
   Request.set(request);
   String query = request.getQueryString();
   if (query == null) query = "";

   try {
      if (query.charAt(0) != '?') query = "?" + query;
   } catch (Exception e) {
   }

   query = HTMLUtils.escapeHtmlBrackets(query);

   WebInit.getInstance();
   nesstar.server.ServletUtils.setProtocol(session);
   I18n.setAcceptedLocalesFromRequest(request);   
   WebHTMLViewer viewer = new WebHTMLViewer(request, response, true);
   WebExecutorLog exe = new WebExecutorLog(null, request, response, viewer);
   Protocol.setExecutorLog(exe);

   try {
      new BookmarkObjectLoader().loadAllObjectsInUrL(request);
   } catch (Exception e) {
   }

   String sessionid = "";
   if (!request.isRequestedSessionIdFromCookie()) {
      sessionid = ";jsessionid=";
      sessionid += request.getSession().getId();
   }

   //The rightside url
   String url = nesstar.webclient.utils.JSPUtils.getRightsideURL(request, response, sessionid);
   LOGGER.info("main.jsp done...");
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">
<html>
<head>
</head>
<script>
   
   console.log("<%=WebProperties.getInstance(true).getSkinPath()%>jsp/content.jsp<%=sessionid%><%=query%>")
   console.log("<%=url%>");
   console.log("<%=WebProperties.getInstance(true).getSkinPath()%>jsp/empty.jsp<%=sessionid%>");
</script>
<frameset id="set" name="set" cols="<%=WebProperties.getInstance(true).getBrowselistWidth()%>,*, 0px" border="0">
   <frame scrolling="no" name="content" id="content"
          src="<%=WebProperties.getInstance(true).getSkinPath()%>jsp/content.jsp<%=sessionid%><%=query%>"/>
   <frame name="rightsidemainframe" src="<%=url%>" marginwidth="0"/>
   <frame scrolling="yes" name="login"
          src="<%=WebProperties.getInstance(true).getSkinPath()%>jsp/empty.jsp<%=sessionid%>" marginwidth="0"/>
</frameset>
</html>
<%
   //Reset so we are sure that the reuse of threads in the pool does not give unwanted sideeffects
   Request.set(null);
%>
