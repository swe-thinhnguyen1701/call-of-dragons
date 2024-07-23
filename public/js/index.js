const menu = $("#menu");

const menuToggleBtn = $(".menu-toggle-btn");

const menuToggleHandler = () => {
  menu.toggle("blind", {}, 500);
}

const defaultMenu = () => {
  if($(window).width() >= 768)
    menu.removeAttr("style");
}

$(document).ready(() => {
  menuToggleBtn.on("click", menuToggleHandler);
  $(window).on("resize", defaultMenu);
});