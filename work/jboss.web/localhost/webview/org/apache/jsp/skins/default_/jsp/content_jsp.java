package org.apache.jsp.skins.default_.jsp;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import nesstar.api.Protocol;
import nesstar.api.WebExecutorLog;
import nesstar.webclient.common.WebInit;
import nesstar.webclient.common.WebProperties;
import nesstar.webclient.htmlviewer.WebHTMLViewer;
import nesstar.webclient.utils.*;

public final class content_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static java.util.List _jspx_dependants;

  public Object getDependants() {
    return _jspx_dependants;
  }

  public void _jspService(HttpServletRequest request, HttpServletResponse response)
        throws java.io.IOException, ServletException {

    JspFactory _jspxFactory = null;
    PageContext pageContext = null;
    HttpSession session = null;
    ServletContext application = null;
    ServletConfig config = null;
    JspWriter out = null;
    Object page = this;
    JspWriter _jspx_out = null;
    PageContext _jspx_page_context = null;


    try {
      _jspxFactory = JspFactory.getDefaultFactory();
      response.setContentType("text/html; charset=UTF-8");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;

      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");


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


      out.write("\r\n");
      out.write("<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Frameset//EN\"\r\n");
      out.write("\"http://www.w3.org/TR/html4/frameset.dtd\">\r\n");
      out.write("<html>\r\n");
      out.write("<head>\r\n");
      out.write("</head>\r\n");
      out.write("<script>\r\n");
      out.write("   console.log('content step');\r\n");
      out.write("   console.log('");
      out.print(treeview.toString());
      out.print(scroll);
      out.write("')\r\n");
      out.write("</script>\r\n");
      out.write("<frameset border=\"0\" rows=\"22px,*\" name=\"contentoncemore\" id=\"contentoncemore\">\r\n");
      out.write("   <!--La barre laterale de couleur grise de recherche et de menu-->\r\n");
      out.write("   <frame name=\"simpleSearch\" scrolling=\"no\" src=\"");
      out.print(searchView.toString());
      out.write("\"/>\r\n");
      out.write("   <frame name=\"tree\" src=\"");
      out.print(treeview.toString());
      out.print(scroll);
      out.write("\"/>\r\n");
      out.write("</frameset>\r\n");
      out.write("</html>\r\n");
    } catch (Throwable t) {
      if (!(t instanceof SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          out.clearBuffer();
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
      }
    } finally {
      if (_jspxFactory != null) _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }
}
