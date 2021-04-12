const middy = require('@middy/core');
const jsonBodyParser = require('@middy/http-json-body-parser');
const httpErrorHandler = require('@middy/http-error-handler');
const validator = require('@middy/validator');

const middyHandler = (baseHandler, inputSchema) => {    

    const handler = middy(baseHandler)
    .use(jsonBodyParser())    
    .use(httpErrorHandler());

    if(inputSchema){
        handler.use(validator({inputSchema}));
    }

    return handler;
};

module.exports = middyHandler;