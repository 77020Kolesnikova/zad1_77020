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