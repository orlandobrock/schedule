const addAluno = document.querySelectorAll("#adicionar");
const pop = document.getElementsByClassName("insert-box");
addAluno.forEach((turma) => {
  turma.addEventListener("click", () => {
    pop[0].classList.add("ver");
    document.getElementById("ids").value = turma.dataset.turma;
  });
});

document.getElementById("cadastrar").addEventListener("click", () => {
  axios
    .get(
      `/verifica/${document.getElementById("identi").value}/${
        document.getElementById("ids").value
      }`
    )
    .then((response) => {
      if (response.data.operacao == true)
        document.getElementById("colocar").submit();
      else {
        document.getElementsByClassName("alert")[0].innerHTML =
          response.data.error;
        document.getElementsByClassName("alert")[0].classList.add("ver");
      }
    });
});

document.getElementById("close").addEventListener("click", () => {
  document.getElementsByClassName("insert-box")[0].classList.remove("ver");
});

let cadastro = true;
document.getElementById("sla").addEventListener("click", () => {
  if (cadastro) {
    document.getElementsByClassName("turma-box")[0].classList.add("ver");
    cadastro = false;
  } else {
    document.getElementsByClassName("turma-box")[0].classList.remove("ver");
    cadastro = true;
  }
});

// document.getElementById("sla").addEventListener("click", () => {
//   document.getElementsByClassName("turma-box")[0].classList.remove("ver");
// });

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
