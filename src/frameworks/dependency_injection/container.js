const awilix = require('awilix');
const uuid = require('uuid');
const AWS = require('aws-sdk');

const middyHandler = require('../../frameworks/requests/middyHandler');
const RequestsService = require('../../frameworks/requests/requestsService');
const TodosRepository = require('../../frameworks/persistence/dynamoDB/todosRepository');
const AddTodoUseCase = require('../../application/use_cases/todos/addTodo/addTodoUseCase');

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.CLASSIC
});

container.register({
   
    requestService: awilix.asClass(RequestsService),
    todosRepository: awilix.asClass(TodosRepository),
    addTodoUseCase: awilix.asClass(AddTodoUseCase),    
    middyHandler: awilix.asValue(middyHandler),
    uuid: awilix.asValue(uuid),
    AWS: awilix.asValue(AWS)

  });  

  module.exports = container;