<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
   <title>Nesstar Server Status</title>
   <meta http-equiv="Refresh" CONTENT="10; URL=status.jsp" />
   <style type="text/css">
      body {
         font-family: Verdana, Arial, Helvetica;
         font-size: 8pt;
         margin: 0px;
         padding: 0px;
      }

      div.status {
         text-align: center;
      }

      strong {
         color: red;
      }

      h2 {
         color: red;
         clear: both;
         font-size: 200%;
         text-align: center;
         margin: 0px;
         padding: 0px;
      }

      table.useage-table {
        padding: 0px;
        margin-top: 0px;
        vertical-align: top;
        border: 1px solid black;
         table-layout: fixed;
         width: 100%;
      }
      
      table.useage-table tr {
        background-color: white;
        padding: 0px;
        margin: 0px;
      }

      table.useage-table tr td {
        padding: 0px;
        margin: 0px;
	height: 30px;
         overflow: hidden;
      }
      .used-cell {
        text-align: center;
        background-color: #a77;
      }

      .free-cell {
        text-align: center;
        background-color: #9a9;
      }
      
      .total-cell {
        background-color: white;
        color: black;
        text-align: right;
      }
      .free-cell, .used-cell {
        color: black;
      }
      a.refresh {
        padding: 0px;
        position: absolute;
        top: 0px;
        right: 0px;
      }
   </style>
</head>
<%@ page language="java"
         import="java.lang.String, java.text.*, java.util.*,nesstar.server.service.*,nesstar.server.configuration.*,nesstar.api.*" %>
<%
   String status = "";
   String color = "#0000FF";
   nesstar.server.ServletUtils.setProtocol(session);

   try {
      response.setContentType("text/html");

      status = "<div class=\"status\">";
      if (ServerStatus.isPublishing()) {
         status = status + "Status: the server is currently publishing";
      } else if (ServerStatus.isUnpublishing()) {
         status = status +  "Status: the server is currently removing " + ServerStatus.getContent();
      } else if (ServerStatus.isIndexing()) {
         status = status +  "Status: the server is currently indexing " + ServerStatus.getContent();
      } else if (KeepAliveThread.hasFailed()) {
         status = status +  "<strong>Fatal: the server has failed and will reboot in " + KeepAliveThread.getTimeLeft() + " seconds!</strong><br />Caused by: " + KeepAliveThread.getWarning();
      } else if (KeepAliveThread.hasWarning()) {
         status = status +  KeepAliveThread.getWarning();
      } 
      status = status + "<br /><br />" + printMemoryUsage() + "</div>";
      
   } catch (Exception e) {
      status = "<div class=\"status\">Status: the server is not running.</div>";
   }
%>
<body>
   <%= status %>
   <a class="refresh" href="" onClick="window.location.reload(true)">Refresh</a>
</body>
</html>

<%!
   public String printMemoryUsage() throws Exception {
      NumberFormat formatter = NumberFormat.getNumberInstance();
      Runtime rt = Runtime.getRuntime();

      long max = rt.maxMemory();
      long free = rt.freeMemory();
      long total = rt.totalMemory();

      int MB = 1048576;

      String maxStr = formatter.format((max / MB));
      String freeStr = formatter.format((free / MB));
      String totalStr = formatter.format((total / MB));
      String usedStr = formatter.format(((total - free) / MB));
      long usedPercent =(int)(((double)(total - free) / (double)max) * 100);
      long freePercent =(int)(((double)free / (double)max) * 100);
      
      StringBuffer table = new StringBuffer();

      table.append("<table class=\'useage-table\' title=\'" + maxStr + "MB max\' cellpadding='0' cellspacing='0' cellpadding='0' cellspacing='0'><tr>");
      table.append("<td class='used-cell' style='width:" + usedPercent + "%;' title='" + usedStr + "MB in use'>");
      table.append (usedStr + "MB");
      table.append("</td><td class='free-cell' style='width:" + freePercent + "%;' title='" + freeStr + "MB reserved'>");
      table.append (freeStr + "MB");
      table.append("</td><td class='total-cell'>");
      table.append(maxStr + "MB max");
      table.append("</td></tr></table>");

      boolean tripped = ((double) total / (double) max > 0.9) && (free < (total * 0.1));
      if (tripped) {
         return ("<h2>*Alert*</h2>" + table.toString());
      } else {
         return (table.toString());
      }

   }
%>

