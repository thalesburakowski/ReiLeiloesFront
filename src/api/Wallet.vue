<script>
import axios from 'axios'
const serverUrl = 'https://localhost:3000/carteira'
export default {
  deposit: async function(data) {
    console.log(`${serverUrl}/deposito`)

    const response = await axios.post(`${serverUrl}/deposito`, data)
    return response.data
  },

  withdraw: async function(data) {
    const response = await axios.post(`${serverUrl}/saque`, data)
    return response.data
  },
  getCredits: async function(userId) {
    const response = await axios.get(`${serverUrl}/${userId}`)
    return response.data
  },
}
</script>
