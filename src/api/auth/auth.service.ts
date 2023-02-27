import User from '../../models/user.model'

export const authService = {
    signup,
    login,
    logout
}

async function signup() {
    return User.create({ name: 'test', email: 'test@tesst.com', password: 'test' })
}

async function login(email: string, password: string) {
    const user = await User.find({ email, password })
    if (!user) return Promise.reject('Invalid username or password')
    return user
}

async function logout() {
    return 'loggedout!'
}