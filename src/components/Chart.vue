<template>
  <div>
    <canvas :id="`chart-${index}`" width="400" height="400"></canvas>
  </div>
</template>


<script>
import Chart from 'chart.js'

const options = {
  responsive: true,
  title: {
    display: true,
  },
  tooltips: {
    mode: 'index',
    intersect: false,
  },
  hover: {
    mode: 'nearest',
    intersect: true,
  },
  scales: {
    xAxes: [
      {
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Meses',
        },
      },
    ],
    yAxes: [
      {
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Valor',
        },
      },
    ],
  },
}

const backgroundColors = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)',
]

const borderColors = [
  'rgba(255,99,132,1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
]

export default {
  props: ['index', 'labels', 'datasets'],
  data() {
    return {
      backgroundColors: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],

      borderColors: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
    }
  },
  methods: {
    renderChart: function() {
      new Chart(`chart-${this.index}`, {
        type: 'line',
        data: {
          labels: this.labels,
          datasets: this.datasets.map((data, index) => {
            return {
              ...data,
              backgroundColor: this.backgroundColors[
                index % (this.backgroundColors.length - 1)
              ],
              borderColor: this.borderColors[
                index % (this.borderColors.length - 1)
              ],
              borderWidth: 1,
            }
          }),
        },
      })
    },
  },
  mounted() {
    this.renderChart()
  },
}
</script>
