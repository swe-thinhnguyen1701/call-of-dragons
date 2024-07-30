const menu = $("#menu");
const video = $("#video");
const logo = $("#logo");
const heroIntroList = $("#hero-intro-list");

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

const heroIntroListHandler = (event) => {
  const heroType = $(event.target).closest("li").data("heroType");
  console.log(heroType);
  const heroIntroBackground = $(".hero-intro-bg");
  heroIntroBackground.css("background-image", `url(/images/${heroType}-intro.webp)`)
}

$(document).ready(() => {
  menuToggleBtn.on("click", menuToggleHandler);
  heroIntroList.on("click", ".hero-type-btn", heroIntroListHandler);
  $(window).on("resize", defaultMenu);
  $(window).on("resize", videoResize);
  videoResize();
});