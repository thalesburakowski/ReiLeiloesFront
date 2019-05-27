
<script>
import axios from 'axios'
const serverUrl = 'http://localhost:3000/analise'
export default {
  getlastMonth: async function() {
    const response = await axios.get(`${serverUrl}/leilao-total`)
    return response.data
  },
}
</script>

