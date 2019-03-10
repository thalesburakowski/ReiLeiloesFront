<script>
const axios = require('axios')

const serverUrl = 'https://localhost:44348/api/user'

export default {
  create: async function(userData) {
    const response = await axios.post(`${serverUrl}/create`, userData)
    return response.data
  },
  login: async function(userData) {
    const response = await axios.post(`${serverUrl}/login`, userData)
    return response.data
  },
  changePassword: async function(userData) {
    const response = await axios.put(`${serverUrl}`, userData)
    return response.data
  },
  delete: async function(id) {
    const response = await axios.delete(`${serverUrl}/${id}`)
    return response.data
  },
}
</script>
