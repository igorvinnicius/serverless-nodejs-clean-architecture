const awilix = require('awilix');
const BaseContainer = require('../../../../frameworks/dependency_injection/baseContainer');
const TodosRepository = require('../../../../frameworks/persistence/dynamoDB/todosRepository');
const DeleteTodoUseCase = require('../../../../application/use_cases/todos/deleteTodo/deleteTodoUseCase');

class Container extends BaseContainer {

    constructor() {
        
        super();

        this.container.register({
            todosRepository: awilix.asClass(TodosRepository),
            deleteTodoUseCase: awilix.asClass(DeleteTodoUseCase)
        });
    }
}

module.exports = new Container();