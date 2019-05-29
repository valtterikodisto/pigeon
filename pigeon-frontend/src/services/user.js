import axios from 'axios'

const baseUrl = 'http://localhost:3001/auth'

const getUser = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data.currentUser)
}

export default { getUser }
