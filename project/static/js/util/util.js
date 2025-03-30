"use strict";
/* ADAPTED FOR NON-BUILDER USE */
/** TOAST **/

class Toast {
  constructor(message, type, duration, iconPath = "", action = "") {
    this.message = message;
    this.type = type;
    this.duration = duration;
    this.icon = iconPath;
    this.action = action;
    this.showToast();
  }
  showToast() {
    $(".toast").remove();
    let overlay = document.createElement("div"),
      toast = document.createElement("div");
    toast.classList.add("toast");
    overlay.classList.add("toast-overlay");
    toast.classList.add(this.type);
    if (this.icon != "") {
      toast.innerHTML += `<img alt="icon" src="${this.icon}" class="toast-icon" alt="Toast Popup Icon">`;
    }
    toast.innerHTML += this.message;
    if (this.action != "") {
      document.body.appendChild(overlay);
    }
    document.body.appendChild(toast);
    setTimeout(() => {
      $(toast).css({ animation: "slideOut 0.5s forwards" });
    }, this.duration);
    setTimeout(() => {
      overlay.remove();
      toast.remove();
      if (this.action != "" && this.action != "") {
        window.location.href = this.action;
      }
    }, this.duration + 500);
  }
}
class ErrorToast extends Toast {
  constructor(message, err, duration = 2000, action = "") {
    message += ": " + err;
    super(message, "default", duration, "svonk-util/assets/error-icon.svg", action);
    return console.error(
      "%c💬 [UTIL]%c " + message,

      "color: #a16d24; text-shadow: 3px 3px #e9927c; background: #faa488; font-weight: bold; font-size: 1.25em; padding: 5px 10px",
      "color: #faa488;  margin-left: 10px"
    );
  }
}
class WarningToast extends Toast {
  constructor(message, duration, action = "") {
    super(message, "default", duration, "svonk-util/assets/warning-icon.svg", action);
  }
}

class InfoToast extends Toast {
  constructor(message, duration, action = "") {
    super(message, "default", duration, "svonk-util/assets/info-icon.svg", action);
  }
}
class SuccessToast extends Toast {
  constructor(message, duration, action = "") {
    super(message, "default", duration, "svonk-util/assets/success-icon.svg", action);
  }
}
/** POPUP **/

class Popup {
  constructor(message, type, duration, iconPath = "", action = "") {
    if (typeof message == "object") {
      this.title = message[0];
      this.message = message[1];
    } else {
      this.message = message;
    }
    this.type = type;
    this.duration = duration;
    this.icon = iconPath;
    this.action = action;
    this.showPopup();
  }
  showPopup() {
    $(".popup, .popup-overlay").remove();
    let overlay = $("<div></div>", { class: "popup-overlay " + this.type }),
      toast = $("<div></div>", { class: "popup" }),
      buttons = $("<div></div>", { id: "popup-buttons" });

    for (let actionInfo of this.action) {
      $("<button></button>", {
        class: "popup-button " + (actionInfo[2] ? actionInfo[2] : ""),
        onclick: actionInfo[0],
        text: actionInfo[1],
      }).appendTo(buttons);
    }
    if (this.icon) {
      $(`<img alt='Popup Icon' src="${this.icon}" class="popup-icon">`).appendTo(toast);
    }
    if (this.title) {
      $("<div></div>", { text: this.title, class: "popup-title" }).appendTo(toast);
    }
    $("<div></div>", { text: this.message, class: "popup-text" }).appendTo(toast);
    buttons.appendTo(toast);

    if (this.action) {
      overlay.appendTo(document.body);
    }
    toast.appendTo(document.body);
    setTimeout(() => {
      $(toast).css({ animation: "popupout 0.25s forwards" });
      $(overlay).css({ animation: "fadeout 0.5s forwards" });
    }, this.duration);
    setTimeout(() => {
      toast.remove();
      overlay.remove();
    }, this.duration + 500);
  }
}
function removePopup() {
  $(".popup").css({ animation: "popupout 0.25s forwards" });
  $(".popup-overlay").css({ animation: "fadeout 0.5s forwards" });
  setTimeout(() => {
    $(".popup").remove();
    $(".popup-overlay").remove();
  }, 500);
}
$(document.body).on("click", ".popup-overlay", function () {
  removePopup();
});

/** Other **/
function placeholderToast() {
  return new Toast("This feature hasn't been implemented yet, sorry! 🤫", "default", 1500, "svonk-util/assets/unimplemented-icon.svg");
}
//! placeholder action
$("[placeholdaction]").click(function () {
  placeholderToast();
});
function cleanError(error) {
  switch (error.code) {
    case "auth/invalid-email":
      return "Invalid email";
    case "auth/user-disabled":
      return "User disabled";
    case "auth/user-not-found":
      return "User not found";
    case "auth/wrong-password":
      return "Incorrect password";
    case "auth/email-already-in-use":
      return "Email already in use, try logging in";
    case "auth/weak-password":
      return "Password is too weak";
    case "auth/operation-not-allowed":
      return "Operation not allowed";
    case "auth/too-many-requests":
      return "Too many requests";
    case "auth/popup-closed-by-user":
      return "Popup closed by user";
    case "auth/popup-blocked":
      return "Popup blocked";
    case "auth/unauthorized-domain":
      return "Can't login from this domain";
    case "auth/cancelled-popup-request":
      return "New popup opened, cancelling previous request";
    default:
      return error.message.replace("Error ", "");
  }
}
// expose functions
window.removePopup = removePopup;
export { removePopup, Popup, Toast, ErrorToast, WarningToast, InfoToast, SuccessToast, cleanError, placeholderToast };
