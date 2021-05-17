<%@ page import="java.io.PrintWriter,
				 javax.xml.transform.TransformerFactory,
				 javax.xml.transform.Source,
				 javax.xml.transform.sax.SAXSource,
				 javax.xml.transform.stream.StreamSource,
				 javax.xml.transform.Transformer,
				 javax.xml.transform.stream.StreamResult,
				 org.xml.sax.InputSource,
				 java.io.UnsupportedEncodingException,
				 nesstar.util.XMLUtils,
				 java.io.ByteArrayInputStream,
				 javax.xml.transform.URIResolver,
				 nesstar.server.AdminURIResolver"%>
<%@ page language="java" autoFlush="true" contentType="text/html; charset=UTF-8"%><%

	// Set content type for HTML.
		response.setContentType("text/html; charset=UTF-8");
		// Output goes to the response PrintWriter.
		//PrintWriter outted = response.getWriter();
		try {
			TransformerFactory tFactory = TransformerFactory.newInstance();
			//get the real path for xml and xsl files.
			String ctx = getServletConfig().getServletContext().getRealPath("") + "/";

			// Get the XML input document and the stylesheet, both in the servlet
			// engine document directory.
			URIResolver resolver = new AdminURIResolver(request.getSession().getId());
		
			tFactory.setURIResolver(resolver);
			
			Source xmlSource = new SAXSource(new InputSource(new java.net.URL("file", "", ctx + toOpen).openStream()));
			Source xslSource = new StreamSource(new java.net.URL("file", "", ctx + "AdministratorInterface.xsl").openStream());
			// Generate the transformer.
			Transformer transformer = tFactory.newTransformer(xslSource);
			// Perform the transformation, sending the output to the response.
			transformer.transform(xmlSource, new StreamResult(out));
		}
				// If an Exception occurs, return the error to the client.
		catch (Exception e) {
			out.write(e.getMessage());
		}
		// Close the PrintWriter.
		out.flush();
		out.close();
%>