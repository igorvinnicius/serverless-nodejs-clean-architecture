const NotFoundError = require('../../../errors/notFoundError');
const DuplicateError = require('../../../errors/duplicateError');

module.exports = class UpdateTodoUseCase{

    constructor(todosRepository) {
        this.todosRepository = todosRepository;
    }

    async execute(updateTodoInput) {        
        
        let todo = await this.todosRepository.getById(updateTodoInput.id);

        if (todo == null) {          
            throw new NotFoundError('Todo not found.');
        }

        if (todo.name === updateTodoInput.name) {          
            throw new DuplicateError('Todo name already exists.');
        }
        
        todo.name = updateTodoInput.name;
        
        return await this.todosRepository.update(todo);
    }
}