# Alerts.js
Alerts.js is a modern, lightweight and customizable javascript notifications/alerts library. It's built with JS and CSS and provides a AlertContainer class and functions to customize the notifications.

## Intsallation

### NPM
**Note:** The css is already imported in the module.
```
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

Whes using a framework or other ES6 based code make sure to import the module. Note that the class export is the default one so you can name the import anything you want but when using it in your html file imported with CDN you have to use the correct class name.

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




