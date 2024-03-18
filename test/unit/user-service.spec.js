const UserService = require('../../src/services/user-service');
const server = require('../../index');


describe('UserService - unit',()=>{

    test('deve criar um usuario com sucesso',async ()=>{

        const idUser = await UserService.createUser({
            name:"adailton",
            email:"email@email.com",
            password:"12345"
        })  

        expect(idUser).toBeTruthy();

    })

    test('teste para checagem de usuario existente',async ()=> {
        const userExisting = await UserService.userExistsAndCheckPassword({
            email: "email@email.com",
            password:"12345"
        })

        const userNoexistent = await UserService.userExistsAndCheckPassword({
            email:"",
            password:""
        })

        expect(userExisting).toBeTruthy();
        expect(userNoexistent).toBeFalsy();

        await expect(UserService.userExistsAndCheckPassword({
            email: "email@email.com",
            password: "123"
        })).rejects.toEqual({ status: 400, message: 'As senhas não batem' });



    })
    

})