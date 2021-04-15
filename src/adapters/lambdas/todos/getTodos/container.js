const awilix = require('awilix');
const BaseContainer = require('../../../../frameworks/dependency_injection/baseContainer');
const TodosRepository = require('../../../../frameworks/persistence/dynamoDB/todosRepository');
const GetTodosUseCase = require('../../../../application/use_cases/todos/getTodos/getTodosUseCase');

class Container extends BaseContainer {

    constructor() {
        
        super();

        this.container.register({
            todosRepository: awilix.asClass(TodosRepository),
            getTodosUseCase: awilix.asClass(GetTodosUseCase),
        });

    }

}

module.exports = new Container();