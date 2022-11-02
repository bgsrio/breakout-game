const btnStart = document.getElementById("btnStart");
const grid = document.querySelector(".grid");
const scoreDisplay = document.querySelector("#score");

const blockWidth = 100;
const blockHeight = 20;
const ballDiameter = 16;
const boardWidth = 560;
const boardHeight = 300;
let xDirection = 1;
let yDirection = 1;

const userStart = [230, 10];
let currentPosition = userStart;

const ballStart = [270, 60];
let ballCurrentPosition = ballStart;

let timerId;
let score = 0;

// como fazer o jogo começar apenas com o click no botão jogar??
// btnStart.addEventListener("click", () => {
//   drawBall()
// });

//criando a classe bloco
class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis]; // ponto de onde sai o eixo X mais a largura do bloco
    this.topLeft = [xAxis, yAxis + blockHeight];
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
  }
}

// com essas propriedades, pode ser criada uma array com todos os blocos, partindo-se dos pontos x e y no grid.
const blocks = [
  new Block(10, 270),
  new Block(120, 270),
  new Block(230, 270),
  new Block(340, 270),
  new Block(450, 270),
  new Block(10, 240),
  new Block(120, 240),
  new Block(230, 240),
  new Block(340, 240),
  new Block(450, 240),
  new Block(10, 210),
  new Block(120, 210),
  new Block(230, 210),
  new Block(340, 210),
  new Block(450, 210),
];

// definindo os blocos - vai iterar os blocos dentro do grid a partir dos pontos nos atributos da array
function addBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.style.left = blocks[i].bottomLeft[0] + "px";
    block.style.bottom = blocks[i].bottomLeft[1] + "px";
    grid.appendChild(block);
    console.log(blocks[i].bottomLeft);
  }
}
addBlocks();

//adicionando user, que é o paddle que se desloca para rebater a bola
const user = document.createElement("div");
user.classList.add("user");
grid.appendChild(user);
drawUser();

//definindo a posição do usuário no grid a partir da userStart
function drawUser() {
  user.style.left = currentPosition[0] + "px";
  user.style.bottom = currentPosition[1] + "px";
}

// movimentando o user paddle no eixo x;
function moveUser(e) {
  switch (e.key) {
    case "ArrowLeft":
      if (currentPosition[0] > 0) {
        currentPosition[0] -= 10;
        console.log(currentPosition[0] > 0);
        drawUser();
      }
      break;
    case "ArrowRight":
      if (currentPosition[0] < boardWidth - blockWidth) {
        currentPosition[0] += 10;
        console.log(currentPosition[0]);
        drawUser();
      }
      break;
  }
}
document.addEventListener("keydown", moveUser);

//definindo a posição da bola no grid, como feito com o paddle do usuário
function drawBall() {
  ball.style.left = ballCurrentPosition[0] + "px";
  ball.style.bottom = ballCurrentPosition[1] + "px";
}

//adicionando a bola e suas especificações
const ball = document.createElement("div");
ball.classList.add("ball");
drawBall();
grid.appendChild(ball);

// movendo a bola, que vai se mexer 2px em cada eixo x e y, diagonalmente. A bola passa direto do grid.
function moveBall() {
  ballCurrentPosition[0] += xDirection;
  ballCurrentPosition[1] += yDirection;
  drawBall();
  checkForCollisions();
}
timerId = setInterval(moveBall, 10);

//identificando os obstáculos para redirecionar o sentido da bola no grid

function checkForCollisions() {
  // checa as colisões nas laterais e base dos blocos, iterando por todos eles
  for (let i = 0; i < blocks.length; i++) {
    console.log(ballCurrentPosition[0], ballCurrentPosition[1]);
    if (
      ballCurrentPosition[0] > blocks[i].bottomLeft[0] &&
      ballCurrentPosition[0] < blocks[i].bottomRight[0] &&
      ballCurrentPosition[1] + ballDiameter > blocks[i].bottomLeft[1] &&
      ballCurrentPosition[1] < blocks[i].topLeft[1]
    ) {
      //se a condição ocorre, o método vai remover a classe bloco
      const allBlocks = Array.from(document.querySelectorAll(".block"));
      allBlocks[i].classList.remove("block");
      blocks.splice(i, 1);
      changeDirection();
      score++;
      scoreDisplay.innerHTML = `Você quebrou ${score} blocos`;
    }
    if (blocks.length == 0) {
      scoreDisplay.innerHTML = "Parabéns! Você ganhou!";
      clearInterval(timerId);
      document.removeEventListener("keydown", moveUser);
    }
  }

  // checa as colisões nas paredes, mantendo o comportamento
  if (
    ballCurrentPosition[0] >= boardWidth - ballDiameter ||
    ballCurrentPosition[1] >= boardHeight - ballDiameter ||
    ballCurrentPosition[0] <= 0
  ) {
    changeDirection();
  }

  //checa colisões no user paddle e mantém o comportamento de mudar de direção
  if (
    ballCurrentPosition[0] > currentPosition[0] &&
    ballCurrentPosition[0] < currentPosition[0] + blockWidth &&
    ballCurrentPosition[1] > currentPosition[1] &&
    ballCurrentPosition[1] < currentPosition[1] + blockHeight
  ) {
    changeDirection();
  }

  //game over - condição que determina o fim do jogo, ao tocar na base do grid
  if (ballCurrentPosition[1] <= 0) {
    clearInterval(timerId);
    scoreDisplay.innerHTML = "Você perdeu!";
    document.removeEventListener("keydown", moveUser);
  }
}

// esta função vai determinar a mudança de direção da bola sempre que atingir um obstáculo
function changeDirection() {
  // se sobe positivamente nos eixos x e y - direção NE
  if (xDirection === 1 && yDirection === 1) {
    yDirection = -1;
    return;
  }
  // direção SE
  if (xDirection === 1 && yDirection === -1) {
    xDirection = -1;
    return;
  }
  // direção SO
  if (xDirection === -1 && yDirection === -1) {
    yDirection = 1;
    return;
  }
  // direção NO
  if (xDirection === -1 && yDirection === 1) {
    xDirection = 1;
    return;
  }
}
