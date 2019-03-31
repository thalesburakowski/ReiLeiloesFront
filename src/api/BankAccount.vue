<script>
import axios from 'axios'
const serverUrl = 'https://localhost:3000/conta-bancaria'
export default {
  getAll: async function(userId) {
    // const response = await axios.get(`${serverUrl}/${userId}`)
    // return response.data
    return [
      { name: 'Minha conta Itaú', id: 1 },
      { name: 'Minha Conta Nubank', id: 2 },
    ]
  },
}
</script>
