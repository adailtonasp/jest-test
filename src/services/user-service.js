const User = require('../schemas/User')

class UserService {
    static async createUser({ name, email, password }) {
        const { id } = await User.create({
            name,
            email,
            password
        })

        return { id }
    }

    static async userExistsAndCheckPassword({email, password}) {
        const user = await User.findOne({ email })

        if(!user) {
            return false
        }

        if(password !== user.password) {
            throw { status: 400, message: 'As senhas não batem' }
        }

        return true
    }
}

// UserService.userExistsAndCheckPassword({
//     "email":"email@email.com",
//     "password":"123"
// }).then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log(err);
// })

module.exports = UserService