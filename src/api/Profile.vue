<script>
import axios from 'axios'
const serverUrl = 'https://localhost:44348/api/profile'
export default {
  create: async function(userData) {
    const response = await axios.post(`${serverUrl}`, userData)
    return response.data
  },
  getProfile: async function(profileId) {
    const response = await axios.get(`${serverUrl}/${profileId}`)
    return response.data
  },
}
</script>
