'use strict';

const AddTodoInput = require ('../../../application/use_cases/todos/addTodo/addTodoInput');
const inputSchema = require('../../../serverless/todos/createTodo/inputSchema');
const container = require('../../../frameworks/dependency_injection/container');

const addTodoUseCase = container.resolve('addTodoUseCase');
const requestsService = container.resolve('requestService');
const middyHandler = container.resolve('middyHandler');

console.log(addTodoUseCase);

console.log(requestsService);

const baseHandler = async (event) => {
  
    const { name } = event.body;   

    const addTodoInput = new AddTodoInput(name);  

    return await requestsService.handle(async () => {
        
        return await addTodoUseCase.execute(addTodoInput);
        
    });
};

const handler = middyHandler(baseHandler, inputSchema);   
module.exports = { handler }