//Part 1: Number Facts

let baseUrl = 'http://numbersapi.com';

//1
async function getNumber(number) {
    try {
        let res = await axios.get(`${baseUrl}/${number}/?json`);
        console.log(res.data.text);
    } catch (e) {
        console.log('Error calling numbers api.', e);
    }
}

//2 & 3

async function getNumbers(number, factsCount) {
    let numPromises = [];
    for (let i = 0; i < factsCount; i++) {
        numPromises.push(axios.get(`${baseUrl}/${number}/?json`));
    }
    let numbers = await Promise.all(numPromises);
    numbers.forEach((number) => $('body').append(`<p>${number.data.text}</p>`));
}