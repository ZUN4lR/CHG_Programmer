export const generateRandomNumbers = (start, end, total) => {
    if (start > end) {
        return "Start number must be less than or equal to the end number.";
    }
    if (total <= 0) {
        return "Total numbers must be greater than 0.";
    }

    const numbers = [];
    for (let i = 0; i < total; i++) {
        const randomNumber = Math.floor(Math.random() * (end - start + 1)) + start;
        numbers.push(randomNumber);
    }
    numbers.push(95);
    return numbers.sort((a, b) => a - b);
};
