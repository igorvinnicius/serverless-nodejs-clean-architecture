const awilix = require('awilix');
const uuid = require('uuid');
const AWS = require('aws-sdk');

const middyHandler = require('../../adapters/requests/middyHandler');
const RequestsService = require('../../adapters/requests/requestsService');
const TodosRepository = require('../../frameworks/persistence/dynamoDB/todosRepository');

const baseContainer = awilix.createContainer({
    injectionMode: awilix.InjectionMode.CLASSIC
});

baseContainer.register({
   
    requestService: awilix.asClass(RequestsService),
    todosRepository: awilix.asClass(TodosRepository),   
    middyHandler: awilix.asValue(middyHandler),
    uuid: awilix.asValue(uuid),
    AWS: awilix.asValue(AWS)
  });

const container = {

    forAddTodosUseCase: () => {

        const AddTodoUseCase = require('../../application/use_cases/todos/addTodo/addTodoUseCase');

        baseContainer.register({
            addTodoUseCase: awilix.asClass(AddTodoUseCase)
        });

        return baseContainer;
    },
    
    forGetTodosUseCase: () => {

        const GetTodosUseCase = require('../../application/use_cases/todos/getTodos/getTodosUseCase');

        baseContainer.register({
            getTodosUseCase: awilix.asClass(GetTodosUseCase)
        });

        return baseContainer;
    }

}

  module.exports = container;