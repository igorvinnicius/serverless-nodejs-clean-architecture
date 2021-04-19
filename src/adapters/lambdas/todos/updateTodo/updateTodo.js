'use strict';

const UpdateTodoInput = require ('../../../../application/use_cases/todos/updateTodo/updateTodoInput');
const inputSchema = require('./inputSchema');
const container = require('./container');

const updateTodoUseCase = container.get('updateTodoUseCase');
const requestsService = container.get('requestService');
const middyHandler = container.get('middyHandler');

const baseHandler = async (event) => {
  
    const { id, name } = event.body;   

    const updateTodoInput = new UpdateTodoInput(id, name);  

    return await requestsService.handle(async () => {
        
        return await updateTodoUseCase.execute(updateTodoInput);
        
    });
};

const handler = middyHandler(baseHandler, inputSchema);
module.exports = { handler }