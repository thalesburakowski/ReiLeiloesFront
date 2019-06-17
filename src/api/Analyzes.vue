
<script>
import axios from 'axios'
const serverUrl = 'http://localhost:3000/analise'
export default {
  getlastMonth: async function(initialDate, finalDate) {
    const response = await axios.post(`${serverUrl}/leilao-total`, {
      initialDate,
      finalDate,
    })
    return response.data
  },

  getByCategory: async function(initialDate, finalDate) {
    const response = await axios.post(`${serverUrl}/leilao-por-categoria`, {
      initialDate,
      finalDate,
    })
    return response.data
  },

  getTotalByDay: async function(initialDate, finalDate) {
    const response = await axios.post(`${serverUrl}/total-por-dia`, {
      initialDate,
      finalDate,
    })
    return response.data
  },
}
</script>

