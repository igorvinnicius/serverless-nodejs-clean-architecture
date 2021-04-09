const createTodoInputSchema = {
    type: 'object',
    properties: {
      body: {
        type: 'object',
        properties: {
          name: { type: 'string' },         
        },
        required: ['name']
      }
    }
   }

module.exports = createTodoInputSchema;