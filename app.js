let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroSecreto();
let tentativas = 1;
function exibirTextoNaTela(tag,texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }  
}
exibirMensagemInicial()
function exibirMensagemInicial(){
    exibirTextoNaTela("h1", "Jogo do número secreto");
    exibirTextoNaTela("p", "Escolha um número de 1 a 10");
}


function verificarChute() {
    let chute = document.querySelector("input").value;
    let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
    let mensagenTentativa = `você acertou com ${tentativas} ${palavraTentativa}`;
    if (chute == numeroSecreto){
    exibirTextoNaTela("h1", "acertou");
    exibirTextoNaTela("p", mensagenTentativa);
    document.getElementById("reiniciar").removeAttribute("disabled");
    }else{
        if(numeroSecreto > chute){

            exibirTextoNaTela("p", "o número secreto é maior");
        }else{
             exibirTextoNaTela("p", "o número secreto é menor");
        }
    tentativas++;
    limparCampo();
    }

}

function gerarNumeroSecreto(){
    let numeroEscolhido = parseInt(Math.random()*numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }
    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroSecreto();
    }else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo(){
    let chute = document.querySelector("input");
    chute.value = "";
}
function reiniciarJogo(){
    numeroSecreto = gerarNumeroSecreto();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("desabled", true);
}
