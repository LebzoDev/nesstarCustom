<!-- This file is no longer used | 27.04.10 Oistein -->

<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:ns="http://www.icpsr.umich.edu/DDI">
  <xsl:output method="html" omit-xml-declaration="no" indent="no" doctype-public="-//W3C//DTD XHTML 1.0 Strict//EN"
              doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd" media-type="text/html"/>

  <xsl:param name="part"/>

  <xsl:param name="var-token"/>

  <xsl:param name="varGrp-token"/>

  <xsl:variable name="filename">
    <xsl:value-of select="codeBook/docDscr/citation/holdings/@URI"/>
  </xsl:variable>

  <!--

     <xsl:template match="*">
          <xsl:element name="{local-name()}" namespace="">
              <xsl:copy-of select="@*"/>
              <xsl:apply-templates/>
          </xsl:element>
      </xsl:template>
  -->

  <xsl:template match="*[local-name() = 'codeBook']">
    <!--<xsl:template match="codeBook">-->
    <html>
      <head>
        <title>
          <xsl:value-of
            select="//*[local-name()='stdyDscr']/*[local-name()='citation']/*[local-name()='titlStmt']/*[local-name()='titl']"/>
          <!--<xsl:value-of select="stdyDscr/citation/titlStmt/titl"/>-->
        </title>
        <style type="text/css" media="screen">
          body {
          background-color: #FFFFFF;
          margin-top: 5px;
          margin-left: 5px;
          margin-right: 5px;
          padding-left: 0px;
          padding-top: 0px;
          padding-right: 0px;
          }

          tr.h1 {
          background: #000000;
          color: #FFFFFF;
          }

          td.h3 {
          vertical-align: top;
          text-align: right;
          font-style: italic;
          }

          tr.h2 {
          background: #CCCCCC;
          color: #000000;
          }

          caption {
          font-family: arial, helvetica, geneva, verdana, sans-serif;
          font-size: 11pt;
          font-weight: bold;
          }

          p {
          font-family: arial, helvetica, geneva, verdana, sans-serif;
          font-size: 11pt;
          }

          pre {
          font-family: arial, helvetica, geneva, verdana, sans-serif;
          font-size: 11pt;
          }

          table {
          padding-top: 10px;
          padding-bottom: 10px;
          border: none;
          }

          th {
          text-align: left;
          }

          dl {
          font-family: arial, helvetica, geneva, verdana, sans-serif;
          font-size: 11pt;
          }

          td {
          vertical-align: top;
          font-family: arial, helvetica, geneva, verdana, sans-serif;
          }

          blockquote {
          font-family: arial, helvetica, geneva, verdana, sans-serif;
          font-size: 11pt;
          }

          .noindent {padding-left: 0px;}

          .small {font-size: 9pt;}

          .red {color: #CC0000;}

          ol {
          font-family: arial, helvetica, geneva, verdana, sans-serif;
          font-size: 11pt;
          }

          ul {
          font-family: arial, helvetica, geneva, verdana, sans-serif;
          list-style: square;
          font-size: 11pt;
          }

          h1 {
          font-family: arial, helvetica, geneva, verdana, sans-serif;
          font-size: 14pt;
          }

          h2 {
          font-family: arial, helvetica, geneva, verdana, sans-serif;
          font-size: 12pt;
          }

          h3 {
          font-family: arial, helvetica, geneva, verdana, sans-serif;
          font-size: 11pt;
          font-style: bold;
          }

          h4 {
          font-family: arial, helvetica, geneva, verdana, sans-serif;
          font-size: 10pt;
          }
        </style>
      </head>
      <body bgcolor="#ffffff" lang="en-US">
        <h1>
          <xsl:value-of
            select="//*[local-name()='stdyDscr']/*[local-name()='citation']/*[local-name()='titlStmt']/*[local-name()='titl']"/>
           (
          <xsl:value-of
            select="//*[local-name()='stdyDscr']/*[local-name()='citation']/*[local-name()='titlStmt']/*[local-name()='IDNo']"/>
          )
          <xsl:if
            test="//*[local-name()='stdyDscr']/*[local-name()='citation']/*[local-name()='titlStmt']/*[local-name()='altTitl']">
            <br/>
            (
            <xsl:value-of
              select="//*[local-name()='stdyDscr']/*[local-name()='citation']/*[local-name()='titlStmt']/*[local-name()='altTitl']"/>
            )
          </xsl:if>
        </h1>

        <table border="0" cellpadding="5" cellspacing="0">
          <tr>
            <td valign="top">
              <p>
                <b>View:</b>
              </p>
            </td>
            <td>
              <p>
                <xsl:if test="*[local-name() = 'docDscr']">
                  <xsl:element name="a">
                    <xsl:attribute name="href">#1.0</xsl:attribute>
                    Part 1: Document Description
                  </xsl:element>
                  <br/>
                </xsl:if>
                <xsl:if test="*[local-name() = 'stdyDscr']">
                  <xsl:element name="a">
                    <xsl:attribute name="href">#2.0</xsl:attribute>
                    Part 2: Study Description
                  </xsl:element>
                  <br/>
                </xsl:if>
                <xsl:if test="*[local-name() = 'fileDscr']">
                  <xsl:element name="a">
                    <xsl:attribute name="href">#3.0</xsl:attribute>
                    Part 3: Data Files Description
                  </xsl:element>
                  <br/>
                </xsl:if>
                <xsl:if test="*[local-name() = 'dataDscr']">
                  <xsl:element name="a">
                    <xsl:attribute name="href">#a4.0</xsl:attribute>
                    Part 4: Variable Description
                  </xsl:element>
                  <br/>
                </xsl:if>
                <xsl:if test="*[local-name() = 'otherMat']">
                  <xsl:element name="a">
                    <xsl:attribute name="href">#5.0</xsl:attribute>
                    Part 5: Other Study-Related Materials
                  </xsl:element>
                  <br/>
                </xsl:if>
                <!-- <xsl:element name="a">
                  <xsl:attribute name="href">
                    <xsl:value-of
                      select="$filename"/>
                    ?part=0
                  </xsl:attribute>
                  Entire Codebook
                </xsl:element>-->
              </p>
            </td>
          </tr>
        </table>


        <table border="0" cellpadding="5" cellspacing="5">
          <!--
        <xsl:choose>
          <xsl:when test="$part=1">
            <xsl:apply-templates select="*[local-name() = 'docDscr']"/>
          </xsl:when>
          <xsl:when test="$part=2">
            <xsl:apply-templates select="*[local-name() = 'stdyDscr']"/>
          </xsl:when>
          <xsl:when test="$part=3">
            <xsl:apply-templates select="*[local-name() = 'fileDscr']"/>
          </xsl:when>
          <xsl:when test="$part=4">
            <xsl:apply-templates select="*[local-name() = 'dataDscr']"/>
          </xsl:when>
          <xsl:when test="$part=5">
            <xsl:apply-templates select="*[local-name() = 'otherMat']"/>
          </xsl:when>
          <xsl:otherwise>-->
          <xsl:apply-templates select="*[local-name() = 'docDscr']"/>
          <xsl:apply-templates select="*[local-name() = 'stdyDscr']"/>
          <xsl:apply-templates select="*[local-name() = 'fileDscr']"/>
          <xsl:apply-templates select="*[local-name() = 'dataDscr']"/>
          <xsl:apply-templates select="*[local-name() = 'otherMat']"/>
          <!--  </xsl:otherwise>
          </xsl:choose>-->
        </table>
      </body>
    </html>
  </xsl:template>

  <!-- begin docDscr templates -->

  <xsl:template match="*[local-name() = 'docDscr']">
    <tr class="h1">
      <th align="left" colspan="2">
        <p>
          <xsl:if test="@ID">
            <a name="{@ID}"/>
          </xsl:if>
          <a name="1.0" id="1.0">Document Description</a>
        </p>
      </th>
    </tr>
    <xsl:apply-templates select="*[local-name() = 'citation']"/>
    <xsl:apply-templates select="*[local-name() = 'guide']"/>
    <xsl:apply-templates select="*[local-name() = 'docStatus']"/>
    <xsl:apply-templates select="*[local-name() = 'docSrc']"/>
    <xsl:apply-templates select="*[local-name() = 'notes']" mode="row"/>
  </xsl:template>

  <xsl:template match="*[local-name() = 'citation']">
    <tr class="h2">
      <th colspan="2">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Citation</p>
      </th>
    </tr>
    <xsl:apply-templates select="*[local-name() = 'titlStmt']"/>
    <xsl:apply-templates select="*[local-name() = 'rspStmt']"/>
    <xsl:apply-templates select="*[local-name() = 'prodStmt']"/>
    <xsl:apply-templates select="*[local-name() = 'distStmt']"/>
    <xsl:apply-templates select="*[local-name() = 'serStmt']"/>
    <xsl:apply-templates select="*[local-name() = 'verStmt']" mode="row"/>
    <xsl:apply-templates select="*[local-name() = 'biblCit']"/>
    <xsl:apply-templates select="*[local-name() = 'holdings']"/>
    <xsl:apply-templates select="*[local-name() = 'notes']" mode="row"/>
  </xsl:template>

  <xsl:template match="*[local-name() = 'titlStmt']">
    <xsl:apply-templates select="*[local-name() = 'titl']"/>
    <xsl:apply-templates select="*[local-name() = 'subTitl']"/>
    <xsl:apply-templates select="*[local-name() = 'altTitl']"/>
    <xsl:apply-templates select="*[local-name() = 'parTitl']"/>
    <xsl:apply-templates select="*[local-name() = 'IDNo']"/>
  </xsl:template>

  <xsl:template match="*[local-name() = 'titl']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Title:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>

  <xsl:template match="*[local-name() = 'subTitl']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Subtitle:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>

  <xsl:template match="*[local-name() = 'altTitl']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Alternative Title:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>

  <xsl:template match="*[local-name() = 'parTitl']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Parallel Title:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>

  <xsl:template match="*[local-name() = 'IDNo']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Identification Number:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>

  <xsl:template match="*[local-name() = 'rspStmt']">
    <xsl:apply-templates select="*[local-name() = 'AuthEnty']"/>
    <xsl:apply-templates select="*[local-name() = 'othId']"/>
  </xsl:template>

  <xsl:template match="*[local-name() = 'AuthEnty']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <xsl:if test="position()=1">
          <p>Authoring Entity:</p>
        </xsl:if>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
          <xsl:if test="@affiliation">(
            <xsl:value-of select="@affiliation"/>
            )
          </xsl:if>
        </p>
      </td>
    </tr>
  </xsl:template>

  <xsl:template match="*[local-name() = 'othId']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Other identifications and acknowledgements:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>
  <xsl:template match="*[local-name() = 'prodStmt']">
    <xsl:apply-templates select="*[local-name() = 'producer']"/>
    <xsl:apply-templates select="*[local-name() = 'copyright']"/>
    <xsl:apply-templates select="*[local-name() = 'prodDate']"/>
    <xsl:apply-templates select="*[local-name() = 'prodPlace']"/>
    <xsl:apply-templates select="*[local-name() = 'software']" mode="row"/>
    <xsl:apply-templates select="*[local-name() = 'fundAg']"/>
    <xsl:apply-templates select="*[local-name() = 'grantNo']"/>
  </xsl:template>

  <xsl:template match="*[local-name() = 'producer']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <xsl:if test="position()=1">
          <p>Producer:</p>
        </xsl:if>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>

  <xsl:template match="*[local-name() = 'copyright']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Copyright:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>
  <xsl:template match="*[local-name() = 'prodDate']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Date of Production:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>

  <xsl:template match="*[local-name() = 'prodPlace']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Place of Production:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>

  <xsl:template match="*[local-name() = 'software']" mode="row">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Software used in Production:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>

  <xsl:template match="*[local-name() = 'fundAg']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Funding Agency/Sponsor:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>

  <xsl:template match="*[local-name() = 'grantNo']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Grant Number:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>

  <xsl:template match="*[local-name() = 'distStmt']">
    <xsl:apply-templates select="*[local-name() = 'distrbtr']"/>
    <xsl:apply-templates select="*[local-name() = 'contact']"/>
    <xsl:apply-templates select="*[local-name() = 'depositr']"/>
    <xsl:apply-templates select="*[local-name() = 'depDate']"/>
    <xsl:apply-templates select="*[local-name() = 'distDate']"/>
  </xsl:template>

  <xsl:template match="*[local-name() = 'distrbtr']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Distributor:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>

  <xsl:template match="*[local-name() = 'contact']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Contact Persons:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>

  <xsl:template match="*[local-name() = 'depositr']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Depositor:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>

  <xsl:template match="*[local-name() = 'depDate']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Date of Deposit:</p>
      </td>
      <td>
        <p>
          <xsl:value-of select="@date"/>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>

  <xsl:template match="*[local-name() = 'distDate']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Date of Distribution:</p>
      </td>
      <td>
        <p>
          <xsl:value-of select="@date"/>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>

  <xsl:template match="*[local-name() = 'serStmt']">
    <xsl:apply-templates select="*[local-name() = 'serName']"/>
    <xsl:apply-templates select="*[local-name() = 'serInfo']"/>
  </xsl:template>

  <xsl:template match="*[local-name() = 'serName']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Series Name:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>

  <xsl:template match="*[local-name() = 'serInfo']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Series Information:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>

  <xsl:template match="*[local-name() = 'verStmt']" mode="row">
    <xsl:apply-templates select="*[local-name() = 'version']" mode="row"/>
    <xsl:apply-templates select="*[local-name() = 'verResp']" mode="row"/>
    <xsl:apply-templates select="*[local-name() = 'notes']" mode="row"/>
  </xsl:template>

  <xsl:template match="*[local-name() = 'version']" mode="row">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Version:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>

  <xsl:template match="*[local-name() = 'verResp']" mode="row">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Version Responsibility:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>

  <xsl:template match="*[local-name() = 'biblCit']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Bibliographic Citation:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>

  <xsl:template match="*[local-name() = 'holdings']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Holdings Information:</p>
      </td>
      <td>
        <p>
          <xsl:value-of select="."/>
          <xsl:if test="@URI">
            <a href="{@URI}">
              <xsl:value-of select="@URI"/>
            </a>
          </xsl:if>
        </p>
      </td>
    </tr>
  </xsl:template>

  <xsl:template match="*[local-name() = 'guide']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Guide to Codebook:</p>
      </td>
      <td>
        <p>
          <xsl:value-of select="."/>
        </p>
      </td>
    </tr>
  </xsl:template>

  <xsl:template match="*[local-name() = 'docStatus']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Documentation Status:</p>
      </td>
      <td>
        <p>
          <xsl:value-of select="."/>
        </p>
      </td>
    </tr>
  </xsl:template>


  <xsl:template match="*[local-name() = 'docSrc']">
    <tr class="h2">
      <th colspan="2">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Documentation Source</p>
      </th>
    </tr>
    <xsl:apply-templates select="*[local-name() = 'titlStmt']"/>
    <xsl:apply-templates select="*[local-name() = 'rspStmt']"/>
    <xsl:apply-templates select="*[local-name() = 'prodStmt']"/>
    <xsl:apply-templates select="*[local-name() = 'distStmt']"/>
    <xsl:apply-templates select="*[local-name() = 'serStmt']"/>
    <xsl:apply-templates select="*[local-name() = 'verStmt']" mode="row"/>
    <xsl:apply-templates select="*[local-name() = 'biblCit']"/>
    <xsl:apply-templates select="*[local-name() = 'holdings']"/>
    <xsl:apply-templates select="*[local-name() = 'notes']" mode="row"/>
  </xsl:template>


  <!-- end docDscr templates -->

  <!-- begin stdyDscr templates -->

  <xsl:template match="*[local-name() = 'stdyDscr']">
    <tr class="h1">
      <th colspan="2">
        <p>
          <xsl:if test="@ID">
            <a name="{@ID}"/>
          </xsl:if>
          <a name="2.0">Study Description</a>
        </p>
      </th>
    </tr>
    <xsl:apply-templates select="*[local-name() = 'citation']"/>
    <xsl:apply-templates select="*[local-name() = 'stdyInfo']"/>
    <xsl:apply-templates select="*[local-name() = 'method']"/>
    <xsl:apply-templates select="*[local-name() = 'dataAccs']"/>
    <xsl:apply-templates select="*[local-name() = 'othrStdyMat']"/>
    <xsl:apply-templates select="*[local-name() = 'notes']" mode="row"/>
  </xsl:template>

  <xsl:template match="*[local-name() = 'stdyInfo']">
    <tr class="h2">
      <th colspan="2">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Study Scope</p>
      </th>
    </tr>
    <xsl:apply-templates select="*[local-name() = 'subject']"/>
    <xsl:apply-templates select="*[local-name() = 'abstract']"/>
    <xsl:apply-templates select="*[local-name() = 'sumDscr']"/>
    <xsl:apply-templates select="*[local-name() = 'notes']" mode="row"/>
  </xsl:template>

  <xsl:template match="*[local-name() = 'subject']">

    <xsl:if test="*[local-name() = 'keyword']">
      <tr>
        <td class="h3">
          <xsl:if test="@ID">
            <a name="{@ID}"/>
          </xsl:if>
          <p>Keywords:</p>
        </td>
        <td>
          <p>
            <xsl:apply-templates select="*[local-name() = 'keyword']"/>
          </p>
        </td>
      </tr>
    </xsl:if>

    <xsl:if test="*[local-name() = 'topcClas']">
      <tr>
        <td class="h3">
          <xsl:if test="@ID">
            <a name="{@ID}"/>
          </xsl:if>
          <p>Topic Classification:</p>
        </td>
        <td>
          <p>
            <xsl:apply-templates select="*[local-name() = 'topcClas']"/>
          </p>
        </td>
      </tr>
    </xsl:if>
  </xsl:template>

  <xsl:template match="*[local-name() = 'keyword']">
    <xsl:value-of select="."/>
    <xsl:if test="position()!=last()">,</xsl:if>
  </xsl:template>

  <xsl:template match="*[local-name() = 'topcClas']">
    <xsl:apply-templates/>
    <xsl:if test="position()!=last()">,</xsl:if>
  </xsl:template>


  <xsl:template match="*[local-name() = 'abstract']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <xsl:if test="position()=1">
          <p>Abstract:</p>
        </xsl:if>
      </td>
      <td>
        <xsl:apply-templates/>
      </td>
    </tr>
  </xsl:template>

  <xsl:template match="*[local-name() = 'sumDscr']">
    <xsl:if test="*[local-name() = 'timePrd']">
      <tr>
        <td class="h3">
          <p>Time Period:</p>
        </td>
        <td>
          <p>
            <xsl:apply-templates select="*[local-name() = 'timePrd']"/>
          </p>
        </td>
      </tr>
    </xsl:if>
    <xsl:if test="*[local-name() = 'collDate']">
      <tr>
        <td class="h3">
          <p>Date of Collection:</p>
        </td>
        <td>
          <p>
            <xsl:apply-templates select="*[local-name() = 'collDate']"/>
          </p>
        </td>
      </tr>
    </xsl:if>
    <xsl:if test="*[local-name() = 'nation']">
      <tr>
        <td class="h3">
          <p>Country:</p>
        </td>
        <td>
          <p>
            <xsl:apply-templates select="*[local-name() = 'nation']"/>
          </p>
        </td>
      </tr>
    </xsl:if>

    <xsl:if test="*[local-name() = 'geogCover']">
      <tr>
        <td class="h3">
          <p>Geographic Coverage:</p>
        </td>
        <td>
          <p>
            <xsl:apply-templates select="*[local-name() = 'geogCover']"/>
          </p>
        </td>
      </tr>
    </xsl:if>

    <xsl:if test="*[local-name() = 'geogUnit']">
      <tr>
        <td class="h3">
          <p>Geographic Unit(s):</p>
        </td>
        <td>
          <p>
            <xsl:apply-templates select="*[local-name() = 'geogUnit']"/>
          </p>
        </td>
      </tr>
    </xsl:if>

    <xsl:apply-templates select="*[local-name() = 'geoBndBox']"/>


    <xsl:apply-templates select="*[local-name() = 'anlyUnit']"/>
    <xsl:apply-templates mode="row" select="*[local-name() = 'universe']"/>
    <xsl:apply-templates select="*[local-name() = 'dataKind']"/>
  </xsl:template>

  <xsl:template match="*[local-name() = 'timePrd']">
    <xsl:choose>
      <xsl:when test="@event='start'">
        <xsl:value-of select="@date"/>
        <xsl:apply-templates/>
        -
      </xsl:when>
      <xsl:when test="@event='end'">
        <xsl:value-of select="@date"/>
        <xsl:apply-templates/>
      </xsl:when>
      <xsl:when test="@event='single'">
        <xsl:value-of select="@date"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:apply-templates/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template match="*[local-name() = 'collDate']">
    <xsl:choose>
      <xsl:when test="@event='start'">
        <xsl:apply-templates/>
        -
      </xsl:when>
      <xsl:when test="@event='end'">
        <xsl:apply-templates/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:apply-templates/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template match="*[local-name() = 'nation']">
    <xsl:apply-templates/>
    <xsl:if test="position()!=last()">, </xsl:if>
  </xsl:template>

  <xsl:template match="*[local-name() = 'geogCover']">
    <xsl:apply-templates/>
    <xsl:if test="position()!=last()">, </xsl:if>
  </xsl:template>

  <xsl:template match="*[local-name() = 'geogUnit']">
    <xsl:apply-templates/>
    <xsl:if test="position()!=last()">, </xsl:if>
  </xsl:template>


  <xsl:template match="*[local-name() = 'geoBndBox']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Geographic Bounding Box:</p>
      </td>
      <td>
        <ul>
          <xsl:apply-templates select="*[local-name() = 'westBL']"/>
          <xsl:apply-templates select="*[local-name() = 'eastBL']"/>
          <xsl:apply-templates select="*[local-name() = 'southBL']"/>
          <xsl:apply-templates select="*[local-name() = 'northBL']"/>
        </ul>
      </td>
    </tr>
  </xsl:template>

  <xsl:template match="*[local-name() = 'westBL']">
    <li>
      <xsl:if test="@ID">
        <a name="{@ID}"/>
      </xsl:if>
      West Bounding Longitude:
      <xsl:apply-templates/>
    </li>
  </xsl:template>

  <xsl:template match="*[local-name() = 'eastBL']">
    <li>
      <xsl:if test="@ID">
        <a name="{@ID}"/>
      </xsl:if>
      East Bounding Longitude:
      <xsl:apply-templates/>
    </li>
  </xsl:template>

  <xsl:template match="*[local-name() = 'southBL']">
    <li>
      <xsl:if test="@ID">
        <a name="{@ID}"/>
      </xsl:if>
      South Bounding Latitude:
      <xsl:apply-templates/>
    </li>
  </xsl:template>

  <xsl:template match="*[local-name() = 'northBL']">
    <li>
      <xsl:if test="@ID">
        <a name="{@ID}"/>
      </xsl:if>
      North Bounding Latitude:
      <xsl:apply-templates/>
    </li>
  </xsl:template>

  <xsl:template match="*[local-name() = 'boundPoly']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Geographic Bounding Polygon:</p>
      </td>
      <td>
        <xsl:apply-templates select="*[local-name() = 'polygon']"/>
      </td>
    </tr>
  </xsl:template>


  <xsl:template match="*[local-name() = 'polygon']">
    <xsl:if test="@ID">
      <a name="{@ID}"/>
    </xsl:if>
    <ul>
      <xsl:apply-templates select="*[local-name() = 'point']"/>
    </ul>
  </xsl:template>

  <xsl:template match="*[local-name() = 'point']">
    <li>
      <xsl:if test="@ID">
        <a name="{@ID}"/>
      </xsl:if>
      <xsl:apply-templates select="*[local-name() = 'gringLat']"/>
      ;
      <xsl:apply-templates select="*[local-name() = 'gringLon']"/>
    </li>
  </xsl:template>

  <xsl:template match="*[local-name() = 'gringLat']">G-Ring Latitude:
    <xsl:apply-templates/>
  </xsl:template>

  <xsl:template match="*[local-name() = 'gringLon']">G-Ring Longitude:
    <xsl:apply-templates/>
  </xsl:template>

  <xsl:template match="*[local-name() = 'anlyUnit']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Unit of Analysis:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>
  <xsl:template match="*[local-name() = 'universe']" mode="row">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Universe:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>
  <xsl:template match="*[local-name() = 'dataKind']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Kind of Data:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>
  <xsl:template match="*[local-name() = 'method']">
    <tr class="h2">
      <th colspan="2">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Methodology and Processing</p>
      </th>
    </tr>
    <xsl:apply-templates select="*[local-name() = 'dataColl']"/>
    <xsl:apply-templates select="*[local-name() = 'notes']" mode="row"/>
    <xsl:apply-templates select="*[local-name() = 'anlyInfo']"/>
    <xsl:apply-templates select="*[local-name() = 'stdyClas']"/>
  </xsl:template>

  <xsl:template match="*[local-name() = 'dataColl']">
    <xsl:apply-templates select="*[local-name() = 'timeMeth']"/>
    <xsl:apply-templates select="*[local-name() = 'dataCollector']"/>
    <xsl:apply-templates select="*[local-name() = 'frequenc']"/>
    <xsl:apply-templates select="*[local-name() = 'sampProc']"/>
    <xsl:apply-templates select="*[local-name() = 'deviat']"/>
    <xsl:apply-templates select="*[local-name() = 'collMode']"/>
    <xsl:apply-templates select="*[local-name() = 'resInstru']"/>
    <xsl:apply-templates select="*[local-name() = 'sources']"/>
    <xsl:apply-templates select="*[local-name() = 'collSitu']"/>
    <xsl:apply-templates select="*[local-name() = 'actMin']"/>
    <xsl:apply-templates select="*[local-name() = 'ConOps']"/>
    <xsl:apply-templates select="*[local-name() = 'weight']"/>
    <xsl:apply-templates select="*[local-name() = 'cleanOps']"/>
  </xsl:template>

  <xsl:template match="*[local-name() = 'timeMeth']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Time Method:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>

  <xsl:template match="*[local-name() = 'dataCollector']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <xsl:if test="position()=1">
          <p>Data Collector:</p>
        </xsl:if>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>

  <xsl:template match="*[local-name() = 'frequenc']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Frequency of Data Collection:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>

  <xsl:template match="*[local-name() = 'sampProc']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <xsl:if test="position()=1">
          <p>Sampling Procedure:</p>
        </xsl:if>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>

  <xsl:template match="*[local-name() = 'deviat']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Major Deviations from the Sample Design:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>
  <xsl:template match="*[local-name() = 'collMode']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Mode of Data Collection:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>
  <xsl:template match="*[local-name() = 'resInstru']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Type of Research Instrument:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>
  <xsl:template match="*[local-name() = 'sources']">

    <tr>
      <th colspan="2">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Sources Statement</p>
      </th>
    </tr>

    <xsl:apply-templates select="*[local-name() = 'dataSrc']"/>
    <xsl:apply-templates select="*[local-name() = 'srcOrig']"/>
    <xsl:apply-templates select="*[local-name() = 'srcChar']"/>
    <xsl:apply-templates select="*[local-name() = 'srcDocu']"/>
    <xsl:apply-templates select="*[local-name() = 'sources']"/>
  </xsl:template>

  <xsl:template match="*[local-name() = 'dataSrc']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <xsl:if test="position()=1">
          <p>Data Sources:</p>
        </xsl:if>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>
  <xsl:template match="*[local-name() = 'srcOrig']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Origins of Sources:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>

  <xsl:template match="*[local-name() = 'srcChar']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Characteristics of Source Notes:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>

  <xsl:template match="*[local-name() = 'srcDocu']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Documentation and Access to Sources:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>

  <xsl:template match="*[local-name() = 'collSitu']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Characteristics of Data Collection Situation:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>
  <xsl:template match="*[local-name() = 'actMin']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Actions to Minimize Losses:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>
  <xsl:template match="*[local-name() = 'ConOps']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Control Operations:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>
  <xsl:template match="*[local-name() = 'weight']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Weighting:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>

  <xsl:template match="*[local-name() = 'cleanOps']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Cleaning Operations:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>


  <xsl:template match="*[local-name() = 'anlyInfo']">
    <xsl:apply-templates select="*[local-name() = 'respRate']"/>
    <xsl:apply-templates select="*[local-name() = 'EstSmpErr']"/>
    <xsl:apply-templates select="*[local-name() = 'dataAppr']"/>
  </xsl:template>
  <xsl:template match="*[local-name() = 'respRate']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Response Rate:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>
  <xsl:template match="*[local-name() = 'EstSmpErr']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Estimates of Sampling Error:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>
  <xsl:template match="*[local-name() = 'dataAppr']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Other Forms of Data Appraisal:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>
  <xsl:template match="*[local-name() = 'stdyClas']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Class of the Study:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>
  <xsl:template match="*[local-name() = 'dataAccs']">
    <tr class="h2">
      <th colspan="2">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Data Access</p>
      </th>
    </tr>
    <xsl:apply-templates select="*[local-name() = 'setAvail']"/>
    <xsl:apply-templates select="*[local-name() = 'useStmt']"/>
    <xsl:apply-templates select="*[local-name() = 'notes']" mode="row"/>
  </xsl:template>

  <xsl:template match="*[local-name() = 'setAvail']">
    <xsl:apply-templates select="*[local-name() = 'accsPlac']"/>
    <xsl:apply-templates select="*[local-name() = 'origArch']"/>
    <xsl:apply-templates select="*[local-name() = 'avlStatus']"/>
    <xsl:apply-templates select="*[local-name() = 'collSize']"/>
    <xsl:apply-templates select="*[local-name() = 'complete']"/>
    <xsl:apply-templates select="*[local-name() = 'fileQnty']"/>
    <xsl:apply-templates select="*[local-name() = 'notes']" mode="row"/>
  </xsl:template>

  <xsl:template match="*[local-name() = 'accsPlac']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Location:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>

  <xsl:template match="*[local-name() = 'origArch']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Archive Where Study was Originally Stored:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>

  <xsl:template match="*[local-name() = 'avlStatus']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Availability Status:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>
  <xsl:template match="*[local-name() = 'collSize']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Extent of Collection:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>
  <xsl:template match="*[local-name() = 'complete']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Completeness of Study Stored:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>
  <xsl:template match="*[local-name() = 'fileQnty']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Number of Files:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>

  <xsl:template match="*[local-name() = 'useStmt']">
    <xsl:apply-templates select="*[local-name() = 'confDec']"/>
    <xsl:apply-templates select="*[local-name() = 'specPerm']"/>
    <xsl:apply-templates select="*[local-name() = 'restrctn']"/>
    <xsl:apply-templates select="*[local-name() = 'contact']"/>
    <xsl:apply-templates select="*[local-name() = 'citReq']"/>
    <xsl:apply-templates select="*[local-name() = 'deposReq']"/>
    <xsl:apply-templates select="*[local-name() = 'conditions']"/>
    <xsl:apply-templates select="*[local-name() = 'disclaimer']"/>
  </xsl:template>
  <xsl:template match="*[local-name() = 'confDec']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Confidentiality Declaration:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>

  <xsl:template match="*[local-name() = 'specPerm']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Special Permissions:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>
  <xsl:template match="*[local-name() = 'restrctn']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Restrictions:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>
  <xsl:template match="*[local-name() = 'contact']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Access Authority:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>
  <xsl:template match="*[local-name() = 'citReq']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Citation Requirement:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>
  <xsl:template match="*[local-name() = 'deposReq']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Deposit Requirement:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>

  <xsl:template match="*[local-name() = 'conditions']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Conditions:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>
  <xsl:template match="*[local-name() = 'disclaimer']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Disclaimer:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>

  <xsl:template match="*[local-name() = 'othrStdyMat']">
    <tr class="h2">
      <th colspan="2">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Other Study Description Materials</p>
      </th>
    </tr>
    <xsl:apply-templates select="*[local-name() = 'relMat']"/>
    <xsl:apply-templates select="*[local-name() = 'relStdy']"/>
    <xsl:apply-templates select="*[local-name() = 'relPubl']"/>
    <xsl:apply-templates select="*[local-name() = 'othRefs']"/>
  </xsl:template>

  <xsl:template match="*[local-name() = 'relMat']">
    <xsl:if test="position()=1">
      <tr>
        <th colspan="2">
          <p>Related Materials</p>

        </th>
      </tr>
    </xsl:if>

    <xsl:if test="*[local-name() = 'citation']">
      <xsl:apply-templates select="*[local-name() = 'citation']"/>
    </xsl:if>

    <tr>
      <td colspan="2">
        <p>
          <xsl:value-of select="node()"/>
        </p>
      </td>
    </tr>

  </xsl:template>

  <xsl:template match="*[local-name() = 'relStdy']">
    <xsl:if test="position()=1">
      <tr>
        <th colspan="2">
          <p>Related Studies</p>
        </th>
      </tr>
    </xsl:if>

    <xsl:if test="*[local-name() = 'citation']">
      <xsl:apply-templates select="*[local-name() = 'citation']"/>
    </xsl:if>

    <tr>
      <td colspan="2">
        <p>
          <xsl:value-of select="node()"/>
        </p>
      </td>
    </tr>
  </xsl:template>


  <xsl:template match="*[local-name() = 'relPubl']">
    <xsl:if test="position()=1">
      <tr>
        <th colspan="2">
          <p>Related Publications</p>
        </th>
      </tr>
    </xsl:if>

    <xsl:if test="*[local-name() = 'citation']">
      <xsl:apply-templates select="*[local-name() = 'citation']"/>
    </xsl:if>

    <tr>
      <td colspan="2">
        <p>
          <xsl:value-of select="node()"/>
        </p>
      </td>
    </tr>
  </xsl:template>

  <xsl:template match="*[local-name() = 'othRefs']">
    <xsl:if test="position()=1">
      <tr>
        <th colspan="2">
          <p>Other Reference Note(s)</p>
        </th>
      </tr>
    </xsl:if>
    <xsl:if test="*[local-name() = 'citation']">
      <xsl:apply-templates select="*[local-name() = 'citation']"/>
    </xsl:if>

    <tr>
      <td colspan="2">
        <p>
          <xsl:choose>
            <xsl:when test="text()[contains(.,'&#xA;')]">
              <xsl:call-template name="lf2br">
                <xsl:with-param name="StringToTransform" select="text()"/>
              </xsl:call-template>
            </xsl:when>
            <xsl:otherwise>
              <xsl:value-of select="text()"/>
            </xsl:otherwise>
          </xsl:choose>
        </p>
      </td>
    </tr>
  </xsl:template>

  <!-- end stdyDscr templates -->

  <!-- begin fileDscr templates -->

  <xsl:template match="*[local-name() = 'fileDscr']">
    <tr class="h1">
      <th colspan="2">
        <p>
          <a name="3.0">File Description</a>
          <xsl:if test="@ID">--
            <xsl:value-of select="@ID"/>
          </xsl:if>
        </p>
      </th>
    </tr>


    <xsl:apply-templates select="*[local-name() = 'fileTxt']"/>
    <xsl:apply-templates select="*[local-name() = 'locMap']"/>
    <xsl:apply-templates select="*[local-name() = 'notes']" mode="row"/>


  </xsl:template>

  <xsl:template match="*[local-name() = 'locMap']">
    <tr>
      <td class="h3">
        <p>Location Map:</p>
      </td>
      <td>
        <p>Location map data is present, but not displayed.</p>
      </td>
    </tr>
  </xsl:template>

  <xsl:template match="*[local-name() = 'fileTxt']">
    <tr class="h2">
      <th colspan="2">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>File
          <xsl:apply-templates select="*[local-name() = 'fileName']"/>
        </p>
      </th>
    </tr>
    <tr>
      <td></td>
      <td>
        <ul>
          <xsl:apply-templates select="*[local-name() = 'fileCont']"/>
          <xsl:apply-templates select="*[local-name() = 'fileStrc']"/>
          <xsl:apply-templates select="*[local-name() = 'dimensns']"/>
          <xsl:apply-templates select="*[local-name() = 'fileType']"/>
          <xsl:apply-templates select="*[local-name() = 'format']"/>
          <xsl:apply-templates select="*[local-name() = 'filePlac']"/>
          <xsl:apply-templates select="*[local-name() = 'dataChck']"/>
          <xsl:apply-templates select="*[local-name() = 'ProcStat']"/>
          <xsl:apply-templates select="*[local-name() = 'dataMsng']"/>
          <xsl:apply-templates select="*[local-name() = 'software']" mode="list"/>
          <xsl:apply-templates select="*[local-name() = 'verStmt']" mode="list"/>
          <xsl:apply-templates select="*[local-name() = 'notes']" mode="list"/>
        </ul>

        <!-- ADD: locMap -->


      </td>
    </tr>
  </xsl:template>

  <xsl:template match="*[local-name() = 'fileName']">
    <xsl:if test="@ID">
      <a name="{@ID}"/>
    </xsl:if>
    :
    <xsl:apply-templates/>
  </xsl:template>
  <xsl:template match="*[local-name() = 'fileCont']">
    <li>
      <xsl:if test="@ID">
        <a name="{@ID}"/>
      </xsl:if>
      <p>Contents of Files:
        <xsl:apply-templates/>
      </p>
    </li>
  </xsl:template>
  <xsl:template match="*[local-name() = 'fileStrc']">
    <li>
      <xsl:if test="@ID">
        <a name="{@ID}"/>
      </xsl:if>
      <p>File Structure:
        <xsl:value-of select="@type"/>
      </p>
    </li>
    <xsl:apply-templates select="*[local-name() = 'recGrp']"/>
    <xsl:apply-templates mode="list" select="*[local-name() = 'notes']"/>
  </xsl:template>
  <xsl:template match="*[local-name() = 'recGrp']">
    <li>
      <xsl:if test="@ID">
        <a name="{@ID}"/>
      </xsl:if>
      <p>Record Group</p>
      <ul>
        <xsl:apply-templates select="*[local-name() = 'labl']" mode="list"/>
        <xsl:apply-templates select="*[local-name() = 'recDimnsn']"/>
      </ul>
    </li>
  </xsl:template>

  <xsl:template match="*[local-name() = 'labl']" mode="list">
    <li>
      <xsl:if test="@ID">
        <a name="{@ID}"/>
      </xsl:if>
      <p>Label:
        <xsl:apply-templates/>
      </p>
    </li>
  </xsl:template>

  <xsl:template match="*[local-name() = 'recDimnsn']">
    <xsl:apply-templates select="*[local-name() = 'varQnty']"/>
    <xsl:apply-templates select="*[local-name() = 'caseQnty']"/>
    <xsl:apply-templates select="*[local-name() = 'logRecL']"/>
  </xsl:template>
  <xsl:template match="*[local-name() = 'varQnty']">
    <li>
      <xsl:if test="@ID">
        <a name="{@ID}"/>
      </xsl:if>
      <p>No. of variables per record:
        <xsl:apply-templates/>
      </p>
    </li>
  </xsl:template>
  <xsl:template match="*[local-name() = 'caseQnty']">
    <li>
      <xsl:if test="@ID">
        <a name="{@ID}"/>
      </xsl:if>
      <p>Number of cases:
        <xsl:apply-templates/>
      </p>
    </li>
  </xsl:template>
  <xsl:template match="*[local-name() = 'logRecL']">
    <li>
      <xsl:if test="@ID">
        <a name="{@ID}"/>
      </xsl:if>
      <p>Logical Record Length:
        <xsl:apply-templates/>
      </p>
    </li>
  </xsl:template>
  <xsl:template match="*[local-name() = 'dimensns']">
    <xsl:apply-templates select="*[local-name() = 'caseQnty']"/>
    <xsl:apply-templates select="*[local-name() = 'varQnty']"/>
    <xsl:apply-templates select="*[local-name() = 'logRecL']"/>
    <xsl:apply-templates select="*[local-name() = 'recPrCas']"/>
    <xsl:apply-templates select="*[local-name() = 'recNumTot']"/>
  </xsl:template>
  <xsl:template match="*[local-name() = 'recPrCas']">
    <li>
      <xsl:if test="@ID">
        <a name="{@ID}"/>
      </xsl:if>
      <p>Records per Case:
        <xsl:apply-templates/>
      </p>
    </li>
  </xsl:template>
  <xsl:template match="*[local-name() = 'recNumTot']">
    <li>
      <xsl:if test="@ID">
        <a name="{@ID}"/>
      </xsl:if>
      <p>Overall Number of Records:
        <xsl:apply-templates/>
      </p>
    </li>
  </xsl:template>
  <xsl:template match="*[local-name() = 'fileType']">
    <li>
      <xsl:if test="@ID">
        <a name="{@ID}"/>
      </xsl:if>
      <p>Type of File:
        <xsl:apply-templates/>
      </p>
    </li>
  </xsl:template>
  <xsl:template match="*[local-name() = 'format']">
    <li>
      <xsl:if test="@ID">
        <a name="{@ID}"/>
      </xsl:if>
      <p>Data Format:
        <xsl:apply-templates/>
      </p>
    </li>
  </xsl:template>
  <xsl:template match="*[local-name() = 'filePlac']">
    <li>
      <xsl:if test="@ID">
        <a name="{@ID}"/>
      </xsl:if>
      <p>Place of File Production:
        <xsl:apply-templates/>
      </p>
    </li>
  </xsl:template>
  <xsl:template match="*[local-name() = 'dataChck']">
    <li>
      <xsl:if test="@ID">
        <a name="{@ID}"/>
      </xsl:if>
      <p>Extent of Processing Checks:
        <xsl:apply-templates/>
      </p>
    </li>
  </xsl:template>

  <xsl:template match="*[local-name() = 'ProcStat']">
    <li>
      <xsl:if test="@ID">
        <a name="{@ID}"/>
      </xsl:if>
      <p>Processing Status:
        <xsl:apply-templates/>
      </p>
    </li>
  </xsl:template>

  <xsl:template match="*[local-name() = 'dataMsng']">
    <li>
      <xsl:if test="@ID">
        <a name="{@ID}"/>
      </xsl:if>
      <p>Missing Data:
        <xsl:apply-templates/>
      </p>
    </li>
  </xsl:template>

  <xsl:template match="*[local-name() = 'software']" mode="list">
    <li>
      <xsl:if test="@ID">
        <a name="{@ID}"/>
      </xsl:if>
      <p>Software:
        <xsl:apply-templates/>
      </p>
    </li>
  </xsl:template>
  <xsl:template match="*[local-name() = 'verStmt']" mode="list">
    <xsl:apply-templates select="*[local-name() = 'version']" mode="list"/>
    <xsl:apply-templates select="*[local-name() = 'verResp']" mode="list"/>
    <xsl:apply-templates select="*[local-name() = 'notes']" mode="list"/>
  </xsl:template>
  <xsl:template match="*[local-name() = 'version']" mode="list">
    <li>
      <xsl:if test="@ID">
        <a name="{@ID}"/>
      </xsl:if>
      <p>Version:
        <xsl:apply-templates/>
      </p>
    </li>
  </xsl:template>
  <xsl:template match="*[local-name() = 'verResp']" mode="list">
    <li>
      <xsl:if test="@ID">
        <a name="{@ID}"/>
      </xsl:if>
      <p>Version Responsibility Statement:
        <xsl:apply-templates/>
      </p>
    </li>
  </xsl:template>

  <!-- end fileDscr templates -->

  <!-- begin dataDscr templates -->

  <!-- ADD: nCubeGrp nCube -->

  <xsl:template match="*[local-name() = 'dataDscr']">
    <tr class="h1">
      <th colspan="2">
        <p>
          <xsl:if test="@ID">
            <a name="{@ID}"/>
          </xsl:if>
          <a name="a4.0">Variable Description</a>
        </p>
      </th>
    </tr>
    <xsl:choose>
      <xsl:when test="*[local-name() = 'varGrp']">
        <tr class="h2">
          <th colspan="2">
            <p>Variable Groups</p>
          </th>
        </tr>

        <tr>
          <td>
          </td>
          <td>
            <ul>
              <xsl:apply-templates mode="list" select="*[local-name() = 'varGrp']"/>
            </ul>
          </td>
        </tr>

        <xsl:apply-templates mode="detail" select="*[local-name() = 'varGrp']"/>

      </xsl:when>
      <xsl:otherwise>
        <tr>
          <td class="h3">
            <p>List of Variables:</p>
          </td>
          <td>
            <ul>
              <xsl:apply-templates mode="list" select="*[local-name() = 'var']"/>
            </ul>
          </td>
        </tr>
      </xsl:otherwise>
    </xsl:choose>
    <tr class="h2">
      <td colspan="2">
        <p>
          <strong>Variables</strong>
        </p>
      </td>
    </tr>

    <xsl:apply-templates mode="detail" select="*[local-name() = 'var']"/>

    <xsl:if test="*[local-name() = 'nCube']">

      <tr>
        <td class="h3">
          <p>nCube(s):</p>
        </td>
        <td>

          <xsl:if test="*[local-name() = 'nCubeGrp']">
            <p>nCube groups are present in this XML file.</p>
          </xsl:if>

          <table border="1" cellpadding="5" cellspacing="0" width="90%">
            <tr>
              <th>
                <p>ID</p>
              </th>
              <th>
                <p>Label</p>
              </th>
              <th>
                <p>Cells</p>
              </th>
              <th>
                <p>Variables</p>
              </th>
            </tr>

            <xsl:apply-templates select="*[local-name() = 'nCube']" mode="row"/>

          </table>

        </td>
      </tr>

    </xsl:if>

    <xsl:apply-templates select="*[local-name() = 'notes']" mode="row"/>


  </xsl:template>


  <xsl:template match="*[local-name() = 'nCube']" mode="row">
    <tr>
      <td>
        <p>
          <xsl:value-of select="@ID"/>
        </p>
      </td>
      <td>
        <p>
          <xsl:value-of select="*[local-name() = 'labl']"/>
        </p>
      </td>
      <td>
        <p>
          <xsl:value-of select="@cellQnty"/>
        </p>
      </td>
      <td>
        <p>
          <xsl:apply-templates select="*[local-name() = 'dmns']"/>
        </p>
      </td>
    </tr>

  </xsl:template>

  <xsl:template match="*[local-name() = 'dmns']">
    <xsl:value-of select="@varRef"/>
    &#160;
  </xsl:template>


  <xsl:template match="*[local-name() = 'varGrp']" mode="list">
    <li>
      <!--<xsl:apply-templates mode="no-format" select="*[local-name() = 'labl']"/>-->
      <a href="#{@ID}">
        <xsl:apply-templates mode="no-format" select="*[local-name() = 'labl']"/>
      </a>
    </li>

  </xsl:template>

  <xsl:template match="*[local-name() = 'varGrp']" mode="detail">

    <xsl:if test="@varGrp">
      <tr>
        <th colspan="2">
          <p>
            <a name="{@ID}">
              <xsl:value-of select="*[local-name() = 'labl']"/>
            </a>
          </p>
        </th>
      </tr>
      <tr>
        <td></td>
        <td>
          <p>Variable Groups within
            <xsl:value-of select="*[local-name() = 'labl']"/>
          </p>
          <ul>
            <xsl:apply-templates mode="list-varGrp"
                                 select="//*[local-name()='codeBook']/*[local-name() = 'dataDscr']/*[local-name() = 'varGrp']">
              <xsl:with-param name="varGrp-token" select="@varGrp"/>
            </xsl:apply-templates>
          </ul>
        </td>
      </tr>
    </xsl:if>


    <xsl:if test="@var">
      <tr>
        <th colspan="2">
          <p>
            <a name="{@ID}">
              <xsl:value-of select="*[local-name() = 'labl']"/>
            </a>
          </p>

        </th>
      </tr>
      <tr>
        <td></td>
        <td>
          <p>Variables within
            <xsl:value-of select="*[local-name() = 'labl']"/>
          </p>
          <ul>
            <xsl:apply-templates mode="varGrp"
                                 select="//*[local-name()='codeBook']/*[local-name() = 'dataDscr']/*[local-name() = 'var']">
              <xsl:with-param name="var-token" select="@var"/>
            </xsl:apply-templates>
          </ul>

        </td>
      </tr>

    </xsl:if>

    <xsl:apply-templates mode="row" select="*[local-name() = 'txt']"/>
    <xsl:apply-templates select="*[local-name() = 'concept']"/>
    <xsl:apply-templates select="*[local-name() = 'defntn']"/>
    <xsl:apply-templates mode="row" select="*[local-name() = 'universe']"/>
    <xsl:apply-templates mode="row" select="*[local-name() = 'notes']"/>

    <!-- What's this table for? Do tables normally appear in varGrp? -->

    <xsl:apply-templates select="*[local-name() = 'table']"/>

  </xsl:template>

  <xsl:template match="*[local-name() = 'varGrp']" mode="list-varGrp">
    <xsl:param name="varGrp-token"/>
    <xsl:if test="contains(concat($varGrp-token,' '), concat(@ID,' '))">
      <li>

        <a href="#{@ID}">
          <xsl:apply-templates mode="no-format" select="*[local-name() = 'labl']"/>
        </a>
      </li>
    </xsl:if>
  </xsl:template>

  <xsl:template name="tokens">
    <xsl:param name="str" select="."/>
    <xsl:param name="splitString" select="' '"/>
    <xsl:choose>
      <xsl:when test="contains($str,$splitString)">
        <xsl:call-template name="testId">
          <xsl:with-param name="token" select="substring-before($str,$splitString)"/>
        </xsl:call-template>
        <xsl:call-template name="tokens">
          <xsl:with-param name="str" select="substring-after($str,$splitString)"/>
          <xsl:with-param name="splitString" select="$splitString"/>
        </xsl:call-template>
      </xsl:when>
      <xsl:otherwise>
        <xsl:call-template name="testId">
          <xsl:with-param name="token" select="$str"/>
        </xsl:call-template>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>


  <xsl:template name="testId">
    <xsl:param name="token"/>
    <b>Test:
      <xsl:value-of select="$token"/>
    </b>
  </xsl:template>

  <xsl:template match="*[local-name() = 'var']" mode="varGrp">
    <xsl:param name="var-token"/>

    <!-- <xsl:call-template name="tokens">
        <xsl:with-param name="str" select="$var-token"/>
        <xsl:with-param name="splitString" select="','"/>
    </xsl:call-template>-->


    <xsl:choose>
      <xsl:when test="contains(concat($var-token, ' '), concat(@ID,' '))">
        <li>
          <a href="#{@ID}">
            <xsl:choose>
              <xsl:when test="*[local-name() = 'labl']">
                <xsl:value-of select="*[local-name() = 'labl']"/>
              </xsl:when>
              <xsl:otherwise>
                <xsl:value-of select="@name"/>
              </xsl:otherwise>
            </xsl:choose>
          </a>
        </li>
      </xsl:when>
    </xsl:choose>
  </xsl:template>

  <xsl:template match="*[local-name() = 'labl']" mode="no-format">
    <xsl:if test="@ID">
      <a name="{@ID}"/>
    </xsl:if>
    <xsl:apply-templates/>
  </xsl:template>
  <xsl:template match="*[local-name() = 'txt']" mode="list">
    <li>
      <xsl:if test="@ID">
        <a name="{@ID}"/>
      </xsl:if>
      Text:
      <xsl:apply-templates/>
    </li>
  </xsl:template>
  <xsl:template match="*[local-name() = 'defntn']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Definition:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>

  <xsl:template match="*[local-name() = 'concept']">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Concept:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>

  <xsl:template match="*[local-name() = 'txt']" mode="row">
    <tr>
      <td class="h3">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Text:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>

  <xsl:template match="*[local-name() = 'universe']" mode="list">
    <li>
      <xsl:if test="@ID">
        <a name="{@ID}"/>
      </xsl:if>
      Universe:
      <xsl:apply-templates/>
    </li>
  </xsl:template>

  <xsl:template match="*[local-name() = 'var']" mode="list">
    <li>
      <a href="#{@ID}">
        <xsl:choose>
          <xsl:when test="*[local-name() = 'labl']">
            <xsl:value-of select="*[local-name() = 'labl']"/>
          </xsl:when>
          <xsl:otherwise>
            <xsl:value-of select="@name"/>
          </xsl:otherwise>
        </xsl:choose>
      </a>
    </li>
  </xsl:template>


  <xsl:template match="*[local-name() = 'var']" mode="detail">
    <tr>
      <th colspan="2">
        <p>
          <a name="{@ID}">
            Variable
            <xsl:choose>
              <xsl:when test="*[local-name() = 'labl']">
                <xsl:value-of select="@name"/>: <xsl:value-of select="*[local-name() = 'labl']"/>
              </xsl:when>
              <xsl:otherwise>
                <xsl:value-of select="@name"/>
              </xsl:otherwise>
            </xsl:choose>
          </a>
        </p>
      </th>
    </tr>


    <tr>
      <td valign="top">
        <xsl:apply-templates select="*[local-name() = 'location']"/>
      </td>
      <td valign="top">
        <xsl:apply-templates select="*[local-name() = 'qstn']"/>
        <xsl:apply-templates mode="para" select="*[local-name() = 'txt']"/>
        <xsl:choose>
          <xsl:when test="*[local-name() = 'catgryGrp']">
            <table border="1" cellpadding="5" cellspacing="0" width="90%">
              <xsl:apply-templates select="*[local-name() = 'catgryGrp']"/>
            </table>
          </xsl:when>
          <xsl:when test="*[local-name() = 'catgry']">
            <table border="1" cellpadding="5" cellspacing="0" width="90%">
              <tr>
                <th>
                  <p>Value</p>
                </th>
                <th>
                  <p>Label</p>
                </th>
                <th>
                  <p>Frequency</p>
                </th>
                <!-- <th>
                    <p>Text</p>
                </th>-->
              </tr>
              <xsl:apply-templates mode="no-catgryGrp" select="*[local-name() = 'catgry']"/>
            </table>
          </xsl:when>
        </xsl:choose>
        <xsl:apply-templates select="*[local-name() = 'catgry']/*[local-name() = 'catStat']/*[local-name() = 'table']"/>
        <xsl:apply-templates select="*[local-name() = 'imputation']"/>
        <xsl:apply-templates select="*[local-name() = 'security']"/>
        <xsl:apply-templates select="*[local-name() = 'embargo']"/>
        <xsl:apply-templates select="*[local-name() = 'respUnit']"/>
        <xsl:apply-templates select="*[local-name() = 'anlysUnit']"/>
        <xsl:apply-templates select="*[local-name() = 'valrng']"/>
        <xsl:apply-templates select="*[local-name() = 'invalrng']"/>
        <xsl:apply-templates select="*[local-name() = 'undocCod']"/>
        <xsl:apply-templates mode="para" select="*[local-name() = 'universe']"/>
        <xsl:apply-templates select="*[local-name() = 'TotlResp']"/>

        <xsl:if test="*[local-name() = 'sumStat']">
          <p>Summary Statistics:
            <xsl:apply-templates select="*[local-name() = 'sumStat']"/>
          </p>
        </xsl:if>

        <xsl:apply-templates select="*[local-name() = 'stdCatgry']"/>
        <xsl:apply-templates select="*[local-name() = 'codInstr']"/>
        <xsl:apply-templates select="*[local-name() = 'verStmt']" mode="list2"/>
        <xsl:apply-templates select="*[local-name() = 'concept']"/>
        <xsl:apply-templates select="*[local-name() = 'derivation']"/>
        <xsl:apply-templates select="*[local-name() = 'varFormat']"/>
        <xsl:apply-templates select="*[local-name() = 'geoMap']"/>
        <xsl:apply-templates mode="para" select="*[local-name() = 'notes']"/>
      </td>
    </tr>
  </xsl:template>
  <xsl:template match="*[local-name() = 'catgryGrp']">

    <!-- ADD: catStat -->

    <tr>
      <th align="left" colspan="4">
        <p>
          <strong>
            <xsl:apply-templates mode="no-format" select="*[local-name() = 'labl']"/>
          </strong>
          <xsl:apply-templates mode="no-format" select="*[local-name() = 'txt']"/>
        </p>
      </th>
    </tr>
    <tr>
      <th>
        <p>Value</p>
      </th>
      <th>
        <p>Label</p>
      </th>
      <th>
        <p>Frequency</p>
      </th>
      <th>
        <p>Text</p>
      </th>
    </tr>
    <!--This is two nodes up. How?-->
    <xsl:apply-templates mode="group-list" select="*[local-name() = 'catgry']">
      <xsl:with-param name="catgryGrp-token" select="@catgry"/>
    </xsl:apply-templates>
  </xsl:template>
  <xsl:template match="*[local-name() = 'txt']" mode="no-format">
    <xsl:if test="@ID">
      <a name="{@ID}"/>
    </xsl:if>
    -
    <xsl:apply-templates/>
  </xsl:template>
  <xsl:template match="*[local-name() = 'catgry']" mode="no-catgryGrp">
    <tr>
      <td>
        <p>
          <xsl:value-of select="*[local-name() = 'catValu']"/>
          <xsl:if test="substring(catValu,string-length(catValu)-1,1)!='.'">.</xsl:if>
        </p>
      </td>
      <td>
        <p>
          <xsl:choose>
            <xsl:when test="*[local-name() = 'labl']">
              <xsl:value-of select="*[local-name() = 'labl']"/>
            </xsl:when>
            <xsl:otherwise>
              &#160;
            </xsl:otherwise>
          </xsl:choose>
        </p>
      </td>
      <td>
        <xsl:choose>
          <xsl:when test="*[local-name() = 'catStat']/*[local-name() = 'table']">
            <p>see table below</p>
          </xsl:when>
          <xsl:otherwise>
            <p>
              <xsl:value-of select="*[local-name() = 'catStat']"/>
            </p>
          </xsl:otherwise>
        </xsl:choose>
      </td>
    </tr>
  </xsl:template>
  <xsl:template match="*[local-name() = 'catgry']" mode="group-list">
    <xsl:param name="catgryGrp-token"/>
    <xsl:choose>
      <xsl:when test="contains(concat($catgryGrp-token,' '),concat(@ID,' '))">
        <tr>
          <td>
            <p>
              <xsl:value-of select="*[local-name() = 'catValu']"/>
              .
            </p>
          </td>
          <td>
            <p>
              <xsl:value-of select="*[local-name() = 'labl']"/>
            </p>
          </td>
          <td>
            <xsl:choose>
              <xsl:when test="*[local-name() = 'catStat']/*[local-name() = 'table']">
                <p>see table below</p>
              </xsl:when>
              <xsl:otherwise>
                <p>
                  <xsl:value-of select="*[local-name() = 'catStat']"/>
                </p>
              </xsl:otherwise>
            </xsl:choose>
          </td>
        </tr>
      </xsl:when>
      <xsl:when test="contains($catgryGrp-token,@ID) and string-length(substring-after($catgryGrp-token,@ID))=0">
        <tr>
          <td>
            <p>
              <xsl:value-of select="normalize-space(*[local-name() = 'catValu'])"/>
              .
            </p>
          </td>
          <td>
            <p>
              <xsl:value-of select="*[local-name() = 'labl']"/>
            </p>
          </td>
          <td>
            <xsl:choose>
              <xsl:when test="*[local-name() = 'catStat']/*[local-name() = 'table']">
                <p>see table below</p>
              </xsl:when>
              <xsl:otherwise>
                <p>
                  <xsl:value-of select="*[local-name() = 'catStat']"/>
                </p>
              </xsl:otherwise>
            </xsl:choose>
          </td>
          <td>
            <p>
              <xsl:value-of select="*[local-name() = 'txt']"/>
            </p>
          </td>
        </tr>
      </xsl:when>
    </xsl:choose>
  </xsl:template>
  <xsl:template match="*[local-name() = 'location']">
    <xsl:if test="@ID">
      <a name="{@ID}"/>
    </xsl:if>
    <p class="small">
      <xsl:if test="@fileid">
        <xsl:value-of select="@fileid"/>
         
      </xsl:if>
      Location:
    </p>
    <p class="small">
      <xsl:if test="@StartPos">
        Start:
        <xsl:value-of select="@StartPos"/>
        <br/>
      </xsl:if>
      <xsl:if test="@EndPos">
        End:
        <xsl:value-of select="@EndPos"/>
        <br/>
      </xsl:if>
      <xsl:if test="@width">
        Width:
        <xsl:value-of select="@width"/>
        <br/>
      </xsl:if>
      <xsl:if test="@RecSegNo">
        Record Segment No.
        <xsl:value-of select="@RecSegNo"/>
        <br/>
      </xsl:if>
    </p>
  </xsl:template>
  <xsl:template match="*[local-name() = 'imputation']">
    <xsl:if test="@ID">
      <a name="{@ID}"/>
    </xsl:if>
    <p>Imputation:
      <xsl:apply-templates/>
    </p>
  </xsl:template>
  <xsl:template match="*[local-name() = 'security']">
    <xsl:if test="@ID">
      <a name="{@ID}"/>
    </xsl:if>
    <p>Security:
      <xsl:apply-templates/>
    </p>
  </xsl:template>
  <xsl:template match="*[local-name() = 'embargo']">
    <xsl:if test="@ID">
      <a name="{@ID}"/>
    </xsl:if>
    <p>Embargo:
      <xsl:apply-templates/>
    </p>
  </xsl:template>
  <xsl:template match="*[local-name() = 'respUnit']">
    <xsl:if test="@ID">
      <a name="{@ID}"/>
    </xsl:if>
    <p>Response Unit:
      <xsl:apply-templates/>
    </p>
  </xsl:template>
  <xsl:template match="*[local-name() = 'anlysUnit']">
    <xsl:if test="@ID">
      <a name="{@ID}"/>
    </xsl:if>
    <p>Analysis Unit:
      <xsl:apply-templates/>
    </p>
  </xsl:template>
  <xsl:template match="*[local-name() = 'qstn']">
    <xsl:if test="@ID">
      <a name="{@ID}"/>
    </xsl:if>
    <p>Question:
      <xsl:apply-templates/>
    </p>
  </xsl:template>
  <xsl:template match="*[local-name() = 'preQTxt']">
    <xsl:apply-templates/>
     
  </xsl:template>
  <xsl:template match="*[local-name() = 'qstnLit']">
    <xsl:apply-templates/>
     
  </xsl:template>
  <xsl:template match="*[local-name() = 'postQTxt']">
    <xsl:apply-templates/>
     
  </xsl:template>
  <xsl:template match="*[local-name() = 'forward']">
    <xsl:apply-templates/>
     
  </xsl:template>
  <xsl:template match="*[local-name() = 'backward']">
    <xsl:apply-templates/>
     
  </xsl:template>
  <xsl:template match="*[local-name() = 'ivuInstr']">
    <xsl:apply-templates/>
     
  </xsl:template>
  <xsl:template match="*[local-name() = 'valrng']">
    <xsl:if test="@ID">
      <a name="{@ID}"/>
    </xsl:if>
    <p>Range of Valid Data Values:
      <xsl:apply-templates select="*[local-name() = 'range']"/>
      <xsl:apply-templates select="*[local-name() = 'item']"/>
      <xsl:apply-templates select="*[local-name() = 'key']"/>
      <xsl:apply-templates mode="no-format" select="*[local-name() = 'notes']"/>
    </p>
  </xsl:template>
  <xsl:template match="*[local-name() = 'invalrng']">
    <xsl:if test="@ID">
      <a name="{@ID}"/>
    </xsl:if>
    <p>Range of Invalid Data Values:
      <xsl:apply-templates select="*[local-name() = 'range']"/>
      <xsl:apply-templates select="*[local-name() = 'item']"/>
      <xsl:apply-templates select="*[local-name() = 'key']"/>
      <xsl:apply-templates mode="no-format" select="*[local-name() = 'notes']"/>
    </p>
  </xsl:template>
  <xsl:template match="*[local-name() = 'range']">
    <xsl:value-of select="@min"/>
    -
    <xsl:value-of select="@max"/>
  </xsl:template>

  <xsl:template match="*[local-name() = 'key']">
    <xsl:apply-templates/>
  </xsl:template>

  <xsl:template match="*[local-name() = 'item']">
    <xsl:value-of select="@VALUE"/>
  </xsl:template>

  <xsl:template match="*[local-name() = 'undocCod']">
    <xsl:if test="@ID">
      <a name="{@ID}"/>
    </xsl:if>
    <p>List of Undocumented Codes:
      <xsl:apply-templates/>
    </p>
  </xsl:template>
  <xsl:template match="*[local-name() = 'universe']" mode="para">
    <xsl:if test="@ID">
      <a name="{@ID}"/>
    </xsl:if>
    <p>Universe:
      <xsl:apply-templates/>
    </p>
  </xsl:template>
  <xsl:template match="*[local-name() = 'TotlResp']">
    <xsl:if test="@ID">
      <a name="{@ID}"/>
    </xsl:if>
    <p>Total Responses:
      <xsl:apply-templates/>
    </p>
  </xsl:template>


  <xsl:template match="*[local-name() = 'sumStat']">
    <xsl:if test="@ID">
      <a name="{@ID}"/>
    </xsl:if>

    <xsl:choose>
      <xsl:when test="@type='vald'">Valid
        <xsl:apply-templates/>
        <xsl:if test="position()!=last()">;</xsl:if>
      </xsl:when>
      <xsl:when test="@type='min'">Min.
        <xsl:apply-templates/>
        <xsl:if test="position()!=last()">;</xsl:if>
      </xsl:when>
      <xsl:when test="@type='max'">Max.
        <xsl:apply-templates/>
        <xsl:if test="position()!=last()">;</xsl:if>
      </xsl:when>
      <xsl:when test="@type='mean'">Mean
        <xsl:apply-templates/>
        <xsl:if test="position()!=last()">;</xsl:if>
      </xsl:when>
      <xsl:when test="@type='stdev'">StDev
        <xsl:apply-templates/>
        <xsl:if test="position()!=last()">;</xsl:if>
      </xsl:when>
    </xsl:choose>

  </xsl:template>


  <xsl:template match="*[local-name() = 'txt']" mode="para">
    <xsl:if test="@ID">
      <a name="{@ID}"/>
    </xsl:if>
    <p>Variable Text:
      <xsl:apply-templates/>
    </p>
  </xsl:template>
  <xsl:template match="*[local-name() = 'stdCatgry']">
    <xsl:if test="@ID">
      <a name="{@ID}"/>
    </xsl:if>
    <p>Standard Categories:
      <xsl:apply-templates/>
    </p>
  </xsl:template>
  <xsl:template match="*[local-name() = 'codInstr']">
    <xsl:if test="@ID">
      <a name="{@ID}"/>
    </xsl:if>
    <p>Coder Instructions:
      <xsl:apply-templates/>
    </p>
  </xsl:template>

  <xsl:template match="*[local-name() = 'verStmt']" mode="list2">
    <ul>
      <xsl:apply-templates mode="list" select="*[local-name() = 'version']"/>
      <xsl:apply-templates mode="list" select="*[local-name() = 'verResp']"/>
      <xsl:apply-templates mode="list" select="*[local-name() = 'notes']"/>
    </ul>
  </xsl:template>

  <xsl:template match="*[local-name() = 'concept']">
    <xsl:if test="@ID">
      <a name="{@ID}"/>
    </xsl:if>
    <p>Concept:
      <xsl:apply-templates/>
    </p>
  </xsl:template>
  <xsl:template match="*[local-name() = 'derivation']">
    <xsl:if test="@ID">
      <a name="{@ID}"/>
    </xsl:if>
    <p>Derivation</p>
    <ul>
      <xsl:apply-templates select="*[local-name() = 'drvdesc']"/>
      <xsl:apply-templates select="*[local-name() = 'drvcmd']"/>
    </ul>
  </xsl:template>
  <xsl:template match="*[local-name() = 'drvdesc']">
    <li>
      <xsl:if test="@ID">
        <a name="{@ID}"/>
      </xsl:if>
      Description:
      <xsl:value-of select="(.)"/>
    </li>
  </xsl:template>
  <xsl:template match="*[local-name() = 'drvcmd']">
    <li>
      <xsl:if test="@ID">
        <a name="{@ID}"/>
      </xsl:if>
      Command:
      <xsl:value-of select="(.)"/>
    </li>
  </xsl:template>

  <xsl:template match="*[local-name() = 'geoMap']">
    <xsl:if test="@ID">
      <a name="{@ID}"/>
    </xsl:if>
    <p>Geographic Map:
      <xsl:value-of select="@URI"/>
    </p>
  </xsl:template>


  <xsl:template match="*[local-name() = 'varFormat']">
    <xsl:if test="@ID">
      <a name="{@ID}"/>
    </xsl:if>
    <p>Variable Format:
      <xsl:value-of select="@type"/>
    </p>
  </xsl:template>

  <!-- end dataDscr templates -->

  <!-- begin otherMat templates -->


  <xsl:template match="*[local-name() = 'otherMat']">
    <tr>
      <th align="left" colspan="2">
        <p>
          <xsl:if test="@ID">
            <a name="{@ID}"/>
          </xsl:if>
          <a name="5.0">Other Study-Related Materials</a>
        </p>
      </th>
    </tr>
    <xsl:apply-templates mode="row" select="*[local-name() = 'labl']"/>
    <xsl:apply-templates mode="para2" select="*[local-name() = 'txt']"/>
    <xsl:apply-templates mode="row" select="*[local-name() = 'notes']"/>
    <xsl:apply-templates select="*[local-name() = 'table']"/>
    <xsl:apply-templates select="*[local-name() = 'citation']"/>
    <xsl:apply-templates select="*[local-name() = 'otherMat']"/>
  </xsl:template>
  <xsl:template match="*[local-name() = 'labl']" mode="row">
    <tr>
      <td align="right" valign="top">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Label:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>
  <xsl:template match="*[local-name() = 'txt']" mode="para2">
    <tr>
      <td align="right" valign="top">
        <xsl:if test="@ID">
          <a name="{@ID}"/>
        </xsl:if>
        <p>Text:</p>
      </td>
      <td>
        <p>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>
  <xsl:template match="*[local-name() = 'table']">
    <xsl:if test="@ID">
      <a name="{@ID}"/>
    </xsl:if>
    <table border="1" cellpadding="5" cellspacing="0" width="90%">
      <xsl:if test="*[local-name() = 'titl']">
        <caption>
          <xsl:value-of select="*[local-name() = 'titl']"/>
        </caption>
      </xsl:if>
      <xsl:apply-templates select="*[local-name() = 'tgroup']"/>
    </table>
  </xsl:template>
  <xsl:template match="*[local-name() = 'tgroup']">
    <xsl:apply-templates select="*[local-name() = 'thead']"/>
    <xsl:apply-templates select="*[local-name() = 'tbody']"/>
  </xsl:template>
  <xsl:template match="*[local-name() = 'thead']">
    <xsl:apply-templates mode="thead" select="*[local-name() = 'row']"/>
  </xsl:template>
  <xsl:template match="*[local-name() = 'row']" mode="thead">
    <tr>
      <xsl:apply-templates mode="thead" select="*[local-name() = 'entry']"/>
    </tr>
  </xsl:template>
  <xsl:template match="*[local-name() = 'entry']" mode="thead">
    <th>
      <p>
        <xsl:apply-templates/>
      </p>
    </th>
  </xsl:template>
  <xsl:template match="*[local-name() = 'tbody']">
    <xsl:apply-templates mode="tbody" select="*[local-name() = 'row']"/>
  </xsl:template>
  <xsl:template match="*[local-name() = 'row']" mode="tbody">
    <tr>
      <xsl:apply-templates mode="tbody" select="*[local-name() = 'entry']"/>
    </tr>
  </xsl:template>
  <xsl:template match="*[local-name() = 'entry']" mode="tbody">
    <td>
      <p>
        <xsl:apply-templates/>
      </p>
    </td>
  </xsl:template>

  <!-- end otherMat templates -->

  <xsl:template match="*[local-name() = 'notes']" mode="row">
    <tr>
      <td class="h3">
        <xsl:if test="position()=1">
          <p>Notes:</p>
        </xsl:if>
      </td>
      <td>
        <p>
          <xsl:if test="@ID">
            <a name="{@ID}"/>
          </xsl:if>
          <xsl:apply-templates/>
        </p>
      </td>
    </tr>
  </xsl:template>

  <xsl:template match="*[local-name() = 'notes']" mode="list">
    <li>
      <xsl:if test="@ID">
        <a name="{@ID}"/>
      </xsl:if>
      Notes:
      <xsl:apply-templates/>
    </li>
  </xsl:template>

  <xsl:template match="*[local-name() = 'notes']" mode="para">
    <p>
      <xsl:if test="@ID">
        <a name="{@ID}"/>
      </xsl:if>
      Notes:
      <xsl:apply-templates/>
    </p>
  </xsl:template>

  <xsl:template match="*[local-name() = 'notes']" mode="no-format">
    <xsl:if test="@ID">
      <a name="{@ID}"/>
    </xsl:if>
    <xsl:apply-templates/>
  </xsl:template>

  <xsl:template match="*[local-name() = 'Link']">

    &#160;(
    <a href="#{@refs}">link</a>
    )

  </xsl:template>

  <xsl:template match="*[local-name() = 'ExtLink']">

    (
    <a href="{@URI}">external link</a>
    )

  </xsl:template>

  <xsl:template match="*[local-name() = 'p']">
    <p>
      <xsl:apply-templates/>
    </p>
  </xsl:template>

  <xsl:template match="*[local-name() = 'emph']">
    <em>
      <xsl:apply-templates/>
    </em>
  </xsl:template>


  <xsl:template name="substitute">
    <xsl:param name="string"/>
    <xsl:param name="from" select="'&#xA;'"/>
    <xsl:param name="to">
      <br/>
    </xsl:param>
    <xsl:choose>
      <xsl:when test="contains($string, $from)">
        <xsl:value-of select="substring-before($string, $from)"/>
        <xsl:copy-of select="$to"/>
        <xsl:call-template name="substitute">
          <xsl:with-param name="string"
                          select="substring-after($string, $from)"/>
          <xsl:with-param name="from" select="$from"/>
          <xsl:with-param name="to" select="$to"/>
        </xsl:call-template>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$string"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>


  <!-- template that actually does the conversion -->
  <xsl:template name="lf2br">
    <!-- import $StringToTransform -->
    <xsl:param name="StringToTransform"/>
    <xsl:choose>
      <!-- string contains linefeed -->
      <xsl:when test="contains($StringToTransform,'&#xA;')">
        <!-- output substring that comes before the first linefeed -->
        <!-- note: use of substring-before() function means        -->
        <!-- $StringToTransform will be treated as a string,       -->
        <!-- even if it is a node-set or result tree fragment.     -->
        <!-- So hopefully $StringToTransform is really a string!   -->
        <xsl:value-of select="substring-before($StringToTransform,'&#xA;')"/>
        <!-- by putting a 'br' element in the result tree instead  -->
        <!-- of the linefeed character, a <br> will be output at   -->
        <!-- that point in the HTML                                -->
        <br/>
        <!-- repeat for the remainder of the original string -->
        <xsl:call-template name="lf2br">
          <xsl:with-param name="StringToTransform">
            <xsl:value-of select="substring-after($StringToTransform,'&#xA;')"/>
          </xsl:with-param>
        </xsl:call-template>
      </xsl:when>
      <!-- string does not contain newline, so just output it -->
      <xsl:otherwise>
        <xsl:value-of select="$StringToTransform"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!-- ADD: div head hi item list -->

</xsl:stylesheet>