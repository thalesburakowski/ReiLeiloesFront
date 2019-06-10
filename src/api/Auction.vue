<script>
import axios from 'axios'
const serverUrl = 'http://localhost:3000/leilao'
const profileId = JSON.parse(localStorage.getItem('profileId'))

export default {
  create: async function(auctionData) {
    const response = await axios.post(`${serverUrl}`, { auctionData })
    if (response.message) {
      console.log(response.message)
      return
    }
    return response.data
  },
  approved: async function(data) {
    const response = await axios.post(`${serverUrl}-pendente`, data)
    return response.data
  },
  getAuction: async function(auctionId) {
    const response = await axios.get(`${serverUrl}/${auctionId}`)
    return response.data
  },
  getAllPendent: async function() {
    const response = await axios.get(`${serverUrl}-pendente`)
    return response.data
  },
  getApproved: async function(title = '', categories = '') {
    // params?title=celular&categories=["cjurl2koql9mv0b12stoxfnp5"]
    console.log('api', title, categories)

    let response = []
    if (categories.length) {
      response = await axios.get(
        `${serverUrl}-aprovado/params?title=${title}&categories=[${categories.map(
          cat => `"${cat}"`
        )}]`
      )
    } else {
      response = await axios.get(`${serverUrl}-aprovado/params?title=${title}`)
    }
    return response.data
  },
  toBid: async function(data) {
    const response = await axios.post(`${serverUrl}-lance`, data)
    return response.data
  },
  getBids: async function(auctionId) {
    const response = await axios.get(
      `${serverUrl}-historico-lance/${auctionId}`
    )
    return response.data
  },
  cancelAuction: async function(auctionId) {
    const response = await axios.post(`${serverUrl}-criar-cancelamento`, {
      auctionId,
    })
    return response.data
  },

  requestAnnulment: async function(data) {
    const response = await axios.post(`${serverUrl}-criar-anulamento`, data)
    return response.data
  },

  getRequestAnnulments: async function() {
    const response = await axios.get(`${serverUrl}-pendente-anulamento/`)
    return response.data
  },

  acceptAnnuledRequest: async function(auctionId, auctionAnnulmentRequestId) {
    const response = await axios.post(`${serverUrl}-aceitar-anulamento`, {
      auctionId,
      auctionAnnulmentRequestId,
    })
    return response.data
  },

  getAwaitingDevolution: async function() {
    const response = await axios.get(`${serverUrl}-enviando`)
    return response.data
  },

  sendingAnnuledRequest: async function(auctionId) {
    const response = await axios.post(`${serverUrl}-enviando-anulamento`, {
      auctionId,
    })
    return response.data
  },

  //  /leilao-enviando-anulamento = annuledSending
  // /leilao-aceitar-anulamento = annuledAccept

  responseRequesAnnulament: async function(data) {
    const response = await axios.post(`${serverUrl}-pendente-anulamento`, data)
    return response.data
  },
  chooseAddress: async function(data) {
    const response = await axios.post(`${serverUrl}-transporte`, data)
    return response.data
  },
  setDelivering: async function(auctionId) {
    const response = await axios.post(`${serverUrl}-transporte-andamento`, {
      auctionId,
    })
    return response.data
  },
  setReceived: async function(auctionId) {
    const response = await axios.post(`${serverUrl}-transporte-finalizado`, {
      auctionId,
    })
    return response.data
  },
  getAddress: async function(auctionId) {
    const response = await axios.post(`${serverUrl}-transporte-informacao`, {
      auctionId,
    })
    return response.data
  },
  // status: delivering
  // status: received

  // /leilao-transporte-andamento
  // /leilao-transporte-finalizado
  // getRequestCancels: async function() { },
}
</script>