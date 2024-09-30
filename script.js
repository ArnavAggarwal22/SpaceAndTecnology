const planets = {
    "Mercury": {
        description: "Mercury is the smallest planet in the Solar System and the closest to the Sun.",
        imageUrl: ""
    },
    "Venus": {
        description: "Venus is the second planet from the Sun and has a thick, toxic atmosphere.",
        imageUrl: "" 
    },
    "Earth": {
        description: "Earth is the third planet from the Sun and the only one known to harbor life.",
        imageUrl: "" 
    },
    "Mars": {
        description: "Mars, known as the Red Planet, is the fourth planet from the Sun and may have once held water.",
        imageUrl: "" 
    },
    "Jupiter": {
        description: "Jupiter is the largest planet in the Solar System, known for its Great Red Spot.",
        imageUrl: "" 
    },
    "Saturn": {
        description: "Saturn is the second-largest planet and is famous for its extensive ring system.",
        imageUrl: "" 
    },
    "Uranus": {
        description: "Uranus is an ice giant with a blue-green hue due to methane in its atmosphere.",
        imageUrl: "https://example.com/images/uranus.jpg" 
    },
    "Neptune": {
        description: "Neptune is an ice giant and the farthest planet from the Sun in the Solar System.",
        imageUrl: "https://example.com/images/neptune.jpg"
    }
};


const quizQuestions = [
    { question: "Which planet is known as the Red Planet?", answer: "Mars" },
    { question: "What is the largest planet in the Solar System?", answer: "Jupiter" },
    { question: "Which planet is known for its rings?", answer: "Saturn" },
    { question: "Which planet is closest to the Sun?", answer: "Mercury" },
    { question: "Which planet has a day longer than its year?", answer: "Venus" },
    { question: "Which planet has the highest mountain in the solar system?", answer: "Mars" },
    { question: "Which planet is tilted on its axis?", answer: "Uranus" },
    { question: "What is the only planet that supports life?", answer: "Earth" },
    { question: "Which planet has a red hue due to iron oxide?", answer: "Mars" },
    { question: "Which planet is known for its deep blue color?", answer: "Neptune" },
    { question: "Which planet is often called Earth's twin?", answer: "Venus" },
    { question: "Which planet has the most extensive ring system?", answer: "Saturn" },
    { question: "Which planet is the furthest from the Sun?", answer: "Neptune" },
    { question: "Which planet is famous for its Great Dark Spot?", answer: "Neptune" },
    { question: "Which planet has the shortest day?", answer: "Jupiter" },
    { question: "Which planet is known for its thick atmosphere?", answer: "Venus" },
    { question: "Which planet is known for having the most moons?", answer: "Saturn" },
    { question: "Which planet has a storm larger than Earth?", answer: "Jupiter" },
    { question: "What planet is known for having an ice ring?", answer: "Uranus" },
    { question: "Which planet has a strong magnetic field?", answer: "Jupiter" }
];

let currentQuestionIndex = 0;
let score = 0;

function showPlanetInfo(planetName) {
    const planet = planets[planetName];
    if (!planet) return;

    const planetNameElement = document.getElementById('planet-name');
    const planetDescriptionElement = document.getElementById('planet-description');
    const planetImageElement = document.getElementById('planet-image');

    planetNameElement.textContent = planetName;
    planetDescriptionElement.textContent = planet.description;

   
    planetImageElement.src = planet.imageUrl;
    planetImageElement.alt = `${planetName} Image`; 

    
    document.getElementById('planet-info').style.display = 'block';
}

function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    document.getElementById('quiz-results').style.display = 'none';
    nextQuestion();
}

function nextQuestion() {
    if (currentQuestionIndex >= quizQuestions.length) {
        document.getElementById('quiz-results').style.display = 'block';
        document.getElementById('score').textContent = score;
        return;
    }

    const question = quizQuestions[currentQuestionIndex];
    document.getElementById('quiz-question').innerHTML = question.question;
    
    const optionsList = document.getElementById('options-list');
    optionsList.innerHTML = '';

    const correctAnswer = question.answer;
    const incorrectAnswers = Object.keys(planets).filter(planet => planet !== correctAnswer);
    const allOptions = [correctAnswer, ...getRandomItems(incorrectAnswers, 3)].sort(() => Math.random() - 0.5);

    allOptions.forEach(answer => {
        const li = document.createElement('li');
        li.textContent = answer;
        li.onclick = () => selectAnswer(answer);
        optionsList.appendChild(li);
    });

    document.getElementById('next-button').style.display = 'none';
}

function getRandomItems(arr, count) {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function selectAnswer(selectedAnswer) {
    const question = quizQuestions[currentQuestionIndex];
    const optionsList = document.getElementById('options-list').children;

    for (let option of optionsList) {
        if (option.textContent === question.answer) {
            option.classList.add('correct');
        } else {
            option.classList.add('wrong');
        }
        option.onclick = null; 
    }

    if (selectedAnswer === question.answer) {
        score++;
    }

    currentQuestionIndex++;
    document.getElementById('next-button').style.display = 'block';
    document.getElementById('progress-bar').style.width = `${(currentQuestionIndex / quizQuestions.length) * 100}%`;
}

window.onload = startQuiz;
