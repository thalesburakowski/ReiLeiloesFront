<script>
import axios from 'axios'
const serverUrl = 'http://localhost:3000/banco'
export default {
  getBank: async function(profileId) {
    const response = await axios.get(`${serverUrl}/${profileId}`)
    return response.data
    // return [
    //   { name: 'Minha conta Itaú', id: 1 },
    //   { name: 'Minha Conta Nubank', id: 2 },
    // ]
  },
}
</script>
