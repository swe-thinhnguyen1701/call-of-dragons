const menu = $("#menu");
const video = $("#video");
const logoFrame = $(".logo-frame");

const heroIntroList = $("#hero-intro-list");
const talentList = $("#talent-list");

const menuToggleBtn = $(".menu-toggle-btn");

// let heroIntroImgList = [];

// const getHeroIntroImgList =  async () => {
//   await $.ajax({
//     url: "/heroes-intro",
//     method: "GET",
//     success: res => {
//       heroIntroImgList = res;
//       console.log(res);
//     },
//     error: xhr => {
//       console.log(xhr);
//       alert("Internal error");
//     }
//   });
// }

const menuToggleHandler = () => {
  menu.toggle("blind", {}, 500);
}

const defaultMenu = () => {
  if ($(window).width() >= 768)
    menu.removeAttr("style");
}

const videoResize = () => {
  let width = $(window).width();
  video.attr("width", width);
  video.attr("height", width / 1.775);
  logoFrame.height(width / 1.775);
}

const heroIntroListHandler = (event) => {
  const heroType = $(event.target).closest("li").data("heroType");
  const heroIntroBackground = $(".hero-intro-bg");
  // const imgUrl = heroIntroImgList[heroType];
  heroIntroBackground.css("background-image", `url(images/${heroType}-intro.webp)`);
}

/**
 * 
 * idx = row - 1;
 * @param {*} event 
 */
const talentListHandler = (event) => {
  const arr = new Array(12).fill(false);
  event.preventDefault();
  const talent = $(event.target).closest("li").attr("id");
  console.log(getTalentId(talent));
  
  const isAltPressed = event.altKey;
  let counter = 0;
  if (isAltPressed) {
    if (event.which === 3)
      counter--;
    else if (event.which === 1)
      counter++;
    console.log(counter);
  }


}

const getTalentId = (talent) => {
  const talentList = [
    ["talent-1"],
    ["talent-2-a", "talent-2-b"],
    ["talent-3-a", "talent-3-b", "talent-3-c"],
    ["talent-4"],
    ["talent-5"],
    ["talent-6-a", "talent-6-b", "talent-6-c"],
    ["talent-7-a", "talent-7-b", "talent-7-c"],
    ["talent-8-a", "talent-8-b"],
    ["talent-9-a", "talent-9-b", "talent-9-c"],
    ["talent-10-a", "talent-10-b", "talent-10-c"],
    ["talent-11-a", "talent-11-b", "talent-11-c"],
    ["talent-12-a", "talent-12-b"]];

  for (let i = 0; i < talentList.length; i++) {
    if (talentList[i].includes(talent))
      return i;
  }

  return -1;
}

$(document).ready(async () => {
  menuToggleBtn.on("click", menuToggleHandler);
  heroIntroList.on("click", ".hero-type-btn", heroIntroListHandler);
  talentList.on("mousedown", ".talent-btn", talentListHandler);
  // await getHeroIntroImgList();
  $(window).on("resize", defaultMenu);
  $(window).on("resize", videoResize);
  videoResize();
});