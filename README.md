![Alerts.js thumbnail](https://github.com/gustav-evensson/alerts.js/blob/main/assets/thumbnail.jpg)

# Alerts.js

Alerts.js is a modern, lightweight and customizable javascript notifications/alerts library. It's built with JS and CSS and provides a AlertContainer class and functions to customize the notifications.

## Installation

### NPM

**Note:** The CSS is already imported in the module.

```bash
npm install alerts.js
```

### CDN

CSS file

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/alerts.js/browser/style.css" />
```

JS file

```html
<script src="https://cdn.jsdelivr.net/npm/alerts.js/browser/alerts.min.js"></script>
```

## Get Started

Alerts.js is built on the AlertsContainer class so the first step after installation is to make a new instance of the class.

When using a framework or other ES6 based code make sure to import the module. Note that the class export is the default one so you can name the import anything you want but when using it in your html file imported with CDN you have to use the correct class name.

### Using a framework

```js
import AlertsJS from 'alerts.js'

const alertsJS = new AlertsJS()
```

### Using in html script tag

```html
<script>
  const alertsJS = new AlertsContainer();
</script>
```

## Sending an alert

To send an alert we use the object we initiated earlier and run the createAlert funtion from it.

```js

alertsJS.createAlert('Hello from Alerts.js', 'alert', 3000)

```

- The first argument is the text to display on the alert
- The second argument is what icon should be displayed (alert, error, warning, success)
- The third one is the duration in ms it should show, it can also take in a string of value 'persisted' which keeps it on the screen until the remove button is pressed.

```js

alertsJS.createAlert('Hello from Alerts.js', 'alert', 'persisted')

```

## Constructor arguments

The class constructor takes in an object as the argument which allows styling and customization options.

Bellow we show an example (the values shown are the default values).

```js
const alertsJS = new AlertsContainer({
  position: 'bottom-center',
  darkMode: false,
  corners: 'rounded',
  wallGap: 32,
  stacking: 'stack',
  hideCountdown: false,
  colors: {
    text: { dark: "#FFFFFF", light: "#000000" },
    background: { dark: "#303030", light: "#FFFFFF" },
    error: { dark: "#E65858", light: "#FF3737" },
    warning: { dark: "#FD9C41", light: "#FF9900" },
    success: { dark: "#5FD95D", light: "#04C800" },
    alert: { dark: "#6C8FE8", light: "#4690FF" },
  },
});
```

### Position

Decides the position of the notification container and can have following values:

- top-left
- top-center
- top-right
- bottom-left
- bottom-center
- bottom-right

### DarkMode

A boolean that decides whether to use the dark or light colors.

### Corners

Decides the rounding of the corner on the alert, can have following values of type string:

- rounded - slightly rounded corners
- round - completely round corners
- square - no rounding

### WallGap

Decides the distance between the alerts and the border of the viewport (in pixel values).

### Stacking

Here you can specify the way the alerts stack. The default setting is 'stack' which looks a lot like Apples notification stacking. The second one is 'column' where the alerts pushes the previous one horizontally .

### Colors

Takes in an object that allows for color customization. The light and dark value are displayed depending on the darkMode argument.

## Other style options

The alerts are scaling with the fontsize of the parent element by default. To change the size of the alerts just change the font-size on the alerts-container to a fized size.

```css
// Your css file

#alerts-container{
  font-size: 20px;
}
```

## Dynamic dark mode

There is also a function to after initialization change the color mode. It takes in a boolean tha represents if dark mode is on

```js

alertsJS.isDarkMode(true)

```
