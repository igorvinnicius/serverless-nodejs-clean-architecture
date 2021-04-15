const expect = require('chai');
const sinon = require('sinon');

const GetTodosUseCase = require('../../../src/application/use_cases/todos/getTodos/getTodosUseCase');
const Todo = require('../../../src/entities/todo');

describe('Get Todos Use Case', () => {

    it('should return a list of todos', async () => {

        const todosRepository = { getAll:() => {} }

        const expectedTodos = [new Todo('Task 1'), new Todo('Task 2')]

        sinon.stub(todosRepository, 'getAll').returns(expectedTodos);

        const getTodosUseCase = new GetTodosUseCase(todosRepository);

        const todos = await getTodosUseCase.execute();

        expect.expect(todosRepository.getAll.called).to.be.true;
        expect.expect(todos).to.be.equals(todos);    

    });
});