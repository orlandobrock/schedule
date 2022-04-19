google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawBasic);

document.addEventListener("DOMContentLoaded", drawBasic);

function drawBasic() {
  let dados = [];
  const id = window.location.href.split("http://localhost:5000/avaliacao/")[1];
  axios.get(`/chart/${id}`).then((response) => {
    console.log(response);
    const data = new google.visualization.arrayToDataTable(response.data.chart);
    const options = {
      title: response.data.enunciado,
      height: 400,
      width: 300,
      vAxis: { minValue: 0, maxValue: response.data.quantidade },
    };
    var chart = new google.visualization.ColumnChart(
      document.getElementById("chart_div")
    );
    let sum = "";
    chart.draw(data, options);
    response.data.questoes.forEach((questao) => {
      sum += `<div class="problema">Enunciado da questão: ${questao.enunciado}</div>`;
    });
    document.getElementById("problemas-list").innerHTML = sum;
  });
}
