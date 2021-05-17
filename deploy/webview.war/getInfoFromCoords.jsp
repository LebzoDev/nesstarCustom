<%@ page import="nesstar.webclient.velocity.map.wms.WMSQueryService"%><%@ page language="java" autoFlush="false" contentType="application/json; charset=UTF-8"%><%
  WMSQueryService queryService = new WMSQueryService(request);
  %>{"featureID":"<%
  out.write(queryService.getNesstarID());
  %>"}<%
  out = pageContext.pushBody();
%>
