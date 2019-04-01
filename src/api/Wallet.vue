<script>
import axios from 'axios'
import { log } from 'util'
const serverUrl = 'http://localhost:3000/carteira'
export default {
  deposit: async function(data) {
    const response = await axios.post(`${serverUrl}/deposito`, data)
    return response.data
  },

  withdraw: async function(data) {
    const response = await axios.post(`${serverUrl}/saque`, data)
    return response.data
  },
  getCredits: async function(profileId) {
    const response = await axios.get(`${serverUrl}/${profileId}`)
    return response.data
  },
}
</script>
