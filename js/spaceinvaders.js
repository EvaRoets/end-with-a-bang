const battlefield = document.querySelector('.battlefield');
let currentShooterIndex = 202;
let width = 15;

for(let i = 0; i < 225; i++){
    const tile = document.createElement('div');
    battlefield.appendChild(tile);
}

const tiles = Array.from(document.querySelectorAll('.battlefield div'))

const invaders = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
]

const draw = () => {
    for(let i = 0; i < invaders.length; i++){
        tiles[invaders[i]].classList.add('invader');
    }
}

draw();

tiles[currentShooterIndex].classList.add('shooter');

const moveShooter = (a) => {
    tiles[currentShooterIndex].classList.remove('shooter');
    switch(a.key){
        case 'ArrowLeft':
            if(currentShooterIndex % width !== 0){
                currentShooterIndex--;
            }
            break;
        case 'ArrowRight':
            if(currentShooterIndex % width < width -1){
                currentShooterIndex++;
            }
            break;
    }
    tiles[currentShooterIndex].classList.add('shooter');
}

document.addEventListener('keydown', moveShootera);