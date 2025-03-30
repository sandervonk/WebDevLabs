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

// Handle weather if needed by page (page will have loaded needed css)
// Inspired by a workshop I taught:
// Code:   https://mvhacks-code.svonk.me
// Slides: https://mvhacks-slides.svonk.me
// Demo:   https://mvhacks-demo.svonk.me
import { getWeatherHTML } from "./weather.js";
const $weather = $("#weather");
if ($weather.length > 0)
  getWeatherHTML().then((html) => {
    $weather.html(html);
  });
