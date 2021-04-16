const NotFoundError = require('../../../errors/notFoundError');

module.exports = class GetTodoUseCase {

    constructor(todosRepository) {
        this.todosRepository = todosRepository;
    }
   
    async execute(getTodoInput) {       
        
        let todo = await this.todosRepository.getById(getTodoInput.id);

        if (todo == null) {          
            throw new NotFoundError('Todo not found.');
        }

        return todo;
    }
}