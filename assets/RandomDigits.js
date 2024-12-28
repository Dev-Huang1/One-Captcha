function getRandomDigits(count) {
    let randomDigits = '';
    for (let i = 0; i < count; i++) {
        randomDigits += Math.floor(Math.random() * 10);
    }
    return randomDigits;
}
