// Numer indeksu: 77020
const titleElement = document.getElementById('typing-title');
const titleText = titleElement.textContent; 
titleElement.textContent = ''; 
let charIndex = 0;

function typeWriter() {
    if (charIndex < titleText.length) {
        titleElement.textContent += titleText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 100); 
    }
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.15 });

window.onload = () => {
    typeWriter();
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
};

const themeBtn = document.getElementById('theme-btn');
const themeLink = document.querySelector('link[rel="stylesheet"]');

themeBtn.addEventListener('click', () => {
    if (themeLink.getAttribute('href') === 'red.css') {
        themeLink.setAttribute('href', 'green.css');
    } else {
        themeLink.setAttribute('href', 'red.css');
    }
});


const toggleBtn = document.getElementById('toggle-section-btn');
const sectionToHide = document.getElementById('experience-section');

toggleBtn.addEventListener('click', () => {
    if (sectionToHide.style.display === 'none') {
        sectionToHide.style.display = 'block';
    } else {
        sectionToHide.style.display = 'none';
    }
});


const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
        let isValid = true;

        const firstName = document.getElementById('firstName');
        const lastName = document.getElementById('lastName');
        const email = document.getElementById('email');
        const message = document.getElementById('message');

        clearErrors();

        const hasNumber = /\d/;

        if (firstName.value.trim() === '') {
            showError(firstName, 'firstNameError', 'Pole Imię jest wymagane.');
            isValid = false;
        } else if (hasNumber.test(firstName.value)) {
            showError(firstName, 'firstNameError', 'Imię nie może zawierać cyfr.');
            isValid = false;
        }

        if (lastName.value.trim() === '') {
            showError(lastName, 'lastNameError', 'Pole Nazwisko jest wymagane.');
            isValid = false;
        } else if (hasNumber.test(lastName.value)) {
            showError(lastName, 'lastNameError', 'Nazwisko nie może zawierać cyfr.');
            isValid = false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value.trim() === '') {
            showError(email, 'emailError', 'Pole E-mail jest wymagane.');
            isValid = false;
        } else if (!emailPattern.test(email.value)) {
            showError(email, 'emailError', 'Podaj poprawny adres e-mail.');
            isValid = false;
        }

        if (message.value.trim() === '') {
            showError(message, 'messageError', 'Pole Wiadomość jest wymagane.');
            isValid = false;
        }

        if (isValid) {
            document.getElementById('successMessage').style.display = 'block';
            contactForm.reset(); 
        } else {
            document.getElementById('successMessage').style.display = 'none';
        }
    });
}

function showError(inputElement, errorElementId, errorMessage) {
    inputElement.classList.add('error');
    document.getElementById(errorElementId).innerText = errorMessage;
}

function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.innerText = '');

    const errorInputs = document.querySelectorAll('.error');
    errorInputs.forEach(input => input.classList.remove('error'));
}