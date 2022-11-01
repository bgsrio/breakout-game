const grid = document.querySelector(".grid");
const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 560;

const userStart = [230, 10];
let currentPosition = userStart;

const ballStart = [270, 40];
let ballCurrentPosition = ballStart;

//create block
class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth.yAxis]; // ponto de onde sai o eixo X mais a largura do bloco
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
drawUser();
grid.appendChild(user);

//definindo a posição do usuário no grid a partir da userStart
function drawUser() {
  user.style.left = currentPosition[0] + "px";
  user.style.bottom = currentPosition[1] + "px";
}

//definindo a posição da bola no grid, como feito com o paddle do usuário
function drawBall() {
  ball.style.left = ballCurrentPosition[0] + "px";
  ball.style.bottom = ballCurrentPosition[1] + "px";
}

// movimentando o user no eixo x;
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

//adicionando a bola e suas especificações
const ball = document.createElement("div");
ball.classList.add("ball");
drawBall();
grid.appendChild(ball);

// movendo a bola, que vai se mexer 2px em cada eixo x e y, diagonalmente. A bola passa direto do grid.
function moveBall() {
  ballCurrentPosition[0] += 2;
  ballCurrentPosition[1] += 2;
  drawBall();
}
timerId = setInterval(moveBall, 15);

//identificando os obstáculos para redirecionar o sentido da bola no grid
// teste para o git
