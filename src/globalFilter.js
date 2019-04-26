import Vue from 'vue'

Vue.filter('number', (value) => {
  if(!value)
    return ""
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
})
