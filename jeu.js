const levels = {
    1: { min: 0, max: 10, time: 5 },
    2: { min: 20, max: 50, time: 10 },
    3: { min: 40, max: 100, time: 15 },
    4: { min: 50, max: 200, time: 20 },
    5: { min: 75, max: 400, time: 25 },
};

let inter;
let currentLevel = 1;
let level = levels[currentLevel];

const chronoDisplay = document.querySelector('p.chrono');
const levelDisplay = document.querySelector('p.level');
const nbr1 = document.querySelector('p.nbr1');
const nbr2 = document.querySelector('p.nbr2');
const input = document.querySelector('input');
let result = 0;
let scoreDisplay = document.querySelector('p.score');
let score = 0;

const randomNumber = (max, min = 0) => {
    return Math.floor(Math.random() * (max - min) + min);
};

const update = () => {
    let num1 = randomNumber(level.max, level.min);
    let num2 = randomNumber(level.max, level.min);
    result = num1 + num2;
    nbr1.textContent = num1;
    nbr2.textContent = num2;
    scoreDisplay.textContent = `score : ${score}`;
    levelDisplay.textContent = `niveau : ${currentLevel}`;
};

let chrono = () => {
    let count = level.time;
    inter = setInterval(() => {
        chronoDisplay.textContent = count;
        if (count == 0) {
            clearInterval(inter);
            if (score == 0) {
                alert('vous avez perdu !');
                location.reload();
            } else {
                score -= 5;
                update();
                chrono();
            }
        }
        count -= 1;
    }, 1000);
};

update();
chrono();

input.addEventListener('keyup', (e) => {
    const value = e.target.value;
    if (parseInt(value) == result) {
        clearInterval(inter);
        e.target.value = "";
        score += 5;
        if (score == 30 ) {
            if (currentLevel == 5) {
                alert('Bravo vous avez terminé le jeu!');
                location.reload();
            } else {
                currentLevel += 1;
                level = levels[currentLevel];
                
                update();
                chrono();
            }
        } else {
            update();
            chrono();
        }
    }
});

