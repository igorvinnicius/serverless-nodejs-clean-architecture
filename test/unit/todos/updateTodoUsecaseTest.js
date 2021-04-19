const expect = require('chai');
const sinon = require('sinon');

const Todo = require('../../../src/entities/todo.js');
const UpdateTodoUseCase = require('../../../src/application/use_cases/todos/updateTodo/updateTodoUseCase.js');
const UpdateTodoInput = require('../../../src/application/use_cases/todos/updateTodo/updateTodoInput.js');

describe('Update Todo Use Case', () => {

    it('should update a todo', async () => {
        
        const todosRepository = { getById:() => {}, update:() => {} };

        const expectedTodos = [ new Todo('Task 1') ];

        sinon.stub(todosRepository, 'getById').returns(expectedTodos[0]);

        sinon.stub(todosRepository, 'update').callsFake((input) => {           
            
            expectedTodos[0].name = input.name;    
        });

        const updateTodoUseCase = new UpdateTodoUseCase(todosRepository);

        const updateTodoInput = new UpdateTodoInput(1, 'Task Updated');

        await updateTodoUseCase.execute(updateTodoInput);

        expect.expect(todosRepository.update.called).to.be.true;
        expect.expect(expectedTodos[0].name).to.be.equals(updateTodoInput.name);    

    });

    it('should throw an error when todo does not exist', async () => {
        
        try {

            const todosRepository = { getById:() => {}, update:() => {} };            

            sinon.stub(todosRepository, 'getById').returns(null);           

            const updateTodoUseCase = new UpdateTodoUseCase(todosRepository);

            const updateTodoInput = new UpdateTodoInput(2, 'New Name');

            await updateTodoUseCase.execute(updateTodoInput);

            expect.expect.fail();
        }
        catch (err) {            
            
            expect.expect(err.name).to.be.equal('NotFoundError');
            expect.expect(err.message).to.be.equal('Todo not found.');
        }
       
    });

    it('should throw an error when todo name already exists', async () => {
        
        try {

            const todosRepository = { getById:() => {}, update:() => {} };              

            const todo = new Todo('New Task');

            sinon.stub(todosRepository, 'getById').returns(todo);        

            const updateTodoUseCase = new UpdateTodoUseCase(todosRepository);

            const updateTodoInput = new UpdateTodoInput(1, todo.name);

            await updateTodoUseCase.execute(updateTodoInput);

            expect.expect.fail();
        }
        catch (err) {            
            
            expect.expect(err.name).to.be.equal('DuplicateError');
            expect.expect(err.message).to.be.equal('Todo name already exists.');
        }
       
    });

});