package org.apache.jsp.error;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import sun.net.smtp.SmtpClient;
import java.io.*;
import java.util.Date;
import java.text.SimpleDateFormat;

public final class _404_jsp extends org.apache.jasper.runtime.HttpJspBase
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
    Throwable exception = org.apache.jasper.runtime.JspRuntimeLibrary.getThrowable(request);
    if (exception != null) {
      response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
    }
    ServletContext application = null;
    ServletConfig config = null;
    JspWriter out = null;
    Object page = this;
    JspWriter _jspx_out = null;
    PageContext _jspx_page_context = null;


    try {
      _jspxFactory = JspFactory.getDefaultFactory();
      response.setContentType("text/html");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;

      out.write("\n");
      out.write("\n");
      out.write("<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\"\n");
      out.write("\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\n");

String theHost = request.getServerName();

StringBuilder requestedPage = new StringBuilder();
requestedPage.append(request.getAttribute("javax.servlet.forward.request_uri"));
String query = (String) request.getAttribute("javax.servlet.forward.query_string");

if (query != null)
   requestedPage.append(query);

String referer = request.getHeader("referer");

      out.write("\n");
      out.write("<html>\n");
      out.write("<head>\n");
      out.write("<title>404 Page Not Found &#8212; Nesstar</title>\n");
      out.write("<style>\n");
      out.write("   body {\n");
      out.write("      font-family: helvetica, arial, sans-serif;\n");
      out.write("      font-size: 1em;\n");
      out.write("      color: #222;\n");
      out.write("      line-height: 1.26em;\n");
      out.write("      padding-top: 3em;\n");
      out.write("   }\n");
      out.write("   h1 {\n");
      out.write("      font-size: 150%;\n");
      out.write("      border-bottom: 2px solid #f4f4f4;\n");
      out.write("   }\n");
      out.write("   h2 {\n");
      out.write("      font-size: 135%;\n");
      out.write("      margin: 2em 0 1em 0;\n");
      out.write("   }\n");
      out.write("   h3 {\n");
      out.write("      font-size: 110%;\n");
      out.write("      margin: 2em 0 0 0;\n");
      out.write("      padding: 0;\n");
      out.write("      text-decoration: underline;\n");
      out.write("   }\n");
      out.write("   h2, h3 {\n");
      out.write("      font-weight: normal;\n");
      out.write("   }\n");
      out.write("   h4 {\n");
      out.write("      margin: 0;\n");
      out.write("      padding: 0;\n");
      out.write("   }\n");
      out.write("   #container {\n");
      out.write("      margin: 0 auto;\n");
      out.write("      width: 46em;\n");
      out.write("      border-bottom: 1px solid #ddd;\n");
      out.write("   }\n");
      out.write("   .body {\n");
      out.write("      padding: 1em 2em;\n");
      out.write("   }\n");
      out.write("   blockquote {\n");
      out.write("      color: #000;\n");
      out.write("      background-color: #ddd;\n");
      out.write("      font-family: courier, serif;\n");
      out.write("      padding: 2px 4px;\n");
      out.write("   }\n");
      out.write("   form {\n");
      out.write("      margin: 1em;\n");
      out.write("   }\n");
      out.write("   ul#tips {\n");
      out.write("      list-style-type: none;\n");
      out.write("      padding-left: 0;\n");
      out.write("   }\n");
      out.write("   li {\n");
      out.write("      margin: .6em 0;\n");
      out.write("   }\n");
      out.write("   li ul {\n");
      out.write("      list-style-type: disc;\n");
      out.write("   }\n");
      out.write("   </style>\n");
      out.write("</head>\n");
      out.write("\n");
      out.write("<body>\n");
      out.write("<div id=\"container\">\n");
      out.write("<h1>Page not found</h1>\n");
      out.write("<div class=\"body\">\n");
      out.write("<p>Unfortunately, the page you are looking for does not exist. The page may have been moved, deleted or there may have been an error in the\n");
      out.write("link you followed to get here.</p>\n");
      out.write("\n");
      out.write("<p>The following tips might be able to help you further.</p>\n");
      out.write("\n");
      out.write("<ul id=\"tips\">\n");
      out.write("   ");
 if (referer != null) { 
      out.write("\n");
      out.write("   <li>\n");
      out.write("      <h3>Go Back</h3>\n");
      out.write("      <p><a href=\"javascript:history.back();\" title=\"Go back to the page that led you here\">Go back where you came from</a>\n");
      out.write("         and try again.</p>\n");
      out.write("   </li>\n");
      out.write("   ");
 } 
      out.write("\n");
      out.write("   <li><h3>Start over</h3>\n");
      out.write("      <p>Go to <a href=\"/webview\" title=\"Go to WebView\">WebView</a>\n");
      out.write("      to browse for what you are looking for.</p>\n");
      out.write("   </li>\n");
      out.write("<h2>If nothing helps</h2>\n");
      out.write("<p>In case the problem persists, please contact the system administrator.</p>\n");
      out.write("\n");
      out.write("</div>\n");
      out.write("</div>\n");
      out.write("</body>\n");
      out.write("\n");
      out.write("</html> ");
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
