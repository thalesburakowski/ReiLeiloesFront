<script>
import axios from 'axios'
const serverUrl = 'https://localhost:44348/api/address'
// const profileId = JSON.parse(localStorage.getItem('profileId'))

export default {
  create: async function(addressData) {
    console.log('dsads')

    const response = await axios.post(`${serverUrl}`, addressData)
    return response.data
  },
  getAddress: async function(profileId) {
    const response = await axios.get(`${serverUrl}/${profileId}`)
    return response.data
  },
  updateAddress: async function(addressData) {
    const response = await axios.put(`${serverUrl}`, addressData)
    return response.data
  },
  delete: async function(id) {
    console.log('entrou api')
    const response = await axios.delete(`${serverUrl}/${id}`)
    return response.data
  },
}
</script>
