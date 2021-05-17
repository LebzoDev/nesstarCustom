<?xml version="1.0"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:zip-archive="http://apache.org/cocoon/zip-archive/1.0">

	<xsl:param name="entryname"/>
	<xsl:param name="entrysrc"/>

	<xsl:template match="zip-archive:archive">
		<xsl:copy>
			<zip-archive:entry name="{$entryname}" src="http://www.nesstar.org"/>
		</xsl:copy>
	</xsl:template>
</xsl:stylesheet>