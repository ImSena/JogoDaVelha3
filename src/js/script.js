"use strict";

let player = 'X';
const gameboard = Array(9);
gameboard.fill('');
const winPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
let playerX = 0;
let playerO = 0;

const playersMove = {
    'X': 0,
    'O': 0
}

let gameEnd = false;

const bloco = document.querySelectorAll("div.bloco");
const btnReset = document.querySelector('.btnReset');
const tPX = document.querySelector('#pontX');
const tPO = document.querySelector('#pontO');
const msg = document.querySelector('#msg');
const btnClose = document.querySelector('#close');
const placar = document.querySelector('.placarNone');
const btnMenu = document.querySelector('#btnMenu');
const menu = document.querySelector('.menuNone');
const btnShowPlacar = document.querySelector('#btnShowPlacar');



function showModalPlacar() {
    placar.classList.toggle('placar');
}

function checkWin() {
    for (const condition of winPositions) {
        const [a, b, c] = condition;
        if (gameboard[a] && gameboard[a] === gameboard[b] && gameboard[a] === gameboard[c]) {
            btnReset.classList.add('btnResetNone');

            if (gameboard[a] == "X") {
                playerX += 1;
                tPX.innerHTML = playerX;
            } else {
                playerO += 1;
                tPO.innerHTML = playerO;
            }

            msg.textContent = `Você perdeu Jogador ${player}... Tenha uma revanche!!`

            gameEnd = true;
        }
    }
}


function primaryClick(element, i) {
    return () => {

        if (!gameEnd) {
            if (playersMove[player] < 3 && !element.textContent) {
                const p = document.createElement('p');
                p.innerHTML = player;
                element.appendChild(p);
                gameboard[i] = player;

                bloco[i].classList.add(`bloco${player}`)
                playersMove[player]++

                player = player === 'X' ? 'O' : 'X';
                msg.textContent = `Vez do jogador ${player}`;
                checkWin();
            } else {
                if (element.textContent == player) {
                    const p = element.querySelector('p');
                    if (p) {
                        element.removeChild(p);
                        gameboard[i] = '';
                        bloco[i].classList.remove(`bloco${player}`);
                        playersMove[player]--;
                    }
                }

            }
        }
    }
}

bloco.forEach((element, i) => {
    element.addEventListener("click", primaryClick(element, i))
});

btnReset.addEventListener('click', () => {
    gameboard.fill('');
    bloco.forEach((element, i) => {
        element.textContent = '';
        player = 'X';
        playersMove.X = 0;
        playersMove.O = 0;
        bloco[i].classList.remove('blocoX');
        bloco[i].classList.remove('blocoO');
        gameEnd = false;
    });

    msg.textContent = 'Comece a sua jogada!';
    btnReset.classList.remove('btnResetNone')
});


btnMenu.addEventListener('click', () => {
    menu.classList.toggle('menu');
});


btnShowPlacar.addEventListener('click', () => {
    showModalPlacar();
});

btnClose.addEventListener("click", () => {
    showModalPlacar()
});