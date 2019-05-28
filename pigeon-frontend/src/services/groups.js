import axios from 'axios'

const baseUrl = 'http://localhost:3001/group'

// Will take group ID as parameter
const get = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { get }
