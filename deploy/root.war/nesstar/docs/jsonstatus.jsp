[
<%@ page language="java"
         import="java.lang.String, java.text.*, java.util.*,nesstar.server.service.*,nesstar.server.configuration.*,nesstar.api.*" %>
<%
   String status = "";
   String maxStr = "";
   String freeStr = "";
   String totalStr = "";
   String usedStr = "";

   nesstar.server.ServletUtils.setProtocol(session);

   try {
      response.setContentType("application/json");
      if (ServerStatus.isPublishing()) {
         status = "Publishing";
      } else if (ServerStatus.isUnpublishing()) {
         status = "Removing " + ServerStatus.getContent();
      } else if (ServerStatus.isIndexing()) {
         status = "Indexing " + ServerStatus.getContent();
      } else if (KeepAliveThread.hasFailed()) {
         status = "FAILED. Reboot in " + KeepAliveThread.getTimeLeft() + " seconds";
      } else if (KeepAliveThread.hasWarning()) {
         status = KeepAliveThread.getWarning();
      }  else {
         status = "Hunky Dory";
      }

      NumberFormat formatter = NumberFormat.getNumberInstance();
      Runtime rt = Runtime.getRuntime();

      long max = rt.maxMemory();
      long free = rt.freeMemory();
      long total = rt.totalMemory();

      int MB = 1048576;

      maxStr = formatter.format((max / MB));
      freeStr = formatter.format((free / MB));
      totalStr = formatter.format((total / MB));
      usedStr = formatter.format(((total - free) / MB));
      long usedPercent =(int)(((double)(total - free) / (double)max) * 100);
      long freePercent =(int)(((double)free / (double)max) * 100);
      } catch (Exception e) { 
      status = "Server not running";
   }
%>
   {
      "Maximum memory": "<%= maxStr %>MB",
      "Allocated memory": "<%= totalStr %>MB",
      "Used memory": "<%= usedStr %>MB",
      "Free memory": "<%= freeStr %>MB",
      "Status": "<%= status %>"
   }
]
