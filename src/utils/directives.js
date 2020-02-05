// importar esse arquivo no main.js
import Vue from 'vue'
// instalar o moment no projeto - npm i moment --save
import moment from 'moment'

Vue.directive('money-format', (el, { value }) => {
  el.innerHTML = new Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    style: 'currency',
    minimumFractionDigits: 2
  }).format(value || 0)
})

Vue.directive('date-format', (el, { value }) => {
  el.innerHTML = moment(value).format('DD/MM/YYYY [às] HH:mm:ss')
})
