<script>
import axios from 'axios'
const serverUrl = 'https://localhost:3000/cartao'
export default {
  getAll: async function(userId) {
    const response = await axios.get(`${serverUrl}/${userId}`)
    return response.data
  },
}
</script>
