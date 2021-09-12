baseUrl = 'http://deckofcardsapi.com';

//part 1
// axios
//     .get(`${baseUrl}/api/deck/new/shuffle/?deck_count=1`)
//     .then((shuffledDeck) => {
//         console.log(shuffledDeck.data.deck_id);
//         return axios.get(`${baseUrl}/api/deck/${shuffledDeck.data.deck_id}/draw/?count=1`);
//     })
//     .then((card1) => console.log(`${card1.data.cards[0].value} of ${card1.data.cards[0].suit}`))
//     .catch((err) => console.error(err));

//part 2
// let card1Value = '';
// axios
//     .get(`${baseUrl}/api/deck/new/shuffle/?deck_count=1`)
//     .then((shuffledDeck) => {
//         return axios.get(`${baseUrl}/api/deck/${shuffledDeck.data.deck_id}/draw/?count=1`);
//     })
//     .then((card1) => {
//         card1Value = `${card1.data.cards[0].value} of ${card1.data.cards[0].suit}`;
//         return axios.get(`${baseUrl}/api/deck/${card1.data.deck_id}/draw/?count=1`);
//     })
//     .then((card2) => {
//         let card2Value = `${card2.data.cards[0].value} of ${card2.data.cards[0].suit}`;
//         console.log(`${card1Value} and ${card2Value}`);
//     })
//     .catch((err) => console.error(err));

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