<%@ page import="nesstar.api.Protocol,
                 nesstar.api.WebExecutorLog,
                 nesstar.webclient.common.WebInit,
                 nesstar.webclient.common.WebProperties,
                 nesstar.webclient.htmlviewer.WebHTMLViewer" %>
<%@ page import="nesstar.webclient.utils.*"%>
<%@ page language="java" autoFlush="true" contentType="text/html; charset=UTF-8" %>
<%

   WebInit.getInstance();
   nesstar.server.ServletUtils.setProtocol(session);
   WebHTMLViewer viewer = new WebHTMLViewer(request, response, true);
   WebExecutorLog exe = new WebExecutorLog(null, request, response, viewer);
   Protocol.setExecutorLog(exe);

   String prefix = ServletUtils.getServletUrlPrefix(request, "/velocity");

   StringBuilder treeview = new StringBuilder();
   treeview.append(prefix);
   treeview.append('?');
   
   StringBuilder searchView = new StringBuilder();
   searchView.append(prefix);
   searchView.append('?');
   searchView.append("mode=simplesearch");

   String opens = request.getParameter("treeview");
   if (opens != null) {
      treeview.append(new BookmarkObjectLoader().parseAndEncode(opens));
   } else
      treeview.append("mode=tree");

   String referer = request.getParameter("referer");
   if (referer != null) {
      treeview.append("&referer=");
      treeview.append(referer);
   }
   //Transfer the language if nesscary.
   String language = request.getParameter("language");
   if (language != null) {
      treeview.append("&language=");
      treeview.append(language);
      searchView.append("&language=");
      searchView.append(language);
   }

   String[] objects = request.getParameterValues("object");
   if (objects != null) {
      for (int i = 0; i < objects.length; i++) {
         String object = objects[i];
         treeview.append("&object=");
         treeview.append(HTMLUtils.encode(URLUtils.getInternalUrl(object)));
         searchView.append("&object=");
         searchView.append(HTMLUtils.encode(URLUtils.getInternalUrl(object)));
      }
   }

   String context = request.getParameter("context");
   if (context != null) {
      treeview.append("&context=");
      treeview.append(HTMLUtils.encode(URLUtils.getInternalUrl(context)));
      searchView.append("&context=");
      searchView.append(HTMLUtils.encode(URLUtils.getInternalUrl(context)));
   }

   //If there is no objects added, take them from the url
   if (objects == null) {
      String[] objs = new BookmarkObjectLoader().getObjectsToOpenInTree(request, response, session.getServletContext());
      if (objs != null && objs.length > 0) {
         if (context != null) {
            treeview.append("&context=");
            treeview.append(HTMLUtils.encode(context));
            searchView.append("&context=");
            searchView.append(HTMLUtils.encode(context));
         }

         for (int i = 0; i < objs.length; i++) {
            treeview.append("&object=");
            treeview.append(HTMLUtils.encode(URLUtils.getInternalUrl(objs[i])));
            searchView.append("&object=");
            searchView.append(HTMLUtils.encode(URLUtils.getInternalUrl(objs[i])));
         }
         if (request.getParameter("top") != null && request.getParameter("top").equals("yes")) {
            treeview.append("&top=yes");
            searchView.append("&top=yes");
         }
         treeview.append("&directbookmark=true");
      }
   }

   String catalog = request.getParameter("catalog");
   if (catalog != null) {
      treeview.append("&catalog=");
      treeview.append(catalog);
   }
   
   String nodeParameter = request.getParameter("node"); 
   if (nodeParameter != null) {
      treeview.append("&node=");
      treeview.append(nodeParameter);
   }

   String scroll = "";
   if (WebProperties.getInstance(false).autoScrollToBookmark()) {
      scroll = "#FOUND";
   }

%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN"
"http://www.w3.org/TR/html4/frameset.dtd">
<html>
<head>
</head>
<script>
   console.log('content step');
   console.log('<%=treeview.toString()%><%=scroll%>')
</script>
<frameset border="0" rows="22px,*" name="contentoncemore" id="contentoncemore">
   <!--La barre laterale de couleur grise de recherche et de menu-->
   <frame name="simpleSearch" scrolling="no" src="<%=searchView.toString()%>"/>
   <frame name="tree" src="<%=treeview.toString()%><%=scroll%>"/>
</frameset>
</html>
