<%@ page language="java" isErrorPage="true" %>
<%@ page import="sun.net.smtp.SmtpClient, java.io.*, java.util.Date, java.text.SimpleDateFormat" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%
String theHost = request.getServerName();

StringBuilder requestedPage = new StringBuilder();
requestedPage.append(request.getAttribute("javax.servlet.forward.request_uri"));
String query = (String) request.getAttribute("javax.servlet.forward.query_string");

if (query != null)
   requestedPage.append(query);

String referer = request.getHeader("referer");
%>
<html>
<head>
<title>404 Page Not Found &#8212; Nesstar</title>
<style>
   body {
      font-family: helvetica, arial, sans-serif;
      font-size: 1em;
      color: #222;
      line-height: 1.26em;
      padding-top: 3em;
   }
   h1 {
      font-size: 150%;
      border-bottom: 2px solid #f4f4f4;
   }
   h2 {
      font-size: 135%;
      margin: 2em 0 1em 0;
   }
   h3 {
      font-size: 110%;
      margin: 2em 0 0 0;
      padding: 0;
      text-decoration: underline;
   }
   h2, h3 {
      font-weight: normal;
   }
   h4 {
      margin: 0;
      padding: 0;
   }
   #container {
      margin: 0 auto;
      width: 46em;
      border-bottom: 1px solid #ddd;
   }
   .body {
      padding: 1em 2em;
   }
   blockquote {
      color: #000;
      background-color: #ddd;
      font-family: courier, serif;
      padding: 2px 4px;
   }
   form {
      margin: 1em;
   }
   ul#tips {
      list-style-type: none;
      padding-left: 0;
   }
   li {
      margin: .6em 0;
   }
   li ul {
      list-style-type: disc;
   }
   </style>
</head>

<body>
<div id="container">
<h1>Page not found</h1>
<div class="body">
<p>Unfortunately, the page you are looking for does not exist. The page may have been moved, deleted or there may have been an error in the
link you followed to get here.</p>

<p>The following tips might be able to help you further.</p>

<ul id="tips">
   <% if (referer != null) { %>
   <li>
      <h3>Go Back</h3>
      <p><a href="javascript:history.back();" title="Go back to the page that led you here">Go back where you came from</a>
         and try again.</p>
   </li>
   <% } %>
   <li><h3>Start over</h3>
      <p>Go to <a href="/webview" title="Go to WebView">WebView</a>
      to browse for what you are looking for.</p>
   </li>
<h2>If nothing helps</h2>
<p>In case the problem persists, please contact the system administrator.</p>

</div>
</div>
</body>

</html> 