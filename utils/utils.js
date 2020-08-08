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
        var testValue = 0;
        const istString = moment.tz(new Date().toISOString(), "Asia/Kolkata").format().slice(0, 16);
        const currEpoch = Date.parse(istString);
        const hour = query[2].slice(0, 2);
        const minutes = query[2].slice(2, 4);
        if (!query[3] || query[3] === "today") {
            const year = istString.slice(0, 4);
            const month = istString.slice(5, 7);
            const date = istString.slice(8, 10);
            const userString = new Date(year, month, date, hour, minutes, 0, 0).toISOString();
            const userEpoch = Date.parse(userString);
            if (userEpoch > currEpoch) {
                return true;
            }
        } else {
            const year = istString.slice(0, 4);
            const month = query[3].split('/')[1];
            const date = query[3].split('/')[0];
            const userString = new Date(year, month, date, hour, minutes, 0, 0).toISOString();
            const userEpoch = Date.parse(userString);
            if (userEpoch > currEpoch) {
                return true;
            }
        }
        return false;
    }
};