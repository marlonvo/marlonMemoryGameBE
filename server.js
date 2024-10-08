const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();
const port = 3000;
const axios = require('axios');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.raw());


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
//const flagsIcon = ['🇨🇱','🇨🇲','🇨🇳','🇨🇴','🇨🇵','🇨🇷','🇨🇺','🇨🇻','🇨🇼','🇵🇰'];
const animalsImage =['IMG_1.jpg','IMG_2.jpg','IMG_3.jpg','IMG_4.jpg','IMG_5.jpg','IMG_6.jpg','IMG_7.jpg','IMG_8.jpg'];

const databaseURL = 'https://marlonmemorygame-default-rtdb.firebaseio.com/scores.json';

app.post('/score', (request, response) => {
	let body = [];
	request.on('data', (chunk) => {
		body.push(chunk);
	}).on('end', () => {
		const jsonData = Buffer.concat(body).toString();
		if (jsonData !== undefined) {
			const score = JSON.parse(jsonData);

			if (score !== undefined &&
				score.clicks !== undefined &&
				score.time !== undefined &&
				score.score !== undefined&&
				score.username !== undefined &&
				score.difficulty !== undefined) {

				axios.post(databaseURL, score).then(function (result) {
					response.send('Score saved!');
				}).catch(function (error) {
					response.send(error);
				});

			} else {
				response.send('Some data in score undefined or null!');
			}
		} else {
			response.send('request.body undefined or null!');
		}
	});
});

app.get('/scores',(request , response ) =>{

    axios.get(databaseURL)
        .then(function (res) {
        response.send(res.data);
    })
    .catch(function (error) {
        response.send(JSON.stringify({error:'Error requestion scores'}));
    })
    .finally(function () {
    });

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



