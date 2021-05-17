<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
   <title>Welcome to the Nesstar Server</title>
   <meta name="keywords" content="nesstar server"/>
   <style type="text/css">
		html {
			font-size: 100%;
		}
		body {
			font-size: 11px;
			font-family: verdana, helvetica, arial, sans-serif;
			margin: 0;
			padding: 0;
		}
		a:link, a:visited {
			color: #1F3C79;
		}
		h1 {
			font-size: 1.5em;
		}
		h2 {
			font-size: 1.273em;
		}
		h3 {
			font-size: .9em;
		}
		h1, h2, h3 {
			margin: 1.7em 0 .7em 0;
			font-weight: normal;
		}
		h2 {
			color: #666;
			margin-top: 4em;
		}
		ul {
			margin: 0;
		}
		li {
			padding: .2em;
		}
		#header {
			margin-bottom: 2em;
			background-color: #00aff9;
		}
		#container {
			width: 54.55em;
			margin: 0 auto;
		}
		.nesstarlogo {
			height: 20px;
			left: 30px;
			margin-right: 40px;
			margin-top: 5px;
			top: 10px;
			width: 125px;
		}
		.nesstarpayoff {
			height: 12px;
			left: 162px;
			top: 22px;
			width: 173px;
		}
		.nesstarlogo, .nesstarpayoff {
			position: absolute;
		}
		.metadata {
			padding-left: 2em;
			margin-bottom: 4em;
			font-size: smaller;
		}
		.legend .item {
		    width: 15px;
		    height: 15px;
		}
		.legend .free {
		    background-color: #9a9;
		}
		.legend .used {
		    background-color: #a77;
		}
		.legend .text {
		    padding-left: 10px;
		}
   </style>
</head>
<%@ page language="java" import="nesstar.server.ServletUtils,nesstar.server.configuration.NesstarConfig,nesstar.server.configuration.NesstarProperties" %>
<%
   response.setContentType("text/html");
%>
<body>
	<div id="header">
		<img src="/nesstar/images/header_background.jpg" id="logo" alt="">
		<img class="nesstarlogo" src="/nesstar/images/NesstarLogoTransBg.png" alt="">
		<img class="nesstarpayoff" src="/nesstar/images/nesstar_payoff.png" alt="">
	</div>
	<div id="container">
         <%
            String version = NesstarConfig.getVersion();
	    String revision = NesstarConfig.getRevision();
            nesstar.server.ServletUtils.setProtocol(session);
            String serverName = NesstarConfig.getServer();
            String serverID = "/cServer/" + serverName;
            String url = "/";
            String objPath = url + "obj";
            String browseNoFrames = "/browser?FRAMES=false&amp;action=LIST&amp;url=" + objPath;
            String browse = "/browser?FRAMES=true&amp;url=" + objPath;
         %>

         <h1>Welcome to the <em><%= serverName %></em> Nesstar Server</h1>
	   <div class="metadata">
            <p id="version">Version: <strong><%= version %></strong>.</p>
	    <p id="builddate">Build date: <strong><%= revision %></strong>.</p>
	   </div>

         <p>You can access the holdings of this Nesstar Server
            using <a href=/webview/>Nesstar WebView</a> or by browsing the <a href="/webview/index/">Metadata Index</a>.</p>

         <h2>Administrator's Resources</h2>

         <p>If you are the administrator of this server please:</p>

         <ol>
            <li>Read the <a href="http://nesstar.com/help/4.0/server/license.html">Licence</a> agreement;</li>
            <li>Read the Nesstar Server <a href="http://www.nesstar.com/help/4.0/server/">Help</a>.</li>
         </ol>

         <h2>Useful Tools</h2>

         <p>You can use:</p>
         <ul>
            <li>The <a href="/admin/index.jsp">User Management Tool</a> to create and manage users.</li>
          
            <% if (NesstarProperties.getDebugLevelLogging().equals("true")) { %>
            <li>The Object Browser to access all the objects contained in this server through
               a web interface:<br><a href="<%= browse %><%= serverID %>">Browse objects
               (frames)</a> | <a href="<%= browseNoFrames %><%= serverID %>">Browse
               objects (no frames)</a>.<br></li>

            <% } else { %>
               <li>The direct url to this Nesstar server's server object is <a href="/obj<%= serverID %>">/obj<%= serverID %></a></li>
            <% } %>
         </ul>

         <h2>Server Status Information</h2>

	    
         <iframe src="/nesstar/docs/status.jsp" frameborder="0" width="100%" height="80" scrolling="no" style="margin:0; padding:0;"></iframe>

	<table class="legend">
	    <tr>
		<td class="item used">&nbsp;</td><td class="text">Used memory</td>
	    </tr>
	    <tr>
		<td class="item free">&nbsp;</td><td class="text">Free memory</td>
	    </tr>
	</table>
         <p>For questions or suggestions regarding Nesstar products please contact: <a
            href="mailto:nesstar-support@nesstar.org?subject=Nesstar%20Server%20Query">Nesstar Support</a>.
         </p>

         <p>Copyright &copy; &ndash; <a href="http://www.nsd.uib.no">NSD</a>.</p>

	</div>
</body>
</html>
