'use strict';

const container = require('../../../../frameworks/dependency_injection/container').forGetTodosUseCase();

const getTodosUseCase = container.resolve('getTodosUseCase');
const requestsService = container.resolve('requestService');
const middyHandler = container.resolve('middyHandler');

const baseHandler = async (event) => {

    return await requestsService.handle(async () => {
        
        return await getTodosUseCase.execute();
        
    });
};

const handler = middyHandler(baseHandler);   
module.exports = { handler }