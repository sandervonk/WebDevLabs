# **[@svonk/util](https://www.npmjs.com/package/@svonk/util)**

> Easy-to-use Toasts, Popups, and more common utilities for my projects

## Installation

---

Install to your project with:

`npm i @svonk/util@latest`

## Usage

---

In your main javascript file, import with:

`import {`parts`} from "@svonk/util"`

see below for more info on how to use these parts!

## Toasts

---

`new Toast("message", "type", #duration#, "iconPath", "action")`

> `"message"`
>
> - the toast message text to be displayed

> `"type"`
>
> - a string, either:
>   - "boxed"
>   - "default"
>   - "transparent"
> - indicates which style to use (see `./util.css` for more info)

> `#duration#`
>
> - a number, in ms, of how long to display the toast for

> `"iconPath"` (optional)
>
> - path to the icon to be shown on the toast (should be square, about 40x40)

> `"action"` (optional)
>
> - path to redirect to (set with `window.location.href`) after the duration passes
> - if this is set, the page will also be dimmed slightly while the toast is showing to make it stand out more

### Toast Variants

---

all variants have an optional last argument action (type string) that when specified will redirect to that url using window.location.href when the toast animates out

`new ErrorToast("preface", "error", #duration#)`

> A normal toast, except with the icon set to `./assets/error-icon` by default, and the option to reuse a preface for multiple errors

> `"preface"`
>
> - A string, which will be concatonated with a colon and the message

> `"error"`
>
> - A string with the error message. I suggest using the `cleanError` function to get a readable message from error codes

> `#duration#`
>
> - see parent

`new WarningToast("message", #duration#)`

> A normal toast, except with the icon set to `./assets/warning-icon` by default

> `"message"`, `#duration#`
>
> - see parent

`new SuccessToast("message", #duration#)`

> A normal toast, except with the icon set to `./assets/success-icon` by default

> `"message"`, `#duration#`
>
> - see parent

`new placeholderToast()`

> takes no arguments, used to show that a feature is incomplete, or will be added in its place later, uses `./assets/unimplemented-icon`

## Popups

---

`new Popup("message", "type", #duration#, "iconPath", [action])`

> creates an Andriod 13-style popup with styled action buttons based on an imput array. Can be removed with `removePopup()`, or will automatically animate out after the set duration

> `"message"`
>
> - the popup message text to be displayed
> - either
>   - an array ["title", "message"]
>   - a string "message"

> `"type"`
>
> - a string, currently unused, but you could define your own styles for this

> `#duration#`
>
> - a number, in ms, of how long to display the popup for

> `"iconPath"` (optional)
>
> - path to the icon to be shown on the popup

> `[action]` (optional)
>
> - an array of action buttons to be shown, each of which should have:
>   - an array within it of: ["onclick", "text", "class"]
>   - `"onclick"`
>     - text, to be `eval()`ed when clicked
>   - `"text"`
>     - text to be shown on the button
>   - `"class"`
>     - class added to the button, to allow it to be styled, or setup listeners for when it's clicked
>     - `.primary-action`, `.secondary-action`, and `.delete-color` are pre-defined

### Popup Utilities

`removePopup()`

> takes no arguments. Will remove any displaying popups, animating them out first.

## Other Functions

---

`cleanError({error})`

> takes in an error object (from firebase) and attempts to clean it up into something readable from error.code, if it's not able to, it returns "Error ${error.message}"

> `{error}`
>
> - a keyed object with error.message and error.code properties, both of which are strings

`$()`

> proxy import for jquery, since it's imported for use in `./util.js` anyways
