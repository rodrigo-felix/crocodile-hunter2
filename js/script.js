let canvas = document.getElementById('area');
let ctx = canvas.getContext('2d');

const gameArea = {
    frames: 0,
    level: 0,
    speed: 0,
    crocs: [],
    score: 0,
    target: 0,
    drawScore: function() {
        ctx.font = '25px arial';
        ctx.fillStyle = 'white'
        ctx.fillText(`Score ${this.score} |`, 20, 670);
        ctx.fillText(`Your target is: ${this.target}`, 170, 670);
    },
    start: function (){
        this.interval = setInterval(updateArea, 20);
    }
};

class Background {
    constructor(){
        this.x = 0
        this.y = 0
        this.width = canvas.width
        this.height = canvas.height
        this.land = 200
        this.imgLand = new Image()
        this.imgLand.src = './style/game_images/sand.png'
        this.imgWater = new Image()
        this.imgWater.src = './style/game_images/water.png'
    }
    draw(){
        ctx.drawImage(this.imgWater, this.x, this.y, this.width, this.height-this.land);
        ctx.drawImage(this.imgLand, this.x, this.height-this.land, this.width, this.land);
    }
}

let background = new Background()

function clearArea () {
    ctx.clearRect(0, 0, 400, 700);
}

class Croc {

    constructor(posX, posY){
        this.x = posX
        this.y = posY
        this.width = 50
        this.height = 50
        this.img = new Image()
        this.img.src = './style/game_images/croc.png'
    }
    draw(){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
    move(){
        this.y = this.y + gameArea.speed
    }
}

function createCrocs(){
    if (gameArea.frames % 200 === 0) {
        let coluna1 = 30;
        let coluna2 = 120;
        let coluna3 = 210;
        let coluna4 = 300;
        let startCroc = (min, max) => Math.floor(Math.random() * (max - min) + min);
        gameArea.crocs.push(new Croc(coluna1, startCroc(-250, 0)));
        gameArea.crocs.push(new Croc(coluna2, startCroc(-250, 0)));
        gameArea.crocs.push(new Croc(coluna3, startCroc(-250, 0)));
        gameArea.crocs.push(new Croc(coluna4, startCroc(-250, 0)));
    }
}

function moveCrocs(){
    gameArea.crocs.forEach(croc => {
        croc.draw();
        croc.move();              
    });
}

let isAttack = false;
let x = 0;
let y = 0;

canvas.addEventListener('mousedown', e => {
    x = e.offsetX;
    y = e.offsetY;
    isAttack = true;
    validationAttack();
});

canvas.addEventListener('mouseup', e => {
    x = 0;
    y = 0;
    isAttack = false;
});

function validationAttack(){
    for (let i = 0; i < gameArea.crocs.length; i++) {
        if( y >= gameArea.crocs[i].y && y <= gameArea.crocs[i].y+50 && x >= gameArea.crocs[i].x && x <= gameArea.crocs[i].x+50){
            gameArea.score += 10
            gameArea.crocs.splice(i, 1)
            gameArea.speed += 0.1
        }
    }
}

function attackDone(){
    for (let i = 0; i < gameArea.crocs.length; i++) {
        if( gameArea.crocs[i].y > 550){
            const imgGameOver = new Image()
            imgGameOver.src = './style/game_images/gameover.PNG'
            clearInterval(gameArea.interval)
            clearArea()
            imgGameOver.onload = function(){
                ctx.drawImage(imgGameOver, 0, 0)
            }
        }
    }
}

function success(){
    if( gameArea.score === gameArea.target){
            const imgSuccess = new Image()
            imgSuccess.src = './style/game_images/success.PNG'
            clearInterval(gameArea.interval)
            clearArea()
            imgSuccess.onload = function(){
                ctx.drawImage(imgSuccess, 0, 0)
            }
            console.log(imgSuccess)
        }
    }

function updateArea() {
    gameArea.frames += 1
    clearArea();
    background.draw();
    createCrocs();
    moveCrocs();
    success();
    attackDone();
    gameArea.drawScore()
}

var btnR = document.querySelector("#btn-reset");
var btnL1 = document.querySelector("#btn-l1")
var btnL2 = document.querySelector("#btn-l2")
var btnL3 = document.querySelector("#btn-l3")

btnR.addEventListener("click", function() {
    window.location.reload(true);
    gameArea.start()
})

btnL1.addEventListener("click", function() {
        gameArea.speed = 1;
        gameArea.level = 1;
        gameArea.target = 200;
        gameArea.start()
})

btnL2.addEventListener("click", function() {
        gameArea.speed = 3;
        gameArea.level = 2;
        gameArea.target = 300;
        gameArea.start()
})

btnL3.addEventListener("click", function() {
        gameArea.speed = 5;
        gameArea.level = 3;
        gameArea.target = 400;
        gameArea.start()
})

