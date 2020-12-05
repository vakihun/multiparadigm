const readline = require("readline");
const translate = require('@vitalets/google-translate-api');
let beforeUsedLanguage = 'hu';
const allLanguages = ['af','sq','ar','hy','az','eu','be','bg','ca','zh-CN','hr','cs','da','nl','en','et','tl','fi','fr','gl','ka','hi','iw','sv','sl','ru','pl','no','mk','lt','ja','ga']

const userTextIO = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

userTextIO.question("Írja be a szöveget:", function(textToTranslate) {
    userTextIO.question("Írja be a fordítások számát:", function(numberOfTranslates) {
        const allUsedLangs = [];
        for(var i = 0;i<numberOfTranslates;i++)
        {
            var item = allLanguages[Math.floor(Math.random() * allLanguages.length)];
            allUsedLangs.push(item);
        }
        allUsedLangs.push('hu');

            async function translateText() {
                for (const currentLang of allUsedLangs) {
                        let foundAnError = false;
                        await translate(textToTranslate, {from: beforeUsedLanguage, to: currentLang}).then(res => {
                            if(currentLang=='hu') console.log();
                            console.log('['+beforeUsedLanguage + ']-[' + currentLang+']:'+res.text);
                            textToTranslate=res.text;
                            beforeUsedLanguage = currentLang;
                        }).catch(err => {
                            console.log("Hiba történt a szerverhez való kapcsolódás során: "+err.statusCode+" "+ err.statusMessage);
                            foundAnError = true;
                        });
                        if(foundAnError) break;
                }
            }
        translateText();
    });
});