// Get all menu buttons
const buttons = document.querySelectorAll(".button");

// Get close dialog
const closeDialog = document.getElementById("close-dialog");

// Set current menu
let currentMenu = "main";

// Set last pressed button
let lastPressed = "n";

// Sounds
const sounds = {
  select: new Audio("/assets/media/select.mp3"),
  up_menu: new Audio("/assets/media/up_menu.mp3"),
};

// Add sound and action for each button
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    sounds["select"].play();
    lastPressed =
      button.dataset.key && !button.dataset.hideDialog
        ? button.dataset.key
        : lastPressed;
    const action = button.dataset.action;

    // Check for action value
    if (action == "menu") {
      // Imitate HL's up menu sound
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
  let menuItem = document.querySelector(
    `.menu[data-menu="${currentMenu}"] [data-key="${event.key}"]`
  );

  let escPressed = false;
  let foundDialog = false;

  // Check if user pressed Esc
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
  // Check if no other dialog is found, Esc key is pressed, and is in main menu
  if (!foundDialog && escPressed && currentMenu == "main") {
    closeDialog.classList.toggle("show");

    // Highlight the last menu button pressed
    if (!closeDialog.classList.contains("show")) {
      hoverOnKey(
        document.querySelector(
          `.menu[data-menu="${currentMenu}"] [data-key="${lastPressed}"]`
        ),
        25
      );
    }
  }
  // If a matching menu key is found, press it
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
