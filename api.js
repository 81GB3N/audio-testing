// import { getLyrics, getSong } from 'genius-lyrics-api';

// const options = {
// 	apiKey: 'Qy3hy8YX_ocuThap0Wlm79oqq42EwEu_A2JBRRY34rjBvr9IaqQuzyr2mbZsgSKL',
// 	title: 'Posthumous Forgiveness',
// 	artist: 'Tame Impala',
// 	optimizeQuery: true
// };

// getLyrics(options).then((lyrics) => console.log(lyrics));

// getSong(options).then((song) =>
// 	console.log(`${song.id} - ${song.title} - ${song.url} - ${song.albumArt} - ${song.lyrics}`)
// );

//file________________________________
/*

const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

// your API key
const apiKey = 'f95527015687a54abd1a63b0c8802cbc3f979efc5ae79be06f4c2644657f7402cb9581d104c75ea0f048fc420fc38d0472b414d3f3b001f35ac5e7ef8352064a';
// language spoken in the audio file
const language = 'en-US';
// local file path of the audio file
const filePath = 'user/example.mp3';

const fileName = path.basename(filePath);
const url = 'https://api.transkriptor.com/1/Upload';

// initial parameters
const params = {
    apiKey,
    language,
    fileName
};

// first request to get the presigned URL through which we will upload our audio file
axios.get(url, { params })
    .then(response => {
        const presignedUrl = response.data.url;
        const fields = response.data.fields;
        const givenOrderId = fields.key.split("-+-")[0];

        // attach the audio file
        const formData = new FormData();
        Object.entries(fields).forEach(([key, value]) => {
            formData.append(key, value);
        });
        formData.append('file', fs.createReadStream(filePath));

        // upload the audio file and initiate the transcription
        return axios.post(presignedUrl, formData, {
            headers: formData.getHeaders()
        });
    })
    .then(response => {
        console.log(response.status);
        console.log(givenOrderId);
    })
    .catch(error => {
        console.error(error);
    });
*/

//youtube____________________________

// const axios = require('axios');

// const url = "https://api.transkriptor.com/2/Upload-URL";

// const headers = {
//     "Content-Type": "application/json"
// };

// // here adjust the url, apiKey, service, language
// const data = JSON.stringify({
//     "url": "https://www.youtube.com/watch?v=wqlCzaLfEBg",
//     "apiKey": "f95527015687a54abd1a63b0c8802cbc3f979efc5ae79be06f4c2644657f7402cb9581d104c75ea0f048fc420fc38d0472b414d3f3b001f35ac5e7ef8352064a",
//     "service": "Standard",
//     "language": "en-US"
// });

// axios.post(url, data, { headers })
//     .then(response => {
//         console.log(response.status);
//         // this is your order id to use later
//         console.log(response.data);
//     })
//     .catch(error => {
//         console.error(error);
//     });
