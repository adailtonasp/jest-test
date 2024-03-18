const SessionService = require('../../src/services/session-service');

describe('SessionService', () => {
    
    test('deve gerar um token com o email fornecido', () => {
        const email = 'test@example.com';
        const token = SessionService.generateToken({ email });

        expect(typeof token).toBe('string');

    });
});
