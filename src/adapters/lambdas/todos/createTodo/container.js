const awilix = require('awilix');
const BaseContainer = require('../../../../frameworks/dependency_injection/baseContainer');
const TodosRepository = require('../../../../frameworks/persistence/dynamoDB/todosRepository');
const AddTodosUseCase = require('../../../../application/use_cases/todos/addTodo/addTodoUseCase');

class Container extends BaseContainer {

    constructor() {
        
        super();

        this.container.register({
            todosRepository: awilix.asClass(TodosRepository),
            addTodoUseCase: awilix.asClass(AddTodosUseCase)
        });
    }
}

module.exports = new Container();