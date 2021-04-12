module.exports = class GetTodosUseCase {

    constructor(todosRepository) {
        this.todosRepository = todosRepository;
    }

    async execute() {        
        return await this.todosRepository.getAll();
    }
}