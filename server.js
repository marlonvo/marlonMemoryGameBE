const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors());

const food = 'FOOD';
const faces = 'FACES';
const flags = 'FLAGS';

const THEME_TYPE = {
    FOOD: food,
    FACES: faces,
    FLAGS: flags

}

const foodIcon = ["🍇", "🍈", "🍉", "🍊", "🍋", "🍌", "🍍", "🥭", "🍎", "🍏", "🍐", "🍑", "🍒", "🍓", "🥝", "🍅", "🍩"];
const facesIcon = ["😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "🙃", "😉", "😊", "😇", "🥰", "😍", "🤩", "😘", "😗", "😚", "😙", "😋", "😛", "😜", "🤪"];
const flagsIcon = [];

app.get('/cards/:difficulty:difficulty/:theme', (request, response) => {
    console.log('difficulty', request.params.difficulty);
    console.log('theme', request.params.theme);

    if (request?.params?.theme && request?.params?.difficulty) {
        const difficulty = request.params.difficulty;
        let cardIcons = [];
    }
    switch (request.params.theme) {
        case THEME_TYPE.FOOD:
            cards = getCardFromIconList(foodIcon, difficulty);
            break;
        case THEME_TYPE.FACES:
            cards = getCardFromIconList(facesIcon, difficulty);
            break;

        default:
            break;
    }


    response.send(JSON.stringify({'cards': cards}));

});

function getCardFromIconList(list, quantity) {

    let cards = []

    for (let i = 0; i < quantity; i++) {
        let iconIndex = generateRandomIndex(0, (list.length - 1));
        let icon = list(iconIndex);
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

