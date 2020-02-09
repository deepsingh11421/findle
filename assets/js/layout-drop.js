//Scripting for dropdown
function show(){
    document.getElementById('user-drop').classList.toggle('show');
}
window.onclick = function(event) {
    if (!event.target.matches('.layout-header-user-img')) {
      var dropdowns = document.getElementsByClassName("layout-header-user-drop");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
}