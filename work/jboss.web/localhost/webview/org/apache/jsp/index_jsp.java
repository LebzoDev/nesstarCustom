package org.apache.jsp;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import nesstar.api.I18n;
import nesstar.webclient.common.WebviewTranslation;
import nesstar.webclient.common.WebProperties;
import nesstar.webclient.utils.HTMLUtils;
import nesstar.webclient.velocity.servlet.Request;
import javax.servlet.http.HttpServletResponse;
import nesstar.util.translation.Translation;

public final class index_jsp extends org.apache.jasper.runtime.HttpJspBase
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
      out.write("\r\n");
      out.write("\r\n");

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

      out.write("\r\n");
      out.write("<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Frameset//EN\"\r\n");
      out.write("\"http://www.w3.org/TR/html4/frameset.dtd\">\r\n");
      out.write("<html>\r\n");
      out.write("<head>\r\n");
      out.write("   <title>");
      out.print(htmlTitle);
      out.write("</title>\r\n");
      out.write("   <link href=\"icons/SmallN1.ico\" rel=\"shortcut icon\"/>\r\n");
      out.write("    ");
      org.apache.jasper.runtime.JspRuntimeLibrary.include(request, response, "static/stats.html", out, false);
      out.write("\r\n");
      out.write("   <noscript>\r\n");
      out.write("      <meta http-equiv=\"Refresh\" content=\"0; URL=index\" />\r\n");
      out.write("   </noscript>\r\n");
      out.write("</head>\r\n");
      out.write("   <frameset rows=\"");
      out.print(topFrameHeight);
      out.write("px,*\" border=\"0\">\r\n");
      out.write("   <frame scrolling=\"no\" marginwidth=\"0px\" marginheight=\"0px\" name=\"header2\" src=\"header.jsp");
      out.print(language);
      out.write("\" />\r\n");
      out.write("   <frame scrolling=\"no\" name=\"main\" src=\"main.jsp");
      out.print(sessionid);
      out.print(query);
      out.write("\"/>\r\n");
      out.write("   </frameset>\r\n");
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
