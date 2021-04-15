'use strict';

const AddTodoInput = require ('../../../../application/use_cases/todos/addTodo/addTodoInput');
const inputSchema = require('./inputSchema');
const container = require('./container');

const addTodoUseCase = container.get('addTodoUseCase');
const requestsService = container.get('requestService');
const middyHandler = container.get('middyHandler');

const baseHandler = async (event) => {
  
    const { name } = event.body;   

    const addTodoInput = new AddTodoInput(name);  

    return await requestsService.handle(async () => {
        
        return await addTodoUseCase.execute(addTodoInput);
        
    });
};

const handler = middyHandler(baseHandler, inputSchema);   
module.exports = { handler }
