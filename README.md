## Color Toggle

### The goal of the assignment

To create a color toggle app/page with JavaScript.
It has a choice-menu, which will change the background color of the webpage.

### Requirements

#### Minimum requirements

- [x] When a user clicks on the hamburger icon a menu of color choices shows up
- [x] The menu should be made out of a _ul_ and _li_-s (Focus should be on JavaScript, Minimum time for CSS)
- [x] The user can pick a color from the menu
- [x] The colors are described as text in the menu / or see **<ins>bonus options</ins>** for alternative
- [x] Each menu item is a different color
- [x] Only one color can be selected at a time
- [x] Upon color selection the background of the webpage will change to the chosen color
- [x] After the color has been picked, the menu will close

#### Bonus Requirements (with comments)

- [x] **Color choices are represented with their corresponding color instead of text. Each "row " should have a different color.**
      <br />Each row has a horizontal color-selector bar with rounded corners.
      The color of the selector represents the color of the background that is set after clicking on the selector element.
      There's no text in the menu, except for the default option (it works better with the text in my opinion).
      The textual color representation is implemented on a different element.
- [x] **The user can click a radio button in the color menu, to see which color is "active" in that moment.**
      <br />Each _li_ element in the menu contains a radio-input element wrapped in a _label_ element.
      The label element serves as the visual representation of the color-selector. The _input_ element is
      the target for the click event triggering the color change. The radio-button is hidden in order to create
      a better look for the color-selector.
- [x] **The user can open the menu by hovering the mouse over the hamburger icon, instead of clicking on it.**
      <br />Besides hovering over the menu-button, the menu can be opened by clicking on it as well.
      I kept this feature, so the menu is also usable in the browser developer mode when touch control is simulated.
- [x] **The menu will close when the mouse is not hovering on the hamburger icon.**
      <br/>There is a container element (_id="menu-button-edge"_) which is the target for the _event-listener_ and triggers the
      closing of the menu. By design, this element also creates a 'bridge' towards the open menu, preventing it from closing when
      the mouse moves over from the button to the menu. (I wasn't able to come up with any other simple solution which works without
      issues - I'm pretty sure there is one). I also used the same solution (container element called ...edge) with the menu itself,
      so if the user hovers off the menu without choosing a color, the menu will close automatically.
- [x] **After the color is picked the name of the color should be written out on the webpage and the text changes after every color change.**
      <br/>This is implemented in the page's footer section. There is a 'color-indicator' element accompanied by a color-text element.
      Both the displayed text and the color of the indicator will change when the user selects a new background color from the menu.
- [x] **The menu should be sliding in and out of view smoothly on the screen, instead of popping out suddenly.
      <br/>(CSS transition should be used and the direction doesn't matter)**
- [x] **The user should be able to change the color with the keyboard. (1 for home, 2 for red, 3 for orange, etc.)**
      <br/>There are 1 + 7 options in the menu (default + 7 colors ranging from violet to red), these are paired with the keys 1 - 8.
      There is also the option to open and close the menu with the keyboard by pressing 'Enter' to open and 'Escape' to close.
      (In the alternative solution - see below - both opening and closing the menu is done by pressing the 'Enter' key.)

### Additional comments

#### Alternative solution

_**Disclaimer:** I do not expect this solution to be graded or commented on, but of course I very much appreciate any meaningful feedback and criticism._

I created this alternative solution for the assignment based on the Object Oriented Programming paradigm, which is not covered in the
JavaScript curriculum. However, I find this topic interesting and I decided to learn about it at least on a basic level (for now)
and to try to implement what I've learned so far in this solution. The file _(script2.js)_ can be found in the _alternative-solution_ folder.
It is also linked in the _index.html_ file but it's script-tag is commented out by default.

#### Issue noticed with Googel Chrome's developer mode

I noticed that when the touch simulation is on in developer mode the opening of the menu by clicking on the menu-button can be a bit glitchy
or non-responsive. I also tried Firefox developer mode which did not have any of these issues. I'm hoping that there is nothing in my code
which can cause these minor problems. I've only experienced this while using Chrome in developer mode.
