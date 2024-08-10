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

app.get('/cards/:difficulty/:themes', (request, response) => {
    console.log('difficulty', request.params.difficulty);
    console.log('themes', request.params.themes);

    let cards = [];

    if (request?.params?.themes && request?.params?.difficulty) {
        const difficulty = request.params.difficulty;
        
        
        switch (request.params.themes) {
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
    }



    response.send(JSON.stringify({'cards': cards}));

});

function getCardFromIconList(list, quantity) {

    let iconIndexes = []
    for (let i = 0; i < quantity; i++) {
        let iconIndex = getUniqueIndex(0,list.length, iconIndexes);
        iconIndexes.push(iconIndex)
    }

    let cards = []

    for (let i = 0; i < iconIndexes.length; i++) {
        let icon = list[iconIndexes[i]];
        let card = {
            "isDiscovered": false,
            "icon": icon,
            "id": i
        };
        
        cards.push(card);
    }

    let cardDuplicate = cards.slice();
    shuffle(cards)
    console.log (cardDuplicate);

    let cardsConcatenated = cards.concat(cardDuplicate);
    console.log (cardsConcatenated);

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
    return Math.floor(min + Math.random() * (max - min + 1))
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

app.listen(port, () => {
    console.log('MemoryGameBE running');
});

