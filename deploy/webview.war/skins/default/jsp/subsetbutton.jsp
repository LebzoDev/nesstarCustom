<%@ page language="java" autoFlush="true" contentType="text/html; charset=UTF-8" import="nesstar.webclient.velocity.servlet.Parameters,
                                                                                         nesstar.webclient.velocity.servlet.Request,
                                                                                         nesstar.webclient.velocity.servlet.RequestWrapper" %>
<%@ page import="java.util.ResourceBundle"%>
<%
  Request.set(request);
  RequestWrapper.set(request, response, session.getServletContext());
  ResourceBundle bundle = Parameters.get().getTranslation();
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
  <!--
  This is a workaround for IE to make caching mechanism follow what the meta tag says. It seems that IE does not
  follow the caching set in the meta tags before the page has reached 64 bytes. This is why this text should be over 64
  bytes in size.
  -->
  <meta http-equiv="Pragma" content="no-cache"/>
  <meta http-equiv="Expires" content="-1"/>
  <link href="../css/cubesubset.css" rel="stylesheet" type="text/css"/>
  <link href="../css/common.css" rel="stylesheet" type="text/css"/>
</head>

<body>
<div id="treebutton">
  <form action="$!form_action">
    <table>
      <tr>
        <td>
          <input type="button" class="button" value="<%=bundle.getString("deselect")%>"
                 onclick="javascript:parent.subset.ToggleAllTree('')"/>
        </td>
        <td>
          <input type="button" class="button" value="<%=bundle.getString("select")%>"
                 onclick="javascript:parent.subset.ToggleAllTree('checked')"/>
        </td>
        <td>
          <input type="button" class="button" value="<%=bundle.getString("update")%>"
                 onclick="javascript:parent.subset.executeTree()"/>
        </td>
      </tr>
    </table>
  </form>
</div>
</body>

</html>
<%
  RequestWrapper.clear();
  Request.set(null);
%>