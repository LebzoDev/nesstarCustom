package org.apache.jsp;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import nesstar.api.Catalog;
import nesstar.api.Protocol;
import nesstar.api.I18n;
import nesstar.api.common.Server;
import nesstar.api.faster.Cube;
import nesstar.api.faster.Section;
import nesstar.api.faster.Study;
import nesstar.api.faster.Variable;
import nesstar.rdf.RDFObject;
import nesstar.api.WebExecutorLog;
import nesstar.webclient.common.WebInit;
import nesstar.webclient.common.WebProperties;
import nesstar.webclient.htmlviewer.WebHTMLViewer;
import nesstar.webclient.utils.BookmarkObjectLoader;
import nesstar.webclient.utils.HTMLUtils;
import nesstar.webclient.utils.URLUtils;
import nesstar.webclient.velocity.servlet.Request;
import nesstar.webclient.common.WebviewTranslation;
import nesstar.util.translation.Translation;
import org.apache.log4j.Logger;

public final class main_jsp extends org.apache.jasper.runtime.HttpJspBase
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
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");

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

      out.write("\r\n");
      out.write("\r\n");
      out.write("<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Frameset//EN\" \"http://www.w3.org/TR/html4/frameset.dtd\">\r\n");
      out.write("<html>\r\n");
      out.write("<head>\r\n");
      out.write("</head>\r\n");
      out.write("<script>\r\n");
      out.write("   \r\n");
      out.write("   console.log(\"");
      out.print(WebProperties.getInstance(true).getSkinPath());
      out.write("jsp/content.jsp");
      out.print(sessionid);
      out.print(query);
      out.write("\")\r\n");
      out.write("   console.log(\"");
      out.print(url);
      out.write("\");\r\n");
      out.write("   console.log(\"");
      out.print(WebProperties.getInstance(true).getSkinPath());
      out.write("jsp/empty.jsp");
      out.print(sessionid);
      out.write("\");\r\n");
      out.write("</script>\r\n");
      out.write("<frameset id=\"set\" name=\"set\" cols=\"");
      out.print(WebProperties.getInstance(true).getBrowselistWidth());
      out.write(",*, 0px\" border=\"0\">\r\n");
      out.write("   <frame scrolling=\"no\" name=\"content\" id=\"content\"\r\n");
      out.write("          src=\"");
      out.print(WebProperties.getInstance(true).getSkinPath());
      out.write("jsp/content.jsp");
      out.print(sessionid);
      out.print(query);
      out.write("\"/>\r\n");
      out.write("   <frame name=\"rightsidemainframe\" src=\"");
      out.print(url);
      out.write("\" marginwidth=\"0\"/>\r\n");
      out.write("   <frame scrolling=\"yes\" name=\"login\"\r\n");
      out.write("          src=\"");
      out.print(WebProperties.getInstance(true).getSkinPath());
      out.write("jsp/empty.jsp");
      out.print(sessionid);
      out.write("\" marginwidth=\"0\"/>\r\n");
      out.write("</frameset>\r\n");
      out.write("</html>\r\n");

   //Reset so we are sure that the reuse of threads in the pool does not give unwanted sideeffects
   Request.set(null);

      out.write('\r');
      out.write('\n');
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
