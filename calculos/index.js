import historicoInflacao from "../dados/dados.js";

export default function calculaIPCA(valor, mesInicial, anoInicial, mesFinal, anoFinal){
    var paraMultiplicar = 1;
    if(anoInicial === anoFinal){
        const valoresDoAno = historicoInflacao.filter(historico => historico.ano === anoInicial);
        const valoresDoMes = valoresDoAno.filter(meses => meses.mes >= mesInicial && meses.mes <= mesFinal);
        valoresDoMes.forEach(mes => {
            paraMultiplicar *= (1 + (mes.ipca/valor));
        });
        var resultado = valor * paraMultiplicar;
        return resultado;
    }else {
        const valoresAnoInicial = historicoInflacao.filter(historico => historico.ano === anoInicial);
        const valoresDosOutrosAnos = historicoInflacao.filter(historico => (historico.ano > anoInicial) && (historico.ano < anoFinal));
        const valoresAnoFinal = historicoInflacao.filter(historico => historico.ano === anoFinal);
        var valoresPrimeiroAno = valoresAnoInicial.filter(valores => valores.mes >= mesInicial);
        var valoresUltimoAno = valoresAnoFinal.filter(valores => valores.mes <= mesFinal);
        const valoresDoMes = [...valoresPrimeiroAno, ...valoresDosOutrosAnos, ...valoresUltimoAno];
        valoresDoMes.forEach(mes => {
            paraMultiplicar *= (1 + (mes.ipca/valor));
        });
        var resultado = valor * paraMultiplicar;
        return resultado;
    }
}