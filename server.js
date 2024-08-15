const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors());

const food = 'FOOD';
const faces = 'FACES';
const flags = 'FLAGS';
const animals = 'ANIMALS';

const THEME_TYPE = {
    FOOD: food,
    FACES: faces,
    FLAGS: flags,
    ANIMALS: animals

}

const foodIcon = ["🍇", "🍈", "🍉", "🍊", "🍋", "🍌", "🍍", "🥭", "🍎", "🍏", "🍐", "🍑", "🍒", "🍓", "🥝", "🍅", "🍩"];
const facesIcon = ["😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "🙃", "😉", "😊", "😇", "🥰", "😍", "🤩", "😘", "😗", "😚", "😙", "😋", "😛", "😜", "🤪"];
const flagsIcon = ["🍇", "🍈", "🍉", "🍊", "🍋", "🍌", "🍍", "🥭", "🍎", "🍏", "🍐", "🍑", "🍒", "🍓", "🥝", "🍅", "🍩"];
const animalsImage =['IMG_1.jpg','IMG_2.jpg','IMG_3.jpg','IMG_4.jpg','IMG_5.jpg','IMG_6.jpg','IMG_7.jpg','IMG_8.jpg'];

app.get('/scores',(request , response ) =>{
    response.send(JSON.stringify(scoresData));
});


app.get('/cards/:difficulty/:theme', (request, response) => {
    console.log('difficulty', request.params.difficulty);
    console.log('theme', request.params.theme);

    let cards = [];

    if (request?.params?.theme && request?.params?.difficulty) {
        const difficulty = request.params.difficulty;
        
        
        switch (request.params.theme) {
            case THEME_TYPE.FOOD:
                cards = getCardFromIconList(foodIcon, difficulty);
                break;
            case THEME_TYPE.FACES:
                cards = getCardFromIconList(facesIcon, difficulty);
                break;
            case THEME_TYPE.FACES:
                cards = getCardFromIconList(flagsIcon, difficulty);
                break;
            case THEME_TYPE.ANIMALS:
                cards = getCardFromIconList(animalsImage, difficulty);
                break;

            default:
                break;
        }
        console.log(cards);
    }



    response.send(JSON.stringify({'cards': cards}));

});

function getCardFromIconList(list, quantity) {

    let iconIndexes = [];
    for (let i = 0; i < quantity; i++) {
        let iconIndex = getUniqueIndex(0,list.length, iconIndexes);
        iconIndexes.push(iconIndex);
    }

    let cards = [];

    for (let i = 0; i < iconIndexes.length; i++) {
        let icon = list[iconIndexes[i]];
        let card = {
            "isDiscovered": false,
            "icon": icon,
            "id": i
        };
        
        cards.push(card);
    }

    let cardsDuplicate = cards.slice();
    cards = cards.concat(cardsDuplicate)
    shuffle(cards);

    return cards
}

function getUniqueIndex(min, max, iconIndexes) {
    const newIndex = generateRandomIndex(min , max);

    for (let i = 0; i < iconIndexes.length; i++) {
        if (newIndex === iconIndexes[i]){
            return getUniqueIndex(min, max, iconIndexes)
        }
        
    }

    return newIndex;
}

function generateRandomIndex(min, max) {
    return Math.floor(min + Math.random() * (max - min))
}

function shuffle(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];

    }

  }

  // Used like so
  //let arr = [2, 11, 37, 42];
  //shuffle(arr);
  //console.log(arr);

app.listen(port, () => {
    console.log('MemoryGameBE running');
});

const scoresData = {
    "scores": [
        {
            "difficulty": 4,
            "clicks": 14,
            "score": 25,
            "time": 11,
            "username": "coco"
        },
        {
            "difficulty": 4,
            "clicks": 16,
            "score": 30,
            "time": 14,
            "username": "koko"
        },
        {
            "difficulty": 4,
            "clicks": 20,
            "score": 47,
            "time": 27,
            "username": "Esteban"
        },
        {
            "difficulty": 4,
            "clicks": 36,
            "score": 121,
            "time": 85,
            "username": "Superman"
        },
        {
            "difficulty": 4,
            "clicks": 56,
            "score": 123,
            "time": 67,
            "username": "tico"
        },
        {
            "difficulty": 4,
            "clicks": 66,
            "score": 151,
            "time": 85,
            "username": "oscar"
        },
        {
            "difficulty": 4,
            "clicks": 70,
            "score": 172,
            "time": 102,
            "username": "Superman"
        },
        {
            "difficulty": 4,
            "clicks": 72,
            "score": 185,
            "time": 113,
            "username": "Benjamin"
        },
        {
            "difficulty": 4,
            "clicks": 98,
            "score": 218,
            "time": 120,
            "username": "Nath"
        },
        {
            "difficulty": 4,
            "clicks": 134,
            "score": 1373,
            "time": 1239,
            "username": "Fabian"
        }
    ]
}

