import User from '../../collections/user.collection'

export const authService = {
    signup,
    login,
    logout
}

async function signup() {
    User.create({ name: 'test', email: 'test@test.com', password: 'test' })
    return 'signedup!!'
}

async function login() {
    return 'loggedin!'
}

async function logout() {
    return 'loggedout!'
}