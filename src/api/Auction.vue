<script>
import axios from 'axios'
const serverUrl = 'http://localhost:3000/leilao'
const profileId = JSON.parse(localStorage.getItem('profileId'))

export default {
  create: async function(auctionData) {
    const response = await axios.post(`${serverUrl}`, { auctionData })
    if (response.message) {
      console.log(response.message)
      return
    }
    return response.data
  },
  approved: async function(data) {
    const response = await axios.post(`${serverUrl}-pendente`, data)
    return response.data
  },
  getAuction: async function(auctionId) {
    console.log('asas', auctionId)

    const response = await axios.get(`${serverUrl}/${auctionId}`)
    return response.data
  },
  getAllPendent: async function() {
    const response = await axios.get(`${serverUrl}-pendente`)
    return response.data
  },
  getApproved: async function(data) {
    const response = await axios.get(`${serverUrl}-aprovado`)
    return response.data
  },
  toBid: async function(data) {
    const response = await axios.post(`${serverUrl}-lance`, data)
    return response.data
  },
  getBids: async function(auctionId) {
    const response = await axios.get(
      `${serverUrl}-historico-lance/${auctionId}`
    )
    return response.data
  },
}
</script>
