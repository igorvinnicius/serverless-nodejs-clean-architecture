const middy = require('@middy/core');
const jsonBodyParser = require('@middy/http-json-body-parser');
const httpErrorHandler = require('@middy/http-error-handler');
const validator = require('@middy/validator');

const middyHandler = (baseHandler, inputSchema) => {

    return handler = middy(baseHandler)
    .use(jsonBodyParser())
    .use(validator({inputSchema}))
    .use(httpErrorHandler());

};

module.exports = middyHandler;