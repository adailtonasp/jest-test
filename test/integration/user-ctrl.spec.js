const routes = require('../../src/routes');
const axios = require('axios');
const request = require('supertest');
const mongoose = require('mongoose');
const UserController = require('../../src/controllers/user-ctrl');
const SessionService = require('../../src/services/session-service');

const app = require('../../index');

describe('UserController - integration',()=>{

    test('deve criar um usuario com email invalido ',async ()=>{
       
        const response = await request(app)
            .post('/user')
            .send({
                "name":"adailton",
                "email":"@invalid@email.com",
                "password":"123"
            })
        
        expect(response.status).toEqual(400)
        expect(response.body).toEqual("Email inválido")

    })

    test('deve criar um usuario com senha invalida',async ()=>{
       
        const response = await request(app)
            .post('/user')
            .send({
                "name":"adailton",
                "email":"email@email.com",
            })
    
        expect(response.status).toEqual(400);
        expect(response.body).toEqual("Senha inválida");

    })

    test('deve criar um usuario com sucesso',async ()=>{
       
        const response = await request(app)
            .post('/user')
            .send({
                "name":"adailton",
                "email":"email@email.com",
                "password" : "12345"
            })
    
        console.log('criando usuario com sucesso',response.body)
        
        expect(response.status).toEqual(200);
        expect(response.body.id).toBeTruthy();

    })

    //crie o mock para alterar senha de usuario
    jest.mock('../../src/services/user-service', () => ({
        changePassword: jest.fn(),
    }));
    
    
    test('deve alterar a senha de um usuario enquanto ele esta logado', async () => {
        const mockUser = {
            name: 'adailton',
            email: 'email@example.com',
            password: 'old-password',
        };

        //crie o token de acesso 
        const token = SessionService.generateToken(mockUser.email)

        const mockNewPassword = 'new-password';

        const mockChangePassword = jest.spyOn(UserController, 'changePassword');
        mockChangePassword.mockResolvedValue(mockUser);

        const response = await request(app)
            .post('/change-password')
            .set('header',token)
            .send({
                userId: mockUser.id,
                newPassword: mockNewPassword,
            });

        expect(response.status).toEqual(200);
        expect(response.body).toEqual(mockUser);

        expect(mockChangePassword).toHaveBeenCalledWith(mockUser.id, mockNewPassword);
    });
    
    

})
