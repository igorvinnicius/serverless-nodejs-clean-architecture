module.exports = class RequestsService {

    async handle(func) {

        try {
            
            const result = await func();            

            return {
                statusCode: 200,
                body: JSON.stringify({
                    success: true,
                    data: result ? result : null       
                })
            };

        } catch (error) {            
            
            console.log(error);

            return {
                statusCode: error.statusCode,
                body: JSON.stringify({
                    success: false,
                    statusCode: error.statusCode,
                    error: {
                        name: error.name,
                        message: error.message,
                        details: error.data ? error.data : null            
                    }
                })
            };           
        }        
    }

}