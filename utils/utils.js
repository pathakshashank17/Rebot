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
        var currMonth = istString.slice(5, 7);
        var currDate = istString.slice(8, 10);
        var currHour = istString.slice(11, 13);
        var currMinute = istString.slice(14, 16);

        // Check time
        if (query[2]) {
            const time = query[2];
            const dateMonth = query[3];
            const date = parseInt(dateMonth.split('/')[0]);
            const hour = parseInt(time.slice(0, 2));
            const minute = parseInt(time.slice(2, 4));
            if (hour <= 24 && hour >= 0 && minute >= 0 && minute <= 59 && hour >= currHour && minute > currMinute) {
                testValue++;
            } else if (hour <= 24 && hour >= 0 && minute >= 0 && minute <= 59 && date > currDate) {
                testValue++;
            }
        }

        // Check date
        if (query[3]) {
            const dateMonth = query[3];
            const date = parseInt(dateMonth.split('/')[0]);
            const month = parseInt(dateMonth.split('/')[1]);
            if (date >= 1 && date <= 31 && month >= 1 && month <= 12 && date >= currDate && month >= currMonth) {
                testValue++;
            }
        }
        return testValue;
    }
};