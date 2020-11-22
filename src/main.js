const readline = require("readline");
const translate = require('@vitalets/google-translate-api');
let before = 'hu';
const alllanguages = ['af','sq','ar','hy','az','eu','be','bg','ca','zh-CN','hr','cs','da','nl','en','et','tl','fi','fr','gl','ka','hi','iw','sv','sl','ru','pl','no','mk','lt','ja','ga']

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Írja be a szöveget:", function(text) {
    rl.question("Írja be a fordítások számát:", function(num) {

        const langarray = [];
        for(var i = 0;i<num;i++)
        {
            var item = alllanguages[Math.floor(Math.random() * alllanguages.length)];
            while(langarray.includes(item))
            {
                item = alllanguages[Math.floor(Math.random() * alllanguages.length)];
            }
            langarray.push(item);
        }
        langarray.push('hu');
        async function translattext() {
            for (const i of langarray) {
                await translate(text, {from: before, to: i}).then(res => {
                    //console.log(res);
                    if(i=='hu') console.log();
                    console.log('['+before + ']-[' + i+']:'+res.text);
                    text=res.text;
                    before = i;
                }).catch(err => {
                    console.error(err);
                });
            }
        }

        translattext();
    });
});

