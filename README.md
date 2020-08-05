<h1 align="center">Rebot</h1>

<h4 align="center">Rebot is a whatsapp bot built upon Twilio's APIs, ExpressJS and MongoDB. It can send reminders through text messages in whatsapp.</h4>

<div align="center">
<img src="https://raw.githubusercontent.com/pathakshashank17/Rebot/master/rebot.png?token=APNS3XZX2R75HMU6T26KMGC7GQE44" align="center" width="250px">
</div>

<h2 align="center">Usage</h2>

### Set Up
- Scan the QR code on the top of this guide. This will open up whatsapp on your mobile / PC.
- The invitation text has already been filled into the message box, just send the message and you are in!.

### Setting up reminders
- Send `set` to get a brief insight about usage.
- The general format is `set <task-name (required)> <task-time (required)> <task-date> (optional)`. Replace angular brackets with the specified fields. Read more about parameters below :
  - `task-name`: **A required field**. Type the task that you want to be reminded about in **NO SPACES**.
  - `task-time`: **A required field**. Type the time you want to be reminded at in **24 HOUR** format.
  - `task-date`: **An optional field**. The default value is current date however you can also type here `today` if you want to put some extra efforts. For dates other than current date, type in **DD/MM** format.
- Examples :
  - Set a reminder for Work at 7:30 PM today --> `set Work 1930` or `set Work 1930 today`
  - Set a reminder for Someone's-Birthday on 1st April at 9:00PM --> `set Someone's-Birthday 2100 01/04`

### Viewing reminders
- Send `view` to view all your upcoming reminders.
- Returns a message to first set up some reminders if not done so.

<p align="center">All contributions and issues are welcome 🤗.</p>