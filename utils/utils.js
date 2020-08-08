const MessagingResponse = require('../node_modules/twilio/lib/twiml/MessagingResponse');
const moment = require("moment-timezone");

module.exports = {
    extractClientNumber: (ogNumber) => {
        const number = ogNumber.split(':');
        return number[1];
    },
    sendMessage: (msg, res) => {
        const twiml = new MessagingResponse();
        twiml.message(msg);
        res.writeHead(200, { 'Content-Type': 'text/xml' });
        res.end(twiml.toString());
    },
    testInput: (query) => {
        const istString = moment.tz(new Date().toISOString(), "Asia/Kolkata").format().slice(0, 16) + ":00.000Z";
        const currEpoch = Date.parse(istString);
        if (query[2].length !== 4) {    // Checking if time is not in HHMM format
            return false;
        }
        if (query[3] && query[3] !== "today") {     // Checking if date-month is not in DD/MM format
            if (query[3].split('/').length !== 2) {
                return false;
            }
        }
        const hour = query[2].slice(0, 2);
        const minutes = query[2].slice(2, 4);
        if (!query[3] || query[3] === "today") {
            const year = istString.slice(0, 4);
            const month = istString.slice(5, 7) - 1;
            const date = istString.slice(8, 10);
            const userString = new Date(year, month, date, hour, minutes, 0, 0).toISOString();
            const userEpoch = Date.parse(userString);
            if (userEpoch > currEpoch) {    // Checking if user input not in past
                return true;
            }
        } else {
            const year = istString.slice(0, 4);
            const month = query[3].split('/')[1] - 1;
            const date = query[3].split('/')[0];
            const userString = new Date(year, month, date, hour, minutes, 0, 0).toISOString();
            const userEpoch = Date.parse(userString);
            if (userEpoch > currEpoch) {    // Checking if user input not in past
                return true;
            }
        }
        return false;
    }
};