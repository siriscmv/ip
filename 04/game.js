const TIMES = [90, 60, 30];
const SYMBOLS = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '+'];

const level = parseInt(window.location.search.match(/level=(\d)/)?.[1]);

document.getElementsByClassName('info')[0].children[0].innerText += ` (level ${level})`;

const shuffleArray = (array) => {
    let currentIndex = array.length,  randomIndex;
  
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  };

let score = 0;
let timeLeft = TIMES[level-1];

const cards = shuffleArray([...SYMBOLS, ...SYMBOLS]);
const boardContents = cards.map((_, i) => `<div onclick="handle(${i})">∅∅</div>`);

document.getElementById('board').innerHTML = boardContents.join('');
document.getElementById('timer').innerText = `${timeLeft}s left`;

const timerInterval = setInterval(() => {
    let timer = document.getElementById('timer');
    timeLeft--;
    timer.innerText = `${timeLeft}s left`;

    if (timeLeft === 0) {
        alert('Better luck next time');
        window.location.reload();
    }
}, 1_000);

const memory = [];
const finalisedCards = [];
let block = false;

const handle = (card) => {
    const cardNumber = parseInt(card);
    const cardDiv = document.getElementById('board').children.item(cardNumber);

    if (block) return;
    if (finalisedCards.includes(cardNumber)) return;

    cardDiv.innerText = cards[cardNumber];
    cardDiv.classList.add('activated');

    if (memory.length === 0) {
        memory.push(cardNumber);
    } else if (memory.length === 1) {
        if (memory[0] === cardNumber) {
            return;
        }
        else if (cards[memory[0]] === cards[cardNumber]) {
            block=true;
            setTimeout(() => {
                document.getElementById('board').children.item(memory[0]).innerText = '';
                document.getElementById('board').children.item(cardNumber).innerText = '';

                document.getElementById('board').children.item(memory[0]).classList.replace('activated', 'hide');
                document.getElementById('board').children.item(cardNumber).classList.replace('activated', 'hide');

                score+=2;
                document.getElementById('score').innerText = `Score: ${score}`;

                finalisedCards.push(memory[0], cardNumber);
                memory.pop();
                
                if (score === cards.length) {
                    alert('Good game!');
                    window.location.reload();
                }

                block = false;
            }, 400);
        } else {
            block=true;
            setTimeout(() => {
                document.getElementById('board').children.item(memory[0]).innerText = "∅∅";
                document.getElementById('board').children.item(cardNumber).innerText = "∅∅";

                document.getElementById('board').children.item(memory[0]).classList.remove('activated');
                document.getElementById('board').children.item(cardNumber).classList.remove('activated');

                memory.pop();
                block = false;
            }, 600);
        }
    }
}