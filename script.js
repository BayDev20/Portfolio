// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Theme switch functionality
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme') || 'dark';

document.documentElement.setAttribute('data-theme', currentTheme);
if (currentTheme === 'dark') {
    toggleSwitch.checked = true;
}

function switchTheme(e) {
    const theme = e.target.checked ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

toggleSwitch.addEventListener('change', switchTheme, false);

// Typewriter effect
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["Full Stack Developer", "UI/UX Designer", "Problem Solver"];
const colorArray = ["#3498db", "#2ecc71", "#e74c3c"]; // Updated green color
const typingDelay = 200;
const erasingDelay = 100;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        cursorSpan.classList.remove("typing");
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        cursorSpan.classList.remove("typing");
        textArrayIndex++;
        if(textArrayIndex >= textArray.length) textArrayIndex = 0;
        typedTextSpan.style.color = colorArray[textArrayIndex]; // Changed from classList to style.color
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    if(textArray.length) {
        typedTextSpan.style.color = colorArray[0]; // Changed from classList to style.color
        setTimeout(type, newTextDelay + 250);
    }
});

// Scroll-to-top functionality
const scrollToTopBtn = document.getElementById("scrollToTop");

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100) {
        scrollToTopBtn.classList.add("show");
    } else {
        scrollToTopBtn.classList.remove("show");
    }
});

scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Animate skill bars
function animateSkills() {
    const skillPers = document.querySelectorAll('.skill-per');
    skillPers.forEach(skillPer => {
        const per = skillPer.getAttribute('per');
        skillPer.style.width = '0%';
        skillPer.style.transition = 'none';
        setTimeout(() => {
            skillPer.style.width = per;
            skillPer.style.transition = 'width 1s ease-in-out';
        }, 100);
    });
}

// Call animateSkills when the skills section is in view
const skillsSection = document.getElementById('skills');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

observer.observe(skillsSection);

// Swipable horizontal list of 7 projects
const projectCarousel = document.querySelector('.project-carousel');
const projectCards = document.querySelectorAll('.project-card');

function updateActiveCard() {
    const scrollPosition = projectCarousel.scrollLeft;
    const centerPosition = scrollPosition + projectCarousel.offsetWidth / 2;

    projectCards.forEach(card => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distanceFromCenter = Math.abs(centerPosition - cardCenter);

        if (distanceFromCenter < card.offsetWidth / 2) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }

        // Calculate opacity and scale based on distance from center
        const maxDistance = projectCarousel.offsetWidth / 2;
        const opacity = 1 - (distanceFromCenter / maxDistance) * 0.6; // Min opacity: 0.4
        const scale = 1 - (distanceFromCenter / maxDistance) * 0.3; // Min scale: 0.7

        card.style.opacity = opacity;
        card.style.transform = `scale(${scale})`;
    });
}

projectCarousel.addEventListener('scroll', updateActiveCard);

// Initial update
updateActiveCard();

// Smooth scroll to center card on click
projectCards.forEach(card => {
    card.addEventListener('click', () => {
        card.scrollIntoView({
            behavior: 'smooth',
            inline: 'center'
        });
    });
});

// Optional: Add arrow navigation
function scrollToNextCard() {
    const currentCard = document.querySelector('.project-card.active');
    const nextCard = currentCard.nextElementSibling || projectCards[0];
    nextCard.scrollIntoView({
        behavior: 'smooth',
        inline: 'center'
    });
}

function scrollToPrevCard() {
    const currentCard = document.querySelector('.project-card.active');
    const prevCard = currentCard.previousElementSibling || projectCards[projectCards.length - 1];
    prevCard.scrollIntoView({
        behavior: 'smooth',
        inline: 'center'
    });
}

// Add arrow key navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') scrollToNextCard();
    if (e.key === 'ArrowLeft') scrollToPrevCard();
});
