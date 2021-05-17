<%@ page language="java" autoFlush="true" contentType="text/html; charset=UTF-8"%><%
	String nodeid = request.getParameter("nodeid");
	if (nodeid == null) nodeid = "";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
	<head>
		<script language="javascript" type="text/javascript" src="../javascript/login.js"></script>
	</head>
	<body>
		<%
		out.println(request.getParameter("html"));
		%>
	</body>
</html>