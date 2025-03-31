$(document).ready(function () {
  let path = window.location.pathname;
  path = path.replace(/\/$/, "");
  path = decodeURIComponent(path).replace(".html", "");

  $("header nav a").each(function () {
    let match = $(this).attr("data-match");
    if (path.endsWith(match)) {
      $(this).addClass("active");
    }
  });
});

$(".card-row").on("wheel", (e) => {
  const $target = $(e.target).closest(".card-row");
  // check that x scroll component is not greater than y scroll component
  if (Math.abs(e.originalEvent.deltaX) <= Math.abs(e.originalEvent.deltaY)) {
    e.preventDefault();
    $target.scrollLeft($target.scrollLeft() + e.originalEvent.deltaY);
  }
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

import { Toast } from "./util/util.js";
// Handle weather if needed by page (page will have loaded needed css)
// Inspired by a workshop I taught:
// Code:   https://mvhacks-code.svonk.me
// Slides: https://mvhacks-slides.svonk.me
// Demo:   https://mvhacks-demo.svonk.me
// Uses toasts from adapted https://npmjs.com/@svonk/util (local in static/js/util)
import { getWeatherHTML } from "./weather.js";
const $weather = $("#weather");
if ($weather.length > 0) {
  getWeatherHTML().then((html) => {
    $weather.html(html);
  });
}

function mailSignup() {
  const html = `
    <div class="lightbox_inner mail_form">
        <h2>Sign up for our mailing list</h2>
        <form class="mail_form">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required minlength="2" maxlength="50">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
            <label for="sms">Receive SMS:</label>
            <input type="checkbox" id="sms" name="sms">
            <label for="phone">Phone:</label>
            <input type="tel" id="phone" name="phone" pattern="[0-9]{10}">
            <label for="zip">Zip Code:</label>
            <input type="text" id="zip" name="zip" pattern="[0-9]{5}">
            <button type="submit">Submit</button>
        </form>
    </div>`;
  let $html = $(html);
  $html.find("form").submit((e) => {
    e.preventDefault();
    new Toast("Thank you for signing up!", "default", 3000, "./static/js/util/assets/success-icon.png");
    $(".lightbox").remove();
  });
  makeLightbox($html);
}

function contactForm() {
  const html = `
        <div class="lightbox_inner mail_form">
            <h2>Contact Us</h2>
            <form class="mail_form">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required minlength="2" maxlength="50">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>
                <label for="message">Message:</label>
                <textarea id="message" name="message" required minlength="2" maxlength="500"></textarea>
                <br/>
                <button type="submit">Submit</button>
            </form>
        </div>`;
  let $html = $(html);
  $html.find("form").submit((e) => {
    e.preventDefault();
    new Toast("Thank you for contacting us, we'll reach out shortly!", "default", 3000);
    $(".lightbox").remove();
  });
  makeLightbox($html);
}
// force export from module to page
window.contactForm = contactForm;
window.mailSignup = mailSignup;
window.openLightbox = openLightbox;
