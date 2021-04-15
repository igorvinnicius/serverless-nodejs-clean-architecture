'use strict';

const container = require('./container');

const getTodosUseCase = container.get('getTodosUseCase');
const requestsService = container.get('requestService');
const middyHandler = container.get('middyHandler');

const baseHandler = async () => {

    return await requestsService.handle(async () => {
        
        return await getTodosUseCase.execute();
        
    });
};

const handler = middyHandler(baseHandler);   
module.exports = { handler }