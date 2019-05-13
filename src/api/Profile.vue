<script>
import axios from 'axios'
const serverUrl = 'https://localhost:44348/api/profile'
const serverUrlNode = 'http://localhost:3000/profile'

export default {
  create: async function(userData) {
    const response = await axios.post(`${serverUrl}`, userData)
    if (response.data.entities) {
      localStorage.setItem('profile', JSON.stringify(response.data.entities[0]))
    }

    return response.data
  },
  getProfile: async function(userId) {
    const response = await axios.get(`${serverUrl}/${userId}`)
    if (response.data.entities) {
      localStorage.setItem('profile', JSON.stringify(response.data.entities[0]))
    }
    return response.data
  },

  getHistory: async function(profileId) {
    const response = await axios.get(`${serverUrlNode}/historico/${profileId}`)
    console.log(response)

    return response.data
  },

  getHistoryCreate: async function(profileId) {
    const response = await axios.get(
      `${serverUrlNode}/historico-criados/${profileId}`
    )
    return response.data
  },
  delete: async function(auctionId) {
    const response = await axios.delete(
      `${serverUrlNode}/historico/${auctionId}`
    )
    return response.data
  },
}
</script>
