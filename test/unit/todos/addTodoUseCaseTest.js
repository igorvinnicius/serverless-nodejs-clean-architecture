const expect = require('chai');
const sinon = require('sinon');

const Todo = require('../../../src/entities/todo.js');
const AddTodoUseCase = require('../../../src/application/use_cases/todos/addTodo/addTodoUseCase.js');
const AddTodoInput = require('../../../src/application/use_cases/todos/addTodo/addTodoInput.js');


describe('Add Todo Use Case', () => {

    it('should add a todo', async () => {        
        
        const todosRepository = { getByName:() => {}, add:() => {} };

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

            const todosRepository = { getByName:() => {}};

            const todo = new Todo('Task1');

            sinon.stub(todosRepository, 'getByName').returns(todo);
        
            const addTodoUseCase = new AddTodoUseCase(todosRepository);

            const addTodoInput = new AddTodoInput(todo.name);
        
            await addTodoUseCase.execute(addTodoInput);

            expect.expect.fail();

        }
        catch (err) {            
            expect.expect(err.name).to.be.equal('DuplicateError');
            expect.expect(err.message).to.be.equal('Todo name already exists.');
        }        
       
    });

});