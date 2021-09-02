/* var tickets = [25, 25, 50] */
/* var tickets = [25, 25, 50, 50, 100] */
var tickets = [25, 100]

var current25 = 0
var current50 = 0
var result = "SI"

tickets.forEach((ticket) => {

    if (ticket === 25) {
        current25 += 1
    }
    if (ticket === 50) {
        if (current25 > 0) {
            current25 -= 1;
            current50 += 1;
        } else {
            result = "No"
        }
    }

    if (ticket === 100) {
        if (current25 >= 3) {
            current25 -= 3;
        } else if (current50 > 0 && current25 > 0) {
            current50 -= 1;
            current25 -= 1;
        }
        else {
            result = "No"
        }
    }
    console.log(ticket, current25, current50)
})
console.log(result)