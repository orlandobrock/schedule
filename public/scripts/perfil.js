//Abrir janela de notificações
const notificacoes = document.getElementsByClassName("notificacoes")[0];
let not = true;
notificacoes.addEventListener("click", () => {
  if (not) {
    document.getElementsByClassName("notification-bar")[0].classList.add("ver");
    not = false;
  } else {
    document
      .getElementsByClassName("notification-bar")[0]
      .classList.remove("ver");
    not = true;
  }
});

//Adicionar questão
document.querySelector("#addQuestion").addEventListener("click", cloneField);

function cloneField() {
  const newfield = document.querySelector(".simple-list").cloneNode(true);

  const fields = newfield.querySelectorAll("input");

  fields.forEach((field) => {
    field.value = "";
  });

  document.querySelector(".simple").appendChild(newfield);
}

let cadastro = true;
document.getElementById("teste").addEventListener("click", () => {
  if (cadastro) {
    document.getElementsByClassName("insert-box")[0].classList.add("ver");
    cadastro = false;
  } else {
    document.getElementsByClassName("insert-box")[0].classList.remove("ver");
    cadastro = true;
  }
});

document.getElementById("sla").addEventListener("click", () => {
  document.getElementsByClassName("insert-box")[0].classList.remove("ver");
});

document.getElementById("closeap").addEventListener("click", () => {
  document.getElementsByClassName("insert-box-2")[0].classList.add("ver");
});
