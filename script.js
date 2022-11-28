// variables pointing to elements needed for menu show/hide function
const menuButton = document.getElementById("menu-button");
const menuButtonContainer = document.getElementById("menu-button-container");
const colorMenu = document.getElementById("color-menu");
const colorMenuContainer = document.getElementById("color-menu-container");
const docHeader = document.getElementById("header");

// variables pointing to elements to be changed upon color selection
const docBody = document.getElementById("body");
const colorSelectors = document.getElementsByClassName("color-selector");
const colorText = document.getElementById("color-text"); // text feedback in footer
const colorIndicator = document.getElementById("color-indicator"); // color indicator in footer

// variables pointing to color menu input elements
const colorInputDefault = document.getElementById("color-input-default");
const colorInputViolet = document.getElementById("color-input-violet");
const colorInputBlue = document.getElementById("color-input-blue");
const colorInputCyan = document.getElementById("color-input-cyan");
const colorInputGreen = document.getElementById("color-input-green");
const colorInputYellow = document.getElementById("color-input-yellow");
const colorInputOrange = document.getElementById("color-input-orange");
const colorInputRed = document.getElementById("color-input-red");

// variables pointing to color menu label elements
const colorSelectorDefault = document.getElementById("color-selector-default");
const colorSelectorViolet = document.getElementById("color-selector-violet");
const colorSelectorBlue = document.getElementById("color-selector-blue");
const colorSelectorCyan = document.getElementById("color-selector-cyan");
const colorSelectorGreen = document.getElementById("color-selector-green");
const colorSelectorYellow = document.getElementById("color-selector-yellow");
const colorSelectorOrange = document.getElementById("color-selector-orange");
const colorSelectorRed = document.getElementById("color-selector-red");

// Elements and their properties to be changed upon color selection
// stored in form of an array of objects, [color]Array.
// These arrays are given as arguments to the 'addClickEvent' function
const defaultArray = [
  { name: colorSelectors, toRemove: ["selected"] },
  { name: docBody, newClass: ["bg-default"] },
  { name: colorText, newClass: [], newText: "Default" },
  { name: colorIndicator, newClass: ["bg-default"] },
  { name: colorSelectorDefault, newClass: ["selected"] },
];
const violetArray = [
  { name: colorSelectors, toRemove: ["selected"] },
  { name: docBody, newClass: ["bg-violet"] },
  { name: colorText, newClass: [], newText: "Violet" },
  { name: colorIndicator, newClass: ["bg-violet"] },
  { name: colorSelectorViolet, newClass: ["selected"] },
];
const blueArray = [
  { name: colorSelectors, toRemove: ["selected"] },
  { name: docBody, newClass: ["bg-blue"] },
  { name: colorText, newClass: [], newText: "Blue" },
  { name: colorIndicator, newClass: ["bg-blue"] },
  { name: colorSelectorBlue, newClass: ["selected"] },
];
const cyanArray = [
  { name: colorSelectors, toRemove: ["selected"] },
  { name: docBody, newClass: ["bg-cyan"] },
  { name: colorText, newClass: [], newText: "Cyan" },
  { name: colorIndicator, newClass: ["bg-cyan"] },
  { name: colorSelectorCyan, newClass: ["selected"] },
];
const greenArray = [
  { name: colorSelectors, toRemove: ["selected"] },
  { name: docBody, newClass: ["bg-green"] },
  { name: colorText, newClass: [], newText: "Green" },
  { name: colorIndicator, newClass: ["bg-green"] },
  { name: colorSelectorGreen, newClass: ["selected"] },
];
const yellowArray = [
  { name: colorSelectors, toRemove: ["selected"] },
  { name: docBody, newClass: ["bg-yellow"] },
  { name: colorText, newClass: [], newText: "Yellow" },
  { name: colorIndicator, newClass: ["bg-yellow"] },
  { name: colorSelectorYellow, newClass: ["selected"] },
];
const orangeArray = [
  { name: colorSelectors, toRemove: ["selected"] },
  { name: docBody, newClass: ["bg-orange"] },
  { name: colorText, newClass: [], newText: "Orange" },
  { name: colorIndicator, newClass: ["bg-orange"] },
  { name: colorSelectorOrange, newClass: ["selected"] },
];
const redArray = [
  { name: colorSelectors, toRemove: ["selected"] },
  { name: docBody, newClass: ["bg-red"] },
  { name: colorText, newClass: [], newText: "Red" },
  { name: colorIndicator, newClass: ["bg-red"] },
  { name: colorSelectorRed, newClass: ["selected"] },
];

// Function declarations

// Function to make the color menu visible
const showColorMenu = function () {
  colorMenu.style.opacity = "1";
  colorMenu.style.left = "3px";
  colorMenu.style.transition =
    "left 500ms ease-in-out 300ms, opacity 500ms ease-out 100ms";
};

// Function to hide the color menu
const hideColorMenu = function () {
  colorMenu.style.opacity = "0";
  colorMenu.style.left = "-220px";
  colorMenu.style.transition =
    "left 500ms ease-in-out 400ms, opacity 500ms ease-out 600ms";
};

// Function to show or hide color menu
// based on mouse hovering-position/movement
// Also: clicking on a color selector will close the menu as well,
// independently from this function.
const showHideColorMenu = () => {
  menuButton.addEventListener("mouseover", showColorMenu);
  menuButtonContainer.addEventListener("mouseleave", () => {
    docHeader.addEventListener("mouseover", hideColorMenu, { once: true });
  });
  colorMenuContainer.addEventListener("mouseleave", hideColorMenu);
};

/* Function to add class(es) to a DOM object
 * argument(1): array of objects ([color]Array) */
const addClasses = (colorArray) =>
  colorArray
    // exclude object(s) with 'obj.name: colorSelectors' (HTMLCollection)
    .filter((element) => !element["name"].length)
    .forEach((element) => element["name"].classList.add(...element.newClass));

/* Function to remove highlight from color-selectors
 * argument(1): array of objects ([color]Array) */
const removeSelectionIndicator = function (colorArray) {
  /* filter for object in [color]Array that has 'name: colorSelectors' property
   * which value is an (HTMLCollection) >> done by checking
   * if object['name'] of colorArray elements is array-like
   * and has length ('colorSelectors' is the only one in this case,
   * no need to be more specific) */

  //assign filtered out object to a variable with array de-structuring
  const [colorSelectorsObj] = colorArray.filter(
    (object) => object["name"].length
  );

  // turn HTMLCollection (...obj.name) into an Array,
  // iterate through the elements and remove all classes
  // listed in the array of '..Obj.toRemove'
  Array.from(colorSelectorsObj.name).forEach((element) =>
    element.classList.remove(...colorSelectorsObj.toRemove)
  );
};

// Function to remove all classes from a DOM object
// argument(1): array of objects ([color]Array)
const removeClasses = (colorArray) =>
  colorArray
    .filter((obj) => obj.name.tagName !== "LABEL" && !obj.name.length)
    .forEach((element) =>
      element["name"].classList.remove(...element["name"].classList)
    );

// Function to change feedback text in footer
// argument(1): array of objects ([color]Array)
const changeColorText = function (colorArray) {
  //filter for object that has 'newText' property
  // assign obj to variable with array de-structuring
  const [colorTextObj] = colorArray.filter((obj) => obj.newText);

  colorTextObj.name.innerHTML = colorTextObj.newText;
};
