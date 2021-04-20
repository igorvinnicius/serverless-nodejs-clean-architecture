'use strict';

const DeleteTodoInput = require ('../../../../application/use_cases/todos/deleteTodo/deleteTodoInput');
const inputSchema = require('./inputSchema');
const container = require('./container');

const deleteTodoUseCase = container.get('deleteTodoUseCase');
const requestsService = container.get('requestService');
const middyHandler = container.get('middyHandler');

const baseHandler = async (event) => {

    const id = event.pathParameters.id;   

    const deleteTodoInput = new DeleteTodoInput(id);

    return await requestsService.handle(async () => {
        
        return await deleteTodoUseCase.execute(deleteTodoInput);
        
    });
};

const handler = middyHandler(baseHandler);   
module.exports = { handler }