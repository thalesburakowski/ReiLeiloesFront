<script>
import axios from 'axios'
const serverUrl = 'http://localhost:3000/cartao'
const profileId = JSON.parse(localStorage.getItem('profileId'))

export default {
  getAll: async function(profileId) {
    const response = await axios.get(`${serverUrl}/${profileId}`)
    return response.data
  },
  create: async function(card) {
    const response = await axios.post(`${serverUrl}`, { ...card, profileId })
  },
}
</script>
