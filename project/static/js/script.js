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

import { getWeatherHTML } from "./weather.js";
const $weather = $("#weather");
if ($weather.length > 0) {
  getWeatherHTML().then((html) => {
    $weather.html(html);
  });
}
