const awilix = require('awilix');
const uuid = require('uuid');
const AWS = require('aws-sdk');

const middyHandler = require('../../adapters/requests/middyHandler');
const RequestsService = require('../../adapters/requests/requestsService');
const TodosRepository = require('../../frameworks/persistence/dynamoDB/todosRepository');
const AddTodoUseCase = require('../../application/use_cases/todos/addTodo/addTodoUseCase');
const GetTodosUseCase = require('../../application/use_cases/todos/getTodos/getTodosUseCase');

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.CLASSIC
});

container.register({
   
    requestService: awilix.asClass(RequestsService),
    todosRepository: awilix.asClass(TodosRepository),
    addTodoUseCase: awilix.asClass(AddTodoUseCase),
    getTodosUseCase: awilix.asClass(GetTodosUseCase),
    middyHandler: awilix.asValue(middyHandler),
    uuid: awilix.asValue(uuid),
    AWS: awilix.asValue(AWS)
  });  

  module.exports = container;