/* Object representing elements of the DOM that are changed or interacted with
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

/* This class holds methods shared with and inherited by
 * MenuActions and ColorActions classses
 * constructor function takes an object with required
 * property - value pairs as an argument */
class BasicActions {
  constructor({ body, colorIndicator, colorText, menuItems: m }) {
    this.menu = m.colorMenu;
    this.colorSelectors = m.colorSelectors;
    this.body = body;
    this.colorIndicator = colorIndicator;
    this.colorText = colorText;
  }

  // shows color menu when mouse hovers over the menu button
  showColorMenu() {
    this.menu.style.opacity = "1";
    this.menu.style.left = "3px";
    this.menu.style.transition =
      "left 500ms ease-in-out 300ms, opacity 500ms ease-out 100ms";
  }

  // hides color menu when mouse leaves the menu button or the color menu
  // without selecting a new color
  hideColorMenu() {
    this.menu.style.opacity = "0";
    this.menu.style.left = "-220px";
    this.menu.style.transition =
      "left 500ms ease-in-out 400ms, opacity 500ms ease-out 600ms";
  }

  // resets certain changes on specific elements between two color change event
  // removes every class from body and colorIndicator
  // removes "selected" class from colorSelector elements
  // this should be called as first step on a color change event
  resetChanges() {
    this.body.classList.remove(...this.body.classList);
    this.colorIndicator.classList.remove(...this.colorIndicator.classList);
    Array.from(this.colorSelectors).forEach((selector) =>
      selector.classList.remove("selected")
    );
  }
}

/* MenuActions class provides menu operation functionalities
 * this is implemented by showHideColormenu method which calls
 * methods inherited from BasicActions class
 * Argument for constructor: 'doc' object */
class MenuActions extends BasicActions {
  constructor({ header, menuItems: m }) {
    super({ menuItems: m });
    this.buttonParent = header;
    this.button = m.button;
    this.buttonEdge = m.buttonEdge;
    this.menuEdge = m.colorMenuEdge;
  }
  showHideColorMenu = function() {
    // show menu when mouse hovers on menu button
    this.button.addEventListener("mouseover", () => this.showColorMenu());
    // hide c. menu when mouse moves from m. button(edge) to header element
    // but keep c. menu open when mouse moves from m.button to c. menu
    this.buttonEdge.addEventListener("mouseleave", () => {
      this.buttonParent.addEventListener(
        "mouseover",
        () => this.hideColorMenu(),
        { once: true }
      );
    });
    // hide c. menu when mouse leaves c. menu(edge) without color selection
    this.menuEdge.addEventListener("mouseleave", () => this.hideColorMenu());
  };
}
