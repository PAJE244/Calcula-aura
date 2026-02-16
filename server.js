const express = require("express");
const fetch = require("node-fetch");

const app = express();

app.use(express.json());
app.use(express.static("."));

const API_KEY = "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";

app.post("/aura", async (req, res) => {

try{

const situacao = req.body.texto;

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
content:
`Você é uma calculadora de perda de aura estilo meme, mas analisa a situação de forma inteligente.

REGRAS:

- analise o contexto
- calcule uma perda entre -3000 e -9000
- quanto mais vergonhoso, maior a perda
- gere um valor diferente cada vez
- nunca repita resposta
- responda exatamente neste formato:

Análise: ...

Motivo: ...

Perda de aura: -XXXX

Nível: ...`
},

{
role:"user",
content:situacao
}

],

temperature:1.2

})

});

const data = await response.json();

res.json(data);

}catch(e){

// fallback variável

const perda = Math.floor(Math.random() * 6000) + 3000;

res.json({

choices:[

{

message:{

content:

`Análise: Falha espiritual detectada.

Motivo: O universo rejeitou sua presença.

Perda de aura: -${perda}

Nível: Catastrófico`

}

}

]

});

}

});

app.listen(3000, ()=>{

console.log("Servidor rodando em http://localhost:3000");

});
