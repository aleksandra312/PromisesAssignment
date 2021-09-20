//refactored - part 3 - UI

$(function() {
    let baseUrl = 'https://deckofcardsapi.com';

    async function startGame() {
        $btn = $('button');
        $cardArea = $('#card-area');

        let shuffledDeck = await axios.get(`${baseUrl}/api/deck/new/shuffle/?deck_count=1`);
        $btn.show().on('click', async function() {
            let card = await axios.get(`${baseUrl}/api/deck/${shuffledDeck.data.deck_id}/draw/?count=1`);
            cardImgUrl = card.data.cards[0].image;
            $cardArea.append($('<img>', { src: cardImgUrl }));
            if (shuffledDeck.remaining == 0) $btn.remove();
        });
    }
    startGame();
});

//can id be done with the class?

// class DeckOfCardsUI {
//     baseUrl = 'http://deckofcardsapi.com';
//     $btn = $('button');
//     $cardArea = $('#card-area');

//     async init() {
//         let res = await axios.get(`${baseUrl}/api/deck/new/shuffle/?deck_count=1`);
//         this.deckId = res.data.deck_id;
//         $btn.show();
//     }

//     async drawCard() {
//         $btn.on('click', async function() {
//             let res = await axios.get(`${baseUrl}/api/deck/${this.deckId}/draw/?count=1`);
//             cardImgUrl = res.data.cards[0].image;
//             $cardArea.append($('<img>', { src: cardImgUrl }));
//             if (res.remaining == 0) $btn.remove();
//         });
//     }
// }