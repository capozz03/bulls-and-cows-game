const readlineSync = require('readline-sync');

const minNum = 0;
const maxNum = 9;
const minInt = 3;
const maxInt = 6;

const guessNumPC = getRandomArrayOfNumbers(minNum, maxNum, minInt, maxInt);

let numberAttempts = 5;

while (numberAttempts != 0) {

    let guessNumUser = readlineSync.question(`I made a number, try to guess this :) (I made a number of ${guessNumPC.length} digits) `);
    let arrUser = guessNumUser.split('').map(Number);
    const arraysAreEqual = JSON.stringify(arrUser) === JSON.stringify(guessNumPC)
    
    if (arraysAreEqual) {
        console.log('Поздравляю, Вы выиграли!')
        numberAttempts = 0
    } else {
        console.log(numInTheirPlaces(arrUser, guessNumPC))
        numberAttempts--
        numberAttempts === 0 
        ? console.log(`Вы проиграли :(`)
        : console.log(`Количество попыток: ${numberAttempts}`)
    }

}

// Функция, проверяющая наличие чисел на своих и не на своих местах

function numInTheirPlaces(arrUser, arrPC) {
    let countPlace = 0;
    let countMatch = 0;
    let arrNumPlace = [];
    let arrNumMatch = [];

    arrUser.filter(num => { 
        if (arrPC.includes(num) && arrUser.indexOf(num) === arrPC.indexOf(num)) {
            arrNumPlace.push(num)
            countPlace += 1
        }
        if (arrPC.includes(num) && arrUser.indexOf(num) !== arrPC.indexOf(num)) {
            arrNumMatch.push(num)
            countMatch += 1
        }
    });
    
    let resPlace = `цифр на своих местах - ${countPlace} (${arrNumPlace}), `
    let resMatch = `совпавших цифр не на своих местах - ${countMatch} (${arrNumMatch})` 
    return resPlace + resMatch
}

// Функция, генерирующая массив случайных неповторяющихся чисел

function getRandomArrayOfNumbers(minNum, maxNum, minInt, maxInt) {
    const arr = []
    const randomInt = Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
    for (let i = 0; i < randomInt; i++) {
        const randomNum = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
        !arr.includes(randomNum) ? arr.push(randomNum) : i--           
    }
    return arr
}

