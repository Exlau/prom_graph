import { Axios } from 'axios'
import { BASE_URL } from './config'

const req = new Axios({
  baseURL: BASE_URL,
})

export default req
