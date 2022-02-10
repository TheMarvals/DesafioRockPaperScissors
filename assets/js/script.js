/*Solicitamos nombre del jugador*/
const name = prompt("Enter your Nickname", "");
player1.innerHTML = '-' + name + '-';

var round = parseInt(prompt("how many rounds do you want to play?"));

/* Declaramos las constantes (no cambiaran su valor en ningun momento durante la ejecuciond de la aplicacion)*/

const ROCK = "rock";
const PAPER = "paper";
const SCISSORS = "scissors";

const TIE = 0;
const WIN = 1;
const LOST = 2;




/* Declaramos let (puede cambiar el valor, pero solo vivira en este bloque)*/

let isPlaying = false;
let player = 0;
let machine = 0;
let tied = 0;


/* Obtenemos Botones mediante el ID y lo asignamos a una constante*/

const rockBtn = document.getElementById("rock");
const paperBtn = document.getElementById("paper");
const scissorsBtn = document.getElementById("scissors");
const resultText = document.getElementById("start-text");
const userImg = document.getElementById("user-img");
const machineImg = document.getElementById("machine-img");

/* Agregamos evento "click" a cada botn*/

rockBtn.addEventListener("click", () => {
  play(ROCK);
});
paperBtn.addEventListener("click", () => {
  play(PAPER);
});
scissorsBtn.addEventListener("click", () => {
  play(SCISSORS);

});

function play(userOption) {
  if (isPlaying) return;

  isPlaying = true;

  userImg.src = "assets/img/right/" + userOption + ".png";

  resultText.innerHTML = "Chossing!";

  const interval = setInterval(function() {
    const machineOption = calcMachineOption();
    machineImg.src = "assets/img/left/" + machineOption + ".png";
  }, 200);

  setTimeout(function() {

    clearInterval(interval);

    const machineOption = calcMachineOption();
    const result = calcResult(userOption, machineOption);

    machineImg.src = "assets/img/left/" + machineOption + ".png";

    switch (result) {
      case TIE:
        tied++;
        resultText.innerHTML = "You have tied!";
        break;
      case WIN:
        player++;
        resultText.innerHTML = "You Win!";
        break;
      case LOST:
        machine++;
        resultText.innerHTML = "You lost!";
        break;
    }

    /* sumamos la cantidad de rounds y decidimos el resultado de la partida*/
    if (player + machine + tied === round) {
      if (player === machine) {
        Swal.fire({
          title: '<strong>DRAW</strong>',
          icon: 'success',
          html: '<p>' + player + ' - ' + machine + ' </p> <br>' +
            '<img src="assets/img/Draw.gif" alt="this slowpoke moves"  width="250" />',
          focusConfirm: false,
          allowOutsideClick: false,
          background: '#000B4D',
          confirmButtonText: 'Try again!',
          confirmButtonAriaLabel: 'Thumbs up, great!',
        }).then((result) => {
          /* Recargamos la web al obtener los resultados*/
          if (result.isConfirmed) {
            window.location.reload();
            reset();
          }
        })

      } else if (player > machine) {
        Swal.fire({
          title: '<strong id="win">YOU WIN</strong>',
          icon: 'success',
          html: '<p>' + player + ' - ' + machine + ' </p> <br>' +
            '<img src="assets/img/winner.gif" alt="this slowpoke moves"  width="250" />',
          focusConfirm: false,
          allowOutsideClick: false,
          background: '#000B4D',
          confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
          confirmButtonAriaLabel: 'Thumbs up, great!',
        }).then((result) => {
          /* Recargamos la web al obtener los resultados*/
          if (result.isConfirmed) {
            window.location.reload();
            reset();
          }
        })
        const canvas = document.getElementById('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let ctx = canvas.getContext('2d');

        class Particle {
          constructor(y) {
            this.x = (Math.random() * canvas.width);
            this.y = y;
            this.size = (Math.floor(Math.random() * 10)) + 10;
            this.hue = (Math.floor(Math.random() * 360));
            this.gone = false;
            this.degrees = Math.random() < 0.5 ? 0.1 : -0.1;
            this.angle = 0;
            this.rate = (Math.floor(Math.random() * 2)) + 0.5;
          }
          draw() {
            ctx.fillStyle = `hsl(${this.hue},50%,50%)`;
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.fillRect(0 - this.size / 2, 0 - this.size / 2, this.size, this.size);
            ctx.restore();
          }
          update() {
            if (this.y > canvas.height) {
              particleArray.push(new Particle(-50));
              this.gone = true;
            }
            this.y += this.rate;
            this.angle += this.degrees;
            this.draw();
          }
        }

        let particleArray = [];

        for (var i = 0; i < 400; i++) {
          particleArray.push(new Particle(
            Math.random() * canvas.height
          ));
        }

        function animate() {
          requestAnimationFrame(animate);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          for (var i = 0; i < particleArray.length; i++) {
            particleArray[i].update();
          }
          particleArray = particleArray.filter(particle => !particle.gone);
        }
        animate();
      } else {
        Swal.fire({
          title: '<strong id="lose">YOU LOSE</strong>',
          icon: 'error',
          html: '<p>' + player + ' - ' + machine + ' </p> <br>' +
            '<img src="assets/img/looser.gif" alt="this slowpoke moves"  width="250" /> <br>',
          focusConfirm: false,
          allowOutsideClick: false,
          background: '#000B4D',
          confirmButtonText: 'Try again!',
          confirmButtonAriaLabel: 'Thumbs up, great!',
        }).then((result) => {
          /* Recargamos la web al obtener los resultados*/
          if (result.isConfirmed) {
            window.location.reload();
            reset();
          }
        })
      }
    }

    isPlaying = false;
  }, 2000);
}



function calcMachineOption() {
  const number = Math.floor(Math.random() * 3);
  switch (number) {
    case 0:
      return ROCK;
    case 1:
      return PAPER;
    case 2:
      return SCISSORS;
  }
}

/*Funcion para decidir el ganador del round*/

function calcResult(userOption, machineOption) {
  if (userOption === machineOption) {
    return TIE;


  } else if (userOption === ROCK) {

    if (machineOption === PAPER) return LOST;
    if (machineOption === SCISSORS) return WIN;


  } else if (userOption === PAPER) {

    if (machineOption === SCISSORS) return LOST;
    if (machineOption === ROCK) return WIN;


  } else if (userOption === SCISSORS) {

    if (machineOption === ROCK) return LOST;
    if (machineOption === PAPER) return WIN;

  }
}
