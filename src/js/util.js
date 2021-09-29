
export function getCurrentDayNumber(date) {
    let number = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    return number;
}