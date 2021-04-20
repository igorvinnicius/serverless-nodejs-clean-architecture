const expect = require('chai');
const sinon = require('sinon');

const Todo = require('../../../src/entities/todo.js');
const DeleteTodoUseCase = require('../../../src/application/use_cases/todos/deleteTodo/deleteTodoUseCase');
const DeleteTodoInput = require('../../../src/application/use_cases/todos/deleteTodo/deleteTodoInput');

describe('Delete Todo Use Case', () => {

    it('should delete a todo', async () => {
        
        const todosRepository = { getById:() => {}, delete:() => {} };

        const expectedTodos = [ new Todo('Task 1') ];

        sinon.stub(todosRepository, 'getById').returns(expectedTodos[0]);

        sinon.stub(todosRepository, 'delete').callsFake((input) => {           
            
            expectedTodos.pop();    
        });

        const deleteTodoUseCase = new DeleteTodoUseCase(todosRepository);

        const deleteTodoInput = new DeleteTodoInput(1);

        await deleteTodoUseCase.execute(deleteTodoInput);

        expect.expect(todosRepository.delete.called).to.be.true;
        expect.expect(expectedTodos.length).to.be.equals(0);    

    });

    it('should throw an error when todo does not exist', async () => {
        
        try {

            const todosRepository = { getById:() => {}, update:() => {} };            

            sinon.stub(todosRepository, 'getById').returns(null);           

            const deleteTodoUseCase = new DeleteTodoUseCase(todosRepository);

            const deleteTodoInput = new DeleteTodoInput(2);

            await deleteTodoUseCase.execute(deleteTodoInput);

            expect.expect.fail();
        }
        catch (err) {            
            
            expect.expect(err.name).to.be.equal('NotFoundError');
            expect.expect(err.message).to.be.equal('Todo not found.');
        }
       
    });
});