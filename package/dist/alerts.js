import icons from './icons.js';
import './style.css';

export default class AlertsContainer {
	constructor({ type, position, darkMode, animation, wallGap, fontSize, colors }) {
		// A object for keeping the standard color values for the different standard types
		const colorSchemes = {
			standard: {
				textColor: { dark: '#FFFFFF', light: '#000000' },
				bgColor: { dark: '#303030', light: '#FFFFFF' },
				error: '#d64747',
				warning: '#d27722',
				success: '#0ba808',
				alert: '#5274ca',
			},
			colorfull: {
				textColor: { dark: '#FFFFFF', light: '#000000' },
				bgColor: { dark: '#303030', light: '#FFFFFF' },
				error: '#d64747',
				warning: '#d27722',
				success: '#0ba808',
				alert: '#5274ca',
			},
			glass: {
				textColor: { dark: '#FFFFFF', light: '#000000' },
				bgColor: { dark: 'linear-gradient(91.45deg, #0000001a 0%, #0000000d 100%)', light: 'linear-gradient(91.45deg, #fafafa38 0%, #fafafa1c 100%)' },
				error: '#d64747',
				warning: '#d27722',
				success: '#0ba808',
				alert: '#5274ca',
			},
		};

		// We set the fallback for type here so we can use it when setting the colors fallback
		this.type = type || 'standard';
		// This is a object containing fallback values
		this.fallbackValues = {
			type: this.type, // This fallback value is declared earlier
			position: position || 'bottom-left',
			darkMode: darkMode || false,
			animation: animation
				? {
						// We use these inline if statements to check if the object exits, if we dont it will throw an error when we cant read the properties of it.
						type: animation.type || 'slide-right',
						duration: animation.duration || 300,
						easing: animation.easing || 'ease',
				  }
				: {
						type: 'slide-right',
						duration: 300,
						easing: 'ease',
				  },
			wallGap: wallGap || 10,
			fontSize: fontSize || 24,
			colors: colors
				? {
						textColor: colors.textColor
							? { dark: colors.textColor.dark || colorSchemes[this.type].textColor.dark, light: colors.textColor.light || colorSchemes[this.type].textColor.light }
							: colorSchemes[this.type].textColor,
						bgColor: colors.bgColor
							? { dark: colors.bgColor.dark || colorSchemes[this.type].bgColor.dark, light: colors.bgColor.light || colorSchemes[this.type].bgColor.light }
							: colorSchemes[this.type].bgColor,
						error: colors.error || colorSchemes[this.type].error,
						warning: colors.warning || colorSchemes[this.type].warning,
						success: colors.success || colorSchemes[this.type].success,
						alert: colors.alert || colorSchemes[this.type].alert,
				  }
				: colorSchemes[this.type],
		};

		// Creating the alert container element
		const alertContainer = document.createElement('div');
		alertContainer.setAttribute('id', 'alerts-container');

		// Applying class attributes to help with styling
		alertContainer.classList.add(this.fallbackValues.position);
		alertContainer.classList.add(this.fallbackValues.animation.type);
		alertContainer.classList.add(this.fallbackValues.type);
		if (this.fallbackValues.darkMode) alertContainer.classList.add('dark');

		// Setting CSS variables from the contructor params
		alertContainer.style.setProperty('--error-color', this.fallbackValues.colors.error);
		alertContainer.style.setProperty('--warning-color', this.fallbackValues.colors.warning);
		alertContainer.style.setProperty('--success-color', this.fallbackValues.colors.success);
		alertContainer.style.setProperty('--alert-color', this.fallbackValues.colors.alert);
		alertContainer.style.setProperty('--light-bg-color', this.fallbackValues.colors.bgColor.light);
		alertContainer.style.setProperty('--dark-bg-color', this.fallbackValues.colors.bgColor.dark);
		alertContainer.style.setProperty('--light-text-color', this.fallbackValues.colors.textColor.light);
		alertContainer.style.setProperty('--dark-text-color', this.fallbackValues.colors.textColor.dark);

		alertContainer.style.setProperty('--wall-gap', this.fallbackValues.wallGap.toString() + 'px');
		alertContainer.style.setProperty('--font-size', this.fallbackValues.fontSize.toString() + 'px');

		alertContainer.style.setProperty('--animation-duration', this.fallbackValues.animation.duration.toString() + 'ms');
		alertContainer.style.setProperty('--animation-easing', this.fallbackValues.animation.easing);

		// Appending the alert container to the body
		document.body.appendChild(alertContainer);
	}
	createAlert(text, type = 'alert', duration = 3000) {
		// Get the alert container from the DOM
		const alertContainer = document.querySelector('#alerts-container');

		// Variable to pass down the animation object further down to the inner functions
		let passAnimation = this.fallbackValues.animation;

		// Function to build the alert element
		function buildElement(text, type) {
			// We first check so that we can get an icon base on the type param
			if (icons[type] === undefined) {
				console.error('Type argument (parameter 2 of the createalert() function) is of an unaccepted value.');
				return;
			}

			// Creating and applying classes to the alert element
			var alert = document.createElement('div');
			alert.classList.add('alerts');
			alert.classList.add(`${type}`);

			// Creating the alert icon and appending it to the alert element
			var alertIcon = document.createElement('div');
			alertIcon.classList.add('alerts-icon');
			alertIcon.classList.add(`${type}`);
			alertIcon.innerHTML = icons[type]; // Here we take the SVG template from the icons.js file based on the alert type
			alert.appendChild(alertIcon);

			// Creating the alert text
			var alertText = document.createElement('p');
			alertText.classList.add('alerts-text');
			alertText.innerText = text;
			alert.appendChild(alertText);

			// We return the alert element
			return alert;
		}
		// Function that runs when we want to create a persisted alert
		function createPersistedalert(text, type) {
			// Running the build function
			var newAlert = buildElement(text, type);

			// Creating the close icon and appending it to the notifcation element we created above
			var alertClose = document.createElement('div');
			alertClose.classList.add('alerts-close-icon');
			alertClose.innerHTML = icons.close;
			newAlert.appendChild(alertClose);

			// Appending the alert to the alert container
			alertContainer.appendChild(newAlert);

			// Here we wait a short delay so that the show class attributes dont apply instantly, giving us the animation.
			setTimeout(() => {
				newAlert.classList.add('show');
			}, 10);

			// Evenlistener for the close button
			alertClose.addEventListener('click', () => {
				// First we remove the class, giving us the reverse animation
				newAlert.classList.remove('show');

				// We wait for the animation duration before we remove the element from the DOM
				setTimeout(() => {
					newAlert.remove();
				}, passAnimation.duration);
			});
		}
		// var timeOut = duration || 3000;
		// var alertType = type || 'alert';

		if (duration === 'persisted') {
			createPersistedalert(text, type); // Function for creating persisted alerts
		} else if (typeof duration === 'number') {
			// We build the element using th build function
			var newAlert = buildElement(text, type);

			// We append the alert to the container
			alertContainer.appendChild(newAlert);

			// Here we wait a short delay so that the show class attributes dont apply instantly, giving us the animation.
			setTimeout(() => {
				newAlert.classList.add('show');
			}, 10);

			// This timeout is for keeping the alert visable for the duration given by the duration param
			setTimeout(() => {
				newAlert.classList.remove('show');
				setTimeout(() => {
					newAlert.remove();
				}, passAnimation.duration);
			}, duration);
		} else {
			// This is a fallback if the duration element is not accepted
			console.error(
				'Duration argument (parameter 3 of the createAlert() function) is of an unaccepted value. It should be a Number > or = 0 or a string of the value "persisted" for persisted notifications'
			);
		}
	}
}
