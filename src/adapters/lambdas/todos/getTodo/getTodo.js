'use strict';

const GetTodoInput = require ('../../../../application/use_cases/todos/getTodo/getTodoInput');
const inputSchema = require('./inputSchema');
const container = require('./container');

const getTodoUseCase = container.get('getTodoUseCase');
const requestsService = container.get('requestService');
const middyHandler = container.get('middyHandler');

const baseHandler = async (event) => {

    const id = event.pathParameters.id;   

    const geTodoInput = new GetTodoInput(id);

    return await requestsService.handle(async () => {
        
        return await getTodoUseCase.execute(geTodoInput);
        
    });
};

const handler = middyHandler(baseHandler);   
module.exports = { handler }