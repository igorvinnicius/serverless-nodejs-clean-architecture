const NotFoundError = require('../../../errors/notFoundError');

module.exports = class DeleteTodoUseCase{

    constructor(todosRepository) {
        this.todosRepository = todosRepository;
    }

    async execute(deleteTodoInput) {

        let todo = await this.todosRepository.getById(deleteTodoInput.id);

        if (todo == null) {          
            throw new NotFoundError('Todo not found.');
        }
        
        return await this.todosRepository.delete(todo.id);
    }
}