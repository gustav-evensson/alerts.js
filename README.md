![Alerts.js thumbnail]()

# Alerts.js

Alerts.js is a modern, lightweight and customizable javascript notifications/alerts library. It's built with JS and CSS and provides a AlertContainer class and functions to customize the notifications.

## Installation

### NPM

**Note:** The CSS is already imported in the module.

```bash
npm install alert.js
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

### Download file

Click <a href="https://github.com/gustav-evensson/alerts.js/raw/main/src/alertsjs.tar.gz" download>here</a> to download the alertsjs.tar.gz file.

## Get Started

Alerts.js is built on the AlertsContainer class so the first step after installation is to make a new instance of the class.

When using a framework or other ES6 based code make sure to import the module. Note that the class export is the default one so you can name the import anything you want but when using it in your html file imported with CDN you have to use the correct class name.

### Using a framework

```js
import AlertsJS from 'alerts.js'

const alerts = new AlertsJS()
```

### Using in html script tag

```html
<script>
  const alerts = new AlertsContainer();
</script>
```

## Constructor arguments

The class constructor takes in an object as the argument which allows styling and customization options.

Bellow we show an example and the values shown are also the default values.

```js
const alertsJS = new AlertsContainer({
  position: 'bottom-center',
  darkMode: false,
  animation: 'slide-up',
  wallGap: 32,
  stacking: 'stack',
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

### Animation

Decides the the type and direction of the animation, and can have following values:

- slide-up
- slide-down
- slide-left
- slide-right
- fade
- node

### WallGap

Decides the distance between the alerts and the border of the viewport (in pixel values).

### Stacking

Here you can specify the way the alerts stack. The default setting is 'stack' which looks a lot like Apples notification stacking. The second one is 'column' where the alerts pushes the previous one horizontally .

### Colors

Takes in an object that allows for color customization. The light and dark value are displayed depending on the darkMode argument.
