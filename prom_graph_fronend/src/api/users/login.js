import req from '../request'

export const login = (username, password) => req.post('/login', { username, password })

export default login
