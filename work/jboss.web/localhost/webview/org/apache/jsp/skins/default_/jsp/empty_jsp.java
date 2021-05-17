package org.apache.jsp.skins.default_.jsp;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;

public final class empty_jsp extends org.apache.jasper.runtime.HttpJspBase
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
      out.write("<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\">\r\n");
      out.write("\r\n");
      out.write("<html xmlns=\"http://www.w3.org/1999/xhtml\" lang=\"en\" id=\"emptyPage\">\r\n");
      out.write("   <head>\r\n");
      out.write("\t   <title>Empty frame</title>\r\n");
      out.write("\t   <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\r\n");
      out.write("\t   <!--\r\n");
      out.write("\t   This is a workaround for IE to make caching mechanism follow what the meta tag says. It seems that IE does not\r\n");
      out.write("\t   follow the caching set in the meta tags before the page has reached 64 bytes. This is why this text should be over 64\r\n");
      out.write("\t   bytes in size.\r\n");
      out.write("\t   -->\r\n");
      out.write("\t   <meta http-equiv=\"Pragma\" content=\"no-cache\">\r\n");
      out.write("\t   <meta http-equiv=\"Expires\" content=\"-1\">\r\n");
      out.write("\t   \r\n");
      out.write("\t   <link href=\"../css/cube.css\" rel=\"stylesheet\" type=\"text/css\">\r\n");
      out.write("\t   <link href=\"../css/common.css\" rel=\"stylesheet\" type=\"text/css\">\r\n");
      out.write("\t   <link href=\"../css/common_overrides.css\" rel=\"stylesheet\" type=\"text/css\">\r\n");
      out.write("\t   <link href=\"../css/menu.css\" rel=\"stylesheet\" type=\"text/css\">\r\n");
      out.write("\t   \r\n");
      out.write("\t   <!--[if lte IE 6]>\r\n");
      out.write("\t   <link href=\"../css/fixed_ie.css\" type=\"text/css\" rel=\"stylesheet\" media=\"screen\" title=\"Fixed content\" />\r\n");
      out.write("\t   <link href=\"../css/ie_workarounds.css\" type=\"text/css\" rel=\"stylesheet\" media=\"screen\" />\r\n");
      out.write("\t   <![endif]-->\r\n");
      out.write("   </head>\r\n");
      out.write("   <body id=\"fillmeup\">\r\n");
      out.write("   </body>\r\n");
      out.write("</html>\r\n");
      out.write("\r\n");
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
