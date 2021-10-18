# DISCORD nHentai Linker
Call the command with the digit code to the patameter to link the website for ease of use.

1. [Prerequisites](#need)
2. [Installation](#install)
3. [Usage](#use)
4. [Notes](#note) 


## Prerequisites<a name="need"></a>
- node.js
- npm


## Installation<a name="install"></a>

1. Download the zip and unpack
2. Open a Terminal from the source folder

Run:
```shell
npm install dotenv
```
3. Set an environment variable

Create a new file
```shell
nano .env
```
Aquire your bot's token and paste the variable
```env
TOKEN=your_token
```
save the file.<br><br>

**!!** Open the bot.js file and add these line of codes before the **first line**
```javascript
const ENV = require('dotenv).config('./.env');
ENV.load();
```
3. Set your desired prefix in the conf.json
## Usage<a name="use"></a>

This automated bot denies any command except for ``PREFIX + n`` (n for nHentai).
The parameters allowed are the less than or equal to 6 digit codes of your nHentai manga. Any other inputs will output an invalid parameter. 

## Notes<a name="note"></a>
The README is made by a linux user (GNU+Linux if you so desire to call it ``:>``) and other OSes [like Windows with candy crush and more] are outside the scope of this specified installation guide

This bot uses the deprecated discord.js 12.0 due to its simplicity and I have little time for reading a new version of the library.

Have fun sharing the link of the sauce to your homies :)