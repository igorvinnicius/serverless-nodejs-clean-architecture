'use strict';

const AddTodoInput = require ('../../../../application/use_cases/todos/addTodo/addTodoInput');
const inputSchema = require('./inputSchema');
const container = require('../../../../frameworks/dependency_injection/container').forAddTodosUseCase();

const addTodoUseCase = container.resolve('addTodoUseCase');
const requestsService = container.resolve('requestService');
const middyHandler = container.resolve('middyHandler');

const baseHandler = async (event) => {
  
    const { name } = event.body;   

    const addTodoInput = new AddTodoInput(name);  

    return await requestsService.handle(async () => {
        
        return await addTodoUseCase.execute(addTodoInput);
        
    });
};

const handler = middyHandler(baseHandler, inputSchema);   
module.exports = { handler }
