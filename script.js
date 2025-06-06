const sounds = {
  select: new Audio("/assets/media/select.mp3"),
  up_menu: new Audio("/assets/media/up_menu.mp3"),
};

// Get all menu buttons
const buttons = document.querySelectorAll(".button");

// Get close dialog
const closeDialog = document.getElementById("close-dialog");

// Set last pressed button
let lastPressed = "n";

// Add sound and action for each button
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    sounds["select"].play();
    lastPressed =
      button.dataset.key && !button.dataset.hideDialog
        ? button.dataset.key
        : "n";
    const action = button.dataset.action;

    // Check for action value
    if (action == "menu") {
      setTimeout(() => {
        sounds["select"].pause();
        sounds["select"].currentTime = 0;
        sounds["up_menu"].play();
      }, 100);
    } else if (action == "dialog") {
      const showDialog = button.dataset.showDialog;
      const hideDialog = button.dataset.hideDialog;

      if (showDialog) {
        document.getElementById(showDialog).classList.add("show");
      } else if (hideDialog) {
        document.getElementById(hideDialog).classList.remove("show");
      }
    }
  });
});

// Check for element visibility
function isHidden(element) {
  let style = window.getComputedStyle(element);
  return style.display === "none";
}

// Detect keystroke
document.addEventListener("keydown", function (event) {
  const dialogs = document.querySelectorAll(".dialog");
  let menuItem = document.querySelector(`.menu-list [data-key="${event.key}"]`);
  let escPressed = false;
  let foundDialog = false;

  if (event.key === "Escape") {
    escPressed = true;
  }
  // Check for visible dialogs
  dialogs.forEach((dialog) => {
    if (!isHidden(dialog)) {
      const dialogId = dialog.getAttribute("id");
      menuItem = document.querySelector(
        `#${dialogId} [data-key="${event.key}"]`
      );
      foundDialog = dialogId != "close-dialog" ? true : false;
    }
  });
  if (!foundDialog && escPressed) {
    closeDialog.classList.toggle("show");

    if (!closeDialog.classList.contains("show")) {
      hoverOnKey(
        document.querySelector(`.menu-list [data-key="${lastPressed}"]`),
        25
      );
    }
  }
  if (menuItem) {
    menuItem.click();
    hoverOnKey(menuItem, 25);
  }
});

// Hover on keystroke
function hoverOnKey(element, duration) {
  element.classList.add("hover");

  setTimeout(() => {
    element.classList.remove("hover");
  }, duration);
}
