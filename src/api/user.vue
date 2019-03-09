<script>
const axios = require('axios')

const serverUrl = 'https://localhost:44348/api/user'

export default {
  create: async function(userData) {
    console.log(userData)
    let response = await axios.post(`${serverUrl}/create`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': ' POST,GET,PUT,DELETE',
        'Access-Control-Allow-Headers': 'Authorization, Lang',
      },
      body: userData,
    })
    console.log(response)
    return response
  },
}
</script>
