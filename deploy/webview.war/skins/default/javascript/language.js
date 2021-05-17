/**
 * Show the language submenu.
 */
function showLanguageMenu() {
   var menu = document.getElementById('languagemenu');
   if (typeof menu != 'undefined') {
      menu.style.display = 'block';
      placeMenu(menu, 'imagelanguage');
   } else {
      alert("Undefined menu element: " + menu);
   }
   return false;
}

function loginScreenLanguageSwitcher(lang) {
   var form = document.getElementsByName("login")[0];
   if (typeof form != 'undefined') {
      var url = form.action;
      url += "&amp;language=" + lang;
      form.action = url;
      form.submit();
   } else { }
   return false;
}
