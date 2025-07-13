const namePlayer = prompt("Ingrese su nombre: ");

const player = {
    name: namePlayer,
    points: 0,
    lives: 5,
    level: 1
};

const pointsPerLevel = 5;

function play(player) {
    let hasLost = false;

    console.log(`Bienvenido ${player.name}`);
    while (!hasLost) {
        if (player.level === 5) {
            console.log(`¡Has llegado al nivel 5! ¡Felicidades! Ganaste el juego.`);
            break;
        }

        if (!randomProbability(player.level)) {
            player.points++;
            console.log(`Has inflado un globo. Puntos: ${player.points}`);
            if (player.points % pointsPerLevel === 0) {
                player.level++;
                console.log(`¡Felicidades! Has pasado al nivel ${player.level}`);
            }
        } else {
            player.lives--;
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

function linearProbability(level) {
    // Empieza en 0.1 y sube 0.1 por nivel, hasta un máximo de 0.95
    return Math.min(0.1 + (level - 1) * 0.1, 0.95);
}

function randomProbability(level) {
    const probability = linearProbability(level);
    return Math.random() < probability;
}

play(player);

