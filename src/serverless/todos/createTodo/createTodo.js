'use strict';

const TodosRepository = require('../../../frameworks/persistence/dynamoDB/todosRepository');
const AddTodoUseCase = require('../../../application/use_cases/todos/addTodo/addTodoUseCase');
const AddTodoInput = require ('../../../application/use_cases/todos/addTodo/addTodoInput');
const RequestsService = require('../../../frameworks/requests/requestsService');
const middyHandler = require('../../../frameworks/requests/middyHandler');
const inputSchema = require('../../../serverless/todos/createTodo/inputSchema');

const todosRepository = new TodosRepository();
const addTodoUseCase = new AddTodoUseCase(todosRepository);
const requestsService = new RequestsService();

const baseHandler = async (event) => {
  
    const { name } = event.body;   

    const addTodoInput = new AddTodoInput(name);  
    
    return await requestsService.handle(async () => {
        
        return await addTodoUseCase.execute(addTodoInput);
        
    });
};
   
const handler = middyHandler(baseHandler, inputSchema);   
module.exports = { handler }
