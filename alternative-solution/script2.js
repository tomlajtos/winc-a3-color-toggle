/* This is an alternative, object-oriented solution for the color toggle assignment
 * It is my own initiative to learn about and practice JS-OOP as it is not included in the
 * JS curriculum of the Front-End Development course */

// DEFINE A DOCUMENT OBJECT
/* Object, representing elements of the DOM that are changed or interacted with
 * when the different functionalities are used. These properties are given as arguments
 * (in form of a de-structured object) for the BasicActions, MenuActions
 * and ColorActions classes and are used by the methods defined within these classes. */
const doc = {
  body: document.getElementById("body"),
  header: document.getElementById("header"),
  menuItems: {
    button: document.getElementById("menu-button"),
    buttonEdge: document.getElementById("menu-button-edge"),
    colorMenu: document.getElementById("color-menu"),
    colorMenuEdge: document.getElementById("color-menu-edge"),
    colorSelectors: document.getElementsByClassName("color-selector"),
  },
  colorText: document.getElementById("color-text"), // text feedback in footer
  colorIndicator: document.getElementById("color-indicator"), // color indicator in footer
};

// DEFINE CLASSES
/* BasicActions Class holds methods shared with and inherited by
 * MenuActions and ColorActions classes
 * It's constructor function takes an object with required
 * property - value pairs as an argument - 'doc' */
class BasicActions {
  constructor({ body, colorIndicator, colorText, menuItems: m }) {
    this.menu = m.colorMenu;
    this.colorSelectors = m.colorSelectors;
    this.body = body;
    this.colorIndicator = colorIndicator;
    this.colorText = colorText;
    this.validKeys = {
      Enter: "open_close",
      1: "default",
      2: "violet",
      3: "blue",
      4: "cyan",
      5: "green",
      6: "yellow",
      7: "orange",
      8: "red",
    };
  }

  /* Helper function to other functions which show color menu when:
   * - the mouse hovers over the menu button
   * - when mouse clicks on the menu button
   * - when user hits the 'Enter' key */
  showColorMenu() {
    this.menu.style.opacity = "1";
    this.menu.style.left = "3px";
    this.menu.style.transition =
      "left 500ms ease-in-out 300ms, opacity 500ms ease-out 100ms";
  }

  /* Helper function to other functions which hide the color menu when:
   * - the mouse hovers off the menu button, but not towards menu
   * - the mouse hovers off the menu without selecting a new color
   * - when mouse clicks on the menu button the 2nd time
   * - when user clicks on a color selector element
   * - when user hits the 'Enter' key the 2nd time */
  hideColorMenu() {
    this.menu.style.opacity = "0";
    this.menu.style.left = "-220px";
    this.menu.style.transition =
      "left 500ms ease-in-out 400ms, opacity 500ms ease-out 600ms";
  }

  /* Helper function to verify if the menu is visible or hidden
   * Supports other functions which execution depends on the menu's hidden/visible state */
  isMenuVisible() {
    // reg-ex to check if menu style position-left starts with a digit == visible
    // hidden means negative pixel value, which starts with '-'
    const menuStateRegEx = /^\d+/g;
    // test regex on menu element style value
    return menuStateRegEx.test(this.menu.style.left);
  }

  /* Helper function to resets certain changes on specific elements
   * between two color change event
   * Removes every class from body and colorIndicator
   * Removes "selected" class from colorSelector elements
   * This function should be called as first step on a color change event */
  resetChanges() {
    this.body.classList.remove(...this.body.classList);
    this.colorIndicator.classList.remove(...this.colorIndicator.classList);
    Array.from(this.colorSelectors).forEach((selector) =>
      selector.classList.remove("selected")
    );
  }
}

/* MenuActions Class provides menu operation functionalities
 * This is implemented by showHideColormenu method which calls
 * methods inherited from BasicActions class
 * Argument for it's constructor: 'doc' object */
class MenuActions extends BasicActions {
  constructor({ header, menuItems: m }) {
    super({ menuItems: m });
    this.buttonParent = header;
    this.button = m.button;
    this.buttonEdge = m.buttonEdge;
    this.menuEdge = m.colorMenuEdge;
  }

  /* Function that adds the functionality to show/hide menu with keyboard.
   * Show menu when 'Enter' is pressed, or hide it if it was visible
   * Alert if key is invalid */
  showHideMenuWithKeyboard() {
    document.addEventListener("keypress", (event) => {
      const keyName = event.key;
      const validKey = keyName in this.validKeys;

      // check if a key with associated function was pressed, alert if not
      if (!validKey) {
        alert(
          `Key not recognized.
        - Open / Close color menu:
            Enter
        - Color options (type the number to apply color):
            default: 1,  violet: 2
            blue: 3,  cyan: 4
            green: 5,  yellow: 6
            orange: 7,  red: 8`
        );
        // if key is valid, check if it was 'Enter'
      } else if (
        validKey &&
        // if key is 'Enter', open/close menu depending on state
        this.validKeys[keyName] === "open_close" &&
        !this.isMenuVisible()
      ) {
        this.showColorMenu();
      } else {
        this.hideColorMenu();
      }
    });
  }

  /* Function that adds the functionality to show/hide menu on mouse click.
   * Show menu when user clicks on the menu button or hide it if it was visible */
  showHideMenuOnClick() {
    this.button.addEventListener("click", () => {
      !this.isMenuVisible() ? this.showColorMenu() : this.hideColorMenu();
    });
  }

  /* Function that adds the functionality to show/hide menu
   * depending on the cursor's hover position.
   * Show menu when the cursor hover over the menu button
   * Hide menu when the cursor hovers off the menu button, but not towards menu
   * Hide menu when the cursor hovers off the menu
   * without the user selecting a new color */
  showHideMenuOnHover() {
    // show menu when mouse hovers on menu button
    this.button.addEventListener("mouseover", () => {
      this.showColorMenu();
    });

    // hide menu when mouse moves from m. button(edge) to header element
    // but keep menu open when mouse moves from m.button to menu
    this.buttonEdge.addEventListener("mouseleave", () => {
      this.buttonParent.addEventListener(
        "mouseover",
        () => {
          this.hideColorMenu();
        },
        { once: true }
      );
    });

    // hide menu when mouse leaves menu(edge) without color selection
    this.menuEdge.addEventListener("mouseleave", () => {
      this.hideColorMenu();
    });
  }

  // Function that combines all menu actions together
  // show/hides menu on hover, click, or keyboard event
  showHideMenu = function() {
    this.showHideMenuWithKeyboard();
    this.showHideMenuOnClick();
    this.showHideMenuOnHover();
  };
}
