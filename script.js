const body = document.body;

function applyTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        body.classList.add('dark-theme');
        body.classList.remove('light-theme');
    } else {
        body.classList.add('light-theme');
        body.classList.remove('dark-theme');
    }
}

applyTheme();
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);

const menuButton = document.getElementById('menu-button');
const modal = document.getElementById('menu-modal');
const closeModalButton = document.getElementById('close-modal');

menuButton.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeModalButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

//for featured today

const carousel = document.querySelector('.carousel');
const items = document.querySelectorAll('.carousel-item');
const dots = document.querySelectorAll('.dot');

let currentIndex = 0;

function showSlide(index) {
    items.forEach((item, idx) => {
        item.style.transform = `translateX(-${index * 100}%)`;
        dots[idx].classList.remove('active');
    });
    dots[index].classList.add('active');
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        showSlide(currentIndex);
    });
});

setInterval(() => {
    currentIndex = (currentIndex + 1) % items.length;
    showSlide(currentIndex);
}, 5000);

//for greeting text

document.addEventListener('DOMContentLoaded', () => {
    const greetingDiv = document.getElementById('greeting');

    function getGreeting() {
        const now = new Date();
        const hours = now.getHours();

        if (hours < 12) {
            return "Good Morning!";
        } else if (hours < 18) {
            return "Good Afternoon!";
        } else if (hours < 21) {
            return "Good Evening!";
        } else {
            return "Good Night!";
        }
    }

    function typewriterEffect(text, element) {
        let i = 0;
        element.textContent = ''; 

        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, 250); 
            }
        }

        setTimeout(type, 100);
    }

    const greeting = getGreeting();
    typewriterEffect(greeting, greetingDiv);
});

setTimeout(function() {
    var elements = document.getElementsByClassName('Greeting-Text');
    for (var i = 0; i < elements.length; i++) {
        elements[i].classList.add('fade-out');
    }
}, 7000);

//For typing skills

const skills = [
    { text: "HTML, CSS", element: document.querySelector(".typewriter-text") },
    { text: "JavaScript", element: document.querySelector(".typewriter-text1") },
    { text: "Python", element: document.querySelector(".typewriter-text2") },
    { text: "Artificial Intelligence", element: document.querySelector(".typewriter-text3") }
];

const typeSpeed = 125;

function typeWriter(skillIndex) {
    const currentSkill = skills[skillIndex];
    const typewriterTextElement = currentSkill.element;

    typewriterTextElement.style.visibility = "visible";
    
    let charIndex = 0;

    const typingInterval = setInterval(() => {
        if (charIndex < currentSkill.text.length) {
            typewriterTextElement.textContent += currentSkill.text.charAt(charIndex);
            charIndex++;
        } else {
            clearInterval(typingInterval); 
        }
    }, typeSpeed);
}

for (let i = 0; i < skills.length; i++) {
    typeWriter(i);
}
