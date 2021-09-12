//Part 1: Number Facts

let baseUrl = 'http://numbersapi.com';

//1
let randomNum = Math.floor(Math.random() * 100 + 1);
$.getJSON(`${baseUrl}/${randomNum}/?json`).then((data) => {
    console.log(data);
});

//2 & 3

let fourNumPromises = [];

for (let i = 1; i < 5; i++) {
    fourNumPromises.push(axios.get(`${baseUrl}/${i}/?json`));
}
Promise.all(fourNumPromises)
    .then((promisesArr) => promisesArr.forEach((promise) => $('body').append(`<p>${promise.data.text}</p>`)))
    .catch((err) => console.error(err));