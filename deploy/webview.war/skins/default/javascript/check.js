var agt = navigator.userAgent.toLowerCase();
function getBrowser()
{
  var v_maj = parseInt(navigator.appVersion);
  var v_min = parseFloat(navigator.appVersion);
  is_nav = ((agt.indexOf('mozilla') != -1) && (agt.indexOf('spoofer') == -1) &&
            (agt.indexOf('compatible') == -1) && (agt.indexOf('opera') == -1) &&
            (agt.indexOf('webtv') == -1));
  is_nav3 = (is_nav && (v_maj == 3));
  is_nav4up = (is_nav && (v_maj >= 4));
  is_nav407up = (is_nav && (v_min >= 4.07));
  is_nav408up = (is_nav && (v_min >= 4.08));
  is_ie = (agt.indexOf("msie") != -1);
  is_ie3 = (is_ie && (v_maj < 4));
  is_ie4 = (is_ie && (v_maj == 4) && (agt.indexOf("msie 5.0") == -1));
  is_ie4up = (is_ie && (v_maj >= 4));
  is_ie5 = (is_ie && (v_maj == 4) && (agt.indexOf("msie 5.0") != -1));
  is_ie5up = (is_ie && !is_ie3 && !is_ie4);
  is_win = ((agt.indexOf("win") != -1) || (agt.indexOf("16bit") != -1));
  is_win95 = ((agt.indexOf("win95") != -1) || (agt.indexOf("windows 95") != -1));
  is_win98 = ((agt.indexOf("win98") != -1) || (agt.indexOf("windows 98") != -1));
  is_winnt = ((agt.indexOf("winnt") != -1) || (agt.indexOf("windows nt") != -1));
  is_win32 = (is_win95 || is_winnt || is_win98 ||
              ((v_maj >= 4) && (navigator.platform == "Win32")) ||
              (agt.indexOf("win32") != -1) || (agt.indexOf("32bit") != -1));
  is_mac = (agt.indexOf("mac") != -1);
  is_macPPC = (is_mac && ((agt.indexOf("ppc") != -1) || (agt.indexOf("powerpc") != -1)));
}
function isSVGPluginInstalled()
{
  return (navigator.mimeTypes["image/svg"] && navigator.mimeTypes["image/svg"].enabledPlugin != null) ||
         (navigator.mimeTypes["image/svg-xml"] && navigator.mimeTypes["image/svg-xml"].enabledPlugin != null);
}
function checkSVGViewer()
{
  window.askForSVGViewer = false;
  if (window.svgInstalled) return;
  getBrowser();
  if (is_win32 && is_ie4up) {
    window.svgViewerAvailable = true;
    window.svgInstalled = isSVGControlInstalled();
    if (!window.svgInstalled) {
      window.askForSVGViewer = true;
    }
  }
  else if ((is_win32 && is_nav4up) || (is_macPPC && is_nav407up)) {
    window.svgViewerAvailable = true;
    window.svgInstalled = isSVGPluginInstalled();
    if (!window.svgInstalled && is_nav408up && navigator.javaEnabled()) window.askForSVGViewer = true;
  }
  else if (is_macPPC && is_ie5up) window.svgViewerAvailable = true;
}
function checkAndGetSVGViewer()
{
  if ((navigator.appName.toLowerCase().indexOf('opera') != -1) || (navigator.userAgent.toLowerCase().indexOf('opera') != -1))
  {
    viewerInstall = "yes";
  }
  else
  {
    if (agt.indexOf('mozilla') != -1)
    {
      var RevNr = parseFloat(agt.substr(agt.indexOf('rv:') + 3, 3));
      if (RevNr > 1.7) {
        viewerInstall = "mozSVG";
      }
      else {
        checkSVGViewer();
        finalCheck();
      }
    }
    else {
      checkSVGViewer();
      finalCheck();
    }
  }
}
function finalCheck()
{
  if (window.svgInstalled)
  {
    viewerInstall = "yes";
  }
  else {
    if (window.askForSVGViewer || window.svgViewerAvailable) {
      viewerInstall = "no"
    }
    else {
      viewerInstall = "unavailable"
    }
  }
}
function svgOutput(svgFile, svgHeight, svgSearch)
{
  document.write('<p><embed src="' + svgFile + '" name="SVGimage" height=' + svgHeight + ' width=516' +
                 ' type="image/svg-xml" pluginspace="http://www.adobe.com/svg/viewer/install/"></p> ' +
                 '<p class="mag"><b>Navigation</b></p> ' +
                 '<ol> ' +
                 '<li class="mag"><span class="nrm">Press the Alt key and hold it down.</span></li> ' +
                 '<li class="mag"><span class="nrm">Left-click on the image and hold the left mouse button ' +
                 'down. The image will follow the mouse movements until the ' +
                 'left mouse button is released.</span></li> ' +
                 '</ol> ' +
                 '<p class="mag"><b>Zooming</b></p> ' +
                 '<ol> ' +
                 '<li class="mag"><span class="nrm">Press the Ctrl key and hold it down. ' +
                 'The mouse pointer turns into a magnifying glass.</span></li> ' +
                 '<li class="mag"><span class="nrm">Now, either left-click on the image to zoom in, or hold ' +
                 'the left mouse button down and drag over the graph window. ' +
                 'A rubber band appears. This causes a zoom factor to be ' +
                 'calculated so that just the area inside the rubber band ' +
                 'is magnified to fit in the graph window after the left ' +
                 'mouse button is released.</span></li> ' +
                 '<li class="mag"><span class="nrm">To zoom out, hold the two keys Ctrl and Shift down, ' +
                 'followed by left-clicking on the image.</span></li> ' +
                 '</ol>');
  if (svgSearch > 0)
  {
    document.write('<p class="mag"><b>Image search</b></p> ' +
                   '<p align=justify>If you are using the Adobe SVG Viewer, right-click on the image and select "Find..." ' +
                   'from the context menu. Use the Find dialog box to search the image for node ' +
                   'labels.</p>');
  }
}
function htmlOutput(bgHeight, bgURL, altURL)
{
  document.write('<table cellpadding=0 cellspacing=0 border=0 width=516>' +
                 '<tr><td width=516 height=' + bgHeight + ' background="' + bgURL + '" valign=middle>' +
                 '<p class="mag"><b>SVG Viewer required</b></p> ' +
                 '<p align=justify>In order to view SVG you must first download and install the free ' +
                 '<a href="http://www.adobe.com/svg/viewer/install/main.html">Adobe SVG Viewer</a>. ' +
                 'For a non-SVG version of this page, see ' + altURL + '.</p>' +
                 '</td></tr></table>');
}
function mozOutput(bgHeight, bgURL, altURL)
{
  document.write('<table cellpadding=0 cellspacing=0 border=0 width=516>' +
                 '<tr><td width=516 height=' + bgHeight + ' background="' + bgURL + '" valign=middle>' +
                 '<p class="mag"><b>Dear Mozilla 5.x User,</b></p> ' +
                 '<p align=justify>normally, we ask our SVG gallery visitors to download and install a free ' +
                 'SVG Viewer plug-in from <a href="http://www.adobe.com/svg/viewer/install/main.html">Adobe</a> or ' +
                 '<a href="http://www.corel.com/servlet/Satellite?pagename=Corel2/Downloads/Home">Corel</a> in order to view this page. ' +
                 'However, since the browser you are using implements native SVG support, you can ' +
                 'view this SVG example right away by clicking <a href="' + altURL + '">here</a>.</p>' +
                 '</td></tr></table>');
}
