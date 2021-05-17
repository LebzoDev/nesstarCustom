<%! private String encodeFileName(String file) {

   int positionOfLastSlash = file.lastIndexOf("/");

   String pathName = file.substring(0, positionOfLastSlash);
   String fileName = file.substring(positionOfLastSlash + 1);

   String escapedFileName = HTMLUtils.escapeURL(fileName);

   String newCompletePathWithFileName = pathName + "/" + escapedFileName; 

   return newCompletePathWithFileName;

}%>

<%@ page import="java.io.*, java.net.*, nesstar.webclient.utils.URLUtils,nesstar.webclient.common.Config " %>
<%@ page import="nesstar.webclient.utils.HTMLUtils" %>
<%@ page language="java" autoFlush="true" %>
<%
   //String urlRoot = new String ("http://129.177.92.53:8585");   
   String file = request.getParameter("file");
   String urlRoot = request.getParameter("server");
   InputStream in = null;
   Config conf = Config.getInstance();
   int bit = 256;
   int i = 0;

   if (null != file && !file.equals("")) {
      if (!file.startsWith("/")) file = "/" + file;
      if (!file.startsWith("/nesstar")) file = "/nesstar/" + file;

      String originalFile = file;

      //Make sure the actual file-name part of the path gets encoded
      file = encodeFileName(file);

      if (null == urlRoot || urlRoot.equals("")){
         String serverUrl = conf.getServerListUrl().get(0);
         if (null == serverUrl) serverUrl = "";
         URL url = new URL (serverUrl);

         StringBuffer buffer = new StringBuffer();
         buffer.append(url.getProtocol());
         buffer.append("://");
         buffer.append(url.getHost());
         if (url.getPort() != -1) {
            buffer.append(":");
            buffer.append(url.getPort());
         }
         urlRoot = buffer.toString();
      }


      try {
         URL resourceUrl = new URL (urlRoot + file);
         URLConnection uc = resourceUrl.openConnection();
         String contentType = uc.getContentType();

         response.setContentType(contentType);
         if (!contentType.startsWith("text/")  && !contentType.startsWith("image/")) {
            //set the header and filename if the file is not an image or text
            String name = originalFile.substring(originalFile.lastIndexOf("/") + 1, originalFile.length());
            response.setHeader ("Content-Disposition", "attachment; filename=\"" + name  + "\"");
         }

         in = uc.getInputStream();
         ServletOutputStream outs = response.getOutputStream();

         while ((bit) >= 0) {
            bit = in.read();
            outs.write(bit);
         }
         outs.flush();
         outs.close();
         in.close();

         }  catch (Exception e) {
            e.printStackTrace(System.out);
         }
      }
%> 
