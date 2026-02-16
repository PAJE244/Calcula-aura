const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.use(express.json());
app.use(express.static("."));

const API_KEY = "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";

app.post("/aura", async (req, res) => {

try{

const response = await fetch("https://api.openai.com/v1/chat/completions",{

method:"POST",

headers:{
"Content-Type":"application/json",
"Authorization":"Bearer " + API_KEY
},

body:JSON.stringify({

model:"gpt-4o-mini",

messages:[

{
role:"system",
content:"Você é uma calculadora de perda de aura meme. Sempre responda com análise, perda negativa entre -4000 e -9000 e nível."
},

{
role:"user",
content:req.body.texto
}

],

temperature:1

})

});

const data = await response.json();

res.json(data);

}catch{

res.json({

choices:[
{
message:{
content:"Erro espiritual crítico. Perda de -6666 aura. Nível: Catastrófico."
}
}
]

});

}

});

app.listen(3000, ()=>{

console.log("Servidor rodando");

});
