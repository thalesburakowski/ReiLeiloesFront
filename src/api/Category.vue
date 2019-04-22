<script>
import axios from 'axios'
const serverUrl = 'http://localhost:3000/categorias/'
export default {
  getAll: async function() {
    const response = await axios.get(`${serverUrl}`)
    return response.data
  },
}
</script>
