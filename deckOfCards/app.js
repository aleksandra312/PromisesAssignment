//REFACTORED (Unit 31.3)

//part 1 & 2

class DeckofCards {
    baseUrl = 'http://deckofcardsapi.com';

    async init() {
        let res = await axios.get(`${baseUrl}/api/deck/new/?deck_count=1`);
        this.deckId = res.data.deck_id;
    }
    async shuffle() {
        axios.get(`${baseUrl}/api/deck/${this.deckId}/shuffle/?deck_count=1`);
    }

    async drawCard(numOfCards) {
        let cardsPromises = [];
        for (let i = 0; i < numOfCards; i++) {
            cardsPromises.push(axios.get(`${baseUrl}/api/deck/${this.deckId}/draw/?count=1`));
        }
        let cards = await Promise.all(cardsPromises);
        cards.forEach((card) => {
            console.log(`${card.data.cards[0].value} of ${card.data.cards[0].suit}`);
        });
    }

    async giveMeCard(numOfCards) {
        await this.init();
        await this.shuffle();
        await this.drawCard(numOfCards);
    }
}

//OR

//part 1
async function getCard() {
    let data = await $.getJSON(`${baseURL}/new/draw/`);
    let { suit, value } = data.cards[0];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
}

async function getCards(numOfCards) {
    baseUrl = 'http://deckofcardsapi.com';

    let res = await axios.get(`${baseUrl}/api/deck/new/shuffle/?deck_count=1`);
    this.deckId = res.data.deck_id;

    let cardsPromises = [];
    for (let i = 0; i < numOfCards; i++) {
        cardsPromises.push(axios.get(`${baseUrl}/api/deck/${this.deckId}/draw/?count=1`));
    }
    let cards = await Promise.all(cardsPromises);
    cards.forEach((card) => {
        console.log(`${card.data.cards[0].value} of ${card.data.cards[0].suit}`);
    });
}

// ORIGINAL (Unit 31.2)

//part 1

baseUrl = 'http://deckofcardsapi.com';
axios
    .get(`${baseUrl}/api/deck/new/shuffle/?deck_count=1`)
    .then((shuffledDeck) => {
        console.log(shuffledDeck.data.deck_id);
        return axios.get(`${baseUrl}/api/deck/${shuffledDeck.data.deck_id}/draw/?count=1`);
    })
    .then((card1) => console.log(`${card1.data.cards[0].value} of ${card1.data.cards[0].suit}`))
    .catch((err) => console.error(err));

//part 2
let card1Value = '';
axios
    .get(`${baseUrl}/api/deck/new/shuffle/?deck_count=1`)
    .then((shuffledDeck) => {
        return axios.get(`${baseUrl}/api/deck/${shuffledDeck.data.deck_id}/draw/?count=1`);
    })
    .then((card1) => {
        card1Value = `${card1.data.cards[0].value} of ${card1.data.cards[0].suit}`;
        return axios.get(`${baseUrl}/api/deck/${card1.data.deck_id}/draw/?count=1`);
    })
    .then((card2) => {
        let card2Value = `${card2.data.cards[0].value} of ${card2.data.cards[0].suit}`;
        console.log(`${card1Value} and ${card2Value}`);
    })
    .catch((err) => console.error(err));

//part 3 - UI

let deckId = '';
let $btn = $('button');
let $cardArea = $('#card-area');

$.getJSON(`${baseUrl}/api/deck/new/shuffle/?deck_count=1`).then((data) => {
    deckId = data.deck_id;
    $btn.show();
});

$btn.on('click', function() {
    $.getJSON(`${baseUrl}/api/deck/${deckId}/draw/?count=1`).then((data) => {
        cardImgUrl = data.cards[0].image;
        $cardArea.append($('<img>', { src: cardImgUrl }));
        if (data.remaining == 0) $btn.remove();
    });
});