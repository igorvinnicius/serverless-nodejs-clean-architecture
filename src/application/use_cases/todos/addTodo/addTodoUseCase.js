const Todo = require('../../../../entities/todo');
const DuplicateError = require('../../../errors/duplicateError');

module.exports = class AddTodoUseCase {

    constructor(todosRepository) {
        this.todosRepository = todosRepository;
    }

    async execute(addTodoInput) {                      

        const todo = await this.todosRepository.getByName(addTodoInput.name);        

        if (todo) {
            throw new DuplicateError('Todo name already exists.');
        }

        const newTodo = new Todo(addTodoInput.name);        
        
        return await this.todosRepository.add(newTodo);        
    }
}