const expect = require('chai');
const sinon = require('sinon');

const GetTodoUseCase = require('../../../src/application/use_cases/todos/getTodo/getTodoUseCase');
const GetTodoInput = require('../../../src/application/use_cases/todos/getTodo/getTodoInput');
const Todo = require('../../../src/entities/todo');

describe('Get Todo Use Case', () => {

    it('should return a todo by id', async () => {

        const todosRepository = { getById:() => {} }

        const expectedTodo = new Todo('Software Engeneering')
        expectedTodo.id = 1;

        sinon.stub(todosRepository, 'getById').withArgs(1).returns(expectedTodo);

        const getTodoUseCase = new GetTodoUseCase(todosRepository);

        const getTodoInput = new GetTodoInput(1);

        const todo = await getTodoUseCase.execute(getTodoInput);

        expect.expect(todosRepository.getById.called).to.be.true;
        expect.expect(todo).to.be.equals(expectedTodo);    

    });

    it('should throw an error when todo does not exist', async () => {
        
        try {

            const todosRepository = { getById:() => {} }          

            sinon.stub(todosRepository, 'getById').returns(null);

            const getTodoUseCase = new GetTodoUseCase(todosRepository);

            const getTodoInput = new GetTodoInput(1);

            const todo = await getTodoUseCase.execute(getTodoInput);

            expect.expect.fail();
        }
        catch (err) {         
            
            expect.expect(err.name).to.be.equal('NotFoundError');   
            expect.expect(err.message).to.be.equal('Todo not found.');
        }
       
    });

});