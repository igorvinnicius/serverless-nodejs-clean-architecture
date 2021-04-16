const createTodoInputSchema = {
    type: 'object',
    properties: {
      body: {
        type: 'object',
        properties: {
          id: { type: 'string' },         
        },
        required: ['id']
      }
    }
   }

module.exports = createTodoInputSchema;