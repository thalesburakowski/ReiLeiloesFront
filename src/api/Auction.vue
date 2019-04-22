<script>
import axios from 'axios'
const serverUrl = 'http://localhost:3000/leilao'
const profileId = JSON.parse(localStorage.getItem('profileId'))

export default {
  create: async function(auctionData) {
    const response = await axios.post(`${serverUrl}`, {
      ...auctionData,
      profileId,
    })
    return response.data
  },
  getAllPendent: async function() {
    const response = await axios.get(`${serverUrl}-pendente`)
    return response.data
  },
}
</script>
