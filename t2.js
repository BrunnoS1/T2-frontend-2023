const readline = require("readline");

// pra ler inputs no console
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const axios = require("axios");

const units = "metric";
// unidade de medida
const lang = "pt_BR";
// idioma da resposta
const limit = "1";
// limitar a 1 cidade na busca

appid = "ef0b0973b783e0614ac87612ec04344b"


rl.question('Digite uma cidade: ', function(q) {
    console.log(`cidade = ${q}`);
    // buscar latitude e longitude da cidade
    const url_latlon = `http://api.openweathermap.org/geo/1.0/direct?q=${q}&limit=${limit}&appid=${appid}`

    axios
        .get(url_latlon)
        .then((res) =>{
            // separar a parte de interesse
            const data = res.data[0];
            // console.log(data);
            // pegar latitude e longitude
            const lat = data.lat;
            const lon = data.lon;
            // buscar o clima da latitude/longitude
            const url_clima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${appid}&lang=${lang}`

            axios
            .get(url_clima)
            .then((res)=>{
                // console.log(res.data)
                return res.data
            })
            .then((res) => {
                // pegar sensaçao termica e descrição do clima na resposta e exibir
                const sens_term = res.main.feels_like
                const descricao = res.weather[0].description
                console.log(`Sensaçao térmica = ${sens_term}°C\nDescrição = ${descricao}`)
            })
            return data;
        })
    rl.close();
});
