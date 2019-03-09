<script>
const axios = require('axios')

const serverUrl = 'https://localhost:44348/api/user'

export default {
  create: async function(userData) {
    console.log(userData)
    let response = await axios.post(`${serverUrl}/create`, userData)
    console.log(response)
    return response
  },
}
</script>
