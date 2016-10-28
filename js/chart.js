let ctx = document.getElementById("myChart");
let chartData = {
  labels: ["Angular","React", "Vue", "Ember"],
  datasets: [{
    label: "Watchers",
    backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
    data: [1, 1, 1, 1],
    // data: [52974, 52681, 31874, 17026],
  }]
}
let myChart = new Chart(ctx, {
  type: 'bar',
  data: chartData,
  options: {
    responsive: false
  }
});

function updateChart(option = 'watchers') {
  chartData.labels = [];
  myChart.data.datasets[0].label = option;
  myChart.data.datasets[0].data = [];
  for (fm in frameworks) {
    if (frameworks[fm]['data']) {
      chartData.labels.push(frameworks[fm].full_name)
      myChart.data.datasets[0].data.push(frameworks[fm]['data'][option])
    }
  }
  myChart.update();
  myChart.render();
}
