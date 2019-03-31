<script>
import axios from 'axios'
const serverUrl = 'https://localhost:44348/api/profile'
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
}
</script>
