import Vue from 'vue'
import moment from 'moment'

Vue.filter('number', (value) => {
  if(!value)
    return "0,00"
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
})

Vue.filter('formatDate', (value) => {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY')
  }
})