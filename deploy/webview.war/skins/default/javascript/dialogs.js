/**
 * This initializes a YUI SimpleDialog to ask the user if he/she really wants to delete some element.
 */
var warningDialog = new YAHOO.widget.SimpleDialog("nesstar_simpledialog", {
	width: "20em",
	fixedcenter:true,
	modal:true,
   visible:false,
	draggable:false,
	preventcontextoverlap:true,
	zIndex:9999 });

warningDialog.setBody("Are you sure?");
warningDialog.cfg.setProperty("icon",YAHOO.widget.SimpleDialog.ICON_WARN);

/**
 * A generic function for adding buttons and (more importantly) their callbacks to the dialog box.
 * @param handleYes Callback for the yes button.
 * @param handleNo Callback for the no button. Defaults to hiding if null.
 * @param question Optional question text to add to the dialog. Default text is used if null.
 */
function setDialogButtons(handleYes, handleNo, question) {
   warningDialog.setHeader(translation.warning_dialog_header);	
   //Set the dialog body to the question given if any.
   if (question != null) {
      warningDialog.setBody(question);
      warningDialog.cfg.setProperty("icon",YAHOO.widget.SimpleDialog.ICON_WARN);      
   }

   //If no callback for the no button was given, default to hiding it.
   if (handleNo == null) {
      handleNo = function() {
         this.hide();
      }
   }
   
   //Build the buttons.
   var buttons = [
      { text: translation.yes_btn_text, handler: handleYes },
      { text: translation.no_btn_text, handler: handleNo }
   ];
   
   warningDialog.cfg.queueProperty("buttons", buttons);
   warningDialog.render(document.body);
   warningDialog.show();
}

/**
 * Many usages of the dialog just need to load a given URL. This method simplifies this setting the yes button
 * callback to load that URL.
 * @param url The URL to load.
 */
function setUrlDialog(url, question) {
   var handleYes = function() {
      hideTheViewArea();
      document.location.href = url;
   }
   setDialogButtons(handleYes, null, question);
   return false;
}
