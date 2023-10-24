"use strict";

let player = 'X';
const gameboard = Array(9);
gameboard.fill('');
const bloco = document.querySelectorAll("div.bloco");
const modal = document.querySelector('.modalNone');
const textModal = document.querySelector('.modalNone>p');
const btnReset = document.querySelector('.btnReset');
const tPX = document.querySelector('#pontX');
const tPO = document.querySelector('#pontO');
const msg = document.querySelector('#msg');
const btnClose = document.querySelector('#close');
const placar = document.querySelector('.placarNone');
const showPlacar = document.querySelector('#showPlacar');
const btnMenu = document.querySelector('#btnMenu');
const menu = document.querySelector('.menuNone');


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

showPlacar.addEventListener('click', ()=>{
    placar.classList.add('placar');
})

btnClose.addEventListener("click", ()=>{
    placar.classList.remove('placar');
})

function checkWin(){

    for(const condition of winPositions){
        const[a, b, c] = condition;
        if (gameboard[a] && gameboard[a] === gameboard[b] && gameboard[a] === gameboard[c]) {
            modal.classList.add('modal');
            btnReset.classList.add('btnResetNone');
            textModal.innerHTML = `Jogador ${gameboard[a]} venceu!`;

            if(gameboard[a] == "X"){
                playerX += 1;
                tPX.innerHTML = playerX;
            }else{
                playerO += 1;
                tPO.innerHTML = playerO;
            }

            msg.textContent = 'Parece que alguém perdeu... Tenha uma revanche!!'
        }
    }
}


bloco.forEach((element, i) => {
    element.addEventListener("click", () => {
        if (!element.textContent) {
            const p = document.createElement('p');
            p.innerHTML = player;
            element.appendChild(p);
            gameboard[i] = player;
            
            bloco[i].classList.add(`bloco${player}`)

            player = player === 'X' ? 'O' : 'X';
            msg.textContent = `Vez do jogador ${player}`;


            checkWin();
        }
    })
});

btnReset.addEventListener('click', ()=>{
    gameboard.fill('');
    bloco.forEach((element, i)=>{
        element.textContent = '';
        player = 'X';
        bloco[i].classList.remove('blocoX');
        bloco[i].classList.remove('blocoO');
    });

    modal.classList.remove('modal');
    msg.textContent = 'Comece a sua jogada!';
    btnReset.classList.remove('btnResetNone');
});


btnMenu.addEventListener('click', ()=>{
    menu.classList.toggle('menu');
})


