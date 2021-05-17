package org.apache.jsp;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import nesstar.webclient.utils.ServletUtils;
import nesstar.webclient.common.WebProperties;
import nesstar.webclient.utils.HTMLUtils;

public final class rightside_jsp extends org.apache.jasper.runtime.HttpJspBase
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

   String scrolling = "";
   String user_agent = request.getHeader("User-Agent");
   if (user_agent.indexOf("MSIE 5") != -1 || user_agent.indexOf("MSIE 6") != -1 || user_agent.indexOf("MSIE 7") != -1) {
      if (user_agent.indexOf("Opera") == -1) {
         scrolling = "scrolling=\"auto\"";
      }
   }
   //The servlet prefix
   String prefix = ServletUtils.getServletUrlPrefix(request, "/velocity");

      out.write("\r\n");
      out.write("<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Frameset//EN\"\r\n");
      out.write("\"http://www.w3.org/TR/html4/frameset.dtd\">\r\n");
      out.write("<html>\r\n");
      out.write("<head>\r\n");
      out.write("</head>\r\n");
      out.write("<frameset border=\"0\">\r\n");
      out.write("    ");

       String welcomePageUri = request.getParameter("welcomepageuri");

        String query = request.getQueryString();
        if (query == null) query = "";

        try {
            if (query.charAt(0) != '?') query = "?" + query;
        } catch (Exception e) {
        }

        query = HTMLUtils.escapeHtmlBrackets(query);

    if(welcomePageUri != null){
        welcomePageUri = HTMLUtils.escapeHtmlBrackets(welcomePageUri);
    
      out.write("\r\n");
      out.write("      <frame name=\"rightside\" src=\"welcomepagehandler.jsp?welcomepageuri=");
      out.print(welcomePageUri);
      out.write('&');
      out.print(query);
      out.write("\" marginwidth=\"0\" ");
      out.print(scrolling);
      out.write("/>\r\n");
      out.write("    ");

       }else{
    
      out.write("\r\n");
      out.write("      <frame name=\"rightside\" src=\"");
      out.print(prefix);
      out.print(query);
      out.write("\" marginwidth=\"0\" ");
      out.print(scrolling);
      out.write("/>\r\n");
      out.write("    ");

       }
    
      out.write("\r\n");
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
