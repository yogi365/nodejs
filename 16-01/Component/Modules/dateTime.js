function returnDate(){
    let date = new Date();
    return date.toLocaleDateString();
}

function returnTime(){
    let time = new Date();
    return time.toLocaleTimeString();
}
module.exports = {
    date:returnDate,
    time:returnTime
}