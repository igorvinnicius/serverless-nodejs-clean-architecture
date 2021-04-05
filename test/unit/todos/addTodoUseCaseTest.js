import expect from 'chai';
import sinon from 'sinon';


import Todo from '../../../src/entities/todo.js';
import AddTodoUseCase from '../../../src/application/use_cases/todos/addTodo/addTodoUseCase.js';
import AddTodoInput from '../../../src/application/use_cases/todos/addTodo/addTodoInput.js';
import TodosRepository from '../../../src/application/contracts/repositories/todosRepository.js';

describe('Add Todo Use Case', () => {

    it('should add a todo', async () => {

        const todosRepository = new TodosRepository();

        const expectedTodos = [ new Todo('Software Engeneering') ];

        sinon.stub(todosRepository, 'getByName').returns(null);

        const todo = new Todo('Task 1');

        sinon.stub(todosRepository, 'add').callsFake(function fakeAdd() {
           expectedTodos.push(todo);
        });

        const addTodoUseCase = new AddTodoUseCase(todosRepository);

        const addTodoInput = new AddTodoInput(todo.name);

        await addTodoUseCase.execute(addTodoInput);

        expect.expect(todosRepository.add.called).to.be.true;
        expect.expect(expectedTodos).to.have.length(2);
    });

    it('should throw an error when todo name already exists', async () => {
        
        try {

            const todosRepository = new TodosRepository();

            const todo = new Todo('Task1');

            sinon.stub(todosRepository, 'getByName').returns(todo);
        
            const addTodoUseCase = new AddTodoUseCase(todosRepository);

            const addTodoInput = new AddTodoInput(todo.name);
        
            await addTodoUseCase.execute(addTodoInput);

            expect.expect.fail();

        }
        catch (err) {            
            expect.expect(err.name).to.be.equal('DuplicateError');
            expect.expect(err.message).to.be.equal('Category name already exists.');
        }
       
    });

});