

function hideMetaData() {
  buffer=xGetElementById("metaBuffer");
  metadata=xGetElementById("metacontent");
  metadatamenuelem=xGetElementById("metadatamenu");
  imageelem=xGetElementById("hidemetadataimg");
  linkelem=xGetElementById("hidemetadatalink");
  metalabel = xGetElementById("metatogglelabel");
  controlelem=xGetElementById("metadatacontrol");

  xHeight(buffer,30);
  controlelem.className="showmetadata";
  metadata.style.display="none";
  metadatamenuelem.style.display="none";
  imageelem.src="skins/default/images/up.gif";
  //linkelem.title="$!i18n.get('showDoc')";
  metalabel.innerHTML = translation.showDoc;
  linkelem.blur();
  createCookie("metadatavisible","no");
}

function showMetaData() {
  buffer = xGetElementById("metaBuffer");
  metadata = xGetElementById("metacontent");
  imageelem = xGetElementById("hidemetadataimg");
  linkelem = xGetElementById("hidemetadatalink");
  metalabel = xGetElementById("metatogglelabel");
  metadatamenuelem = xGetElementById("metadatamenu");
  controlelem = xGetElementById("metadatacontrol");

  xHeight(buffer,180);
  controlelem.className="hidemetadata";
  metadata.style.display="block";
  metadatamenuelem.style.display="block";
  imageelem.src="skins/default/images/down.gif";
  //linkelem.title="$!i18n.get('hideDoc')";
  metalabel.innerHTML = translation.hideDoc;
  linkelem.blur();
  createCookie("metadatavisible","yes");
}

function toggleMetaData() {
  metadata=xGetElementById("metacontent");
  if (metadata.style.display != "none") {
    hideMetaData();
  } else {
    showMetaData();
  }
  setScrollableSize();
  return false;
}

function handleInlineMetadata() {
   var hideshow = xGetElementById("metadatacontrol");
   hideshow.style.display = "block";
   var metadataVisible = readCookie("metadatavisible");
   if (!metadataVisible) {
      //Check default setting
      if (propMetadataVisible == "true") {
         showMetadata();
      } else {
         hideMetaData();
      }
   } else if (metadataVisible == "no") {
      hideMetaData();
   } else {
      showMetaData();
   }
}
