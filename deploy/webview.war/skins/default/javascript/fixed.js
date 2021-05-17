function obFocuscate()
  {
  wrap = document.getElementById('exploder');
  link = wrap.getElementsByTagName('a');
  link[0].focus();
  }
onload = obFocuscate;
