'use strict';

const {Client, Intents} = require('discord.js');
const client = new Client({
    intent: Object.keys(Intents.FLAGS)
});
const translate = require("deepl");

client.on('ready', () => {
    console.info("ready!");
});

client.on('messageCreate', async message => {

    if (message.author.bot) return;

    translate({
        free_api: true,
        text: message.content,
        target_lang: "JA",
        auth_key: process.env.auth_key
    })
        .then(result => {
            //console.info(result.data);
            const lang_name = result.data.translations.find(e => e.detected_source_language).detected_source_language
                .split('JA').join('日本語')
                .split('EN').join('英語')
                .split('ZH').join('中国語')
                .split('RU').join('ロシア語')
                .split('FR').join('フランス語')
                .split('IT').join('イタリア語')
                .split('ES').join('スペイン語')
                .split('NL').join('オランダ語')
                .split('EL').join('ギリシャ語')
                .split('SV').join('スウェーデン語')
                .split('SK').join('スロヴァキア語')
                .split('SL').join('スロベニア語')
                .split('CS').join('チェコ語')
                .split('DA').join('デンマーク語')
                .split('DE').join('ドイツ語')
                .split('HU').join('ハンガリー語')
                .split('FI').join('フィンランド語')
                .split('BG').join('ブルガリア語')
                .split('PL').join('ポーランド語')
                .split('PT').join('ポルトガル語')
                .split('LV').join('ラトビア語')
                .split('LT').join('リトアニア語')
                .split('RO').join('ルーマニア語')
                .split('ET').join('エチオピア語')
                .split('PT-BR').join('ポルトガル語(ブラジル)')
            const trance_result = result.data.translations.find(e => e.detected_source_language ===
                "JA" || "EN" || "ZH" || "RU" || "FR" || "IT" ||
                "ES" || "NL" || "EL" || "SV" || "SK" || "SL" ||
                "CS" || "DA" || "DE" || "HU" || "FI" || "BG" ||
                "PL" || "PT" || "LV" || "LT" || "RO" || "ET" ||
                "PT-BR")?.text;
            message.channel.send(`翻訳元言語:${lang_result}`);
            message.channel.send(`${trance_result}`);
        })
        .catch(err => {
            console.error(err);
        });
});

client.login(process.env.token);
