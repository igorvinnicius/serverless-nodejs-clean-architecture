const updateTodoInputSchema = {
    type: 'object',
    properties: {
      body: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' }   
        },
        required: ['id', 'name']
      }
    }
   }

module.exports = updateTodoInputSchema;