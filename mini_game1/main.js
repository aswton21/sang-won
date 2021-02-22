
const left_time = document.querySelector('.left_time');
const play_btn = document.querySelector('.play_btn');
const gameArea = document.querySelector('.gameArea');
const carrots = document.querySelector('.carrots');
const bugs = document.querySelector('.bugs');
const win_lost = document.querySelector('.win-lost');
const left_carrot = document.querySelector('.left_carrot');
const re_play = document.querySelector('.re_play');
const gameArea_Rec = gameArea.getBoundingClientRect();
console.log(gameArea_Rec);

let clicked = false;
let game_status = false;
const audio = new Audio('../mini_game1/carrot/sound/bg.mp3');
let id = 0;
let cnt = 10;
let sec = 10;

let timer;


function start_clock(){
    sec = 5;
    left_time.innerHTML = sec;

    timer = setInterval(() =>{
        left_time.innerHTML = sec--;
        if (sec === -1){
        clearInterval(timer);
        lost_end();
        }
    }, 1000);
}




function generateCarrots() {

    carrots.textContent = '';
    bugs.textContent = '';
    for (let i = 0; i < 10; i++){
        const positionWidth = Math.floor(Math.random() * 700);
        const positionHeight = Math.floor(Math.random() * 180);
        const carrot_li = document.createElement('li');
        const carrot_img = document.createElement('img');

        carrot_img.src = "../mini_game1/carrot/img/carrot.png";
        carrot_img.setAttribute('class', 'carrot');
        carrot_img.setAttribute('data-id',id);
        carrot_li.setAttribute('data-id', id);

        carrot_li.style.position = 'absolute';
        carrot_li.style.left =  positionWidth + 'px';
        carrot_li.style.top =  20 +  positionHeight + 'px';
        

        carrots.appendChild(carrot_li);
        carrot_li.appendChild(carrot_img);
        id++;
    };
} 

function generateBugs() {

    cnt = 10;
    for (let i = 0; i < 7; i++){
        const positionWidth = Math.floor(Math.random() * 700);
        const positionHeight = Math.floor(Math.random() * 180);
        const li = document.createElement('li');
        const bug_img = document.createElement('img');

        bug_img.src = "../mini_game1/carrot/img/bug.png";
        bug_img.setAttribute('class', 'bug');

        li.style.position = 'absolute';
        li.style.left =  positionWidth + 'px';
        li.style.top =  45 + positionHeight + 'px';
        
        bugs.appendChild(li);
        li.appendChild(bug_img);
    };
} 

function audio_play(){
    clicked? audio.pause():audio.play();
}

function game_end(message){
    const winlost_text = document.querySelector('.winlost_text');
    win_lost.style.display = 'flex';
    winlost_text.innerHTML = message;

}


play_btn.addEventListener('click', () =>{
    if (clicked){
        play_btn.innerHTML = '<i class="fas fa-play"></i>';
        audio_play();
        clearInterval(timer)

        clicked = false;
        game_status = false;
    }
    else{
        play_btn.innerHTML = '<i class="fas fa-square"></i>';
        win_lost.style.display = 'none';
        generateCarrots();
        generateBugs();
        audio_play();  
        start_clock();
        
       
        clicked = true;
        game_status = true;
        
    }
})

re_play.addEventListener('click', ()=>{
    play_btn.innerHTML = '<i class="fas fa-square"></i>';
    win_lost.style.display = 'none';
    clicked = false;
    game_status = false;
    generateCarrots();
    generateBugs();
    audio_play();  
    start_clock();
    
   
    clicked = true;
    game_status = true;
    
})

function win_end(){
    game_status = false;
    audio.pause()
    clearInterval(timer)
    const audio_win = new Audio('../mini_game1/carrot/sound/game_win.mp3');
    audio_win.play();
    game_end('YOU WIN!');
}

function lost_end(){
    game_status = false;
    audio.pause()
    clearInterval(timer)
    game_end('YOU LOST!');

}

gameArea.addEventListener('click', ()=>{
    
    const id = event.target.dataset.id;

    if (id){
    const carrot = document.querySelector(`.carrot[data-id="${id}"]`);
    const audio_carrot = new Audio('../mini_game1/carrot/sound/carrot_pull.mp3');
    if(game_status){
        audio_carrot.play();
        carrot.remove();
        cnt--;
        left_carrot.innerHTML = cnt;

    }
    if (cnt === 0){
        
        win_end();
        
    }
}
if(game_status){
    if(event.target.className === 'bug'){
        
        const audio_bug = new Audio('../mini_game1/carrot/sound/bug_pull.mp3');
        audio_bug.play();
        lost_end()
        }
    };
 })




