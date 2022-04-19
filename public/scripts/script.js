let questoes = JSON.parse(document.getElementById("request").value);
let contadorQuestao = 0;
let escolhas = document.querySelectorAll("#pergunta");
let sexo = document.querySelectorAll("#opcao");
let titulo = document.querySelector("#titulo");
let warning = document.getElementsByClassName("answer-box")[0];
let fechar = document.getElementById("fechar");
let acertos = [];
let duvida = document.getElementsByClassName("duvida")[0];
let warningDuvida = document.getElementsByClassName("fduvidas")[0];
let duvidasLista = [];
let request = [];

document.addEventListener("DOMContentLoaded", getQuestao);

function getQuestao() {
  if (contadorQuestao != questoes.length) {
    getTitulo();
    escolhas.forEach((escolha, i) => {
      if (i == 0) escolha.innerHTML = questoes[contadorQuestao].resp1;
      if (i == 1) escolha.innerHTML = questoes[contadorQuestao].resp2;
      if (i == 2) escolha.innerHTML = questoes[contadorQuestao].resp4;
      if (i == 3) escolha.innerHTML = questoes[contadorQuestao].resp3;
    });
  }
}

duvida.addEventListener("click", () => {
  warningDuvida.classList.add("ver");
});

function getTitulo() {
  titulo.innerHTML = questoes[contadorQuestao].enunciado;
}

function validaAcerto(resposta) {
  if (resposta == questoes[contadorQuestao].respcerta) {
    warning.classList.add("ver");
    acertos.push(questoes[contadorQuestao].id);
  }
}

document.getElementById("fduvida").addEventListener("click", () => {
  duvidasLista.push({
    id_questao: questoes[contadorQuestao].id,
    duvidas: document.getElementById("duvida_banco").value,
  });
  warningDuvida.classList.remove("ver");
  document.getElementById("duvida_banco").value = "";
});

fechar.addEventListener("click", () => {
  warning.classList.remove("ver");
});

sexo.forEach((sexos, i) => {
  sexos.addEventListener("click", () => {
    if (contadorQuestao == questoes.length) {
      finalizar();
    } else {
      validaAcerto(sexos.innerText);
      contadorQuestao++;
      getQuestao();
    }
  });
});

function finalizar() {
  request.push({ acertos, duvidasLista, questao: questoes[0].id_atividade });
  document.getElementById("request").value = JSON.stringify(request);
  document.getElementById("questionario").submit();
}
