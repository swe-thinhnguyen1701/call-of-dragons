const menu = $("#menu");
const video = $("#video");
const logo = $("#logo");

const menuToggleBtn = $(".menu-toggle-btn");

const menuToggleHandler = () => {
  menu.toggle("blind", {}, 500);
}

const defaultMenu = () => {
  if($(window).width() >= 768)
    menu.removeAttr("style");
}

const videoResize = () => {
  let width = $(window).width();
  video.attr("width", width);
  video.attr("height", width / 1.775);
  logo.height(width / 1.775);
}

$(document).ready(() => {
  menuToggleBtn.on("click", menuToggleHandler);
  $(window).on("resize", defaultMenu);
  $(window).on("resize", videoResize);
  videoResize();
});