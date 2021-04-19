const awilix = require('awilix');
const BaseContainer = require('../../../../frameworks/dependency_injection/baseContainer');
const TodosRepository = require('../../../../frameworks/persistence/dynamoDB/todosRepository');
const UpdateTodoUseCase = require('../../../../application/use_cases/todos/updateTodo/updateTodoUseCase');

class Container extends BaseContainer {

    constructor() {
        
        super();

        this.container.register({
            todosRepository: awilix.asClass(TodosRepository),
            updateTodoUseCase: awilix.asClass(UpdateTodoUseCase)
        });
    }
}

module.exports = new Container();