#!/usr/bin/env ts-node
import inquirer from 'inquirer';
import chalk from 'chalk';
console.log(chalk.red.bold(`
 $$$$\                                    
$$  __$$\\                                   
$$ /  \\__| $$$$$$\\  $$$$$$\\$$$$\\   $$$$$$\\  
$$ |$$$$\\  \\____$$\\ $$  _$$  _$$\\ $$  __$$\\ 
$$ |\\_$$ | $$$$$$$ |$$ / $$ / $$ |$$$$$$$$ |   
$$ |  $$ |$$  __$$ |$$ | $$ | $$ |$$   ____|                       
\\$$$$$$  |\\$$$$$$$ |$$ | $$ | $$ |\\$$$$$$$\\ 
 \\______/  \\_______|\\__| \\__| \\__| \\_______|
`));
console.log(chalk.bold.redBright("\n\t Welcome to Adventure Game \n\t"));
class Player {
    _name;
    _fuel;
    constructor(name) {
        this._name = name;
        this._fuel = 100;
    }
    get name() {
        return this._name;
    }
    get fuel() {
        return this._fuel;
    }
    decreaseFuel() {
        this._fuel -= 20;
        if (this._fuel < 0) {
            this._fuel = 0;
        }
    }
    increaseFuel() {
        this._fuel = 100;
    }
}
class Opponent {
    _name;
    _fuel;
    constructor(name) {
        this._name = name;
        this._fuel = 100;
    }
    get name() {
        return this._name;
    }
    get fuel() {
        return this._fuel;
    }
    decreaseFuel() {
        this._fuel -= 20;
        if (this._fuel < 0) {
            this._fuel = 0;
        }
    }
}
async function adventureGame() {
    console.log(chalk.bold.yellow("Greetings from the First Battle Game!"));
    const playerName = await getPlayerName();
    const player = new Player(playerName);
    const opponentName = await chooseOpponent();
    const opponent = new Opponent(opponentName);
    while (true) {
        console.log(chalk.bold(`${player.name} VS ${opponent.name}`));
        const action = await getPlayerAction();
        switch (action) {
            case 'Attack':
                handleAttack(player, opponent);
                if (opponent.fuel <= 0 || player.fuel <= 0)
                    return;
                break;
            case 'Drink Energy':
                player.increaseFuel();
                console.log(chalk.yellow(`Great! You drank an energy drink. Your fuel is now ${player.fuel}`));
                break;
            case 'Run for life':
                console.log(chalk.red.bold(`Player ${player.name} runs away!`));
                return;
        }
    }
}
async function getPlayerName() {
    const { name } = await inquirer.prompt({
        name: 'name',
        type: 'input',
        message: 'Enter Player Name:'
    });
    return name;
}
async function chooseOpponent() {
    const { opponent } = await inquirer.prompt({
        name: 'opponent',
        type: 'list',
        message: 'Select your opponent:',
        choices: ['Dragon', 'Troll', 'Wizard']
    });
    return opponent;
}
async function getPlayerAction() {
    const { action } = await inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What do you want to do?',
        choices: ['Attack', 'Drink Energy', 'Run for life']
    });
    return action;
}
function handleAttack(player, opponent) {
    const playerWins = Math.random() < 0.5;
    if (playerWins) {
        opponent.decreaseFuel();
        console.log(chalk.yellow(`${opponent.name}'s fuel is now ${opponent.fuel}`));
        if (opponent.fuel <= 0) {
            console.log(chalk.red.bold(`Player ${player.name} wins!`));
        }
    }
    else {
        player.decreaseFuel();
        console.log(chalk.yellow(`${player.name}'s fuel is now ${player.fuel}`));
        if (player.fuel <= 0) {
            console.log(chalk.red.bold(`Player ${player.name} loses!`));
        }
    }
}
async function main() {
    try {
        await adventureGame();
        console.log(chalk.bold.yellow("Thanks for Playing!"));
    }
    catch (error) {
        console.error(chalk.red("An error  "));
    }
}
main();
