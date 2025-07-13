const player = {
    name: "Sebastián",
    points: 0,
    lives: 5,
    level: 1
}

const ballonsPerLevel = 5;
let ballons = 0;

function play(player) {
    let hasLost = false;

    console.log(`Bienvenido ${player.name}`);
    do {
        for (let i = 0; i < ballonsPerLevel; i++) {
            if (player.level === 5) {
                console.log(`¡Has llegado al nivel 5! ¡Felicidades! Ganaste el juego.`);
                return; // Termina el juego si llega al nivel 5
            }

            if (!randomProbability(player.level)) {
                ballons++;
                console.log(`Has inflado ${ballons} globo(s)`);
                if (ballons === ballonsPerLevel) {
                    player.level++;
                    console.log(`¡Felicidades! Has pasado al nivel ${player.level}`);
                    ballons = 0;
                    break;
                }
            } else {
                player.lives--;
                console.log(`Has perdido una vida, te queda(n) ${player.lives}`)
                if (player.lives === 0) {
                    hasLost = true;
                    break;
                }
            }
        }
    } while (!hasLost)

    console.log(`Has perdido, te has quedado sin vidas.`);
    console.log(`Has llegado al nivel ${player.level}`);
}

function linearProbability(level) {
    // Empieza en 0.1 y sube 0.1 por nivel, hasta un máximo de 0.95
    return Math.min(0.1 + (level - 1) * 0.1, 0.95);
}

function randomProbability(level) {
    const probability = linearProbability(level);
    const random = Math.random();

    const explode = random < probability;
    
    return explode;
}

play(player);

