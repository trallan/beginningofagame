let canvas = document.querySelector('.canvas');
let newEnemy = "";
let combat = false;
let attackSpeed = 2000;
let atkEnemyInt;
let enemyAtkInt;

class Player{
    constructor(name, health, level, exp, attack, armor, mana) {
        this.name = name;
        this.health = health;
        this.level = level;
        this.exp = exp;
        this.attack = attack;
        this.armor = armor;
        this.mana = mana;
    }
}

class Enemy{
    constructor(name, health, attack, armor, mana, exp){
        this.name = name;
        this.health = health;
        this.attack = attack;
        this.armor = armor;
        this.mana = mana;
        this.exp = exp;
    }
}
// PLAYER / CHARACTER
let newPlayer = new Player('Xovak', 100, 1, 0, 5, 0, 0)

// Enemy / Creature
let snake = new Enemy('Snake', 50, 2, 0, 0, 5)
let greywolf = new Enemy('Grey Wolf', 70, 4, 0, 0, 10)
let pineman = new Enemy('Pineman', 100, 10, 1, 0, 25)

let creatures = [snake, greywolf, pineman];
let enemyValue = Math.floor(Math.random() * creatures.length);

let renderPlayer = () => {
    canvas.innerHTML += `
    <div class="player">
            <ul>
                <li>
                    Name: ${newPlayer.name}
                </li>
                <li>
                    Health: ${newPlayer.health}
                </li>
                <li>
                    Level: ${newPlayer.level}
                </li>
                <li>
                    Exp: ${newPlayer.exp}
                </li>
                <li>
                    Attack: ${newPlayer.attack}
                </li>
                <li>
                    Armor: ${newPlayer.armor}
                </li>
            </ul>
    </div>
    `
}

let renderEnemy = (enemy) => {
    newEnemy = enemy;
    canvas.innerHTML += `
        <div class="enemy">
            <ul>
                <li>
                    ${enemy.name}
                </li>
                <li>
                    Health: ${enemy.health}
                </li>
                <li>
                    Mana: ${enemy.mana}
                </li>
            </ul>
            <button class="attack-enemy">Attack</button>
            <button class="escape-enemy">Run</button>
        </div>
    `
}

renderPlayer();
renderEnemy(creatures[enemyValue])

let attackBtn = document.querySelector('.attack-enemy')
let escapeBtn = document.querySelector('.escape-enemy')
let playerDiv = document.querySelector('.player');
let enemyDiv = document.querySelector('.enemy');

let atkEnemy = () => {
    combat = true;
    if(newEnemy.health > 0){
        let PlayerAtk = Math.floor(Math.random() * newPlayer.attack) + 1;
            newEnemy.health -= PlayerAtk;
            enemyDiv.children[0].children[1].innerText = "Health: " + newEnemy.health;
        if(newEnemy.health <= 0){
            newEnemy.health = 0;
            enemyDiv.children[0].children[1].innerText = "Health: " + newEnemy.health;
            newPlayer.exp += newEnemy.exp;
            playerDiv.children[0].children[3].innerText = "Exp: " + newPlayer.exp;
            combat = false;
        }
    }
}

let enemyAtk = () => {
    if(newPlayer.health > 0){
        let EnemyAtk = Math.floor(Math.random() * newEnemy.attack);
        newPlayer.health -= EnemyAtk;
        playerDiv.children[0].children[1].innerText = "Health " + newPlayer.health;
    }
    if(newEnemy.health <= 0){
        clearInterval(enemyAtkInt)
    }
}

let inCombat = () => {
    atkEnemyInt = setInterval(atkEnemy, attackSpeed)
    enemyAtkInt = setInterval(enemyAtk, 2000)
}


attackBtn.addEventListener('click', inCombat)

