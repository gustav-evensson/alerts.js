import './style.css'

export default class AlertsContainer {
	constructor({ position, darkMode, animation, wallGap, scaling, colors }) {

		const defaultColorScheme = {
			textColor: { dark: '#FFFFFF', light: '#000000' },
			bgColor: { dark: '#303030', light: '#FFFFFF' },
			error: '#d64747',
			warning: '#d27722',
			success: '#0ba808',
			alert: '#5274ca',
		};

		// Taking in the values from the constructor args or setting them to a default value
		console.log(colors)
		this.position = position || 'bottom-center';
		this.darkMode = darkMode || false;
		this.animation = animation || 'slide-up';
		this.wallGap = wallGap || 32;
		this.scaling = scaling || 1;
		this.colorScheme = colors
			? {
					textColor: colors.textColor
						? { dark: colors.textColor.dark || defaultColorScheme.textColor.dark, light: colors.textColor.light || defaultColorScheme.textColor.light }
						: defaultColorScheme.textColor,
					bgColor: colors.bgColor ? { dark: colors.bgColor.dark || defaultColorScheme.bgColor.dark, light: colors.bgColor.light || defaultColorScheme.bgColor.light } : defaultColorScheme.bgColor,
					error: colors.error || defaultColorScheme.error,
					warning: colors.warning || defaultColorScheme.warning,
					success: colors.success || defaultColorScheme.success,
					alert: colors.alert || defaultColorScheme.alert,
			  }
			: defaultColorScheme;

		// Creating the alert container element
		const alertContainer = document.createElement('div');
		alertContainer.setAttribute('id', 'alerts-container');

		// Applying class attributes to help with styling
		alertContainer.classList.add(this.position);
		alertContainer.classList.add(this.animation);
		if (this.darkMode) alertContainer.classList.add('dark');

		// Setting CSS variables from the contructor params
		alertContainer.style.setProperty('--wall-gap', this.wallGap.toString() + 'px');
		alertContainer.style.setProperty('--scaling', this.scaling.toString());
		alertContainer.style.setProperty('--text-light', this.colorScheme.textColor.light);
		alertContainer.style.setProperty('--text-dark', this.colorScheme.textColor.dark);
		alertContainer.style.setProperty('--bg-light', this.colorScheme.bgColor.light);
		alertContainer.style.setProperty('--bg-dark', this.colorScheme.bgColor.dark);
		alertContainer.style.setProperty('--error', this.colorScheme.error);
		alertContainer.style.setProperty('--warning', this.colorScheme.warning);
		alertContainer.style.setProperty('--success', this.colorScheme.success);
		alertContainer.style.setProperty('--alert', this.colorScheme.alert);

		// Appending the alert container to the body
		document.body.appendChild(alertContainer);
	}
	createAlert(text, type = 'alert', duration = 3000) {
		// Get the alert container from the DOM
		const alertContainer = document.querySelector('#alerts-container');

		// This object contains the svg template for the different icons
		const icons = {
			error: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M28.4125 10.025L21.975 3.5875C21.5999 3.21337 21.0923 3.00227 20.5625 3H11.4375C10.9077 3.00227 10.4001 3.21337 10.025 3.5875L3.5875 10.025C3.21337 10.4001 3.00227 10.9077 3 11.4375V20.5625C3.00227 21.0923 3.21337 21.5999 3.5875 21.975L10.025 28.4125C10.4001 28.7866 10.9077 28.9977 11.4375 29H20.5625C21.0923 28.9977 21.5999 28.7866 21.975 28.4125L28.4125 21.975C28.7866 21.5999 28.9977 21.0923 29 20.5625V11.4375C28.9977 10.9077 28.7866 10.4001 28.4125 10.025ZM15 10C15 9.73478 15.1054 9.48043 15.2929 9.29289C15.4804 9.10536 15.7348 9 16 9C16.2652 9 16.5196 9.10536 16.7071 9.29289C16.8946 9.48043 17 9.73478 17 10V17C17 17.2652 16.8946 17.5196 16.7071 17.7071C16.5196 17.8946 16.2652 18 16 18C15.7348 18 15.4804 17.8946 15.2929 17.7071C15.1054 17.5196 15 17.2652 15 17V10ZM16 23C15.7033 23 15.4133 22.912 15.1666 22.7472C14.92 22.5824 14.7277 22.3481 14.6142 22.074C14.5006 21.7999 14.4709 21.4983 14.5288 21.2074C14.5867 20.9164 14.7296 20.6491 14.9393 20.4393C15.1491 20.2296 15.4164 20.0867 15.7074 20.0288C15.9983 19.9709 16.2999 20.0007 16.574 20.1142C16.8481 20.2277 17.0824 20.42 17.2472 20.6666C17.412 20.9133 17.5 21.2033 17.5 21.5C17.5 21.8978 17.342 22.2794 17.0607 22.5607C16.7794 22.842 16.3978 23 16 23Z" fill="#D64747"/>
			</svg>
            `,
			warning: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M29.5875 23.5L18.6 4.50001C18.337 4.04305 17.9581 3.66349 17.5017 3.39956C17.0452 3.13564 16.5273 2.99667 16 2.99667C15.4727 2.99667 14.9548 3.13564 14.4983 3.39956C14.0419 3.66349 13.663 4.04305 13.4 4.50001L2.41251 23.5C2.14559 23.9547 2.00374 24.4718 2.00136 24.999C1.99898 25.5262 2.13615 26.0447 2.39895 26.5017C2.66174 26.9588 3.0408 27.3381 3.49764 27.6013C3.95447 27.8644 4.4728 28.002 5.00001 28H27C27.5272 28.002 28.0455 27.8644 28.5024 27.6013C28.9592 27.3381 29.3383 26.9588 29.6011 26.5017C29.8639 26.0447 30.001 25.5262 29.9987 24.999C29.9963 24.4718 29.8544 23.9547 29.5875 23.5ZM15 13C15 12.7348 15.1054 12.4804 15.2929 12.2929C15.4804 12.1054 15.7348 12 16 12C16.2652 12 16.5196 12.1054 16.7071 12.2929C16.8946 12.4804 17 12.7348 17 13V18C17 18.2652 16.8946 18.5196 16.7071 18.7071C16.5196 18.8947 16.2652 19 16 19C15.7348 19 15.4804 18.8947 15.2929 18.7071C15.1054 18.5196 15 18.2652 15 18V13ZM16 24C15.7033 24 15.4133 23.912 15.1666 23.7472C14.92 23.5824 14.7277 23.3481 14.6142 23.074C14.5007 22.7999 14.4709 22.4983 14.5288 22.2074C14.5867 21.9164 14.7296 21.6491 14.9393 21.4394C15.1491 21.2296 15.4164 21.0867 15.7074 21.0288C15.9983 20.971 16.2999 21.0007 16.574 21.1142C16.8481 21.2277 17.0824 21.42 17.2472 21.6667C17.412 21.9133 17.5 22.2033 17.5 22.5C17.5 22.8978 17.342 23.2794 17.0607 23.5607C16.7794 23.842 16.3978 24 16 24Z" fill="#FF7A00"/>
			</svg>
            `,
			success: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M16 3C13.4288 3 10.9154 3.76244 8.77759 5.1909C6.63975 6.61935 4.97351 8.64968 3.98957 11.0251C3.00563 13.4006 2.74819 16.0144 3.2498 18.5362C3.75141 21.0579 4.98953 23.3743 6.80762 25.1924C8.6257 27.0105 10.9421 28.2486 13.4638 28.7502C15.9856 29.2518 18.5995 28.9944 20.9749 28.0104C23.3503 27.0265 25.3807 25.3603 26.8091 23.2224C28.2376 21.0846 29 18.5712 29 16C28.9934 12.5542 27.6216 9.25145 25.1851 6.81491C22.7486 4.37837 19.4458 3.00661 16 3ZM22.1875 13.725L14.8625 20.725C14.6731 20.9031 14.4225 21.0016 14.1625 21C14.0354 21.0018 13.9093 20.9785 13.7913 20.9313C13.6733 20.8841 13.5658 20.814 13.475 20.725L9.81251 17.225C9.71092 17.1364 9.62831 17.0281 9.56963 16.9067C9.51095 16.7854 9.47741 16.6534 9.47104 16.5187C9.46467 16.3841 9.48559 16.2495 9.53255 16.1231C9.57951 15.9968 9.65154 15.8812 9.7443 15.7834C9.83706 15.6856 9.94865 15.6075 10.0723 15.5539C10.196 15.5003 10.3293 15.4723 10.4641 15.4715C10.5989 15.4707 10.7325 15.4972 10.8568 15.5493C10.9811 15.6015 11.0936 15.6783 11.1875 15.775L14.1625 18.6125L20.8125 12.275C21.0069 12.1054 21.2594 12.0174 21.5172 12.0296C21.7749 12.0418 22.018 12.1532 22.1955 12.3404C22.3731 12.5277 22.4714 12.7763 22.4699 13.0343C22.4684 13.2924 22.3672 13.5398 22.1875 13.725Z" fill="#04C800"/>
			</svg>
            `,
			alert: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M16 3C13.4288 3 10.9154 3.76244 8.77759 5.1909C6.63975 6.61935 4.9735 8.64968 3.98956 11.0251C3.00563 13.4006 2.74818 16.0144 3.24979 18.5362C3.7514 21.0579 4.98953 23.3743 6.80761 25.1924C8.62569 27.0105 10.9421 28.2486 13.4638 28.7502C15.9856 29.2518 18.5994 28.9944 20.9749 28.0104C23.3503 27.0265 25.3806 25.3603 26.8091 23.2224C28.2376 21.0846 29 18.5712 29 16C28.9934 12.5542 27.6216 9.25145 25.1851 6.81491C22.7485 4.37837 19.4458 3.00661 16 3ZM15.75 9C16.0467 9 16.3367 9.08797 16.5834 9.2528C16.83 9.41762 17.0223 9.65189 17.1358 9.92597C17.2493 10.2001 17.2791 10.5017 17.2212 10.7926C17.1633 11.0836 17.0204 11.3509 16.8107 11.5607C16.6009 11.7704 16.3336 11.9133 16.0426 11.9712C15.7517 12.0291 15.4501 11.9994 15.176 11.8858C14.9019 11.7723 14.6676 11.58 14.5028 11.3334C14.338 11.0867 14.25 10.7967 14.25 10.5C14.25 10.1022 14.408 9.72064 14.6893 9.43934C14.9706 9.15804 15.3522 9 15.75 9ZM17 23H16C15.7348 23 15.4804 22.8946 15.2929 22.7071C15.1054 22.5196 15 22.2652 15 22V16C14.7348 16 14.4804 15.8946 14.2929 15.7071C14.1054 15.5196 14 15.2652 14 15C14 14.7348 14.1054 14.4804 14.2929 14.2929C14.4804 14.1054 14.7348 14 15 14H16C16.2652 14 16.5196 14.1054 16.7071 14.2929C16.8946 14.4804 17 14.7348 17 15V21C17.2652 21 17.5196 21.1054 17.7071 21.2929C17.8946 21.4804 18 21.7348 18 22C18 22.2652 17.8946 22.5196 17.7071 22.7071C17.5196 22.8946 17.2652 23 17 23Z" fill="#2B5EE1"/>
			</svg>
            `,
			close: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M25 7L7 25" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			<path d="M25 25L7 7" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
            `,
			countdown: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path class="bgCircle" opacity="0.1" d="M28 16C28 22.6274 22.6274 28 16 28C9.37258 28 4 22.6274 4 16C4 9.37258 9.37258 4 16 4C22.6274 4 28 9.37258 28 16Z" stroke="black" stroke-width="2" />
			<path stroke-linecap="round" class="progressCircle" d="M28 16C28 22.6274 22.6274 28 16 28C9.37258 28 4 22.6274 4 16C4 9.37258 9.37258 4 16 4C22.6274 4 28 9.37258 28 16Z" stroke="black" stroke-width="2" />
			</svg>
			`,
		};

		// Function to build the alert element
		function buildElement(text, type, duration) {
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

			if (duration === 'persisted') {
				// Creating the close icon and appending it to the notifcation element we created above
				var alertClose = document.createElement('div');
				alertClose.classList.add('alerts-close-icon');
				alertClose.innerHTML = icons.close;
				alert.appendChild(alertClose);

				// Evenlistener for the close button
				alertClose.addEventListener('click', () => {
					// First we remove the class, giving us the reverse animation
					alert.classList.remove('show');

					// We wait for the animation duration before we remove the element from the DOM
					setTimeout(() => {
						alert.remove();
					}, 400);
				});
			} else {
				// Creating the countdown icon and appending it to the notifcation element we created above
				var alertCountDown = document.createElement('div');
				alertCountDown.classList.add('alerts-countdown-icon');
				alertCountDown.innerHTML = icons.countdown;
				alertCountDown.style.animationDuration = duration.toString() + 'ms';
				alert.appendChild(alertCountDown);
			}
			// We return the alert element
			return alert;
		}

		if (typeof duration === 'number' || duration === 'persisted') {
			// We build the element using th build function
			var newAlert = buildElement(text, type, duration);

			// We append the alert to the container
			alertContainer.appendChild(newAlert);

			// Here we wait a short delay so that the show class attributes dont apply instantly, giving us the animation.
			setTimeout(() => {
				newAlert.classList.add('show');
			}, 10);

			// This timeout is for keeping the alert visable for the duration given by the duration param
			if (duration !== 'persisted') {
				setTimeout(() => {
					newAlert.classList.remove('show');
					setTimeout(() => {
						newAlert.remove();
					}, 400);
				}, duration);
			}
		} else {
			// This is a fallback if the duration element is not accepted
			console.error(
				'Duration argument (parameter 3 of the createAlert() function) is of an unaccepted value. It should be a Number > or = 0 or a string of the value "persisted" for persisted notifications'
			);
		}
	}
}
