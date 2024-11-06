const questions = [
    {
        question: "1. What is the value of 7^3 ?",
        options: ["21", "343", "27", "49"],
        answer: 1
    },
    {
        question: "2. What is the process by which plants make their own food using sunlight?",
        options: ["Respiration", "Digestion", "Photosynthesis", "Transpiration"],
        answer: 2
    },
    {
        question: "3. What is the synonym of the word 'abundant'?",
        options: ["Rare", "Scarce", "Plentiful", "Minimal"],
        answer: 2
    },
    {
        question: "4. Who was known as the “Father of the Indian Constitution”?",
        options: ["Mahatma Gandhi", "Jawaharlal Nehru", "Sardar Patel", "Dr. B.R. Ambedkar"],
        answer: 3
    },
    {
        question: "5. What is the main gas found in the Earth's atmosphere?",
        options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"],
        answer: 1
    },
    {
        question: "6. A triangle has angles of 40° and 60°. What is the measure of the third angle?",
        options: ["40°", "80°", "100°", "120°"],
        answer: 1
    },
    {
        question: "7. Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: 1
    },
    {
        question: "8. What is the smallest unit of life that can be said to be alive?",
        options: ["Atom", "Molecule", "Cell", "Tissue"],
        answer: 2
    },
    {
        question: "9. Choose the correct form of the verb to complete the sentence: “She _____ to the park every morning.”",
        options: ["go", "going", "goes", "gone"],
        answer: 2
    },
    {
        question: "10. Which of these animals is a herbivore?",
        options: ["Lion", "Tiger", "Elephant", "Wolf"],
        answer: 2
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
let timeRemaining = 600; 

document.getElementById('start-button').addEventListener('click', startTest);
document.getElementById('next-button').addEventListener('click', nextQuestion);
document.getElementById('prev-button').addEventListener('click', prevQuestion);
document.getElementById('submit-button').addEventListener('click', showResults);

function startTest() {
    document.getElementById('start-container').classList.add('hidden');
    document.getElementById('test-container').classList.remove('hidden');
    showQuestion();
    startTimer();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            showResults();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const timerElement = document.getElementById('timer');
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerElement.innerText = `Time Remaining: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function showQuestion() {
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    questionElement.innerText = questions[currentQuestionIndex].question;
    optionsElement.innerHTML = '';

    questions[currentQuestionIndex].options.forEach((option, index) => {
        const optionBox = document.createElement('div');
        optionBox.classList.add('option-box');

     
        optionBox.addEventListener('click', () => {
            const radioButton = optionBox.querySelector('input[type="radio"]');
            radioButton.checked = true;
        });

        optionBox.innerHTML = `
            <input type="radio" name="option" value="${index}" id="option-${index}">
            <label for="option-${index}">${option}</label>
        `;

        optionsElement.appendChild(optionBox);
    });
}

function nextQuestion() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
        const answer = parseInt(selectedOption.value);
        if (answer === questions[currentQuestionIndex].answer) {
            score++;
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResults();
        }
    } else {
        alert("Please select an option!");
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
    }
}

function showResults() {
    clearInterval(timerInterval); 
    document.getElementById('test-container').classList.add('hidden');
    document.getElementById('result-container').classList.remove('hidden');

    const scoredMarks = score * 4;
    const percentile = ((scoredMarks / (questions.length * 4)) * 100).toFixed(2);

    const userName = localStorage.getItem("userName") || "[Name]";

    document.getElementById('result-container').innerHTML = `
        <div id="certificate" style="
            position: relative;
            max-width: 450px;
            margin: 20px auto;
            padding: 30px;
            border: 5px solid #4A90E2;
            border-radius: 15px;
            background: linear-gradient(135deg, #e3f2fd, #ffffff);
            text-align: center;
            font-family: Arial, sans-serif;
            color: #333;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
            overflow: hidden;
        ">
            <div style="
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) rotate(-45deg);
                font-size: 60px;
                font-weight: bold;
                color: #00000015;
                white-space: nowrap;
                z-index: 0;
                pointer-events: none;
                user-select: none;
            ">
                SHAHID 06
            </div>
            <h2 style="color: #4A90E2; font-size: 24px; font-weight: bold; position: relative; z-index: 1;">Certificate of Achievement</h2>
            <p style="margin: 15px 0; font-size: 18px; color: #333; position: relative; z-index: 1;">This is to certify that</p>
            <h3 id="certificate-name" style="font-size: 22px; color: #333; font-weight: bold; position: relative; z-index: 1;">${userName}</h3>
            <p style="margin: 15px 0; font-size: 18px; color: #333; position: relative; z-index: 1;">has successfully completed the developer test with</p>
            <p style="font-size: 18px; color: #4A90E2; font-weight: bold; position: relative; z-index: 1;">Scored = ${scoredMarks} / 40 (Percentile: ${percentile}%)</p>
            <p style="margin-top: 15px; font-size: 14px; color: #555; position: relative; z-index: 1;">Congratulations on your achievement!</p>
        </div>
    `;

    generateCertificate(userName, scoredMarks, percentile);
}


emailjs.init("7l42bR6ys0ZTVgmKG");
function generateCertificate(userName, scoredMarks, percentile) {
    const certificateDiv = document.getElementById('certificate');

    html2canvas(certificateDiv).then(canvas => {
        const imageData = canvas.toDataURL('image/jpeg', 0.5); 


        const link = document.createElement('a');
        link.href = imageData;
        link.download = `${userName}-Certificate.jpg`;
        link.click();


        const emailParams = {
            certificate_image: imageData
        };

  
        emailjs.send("service_58gm69l", "template_m22o5xa", emailParams)
    });
}
