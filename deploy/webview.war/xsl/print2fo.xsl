<?xml version="1.0" encoding="utf-8"?>
<!--sdoc2fo.xsl author Hiroshi Obata version 1.0
    sample2fo.xsl Jun, 2001, modified for XSL Seminar by t.makita
    December 2001, modified by S. Murakami in order to conformant with Recommendation of XSL Specification.
    May 2002, slightly modified by T. Kobayashi for new Tutrial Revision.
-->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" version="1.0">

<!-- Control -->
<xsl:param name="toc-make" select="false()"/>
<xsl:param name="cover-make" select="false()"/>
<xsl:param name="toc-level-default" select="5"/>
<xsl:param name="list-startdist-default" select="string('2em')"/>
<xsl:param name="list-gap-default" select="string('0.5em')"/>
<xsl:param name="dl-startdist-default" select="string('3cm')"/>
<xsl:param name="dl-gap-default" select="string('0.5cm')"/>

<xsl:variable name="toc-level-max">
  <xsl:choose>
    <xsl:when test="not (doc/@toclevel)">
      <xsl:value-of select="$toc-level-default"/>
    </xsl:when>
    <xsl:otherwise>
      <xsl:value-of select="number(doc/@toclevel)"/>
    </xsl:otherwise>
  </xsl:choose>
</xsl:variable>

<xsl:variable name="lp-posaaa">
<xsl:value-of select="generate-id(doc//p[position()=last()])"/>
</xsl:variable>

<xsl:variable name="lp-pos">
<xsl:for-each select="doc//p">
<xsl:if test="position()=last()">
<xsl:value-of select="generate-id(.)"/>
</xsl:if>
</xsl:for-each>
</xsl:variable>


<!-- Paper Size -->
<xsl:param name="paper-width">8.5in</xsl:param>
<xsl:param name="paper-height">11in</xsl:param>

<!-- cover -->
<xsl:attribute-set name="cover.title">
  <xsl:attribute name="space-before">25mm</xsl:attribute>
  <xsl:attribute name="space-before.conditionality">retain</xsl:attribute>
  <xsl:attribute name="space-after">122mm</xsl:attribute>
  <xsl:attribute name="font-size">24pt</xsl:attribute>
  <xsl:attribute name="font-family">sans-serif</xsl:attribute>
  <xsl:attribute name="text-align">center</xsl:attribute>
  <xsl:attribute name="text-align-last">center</xsl:attribute>
  <xsl:attribute name="start-indent">18mm</xsl:attribute>
  <xsl:attribute name="width">140mm</xsl:attribute>
  <xsl:attribute name="height">20mm</xsl:attribute>
  <xsl:attribute name="background-color">#EEEEEE</xsl:attribute>
  <xsl:attribute name="border-style">outset</xsl:attribute>
  <xsl:attribute name="border-color">#888888</xsl:attribute>
  <xsl:attribute name="padding-top">5pt</xsl:attribute>
  <xsl:attribute name="padding-bottom">5pt</xsl:attribute>
</xsl:attribute-set>

<xsl:attribute-set name="cover.date">
  <xsl:attribute name="space-after">5mm</xsl:attribute>
  <xsl:attribute name="font-size">14pt</xsl:attribute>
  <xsl:attribute name="font-family">serif</xsl:attribute>
  <xsl:attribute name="text-align">center</xsl:attribute>
  <xsl:attribute name="text-align-last">center</xsl:attribute>
  <xsl:attribute name="width">160mm</xsl:attribute>
</xsl:attribute-set>

<xsl:attribute-set name="cover.author">
  <xsl:attribute name="font-size">14pt</xsl:attribute>
  <xsl:attribute name="font-family">serif</xsl:attribute>
  <xsl:attribute name="text-align">center</xsl:attribute>
  <xsl:attribute name="text-align-last">center</xsl:attribute>
  <xsl:attribute name="width">160mm</xsl:attribute>
</xsl:attribute-set>

<!-- titles -->
<xsl:attribute-set name="h1">
  <xsl:attribute name="font-size">24pt</xsl:attribute>
  <xsl:attribute name="font-family">sans-serif</xsl:attribute>
  <xsl:attribute name="font-weight">bold</xsl:attribute>
  <xsl:attribute name="space-after">14pt</xsl:attribute>
  <xsl:attribute name="break-before">page</xsl:attribute>
  <xsl:attribute name="border-after-style">solid</xsl:attribute>
  <xsl:attribute name="border-after-width">2pt</xsl:attribute>
</xsl:attribute-set>

<xsl:attribute-set name="h2">
  <xsl:attribute name="font-size">16pt</xsl:attribute>
  <xsl:attribute name="font-family">sans-serif</xsl:attribute>
  <xsl:attribute name="font-weight">bold</xsl:attribute>
  <xsl:attribute name="space-before">19pt</xsl:attribute>
  <xsl:attribute name="space-after">5pt</xsl:attribute>
  <xsl:attribute name="keep-with-next.within-page">always</xsl:attribute>
</xsl:attribute-set>

<xsl:attribute-set name="h3">
  <xsl:attribute name="font-size">13pt</xsl:attribute>
  <xsl:attribute name="font-family">sans-serif</xsl:attribute>
  <xsl:attribute name="font-weight">bold</xsl:attribute>
  <xsl:attribute name="space-before">14pt</xsl:attribute>
  <xsl:attribute name="space-after">5pt</xsl:attribute>
  <xsl:attribute name="keep-with-next.within-page">always</xsl:attribute>
</xsl:attribute-set>

<xsl:attribute-set name="h4">
  <xsl:attribute name="font-size">12pt</xsl:attribute>
  <xsl:attribute name="font-family">sans-serif</xsl:attribute>
  <xsl:attribute name="font-weight">bold</xsl:attribute>
  <xsl:attribute name="space-before">5pt</xsl:attribute>
  <xsl:attribute name="space-after">5pt</xsl:attribute>
  <xsl:attribute name="keep-with-next.within-page">always</xsl:attribute>
</xsl:attribute-set>

<xsl:attribute-set name="h5">
  <xsl:attribute name="font-size">10pt</xsl:attribute>
  <xsl:attribute name="font-family">sans-serif</xsl:attribute>
  <xsl:attribute name="font-weight">bold</xsl:attribute>
  <xsl:attribute name="space-before">3pt</xsl:attribute>
  <xsl:attribute name="space-after">3pt</xsl:attribute>
  <xsl:attribute name="keep-with-next.within-page">always</xsl:attribute>
</xsl:attribute-set>

<xsl:attribute-set name="list.item">
  <xsl:attribute name="space-before">0.4em</xsl:attribute>
  <xsl:attribute name="space-after">0.4em</xsl:attribute>
  <xsl:attribute name="relative-align">baseline</xsl:attribute>
</xsl:attribute-set>

<xsl:attribute-set name="table.data">
  <xsl:attribute name="table-layout">fixed</xsl:attribute>
  <xsl:attribute name="space-before">10pt</xsl:attribute>
  <xsl:attribute name="space-after">10pt</xsl:attribute>
</xsl:attribute-set>

<xsl:attribute-set name="table.data.caption">
  <xsl:attribute name="font-family">sans-serif</xsl:attribute>
  <xsl:attribute name="text-align">start</xsl:attribute>
  <xsl:attribute name="space-before">3pt</xsl:attribute>
  <xsl:attribute name="space-after">3pt</xsl:attribute>
  <xsl:attribute name="space-after.precedence">2</xsl:attribute>
  <xsl:attribute name="font-weight">bold</xsl:attribute>
  <xsl:attribute name="keep-with-next.within-page">always</xsl:attribute>
</xsl:attribute-set>

<xsl:attribute-set name="table.data.th">
  <xsl:attribute name="background-color">#DDDDDD</xsl:attribute>
  <xsl:attribute name="border-style">solid</xsl:attribute>
  <xsl:attribute name="border-width">1pt</xsl:attribute>
  <xsl:attribute name="padding-start">0.3em</xsl:attribute>
  <xsl:attribute name="padding-end">0.2em</xsl:attribute>
  <xsl:attribute name="padding-before">2pt</xsl:attribute>
  <xsl:attribute name="padding-after">2pt</xsl:attribute>
</xsl:attribute-set>

<xsl:attribute-set name="table.data.td">
  <xsl:attribute name="border-style">solid</xsl:attribute>
  <xsl:attribute name="border-width">1pt</xsl:attribute>
  <xsl:attribute name="padding-start">0.3em</xsl:attribute>
  <xsl:attribute name="padding-end">0.2em</xsl:attribute>
  <xsl:attribute name="padding-before">2pt</xsl:attribute>
  <xsl:attribute name="padding-after">2pt</xsl:attribute>
</xsl:attribute-set>

<xsl:attribute-set name="dt">
  <xsl:attribute name="font-weight">bold</xsl:attribute>
</xsl:attribute-set>

<xsl:attribute-set name="dd.list">
  <xsl:attribute name="space-before">0.3em</xsl:attribute>
  <xsl:attribute name="space-after">0.5em</xsl:attribute>
  <xsl:attribute name="text-align">justify</xsl:attribute>
</xsl:attribute-set>

<xsl:attribute-set name="dd.block" use-attribute-sets="dd.list">
  <xsl:attribute name="start-indent">from-parent() + 4em</xsl:attribute>
  <xsl:attribute name="text-align">justify</xsl:attribute>
</xsl:attribute-set>

<xsl:attribute-set name="figure.title">
  <xsl:attribute name="font-family">sans-serif</xsl:attribute>
  <xsl:attribute name="text-align">center</xsl:attribute>
  <xsl:attribute name="space-before">3pt</xsl:attribute>
  <xsl:attribute name="space-after">10pt</xsl:attribute>
  <xsl:attribute name="font-weight">bold</xsl:attribute>
  <xsl:attribute name="keep-with-previous.within-page">always</xsl:attribute>
</xsl:attribute-set>

<xsl:attribute-set name="program.title">
  <xsl:attribute name="font-family">sans-serif</xsl:attribute>
  <xsl:attribute name="text-align">center</xsl:attribute>
  <xsl:attribute name="space-before">3pt</xsl:attribute>
  <xsl:attribute name="font-weight">bold</xsl:attribute>
  <xsl:attribute name="keep-with-next.within-page">always</xsl:attribute>
  <xsl:attribute name="space-before">0.5em</xsl:attribute>
  <xsl:attribute name="space-after">0.5em</xsl:attribute>
</xsl:attribute-set>

<!-- body -->

<!-- p-->
<xsl:attribute-set name="p">
  <xsl:attribute name="text-indent">1em</xsl:attribute>
  <xsl:attribute name="space-before">0.6em</xsl:attribute>
  <xsl:attribute name="space-after">0.6em</xsl:attribute>
  <xsl:attribute name="text-align">justify</xsl:attribute>
  <xsl:attribute name="keep-together.within-page">always</xsl:attribute>
</xsl:attribute-set>
<!-- p-->
<xsl:attribute-set name="top.p">
  <xsl:attribute name="text-indent">1em</xsl:attribute>
  <xsl:attribute name="space-before">0.6em</xsl:attribute>
  <xsl:attribute name="space-after">0.6em</xsl:attribute>
  <xsl:attribute name="text-align">justify</xsl:attribute>
</xsl:attribute-set>

<xsl:attribute-set name="dd.p">
  <!-- xsl:attribute name="text-indent"--><!--1em</xsl:attribute -->
</xsl:attribute-set>


<xsl:attribute-set name="program">
  <xsl:attribute name="white-space">pre</xsl:attribute>
  <xsl:attribute name="wrap-option">wrap</xsl:attribute>
  <xsl:attribute name="background-color">#EEEEEE</xsl:attribute>
  <xsl:attribute name="font-family">monospace</xsl:attribute>
  <xsl:attribute name="font-size">9pt</xsl:attribute>
  <xsl:attribute name="padding">0.5em</xsl:attribute>
</xsl:attribute-set>

<xsl:attribute-set name="result">
  <xsl:attribute name="background-color">ivory</xsl:attribute>
  <xsl:attribute name="border-style">inset</xsl:attribute>
  <xsl:attribute name="border-color">gold</xsl:attribute>
  <xsl:attribute name="margin">10pt</xsl:attribute>
  <xsl:attribute name="space-before">10pt</xsl:attribute>
  <xsl:attribute name="space-after">10pt</xsl:attribute>
</xsl:attribute-set>

<xsl:attribute-set name="note">
  <xsl:attribute name="font-size">9pt</xsl:attribute>
</xsl:attribute-set>

<xsl:attribute-set name="div.definitiontable">
  <xsl:attribute name="space-before">1em</xsl:attribute>
  <xsl:attribute name="space-after">1em</xsl:attribute>
</xsl:attribute-set>

<xsl:attribute-set name="div.definitiontable.title">
  <xsl:attribute name="font-weight">bold</xsl:attribute>
</xsl:attribute-set>

<xsl:attribute-set name="div.column">
  <xsl:attribute name="space-before">1em</xsl:attribute>
  <xsl:attribute name="space-after">1em</xsl:attribute>
  <xsl:attribute name="border-style">solid</xsl:attribute>
  <xsl:attribute name="border-color">gray</xsl:attribute>
  <xsl:attribute name="border-width">1.5pt</xsl:attribute>
  <xsl:attribute name="padding">0.5em</xsl:attribute>
</xsl:attribute-set>

<xsl:attribute-set name="div.column.title">
  <xsl:attribute name="font-weight">bold</xsl:attribute>
  <xsl:attribute name="text-decoration">underline</xsl:attribute>
  <xsl:attribute name="space-after">0.5em</xsl:attribute>
</xsl:attribute-set>


<xsl:attribute-set name="div.comment">
  <xsl:attribute name="color">red</xsl:attribute>
  <xsl:attribute name="background-color">yellow</xsl:attribute>
</xsl:attribute-set>

<xsl:attribute-set name="div.fo">
  <xsl:attribute name="border">solid</xsl:attribute>
  <xsl:attribute name="border-width">thin</xsl:attribute>
  <xsl:attribute name="padding">1em</xsl:attribute>
</xsl:attribute-set>

<xsl:attribute-set name="div.toc">
  <xsl:attribute name="border-style">inset</xsl:attribute>
  <xsl:attribute name="border-width">thin</xsl:attribute>
  <xsl:attribute name="border-color">black</xsl:attribute>
  <xsl:attribute name="background-color">#EEEEEE</xsl:attribute>
  <xsl:attribute name="padding">1em</xsl:attribute>
</xsl:attribute-set>

<xsl:attribute-set name="blockquote">
  <xsl:attribute name="background-color">gray</xsl:attribute>
  <xsl:attribute name="font-style">italic</xsl:attribute>
  <xsl:attribute name="margin">10pt</xsl:attribute>
  <xsl:attribute name="space-before">10pt</xsl:attribute>
  <xsl:attribute name="space-after">10pt</xsl:attribute>
</xsl:attribute-set>

<!-- inline-->
<xsl:attribute-set name="em">
  <xsl:attribute name="font-weight">bold</xsl:attribute>
</xsl:attribute-set>

<xsl:attribute-set name="q">
  <xsl:attribute name="font-style">italic</xsl:attribute>
</xsl:attribute-set>

<!-- Content Transform-->
<xsl:template match="doc">
  <fo:root>
  <fo:layout-master-set>
  <fo:simple-page-master margin="5mm 25mm 5mm 25mm" master-name="PageMaster">
  <xsl:attribute name="page-height">
    <xsl:value-of select="$paper-height"/>
  </xsl:attribute>
  <xsl:attribute name="page-width">
    <xsl:value-of select="$paper-width"/>
  </xsl:attribute>
  <fo:region-body margin="20mm 00mm 20mm 00mm"/>
  <fo:region-before extent="10mm" display-align="after"/>
  <fo:region-after extent="10mm" display-align="before"/>
    </fo:simple-page-master>

  <fo:simple-page-master margin="25mm 25mm 25mm 25mm" master-name="PageMaster-TOC">
  <xsl:attribute name="page-height">
    <xsl:value-of select="$paper-height"/>
  </xsl:attribute>
  <xsl:attribute name="page-width">
    <xsl:value-of select="$paper-width"/>
  </xsl:attribute>
  <fo:region-body margin="0mm 0mm 0mm 0mm"/>
  </fo:simple-page-master>
  <fo:simple-page-master margin="25mm 25mm 25mm 25mm" master-name="PageMaster-Cover">
  <xsl:attribute name="page-height">
    <xsl:value-of select="$paper-height"/>
  </xsl:attribute>
  <xsl:attribute name="page-width">
    <xsl:value-of select="$paper-width"/>
  </xsl:attribute>

  <fo:region-body margin="0mm 0mm 0mm 0mm"/>
  </fo:simple-page-master>
  </fo:layout-master-set>
  <xsl:if test="$cover-make or @cover!='false'">
    <xsl:apply-templates select="head"/>
  </xsl:if>
  <xsl:if test="$toc-make or @toc!='false'">
    <xsl:call-template name="toc"/>
  </xsl:if>
  <xsl:apply-templates select="body"/>
  </fo:root>
</xsl:template>

<xsl:template match="doc/head">
  <fo:page-sequence master-reference="PageMaster-Cover">
    <fo:flow flow-name="xsl-region-body">
     <fo:block-container xsl:use-attribute-sets="cover.title"><fo:wrapper start-indent="0pt" end-indent="0pt">
       <xsl:apply-templates select="/doc/head/title"/>
     </fo:wrapper></fo:block-container>
      <fo:block-container xsl:use-attribute-sets="cover.date"><fo:wrapper start-indent="0pt" end-indent="0pt">
        <xsl:apply-templates select="/doc/head/date"/>
      </fo:wrapper></fo:block-container>
      <fo:block-container xsl:use-attribute-sets="cover.author"><fo:wrapper start-indent="0pt" end-indent="0pt">
        <xsl:apply-templates select="/doc/head/author"/>
      </fo:wrapper></fo:block-container>
    </fo:flow>
  </fo:page-sequence>
</xsl:template>

<xsl:template match="doc/head/title">
  <fo:block>
    <xsl:apply-templates/>
  </fo:block>
</xsl:template>

<!--for test: This is designed to outut text title separated by external parameter. Out of use.
-->
<xsl:template match="xxx-doc/head/title/text()">
  <xsl:choose>
    <xsl:when test="../@breakpos">
      <fo:block>
        <xsl:value-of select="substring(.,1,../@breakpos)"/>
      </fo:block>
      <fo:block>
        <xsl:value-of select="substring-after(.,substring(.,1,../@breakpos))"/>
      </fo:block>
    </xsl:when>
    <xsl:otherwise>
      <xsl:value-of select="."/>
    </xsl:otherwise>
  </xsl:choose>
</xsl:template>

<xsl:template match="doc/head/date">
  <fo:block>
    <xsl:apply-templates/>
  </fo:block>
</xsl:template>

<xsl:template match="doc/head/author">
  <fo:block>
    <xsl:if test="@logo">
      <xsl:call-template name="author.logo.img"/>
    </xsl:if>
    <xsl:apply-templates/>
  </fo:block>
</xsl:template>

<xsl:template name="author.logo.img">
  <xsl:choose>
    <xsl:when test="@pos='side'">
      <fo:inline space-end="1em">
        <fo:external-graphic src="{@logo}" alignment-baseline="text-after-edge">
          <xsl:if test="@width and @height">
            <xsl:attribute name="content-width">
              <xsl:value-of select="@width"/>
            </xsl:attribute>
            <xsl:attribute name="content-height">
              <xsl:value-of select="@height"/>
            </xsl:attribute>
          </xsl:if>
        </fo:external-graphic>
      </fo:inline>
    </xsl:when>
    <xsl:otherwise>
      <fo:block space-after="1em">
        <fo:external-graphic src="{@logo}">
          <xsl:if test="@width and @height">
            <xsl:attribute name="content-width">
              <xsl:value-of select="@width"/>
            </xsl:attribute>
            <xsl:attribute name="content-height">
              <xsl:value-of select="@height"/>
            </xsl:attribute>
          </xsl:if>
        </fo:external-graphic>
      </fo:block>
    </xsl:otherwise>
  </xsl:choose>
</xsl:template>

<xsl:template name="toc">
  <fo:page-sequence master-reference="PageMaster-TOC">
  <fo:flow flow-name="xsl-region-body">
    <fo:block xsl:use-attribute-sets="div.toc">
    <fo:block xsl:use-attribute-sets="h3">Table of Contents</fo:block>
    <xsl:for-each select="//part | //chapter | //section | //subsection | //subsubsection">
      <xsl:call-template name="toc.line"/>
    </xsl:for-each>
    </fo:block>
  </fo:flow>
  </fo:page-sequence>
</xsl:template>

<xsl:template name="toc.line">
  <xsl:variable name="level" select="count(ancestor-or-self::part |                                            ancestor-or-self::chapter |                                           ancestor-or-self::section |                                           ancestor-or-self::subsection |                                           ancestor-or-self::subsubsection )"/>

  <xsl:if test="$level &lt;= $toc-level-max">
    <fo:block text-align-last="justify">
      <xsl:attribute name="margin-left">
        <xsl:value-of select="$level - 1"/>
        <xsl:text>em</xsl:text>
      </xsl:attribute>

      <xsl:attribute name="space-before">
          <xsl:choose>
          <xsl:when test="$level=1">5pt</xsl:when>
          <xsl:when test="$level=2">3pt</xsl:when>
          <xsl:when test="$level=3">1pt</xsl:when>
          <xsl:otherwise>1pt</xsl:otherwise>
        </xsl:choose>
      </xsl:attribute>
      <xsl:attribute name="font-size">
        <xsl:choose>
          <xsl:when test="$level=1">1em</xsl:when>
          <xsl:otherwise>0.9em</xsl:otherwise>
        </xsl:choose>
      </xsl:attribute>
      <xsl:attribute name="font-weight">
        <xsl:value-of select="800 - $level * 100"/>
      </xsl:attribute>
      <xsl:value-of select="title"/>
      <fo:leader leader-pattern="dots"/>
      <fo:page-number-citation ref-id="{generate-id()}"/>
    </fo:block>
  </xsl:if>
</xsl:template>

<xsl:template match="body">
  <fo:page-sequence master-reference="PageMaster" initial-page-number="1">
  <fo:static-content flow-name="xsl-region-before">
    <fo:block text-align="center" font-size="9pt">
      <xsl:if test="/doc/head/title">
        <xsl:value-of select="/doc/head/title"/>
      </xsl:if>
    </fo:block>
  </fo:static-content>
  <fo:static-content flow-name="xsl-region-after">
    <fo:block text-align="center" font-size="9pt">
    - <fo:page-number/> / <fo:page-number-citation ref-id="last-paragraph"/>-
    </fo:block>
  </fo:static-content>
  <fo:static-content flow-name="xsl-footnote-separator">
    <fo:block text-align-last="justify">
      <fo:leader leader-pattern="rule" rule-thickness="0.5pt" leader-length="33%"/>
    </fo:block>
  </fo:static-content>

  <fo:flow flow-name="xsl-region-body">
    <fo:block>
      <xsl:apply-templates/>
    </fo:block>
  </fo:flow>
  </fo:page-sequence>
</xsl:template>

<xsl:template match="part | chapter | section | subsection | subsubsection">
  <xsl:call-template name="title.out"/>
  <xsl:apply-templates/>
</xsl:template>

<xsl:template match="part/title | chapter/title | section/title | subsection/title | subsubsection/title">
</xsl:template>

<xsl:template name="title.out">
  <xsl:variable name="level" select="count(ancestor-or-self::part |                                            ancestor-or-self::chapter |                                           ancestor-or-self::section |                                           ancestor-or-self::subsection |                                           ancestor-or-self::subsubsection )"/>
  <xsl:choose>
    <xsl:when test="$level=1">
      <fo:block xsl:use-attribute-sets="h1" id="{generate-id()}">
        <xsl:call-template name="title.out.sub"/>
        <xsl:value-of select="title"/>
      </fo:block>
    </xsl:when>
    <xsl:when test="$level=2">
      <fo:block xsl:use-attribute-sets="h2" id="{generate-id()}">
        <xsl:call-template name="title.out.sub"/>
        <xsl:value-of select="title"/>
      </fo:block>
    </xsl:when>
    <xsl:when test="$level=3">
      <fo:block xsl:use-attribute-sets="h3" id="{generate-id()}">
        <xsl:call-template name="title.out.sub"/>
        <xsl:value-of select="title"/>
      </fo:block>
    </xsl:when>
    <xsl:when test="$level=4">
      <fo:block xsl:use-attribute-sets="h4" id="{generate-id()}">
        <xsl:call-template name="title.out.sub"/>
        <xsl:value-of select="title"/>
      </fo:block>
    </xsl:when>
    <xsl:when test="$level=5">
      <fo:block xsl:use-attribute-sets="h5" id="{generate-id()}">
        <xsl:call-template name="title.out.sub"/>
        <xsl:value-of select="title"/>
      </fo:block>
    </xsl:when>
    <xsl:otherwise>
      <fo:block xsl:use-attribute-sets="h5" id="{generate-id()}">
        <xsl:call-template name="title.out.sub"/>
        <xsl:value-of select="title"/>
      </fo:block>
    </xsl:otherwise>
  </xsl:choose>
</xsl:template>

<xsl:template name="title.out.sub">
  <xsl:if test="@logo">
    <fo:inline space-end="5pt">
      <fo:external-graphic src="{@logo}" alignment-baseline="text-after-edge">
        <xsl:if test="@width and @height">
          <xsl:attribute name="content-width">
            <xsl:value-of select="@width"/>
          </xsl:attribute>
          <xsl:attribute name="content-height">
            <xsl:value-of select="@height"/>
          </xsl:attribute>
        </xsl:if>
      </fo:external-graphic>
    </fo:inline>
  </xsl:if>
</xsl:template>

<xsl:template match="p">
<xsl:choose>
<xsl:when test="generate-id()=$lp-pos">
<fo:wrapper id="last-paragraph">
  <fo:block xsl:use-attribute-sets="p">
    <!-- temporary : It is because text-indent is applied to the part where fo:block is separated.
-->  <xsl:if test="@type='continue'">
      <xsl:attribute name="text-indent">inherit</xsl:attribute>
    </xsl:if>
    <xsl:apply-templates/>
  </fo:block>
</fo:wrapper>
</xsl:when>
<xsl:otherwise>
  <fo:block xsl:use-attribute-sets="p">
     <!-- temporary : It is because text-indent is applied to the part where fo:block is separated.
-->   <xsl:if test="@type='continue'">
      <xsl:attribute name="text-indent">inherit</xsl:attribute>
    </xsl:if>
    <xsl:apply-templates/>
  </fo:block>
</xsl:otherwise>
</xsl:choose>

</xsl:template>

<xsl:template match="figure">
  <fo:block text-align="center">
    <fo:external-graphic src="{@src}">
      <xsl:if test="@width and @height">
        <xsl:attribute name="content-width">
          <xsl:value-of select="@width"/>
        </xsl:attribute>
        <xsl:attribute name="content-height">
          <xsl:value-of select="@height"/>
        </xsl:attribute>
      </xsl:if>
    </fo:external-graphic>
  </fo:block>
  <fo:block xsl:use-attribute-sets="figure.title">
  <xsl:value-of select="title"/>
  </fo:block>
</xsl:template>

<xsl:template match="ul">
   <!--  Determine the distance between the start of the list-item-label and the start of the list-item-body, the distance between the end of the list-item-label and the start of the list-item-body.
--> <xsl:variable name="start-dist-local">
    <xsl:choose>
      <xsl:when test="./@startdist">
        <xsl:value-of select="./@startdist"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$list-startdist-default"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:variable>

  <xsl:variable name="gap-local">
    <xsl:choose>
      <xsl:when test="./@gap">
        <xsl:value-of select="./@gap"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$list-gap-default"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:variable>

  <!-- Generate fo:list-block -->  <fo:list-block provisional-distance-between-starts="{$start-dist-local}" provisional-label-separation="{$gap-local}">
    <!-- Process the descendants of li. -->
    <xsl:apply-templates/>
  </fo:list-block>
</xsl:template>

<xsl:template match="ul/li">
  <fo:list-item xsl:use-attribute-sets="list.item">
    <!-- Generate list-item-label-->        <!-- The end position of the list-item-label is counted by label-end() function.-->   <!--
 The characters for label of line is specified in the type attribute. The initial value is '&#x2022;'.
--><fo:list-item-label end-indent="label-end()">     <fo:block text-align="end">
        <xsl:choose>
          <xsl:when test="../@type='disc'">
            <xsl:text>ja</xsl:text>
          </xsl:when>
          <xsl:when test="../@type='circle'">
            <xsl:text>ja</xsl:text>
          </xsl:when>
          <xsl:when test="../@type='square'">
            <xsl:text>ja</xsl:text>
          </xsl:when>
          <xsl:when test="../@type='bsquare'">
            <xsl:text>ja</xsl:text>
          </xsl:when>
          <xsl:otherwise>
            <xsl:text>ja</xsl:text>
          </xsl:otherwise>
        </xsl:choose>
      </fo:block>

</fo:list-item-label>
       <!-- Generate the list-item-body. -->
       <!-- The start position of the list-item-label is calculated by body-start() function. -->
  <fo:list-item-body start-indent="body-start()" text-align="justify">
      <fo:block>
        <xsl:apply-templates/>
      </fo:block>
    </fo:list-item-body>
  </fo:list-item>
</xsl:template>

<!-- The template that use a image as a character for label of line.-->
<xsl:template match="ul[substring(@type,1,4)='img:']/li">
  <fo:list-item xsl:use-attribute-sets="list.item">
    <fo:list-item-label end-indent="label-end()">
      <fo:block text-align="end">
        <fo:external-graphic src="{substring-after(../@type,substring(../@type,1,4))}" content-height="1.2em" content-width="1.2em"/>
      </fo:block>
    </fo:list-item-label>
    <fo:list-item-body start-indent="body-start()" text-align="justify">
      <fo:block>
        <xsl:apply-templates/>
      </fo:block>
    </fo:list-item-body>
  </fo:list-item>
</xsl:template>

<xsl:template match="ol">
   <!-- Specifies the distance between the start of the list-item-label and the start of the list-item-body, the distance between the end of the list-item-label and the start of the list-item-body. -->
 <xsl:variable name="start-dist-local">
    <xsl:choose>
      <xsl:when test="./@startdist">
        <xsl:value-of select="./@startdist"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$list-startdist-default"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:variable>

  <xsl:variable name="gap-local">
    <xsl:choose>
      <xsl:when test="./@gap">
        <xsl:value-of select="./@gap"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$list-gap-default"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:variable>

  <!--  Generate fo:list-block. -->  <fo:list-block provisional-distance-between-starts="{$start-dist-local}" provisional-label-separation="{$gap-local}">
    <!-- Process the descendants of li. -->    <xsl:apply-templates/>
  </fo:list-block>
</xsl:template>

<xsl:template match="ol/li">
  <fo:list-item xsl:use-attribute-sets="list.item">
    <!-- Generate the list-item-label. -->     <!-- The end position of the label is counted by label-end()function.-->
       <!-- Label format is specified by the type attribute. The initial value is '1'.-->   <fo:list-item-label end-indent="label-end()">
      <fo:block text-align="end">
        <xsl:choose>
          <xsl:when test="../@type">
            <xsl:number format="{../@type}"/>
          </xsl:when>
          <xsl:otherwise>
            <xsl:number format="1."/>
          </xsl:otherwise>
        </xsl:choose>
      </fo:block>
    </fo:list-item-label>
    <!-- Generate the list-item-body.-->     <!-- The starting position of the label is counted by the body-start() function-->
    <fo:list-item-body start-indent="body-start()" text-align="justify">
      <fo:block>
         <!-- The descendants of li are specified by the descendants of templates.-->       <xsl:apply-templates/>
      </fo:block>
    </fo:list-item-body>
  </fo:list-item>
</xsl:template>

<xsl:template match="dl">
  <xsl:choose>
    <xsl:when test="@type='list'">
      <xsl:call-template name="dl.format.list"/>
    </xsl:when>
    <xsl:otherwise>
      <xsl:call-template name="dl.format.block"/>
    </xsl:otherwise>
  </xsl:choose>
</xsl:template>

<xsl:template name="dl.format.block">
  <xsl:apply-templates/>
</xsl:template>

<xsl:template name="dl.format.list">
  <xsl:variable name="start-dist-local">
    <xsl:choose>
      <xsl:when test="./@startdist">
        <xsl:value-of select="./@startdist"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$dl-startdist-default"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:variable>

  <xsl:variable name="gap-local">
    <xsl:choose>
      <xsl:when test="./@gap">
        <xsl:value-of select="./@gap"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$dl-gap-default"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:variable>

  <fo:list-block provisional-distance-between-starts="{$start-dist-local}" provisional-label-separation="{$gap-local}">
    <xsl:call-template name="process.dl.list"/>
  </fo:list-block>
</xsl:template>

<xsl:template name="process.dl.list">
  <xsl:param name="dts" select="/.."/>
  <xsl:param name="dds" select="/.."/>
  <xsl:param name="nodes" select="*"/>

  <xsl:choose>
    <xsl:when test="count($nodes)=0">
       <!--data end?Process the elements stocked in dts, dds.  -->     <xsl:if test="count($dts)&gt;0 or count($dds)&gt;0">
        <fo:list-item xsl:use-attribute-sets="list.item">
          <fo:list-item-label end-indent="label-end()">
            <xsl:apply-templates select="$dts"/>
          </fo:list-item-label>
          <fo:list-item-body start-indent="body-start()">
            <xsl:apply-templates select="$dds"/>
          </fo:list-item-body>
        </fo:list-item>
      </xsl:if>
    </xsl:when>

    <xsl:when test="name($nodes[1])='dd'">
       <!-- dd is stored in dds fnction, call itself recursively.-->     <xsl:call-template name="process.dl.list">
        <xsl:with-param name="dts" select="$dts"/>
        <xsl:with-param name="dds" select="$dds|$nodes[1]"/>
        <xsl:with-param name="nodes" select="$nodes[position()&gt;1]"/>
      </xsl:call-template>

    </xsl:when>

    <xsl:when test="name($nodes[1])='dt'">
       <!--  Process the elements stocked in dts, dds. -->     <xsl:if test="count($dts)&gt;0 or count($dds)&gt;0">
        <fo:list-item xsl:use-attribute-sets="list.item">
          <fo:list-item-label end-indent="label-end()">
            <xsl:apply-templates select="$dts"/>
          </fo:list-item-label>
          <fo:list-item-body start-indent="body-start()">
            <xsl:apply-templates select="$dds"/>
        </fo:list-item-body></fo:list-item>
      </xsl:if>
      <!-- dt is stored in dts variable, call itself recursively.-->      <xsl:call-template name="process.dl.list">
        <xsl:with-param name="dts" select="$nodes[1]"/>
        <xsl:with-param name="nodes" select="$nodes[position()&gt;1]"/>
      </xsl:call-template>
    </xsl:when>

    <xsl:otherwise>
       <!-- The children of dl must be only dt, dd. -->     <!-- Unfortunately, xsl:message does not work in MSXML3.-->
      <xsl:message>
        <xsl:text>
        (The elements except dt,dd are specified as a child of dl element.</xsl:text>
        <xsl:value-of select="name($nodes[1])"/>
        <xsl:text>).</xsl:text>
      </xsl:message>
    </xsl:otherwise>
  </xsl:choose>
</xsl:template>

<xsl:template match="dt">
  <xsl:element name="fo:block" use-attribute-sets="dt">
    <xsl:if test="../@mode='debug'">
      <xsl:attribute name="border-color">blue</xsl:attribute>
      <xsl:attribute name="border-style">dashed</xsl:attribute>
      <xsl:attribute name="border-width">thin</xsl:attribute>
    </xsl:if>
    <xsl:apply-templates/>
  </xsl:element>
</xsl:template>

<xsl:template match="dd">
  <xsl:choose>
    <xsl:when test="../@type='list'">
      <xsl:element name="fo:block" use-attribute-sets="dd.list">
        <xsl:if test="../@mode='debug'">
          <xsl:attribute name="border-color">red</xsl:attribute>
          <xsl:attribute name="border-style">solid</xsl:attribute>
          <xsl:attribute name="border-width">thin</xsl:attribute>
        </xsl:if>
        <xsl:apply-templates/>
      </xsl:element>
    </xsl:when>
    <xsl:otherwise>
      <xsl:element name="fo:block" use-attribute-sets="dd.block">
        <xsl:if test="../@mode='debug'">
          <xsl:attribute name="border-color">red</xsl:attribute>
          <xsl:attribute name="border-style">solid</xsl:attribute>
          <xsl:attribute name="border-width">thin</xsl:attribute>
        </xsl:if>
        <xsl:apply-templates/>
      </xsl:element>
    </xsl:otherwise>
  </xsl:choose>
</xsl:template>

<xsl:template match="table">
  <fo:table-and-caption>
    <xsl:if test="title">
      <fo:table-caption xsl:use-attribute-sets="table.data.caption">
        <fo:block start-indent="0em">
          <xsl:apply-templates select="title" mode="make-title"/>
       </fo:block>
      </fo:table-caption>
    </xsl:if>
    <fo:table xsl:use-attribute-sets="table.data">
      <xsl:if test="@layout">
        <xsl:attribute name="table-layout">
          <xsl:value-of select="@layout"/>
        </xsl:attribute>
      </xsl:if>
      <xsl:if test="@width">
        <xsl:attribute name="inline-progression-dimension">
          <xsl:value-of select="@width"/>
        </xsl:attribute>
      </xsl:if>
      <xsl:apply-templates/>
    </fo:table>
  </fo:table-and-caption>
</xsl:template>

<!-- <xsl:template match="table/tltle" mode="make-tltle">
  <xsl:apply-templates/>
</xsl:template>
 -->

<xsl:template match="table/title">
</xsl:template>

<xsl:template match="col">
  <xsl:choose>
<xsl:when test="@number"><fo:table-column column-number="{@number}" column-width="{@width}" /></xsl:when>
<xsl:otherwise><fo:table-column  column-width="{@width}" />
</xsl:otherwise>
</xsl:choose>
</xsl:template>

<xsl:template match="thead">
  <fo:table-header start-indent="0pt" end-indent="0pt">
    <xsl:apply-templates/>
  </fo:table-header>
</xsl:template>

<xsl:template match="tfoot">
  <fo:table-footer start-indent="0pt" end-indent="0pt">
    <xsl:apply-templates/>
  </fo:table-footer>
</xsl:template>

<xsl:template match="tbody">
  <fo:table-body start-indent="0pt" end-indent="0pt">
    <xsl:apply-templates/>
  </fo:table-body>
</xsl:template>

<xsl:template match="tr">
  <xsl:element name="fo:table-row">
    <xsl:if test="@height">
        <xsl:attribute name="block-progression-dimension">
          <xsl:value-of select="@height"/>
        </xsl:attribute>
    </xsl:if>
    <xsl:apply-templates />
  </xsl:element>
</xsl:template>

<!-- May 4, 2002. Comments out.
  <xsl:template match="tr">
  <xsl:element name="fo:table-row">
    <xsl:choose>
      <xsl:when test="@height">
        <xsl:attribute name="block-progression-dimension">
          <xsl:value-of select="@height"/>
        </xsl:attribute>
      </xsl:when>
      <xsl:otherwise>
         <xsl:if test="(ancestor::*)[2]/@rowheight">
          <xsl:attribute name="block-progression-dimension">
            <xsl:value-of select="(ancestor::*)[2]/@rowheight"/>
          </xsl:attribute>
        </xsl:if>
 </xsl:otherwise>
    </xsl:choose>
    <xsl:apply-templates/>
  </xsl:element>
</xsl:template>
 -->

<xsl:template match="th">
  <fo:table-cell xsl:use-attribute-sets="table.data.th">
    <xsl:call-template name="cell-span"/>
    <xsl:if test="@valign">
      <xsl:attribute name="display-align">
        <xsl:value-of select="@valign"/>
      </xsl:attribute>
    </xsl:if>
    <fo:block>
      <xsl:if test="@align">
        <xsl:attribute name="text-align">
          <xsl:value-of select="@align"/>
        </xsl:attribute>
      </xsl:if>
      <xsl:apply-templates/>
    </fo:block>
  </fo:table-cell>
</xsl:template>

<xsl:template match="td">
  <fo:table-cell xsl:use-attribute-sets="table.data.td">
    <xsl:call-template name="cell-span"/>
    <xsl:if test="@valign">
      <xsl:attribute name="display-align">
        <xsl:value-of select="@valign"/>
      </xsl:attribute>
    </xsl:if>
    <fo:block>
      <xsl:if test="@align">
        <xsl:attribute name="text-align">
          <xsl:value-of select="@align"/>
        </xsl:attribute>
      </xsl:if>
      <xsl:apply-templates/>
    </fo:block>
  </fo:table-cell>
</xsl:template>

<xsl:template name="cell-span">
  <xsl:if test="@colspan">
    <xsl:attribute name="number-columns-spanned">
      <xsl:value-of select="@colspan"/>
    </xsl:attribute>
  </xsl:if>
  <xsl:if test="@rowspan">
    <xsl:attribute name="number-rows-spanned">
      <xsl:value-of select="@rowspan"/>
  </xsl:attribute>
  </xsl:if>
</xsl:template>

<xsl:template match="program">
  <xsl:apply-templates select="title"/>
    <fo:block xsl:use-attribute-sets="program">
      <xsl:apply-templates select="text()"/>
  </fo:block>
</xsl:template>


<xsl:template match="program/title">
  <fo:block xsl:use-attribute-sets="program.title">
    <xsl:apply-templates/>
  </fo:block>
</xsl:template>

<xsl:template match="div">
  <fo:block>
    <xsl:apply-templates/>
  </fo:block>
</xsl:template>

<xsl:template match="div[@class = 'definitiontable']">
  <fo:block xsl:use-attribute-sets="div.definitiontable">
    <fo:block xsl:use-attribute-sets="div.definitiontable.title">
      <xsl:text>ja</xsl:text>
        <xsl:value-of select="title"/>
      <xsl:text>ja</xsl:text>
    </fo:block>
    <xsl:apply-templates/>
  </fo:block>
</xsl:template>

<xsl:template match="div[@class = 'definitiontable']/title">
</xsl:template>

<xsl:template match="div[@class = 'column']">
  <fo:block xsl:use-attribute-sets="div.column">
    <xsl:if test="title">
      <fo:block xsl:use-attribute-sets="div.column.title">
          <xsl:value-of select="title"/>
      </fo:block>
    </xsl:if>
    <xsl:apply-templates/>
  </fo:block>
</xsl:template>

<xsl:template match="div[@class = 'column']/title">
</xsl:template>

<xsl:template match="div[@class = 'hidden']">
</xsl:template>

<xsl:template match="div[@class = 'result']">
  <fo:block xsl:use-attribute-sets="result">
    <xsl:apply-templates/>
  </fo:block>
</xsl:template>

<xsl:template match="div[@class = 'comment']">
  <fo:block xsl:use-attribute-sets="div.comment">
    <xsl:apply-templates/>
  </fo:block>
</xsl:template>

<xsl:template match="div[@class = 'fo']">
  <fo:block xsl:use-attribute-sets="div.fo">
    <xsl:copy-of select="node()"/>
  </fo:block>
</xsl:template>

<xsl:template match="a">
  <xsl:variable name="anchor-texts">
    <xsl:value-of select="."/>
  </xsl:variable>
  <xsl:apply-templates/>
  <xsl:if test="@href!=$anchor-texts">
    <fo:inline>
      <xsl:text>(</xsl:text>
      <xsl:value-of select="@href"/>
      <xsl:text>)</xsl:text>
    </fo:inline>
  </xsl:if>
</xsl:template>

<xsl:template match="note">
  <fo:footnote>
    <fo:inline baseline-shift="super" font-size="75%">
      <xsl:number level="any" count="//note" format="(1)"/>
    </fo:inline>
    <fo:footnote-body start-indent="0pt" end-indent="0pt" text-indent="0pt" last-line-end-indent="0pt" text-align="start" text-align-last="relative">
      <fo:block xsl:use-attribute-sets="note">
        <fo:inline baseline-shift="super" font-size="75%">
          <xsl:number level="any" count="//note" format="(1)"/>
        </fo:inline>
        <xsl:apply-templates/>
      </fo:block>
    </fo:footnote-body>
  </fo:footnote>
</xsl:template>

<xsl:template match="span">
  <fo:inline>
    <xsl:apply-templates/>
  </fo:inline>
</xsl:template>

<xsl:template match="b">
  <fo:inline font-weight="bold">
    <xsl:apply-templates/>
  </fo:inline>
</xsl:template>

<xsl:template match="i">
  <fo:inline font-style="italic">
    <xsl:apply-templates/>
  </fo:inline>
</xsl:template>

<xsl:template match="em">
  <fo:inline xsl:use-attribute-sets="em">
    <xsl:apply-templates/>
  </fo:inline>
</xsl:template>

<xsl:template match="code">
  <xsl:choose>
    <xsl:when test="@font">
      <fo:inline font-family="{@font}">
        <xsl:apply-templates/>
      </fo:inline>
    </xsl:when>
    <xsl:otherwise>
      <fo:inline font-family="monospace">
        <xsl:apply-templates/>
      </fo:inline>
    </xsl:otherwise>
  </xsl:choose>
</xsl:template>

<xsl:template match="code[@class = 'fo']">
  <fo:inline>
    <xsl:copy-of select="node()"/>
  </fo:inline>
</xsl:template>

<xsl:template match="br">
  <fo:block>
  </fo:block>
</xsl:template>

<xsl:template match="page">
  <fo:block break-before="page">
  </fo:block>
</xsl:template>

<xsl:template match="hidden">
</xsl:template>

<xsl:template match="fo">
    <xsl:copy-of select="node()"/>
</xsl:template>

<xsl:template match="last-mark">
    <!--fo:block id="last-paragraph"/-->
</xsl:template>



</xsl:stylesheet>