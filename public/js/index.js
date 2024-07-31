const menu = $("#menu");
const video = $("#video");
const logo = $("#logo");
const heroIntroList = $("#hero-intro-list");

const menuToggleBtn = $(".menu-toggle-btn");

let heroIntroImgList = [];

const getHeroIntroImgList =  async () => {
  await $.ajax({
    url: "/heroes-intro",
    method: "GET",
    success: res => {
      heroIntroImgList = res;
      console.log(res);
    },
    error: xhr => {
      console.log(xhr);
      alert("Internal error");
    }
  });
}

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
  const heroIntroBackground = $(".hero-intro-bg");
  const imgUrl = heroIntroImgList[heroType];
  heroIntroBackground.css("background-image", `url(${imgUrl})`);
}

$(document).ready(async () => {
  menuToggleBtn.on("click", menuToggleHandler);
  heroIntroList.on("click", ".hero-type-btn", heroIntroListHandler);
  await getHeroIntroImgList();
  $(window).on("resize", defaultMenu);
  $(window).on("resize", videoResize);
  videoResize();
});