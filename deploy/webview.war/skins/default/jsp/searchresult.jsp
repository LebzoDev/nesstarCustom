<%@ page import="nesstar.webclient.utils.ServletUtils"%>
<%@ page language="java" autoFlush="true" contentType="text/html; charset=UTF-8"%><%

	String url = request.getContextPath();

	String query = request.getQueryString();
	if (query == null) query = "";

	try {
		if (query.charAt(0) != '?') query = "?"+query;
	} catch (Exception e) {
	}

	String searchresult = ServletUtils.getServletUrlPrefix(request, null) +"?";
	String link = request.getParameter("searchresultree");
	if (link != null) {
		searchresult += link;
	} else searchresult += "mode=searchresult";

	String searchresultbox = ServletUtils.getServletUrlPrefix(request, null) + "?";
	String linkbox = request.getParameter("searchresultbox");
	if (linkbox != null) {
		searchresultbox += linkbox;
	} else searchresultbox += "mode=boxview";



%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN"
   "http://www.w3.org/TR/html4/frameset.dtd">
<html>
	<head>
	</head>

			<frameset border="0">
				<frame scrolling="no" name="tree" src="<%=searchresult%>" />
			</frameset>
</html>