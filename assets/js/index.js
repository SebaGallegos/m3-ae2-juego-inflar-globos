/**
 * Código que se encarga de manejar la lógica del juego de inflar globos.
 * 
 * @author Sebastián Gallegos Frías
 */


// // Solicita el nombre del jugador al inicio del juego
// const namePlayer = prompt("Ingrese su nombre: ");

// // Si el nombre es nulo o vacío, muestra un mensaje de alerta
// // instando al usuario a ingresar un nombre.
// if (!namePlayer || namePlayer.trim() === "") {
//   alert("El nombre es obligatorio. Por favor, recargue la página e ingrese un nombre.");
//   throw new Error("Nombre de jugador vacío o inválido.");
// }

// Se define un objeto "player"
// que contiene propiedades como nombre, puntos, vidas y nivel iniciales.
const player = {
  name: "Test",
  points: 0,
  lives: 3,
  level: 1
};


// Se definen constantes que controlan la lógica del juego:
const pointsPerLevel = 5;       // Puntos para subir de nivel
const pointsToExtraLife = 10;   // Puntos para ganar una vida extra
const maxPoints = 25;           // Puntaje máximo permitido
const maxLives = 5;             // Máximo de vidas permitidas

/**
 * Función principal que inicia el juego.
 * 
 * @param {*} player Objeto que representa al jugador
 */
function play(player) {
  // Variable que indica si el jugador ha perdido
  let hasLost = false;

  console.log("Bienvenido " + player.name);

  // Mientras el jugador no haya perdido,
  // se ejecuta el bucle del juego.
  // El jugador puede ganar puntos, subir de nivel o perder vidas.
  while (!hasLost) {
    // Condición de borde: nivel máximo
    if (player.level === 5) {
      console.log("¡Has llegado al nivel 5! ¡Felicidades! Ganaste el juego.");
      break;
    }

    // Se simula la acción de inflar un globo
    // Si randomProbability devuelve false, el jugador gana puntos,
    if (!randomProbability(player.level)) {
      player.points++;
      // Condición de borde: puntaje máximo
      if (player.points > maxPoints) {
        player.points = maxPoints;
        console.log("¡Has alcanzado el puntaje máximo!");
        break;
      }
      console.log(`Has inflado un globo. Puntos: ${player.points}`);

      // si el puntaje alcanza los 10 puntos (simbolizado en este caso por el módulo
      // de puntos con respecto a pointsToExtraLife), el jugador gana una vida extra.
      if (player.points % pointsToExtraLife === 0) {
        if (player.lives < maxLives) {
          player.lives++;
          console.log(`¡Has ganado una vida extra! Vidas: ${player.lives}`);
        } else {
          console.log("¡No puedes tener más de " + maxLives + " vidas!");
        }
      }

      // Si el puntaje alcanza los 5 puntos (simbolizado en este caso por el módulo
      // de puntos con respecto a pointsPerLevel), el jugador sube de nivel.
      if (player.points % pointsPerLevel === 0) {
        player.level++;
        console.log(`¡Felicidades! Has pasado al nivel ${player.level}`);
      }
    // Si por el contrario randomProbability devuelve true,
    // el jugador pierde una vida.
    } else {
      player.lives--;
      // Condición de borde: vidas negativas
      if (player.lives < 0) player.lives = 0;
      console.log(`¡Globo reventado! Has perdido una vida. ${player.lives === 0 ? 'Te has quedado sin vidas.' : `Te quedan ${player.lives} vidas.`}`);
      if (player.lives === 0) {
        hasLost = true;
      }
    }
  }

  if (player.lives === 0) {
    console.log(`Has perdido, te has quedado sin vidas.`);
  }

  console.log(`Puntaje final: ${player.points}`);
  console.log(`Nivel alcanzado: ${player.level}`);
}

/**
 * Función lineal que calcula la probabilidad de que un globo reviente
 * en base a su nivel, donde el nivel 1 tiene una probabilidad de 10%
 * y aumenta en 10% por cada nivel hasta un máximo de 95%
 * 
 * @param {number} level El nivel actual del jugador
 * @returns Porcentaje de probabilidad que el globo reviente.
 */
function linearProbability(level) {
  return Math.min(0.1 + (level - 1) * 0.1, 0.95);
}

/**
 * Función que determina si un globo revienta o no
 * 
 * @param {number} level Nivel actual del jugador
 * @returns {boolean} Retorna true si el globo revienta, false si no.
 */
function randomProbability(level) {
  // Se obtiene la probabilidad lineal en base al nivel
  const probability = linearProbability(level);
  // Se genera un número aleatorio entre 0 y 1
  // y se compara con la probabilidad para determinar si el globo revienta
  return Math.random() < probability;
}

// Se inicia el juego llamando a la función play
play(player);

