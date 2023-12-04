import express from 'express';
const app = express();
const port = 3000;
import historicoInflacao from './dados/dados.js';
import calculaIPCA from './calculos/index.js';

app.get('/historicoIPCA', (req, res) => {
    const anoDeBusca = parseInt(req.query.ano);
    if(!anoDeBusca){
        res.json(historicoInflacao);
    }else if(isNaN(anoDeBusca)){
        res.status(400).send("O valor informado no ano não é um numero");
    }else {
        const retornaAno = historicoInflacao.filter(historico => historico.ano === anoDeBusca);
        if(retornaAno.length === 0){
            res.status(404).send("Nenhuma informação encontrada referente a esse ano");
        } else {
            res.json(retornaAno);
        }
    }
});

app.get('/historicoIPCA/calculo', (req, res) => {
    const valor = parseInt(req.query.valor);
    const mesInicial = parseInt(req.query.mesInicial);
    const anoInicial = parseInt(req.query.anoInicial);
    const mesFinal = parseInt(req.query.mesFinal);
    const anoFinal = parseInt(req.query.anoFinal);
    if (!((mesInicial >= 1 && mesInicial <= 12) && (mesFinal >= 1 && mesFinal <= 12) && (anoInicial >= 2015 && anoInicial <= 2023) && (anoFinal >= 2015 && anoFinal <= 2023))){
        res.status(400).send("Requisição Incorreta verifique os valores informados");
    }else if((!valor) || (!mesInicial) || (!anoInicial) || (!mesFinal) || (!anoFinal)){
        res.status(400).send("Requisição Incorreta verifique os valores informados");
    }else if ((isNaN(valor)) || (isNaN(mesInicial)) || (isNaN(anoInicial)) || (isNaN(mesFinal)) || (isNaN(anoFinal))){
        res.status(400).send("O valor informado no não é um numero");
    }else {
        const reajuste = calculaIPCA(valor, mesInicial, anoInicial, mesFinal, anoFinal);
    res.json({valorAjustado : reajuste.toFixed(2)});
    }
});

app.get('/historicoIPCA/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if(isNaN(id)){
        res.status(401).send("O valor informado no id não é um numero");
    }
    const retornaId = historicoInflacao.find(historico => historico.id === id);
    if(retornaId === undefined){
        res.status(401).send("Nenhum id foi encontrado");
    } else {
        res.json(retornaId);
    }
});

app.listen(port, () => {
    var data = new Date();
    console.log(`Servidor aberto e funcionando a partir de ${data}`);
});