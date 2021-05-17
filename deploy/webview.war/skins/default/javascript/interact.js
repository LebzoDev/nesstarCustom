function svgInteractive(fileBase,fileType,svgHeight,outForm,outLinks,outIcons)
{
if(agt.indexOf("opera")!=-1){fileBase+="_opera";}
document.write('<p><embed src="'+fileBase+'.'+fileType+'" name="SVGimage" height='+svgHeight+' width=516\n'+
'type="image/svg-xml" pluginspace="http://www.adobe.com/svg/viewer/install/"></p>\n');
if(agt.indexOf("msie")!=-1 && agt.indexOf("opera")==-1)
{
if(outForm!=''){document.write(outForm);}
else
{
document.write('<table cellspacing=0 cellpadding=0 border=0 bgcolor="#6699cc" width=516>\n'+
'<tr><td><table width="100%" border=0 cellspacing=1 cellpadding=2>\n'+
'<tr><td bgcolor="#ffffff" align=center><p id="addlInfo" align=center>Move the mouse pointer over the image for additional information.</p></td></tr>\n'+
'</table></td></tr></table>');
}
}
document.write('<p class="mag"><b>Navigation</b></p><ol>'+
'<li class="mag"><span class="nrm">Press the Alt key and hold it down.</span></li>'+
'<li class="mag"><span class="nrm">Left-click on the image and hold the left mouse button'+
'down. The image will follow the mouse movements until the left mouse button is released.</span></li></ol>\n'+
'<p class="mag"><b>Zooming</b></p><ol>'+
'<li class="mag"><span class="nrm">Press the Ctrl key and hold it down. The mouse pointer turns into a magnifying glass.</span></li>\n'+
'<li class="mag"><span class="nrm">Now, either left-click on the image to zoom in, or hold\n'+
'the left mouse button down and drag over the graph window. A rubber band appears. This causes a zoom factor to be\n'+
'calculated so that just the area inside the rubber band is magnified to fit in the graph window after the left\n'+
'mouse button is released.</span></li>'+
'<li class="mag"><span class="nrm">To zoom out, hold the two keys Ctrl and Shift down, followed by left-clicking on the image.</span></li>'+
'</ol>\n'+
'<p class="mag"><b>Image search</b></p>'+
'<p align=justify>If you are using the Adobe SVG Viewer, right-click on the image and select "Find..."\n'+
'from the context menu. Use the Find dialog box to search the image for node\n'+
'labels.</p>\n');
document.write(outLinks);
if(agt.indexOf("msie")!=-1 && agt.indexOf("opera")==-1)
{
document.write('<p class="mag"><b>JavaScript functionality</b></p>'+
'<p align=justify><b>aiSee</b>-generated SVG images can dynamically change on user action\n'+
'and easily interact with the HTML document they are embedded in. To see this,\n'+
'move the mouse pointer over the image.</p>');
}
document.write('<p><a href="#top"><img src="up.gif" width=516 height=5 border=0 alt="top"></a></p><p class="mag"><b>For developers</b></p>\n');
if(agt.indexOf("msie")!=-1 && agt.indexOf("opera")==-1)
{
document.write('<p align=justify>The above SVG image was produced directly from the '+
'command line as follows:</p>\n<p><code>&gt; aisee <a href="../options/1.htm">-color</a>\n'+
'<a href="../options/6.htm#s">-svgoutput '+fileBase+'.svg</a>\n'+
'<a href="../gdl/'+fileBase+'.htm">'+fileBase+'.gdl</a></code></p>\n'+
'<p align=justify>If <b>aiSee</b> spots a JavaScript event handler specification in the GDL source of a graph,\n'+
'it automatically includes a reference to an external JavaScript file when exporting the graph to SVG:</p>\n'+
'<pre>&lt;svg:script xlink:href=&quot;<a href="../js/'+fileBase+'.htm">'+fileBase+'.js</a>&quot; language=&quot;JavaScript&quot;&gt;\n'+
'&lt;/svg:script&gt;</pre>\n'+
'<p align=justify>This allows JavaScript functions and global variables to be\n'+
'conveniently specified in the external JS file rather than in the SVG file itself.\n'+
'Thanks to this approach, you can easily make changes to your graphs\n'+
'and re-export them to SVG without having to copy &amp; paste JavaScript code\n'+
'from old SVG files into new ones each time.</p>');
}
document.write('<p align=justify>We highly recommend using <b>aiSee</b>\'s\n'+
'<a href="../manual/unix/48.htm#2">bitmap fonts</a> when exporting graphs to SVG.\n'+
'<b>aiSee</b>\'s standard vector font is translated into <code>&lt;line&gt;</code>\n'+
'elements, whereas the bitmap fonts are translated into <code>&lt;text&gt;</code>.\n'+
'SVG treats <code>&lt;text&gt;</code> as text rather than outlines, enabling the\n'+
'user to search SVG images for node labels by using the Find dialog in the SVG\n'+
'viewer. Also, because each <code>&lt;text&gt;</code> element usually replaces dozens\n'+
'of <code>&lt;line&gt;</code> elements, the SVG file is much smaller and loads faster.\n');
if(outIcons>0)
{
document.write('<p align=justify>A GDL <a href="../manual/unix/45list.htm#iconfile"><code>iconfile</code></a> specification '+
'is automatically translated into an SVG <code>&lt;image&gt;</code> element. The\n'+
'<code>&lt;image&gt;</code> element indicates to the SVG viewer used that the '+
'contents of the icon file specified are to be rendered into a given rectangle\n'+
'within the current user coordinate system. SVG viewers usually support at least PNG, JPEG and SVG format icon files.</p>');
document.write('<p align=justify>From <a href="../changelog/">version 2.2.04</a> on, ' +
'<b>aiSee</b> also offers the option of embedding the icons in the output SVG file ' +
'rather that just referencing them by their paths');
if(outIcons==2)
{
document.write(' (see <a href="../changelog/044_new.svg">example</a>)');
}
document.write('.</p>');
}
}
