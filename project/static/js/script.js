$(document).ready(function () {
  let path = window.location.pathname;
  path = path.replace(/\/$/, "");
  path = decodeURIComponent(path).replace(".html", "");

  $("header nav a").each(function () {
    let match = $(this).attr("match");
    if (path.endsWith(match)) {
      $(this).addClass("active");
    }
  });
});

function makeLightbox(html) {
  const lightbox = $(`
    <div class="lightbox">
      <div class="lightbox_content">
        <button class="lightbox__close">x</button>
      </div>
    </div>
  `);
  // append jquery object to lightbox
  lightbox.find(".lightbox_content").append(html);
  // listen for background click to close
  lightbox.click((e) => {
    if (e.target === lightbox[0]) {
      lightbox.remove();
    }
  });
  // listen for close button click to close
  lightbox.find(".lightbox__close").click(() => {
    lightbox.remove();
  });
  $("body").append(lightbox);
}
// make contents with left right arrows and listeners for lightbox
function openLightbox(srcArray) {
  let html = `
    <div class="lightbox_inner">
        <button class="lightbox__left">Prev</button>
        <div class="lightbox__image">
            <img src="${srcArray[0][0]}" alt="Lightbox Image" />
            <p class="progress">1 of ${srcArray.length}: ${srcArray[0][1]}</p>
        </div>
        <button class="lightbox__right">Next</button>
    </div>`;
  // add click listeners to left and right
  let index = 0;
  html = $(html);
  html.find(".lightbox__left").click(() => {
    index = (index - 1 + srcArray.length) % srcArray.length;
    html.find("img").attr("src", srcArray[index][0]);
    html.find(".progress").text(`${index + 1} of ${srcArray.length}: ${srcArray[index][1]}`);
  });
  html.find(".lightbox__right").click(() => {
    index = (index + 1) % srcArray.length;
    html.find("img").attr("src", srcArray[index][0]);
    html.find(".progress").text(`${index + 1} of ${srcArray.length}: ${srcArray[index][1]}`);
  });

  makeLightbox(html);
}

// Handle weather if needed by page (page will have loaded needed css)
// Inspired by a workshop I taught:
// Code:   https://mvhacks-code.svonk.me
// Slides: https://mvhacks-slides.svonk.me
// Demo:   https://mvhacks-demo.svonk.me
// Uses toasts from adapted https://npmjs.com/@svonk/util (local in static/js/util)
import { getWeatherHTML } from "./weather.js";
const $weather = $("#weather");
if ($weather.length > 0)
  getWeatherHTML().then((html) => {
    $weather.html(html);
  });
function mailSignup() {}
function contactForm() {}
// force export from module to page
window.contactForm = contactForm;
window.mailSignup = mailSignup;
window.openLightbox = openLightbox;
