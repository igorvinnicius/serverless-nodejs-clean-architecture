const awilix = require('awilix');
const BaseContainer = require('../../../../frameworks/dependency_injection/baseContainer');
const TodosRepository = require('../../../../frameworks/persistence/dynamoDB/todosRepository');
const GetTodosUseCase = require('../../../../application/use_cases/todos/getTodo/getTodoUseCase');

class Container extends BaseContainer {

    constructor() {
        
        super();

        this.container.register({
            todosRepository: awilix.asClass(TodosRepository),
            getTodoUseCase: awilix.asClass(GetTodosUseCase)
        });
    }
}

module.exports = new Container();