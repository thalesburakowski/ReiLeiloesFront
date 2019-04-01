<script>
import axios from 'axios'
const serverUrl = 'http://localhost:3000/cartao'
export default {
  getAll: async function(profileId) {
    const response = await axios.get(`${serverUrl}/${profileId}`)
    return response.data
  },
}
</script>
