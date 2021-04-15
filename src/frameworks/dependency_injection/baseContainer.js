const awilix = require('awilix');
const uuid = require('uuid');
const AWS = require('aws-sdk');

const middyHandler = require('../../adapters/requests/middyHandler');
const RequestsService = require('../../adapters/requests/requestsService');

module.exports = class BaseContainer {

    constructor() {
        
        this.container = awilix.createContainer({
            injectionMode: awilix.InjectionMode.CLASSIC
        });

        this.container.register({
   
            requestService: awilix.asClass(RequestsService),            
            middyHandler: awilix.asValue(middyHandler),
            uuid: awilix.asValue(uuid),
            AWS: awilix.asValue(AWS)
            
          });
    }

    get(dependency) {
        return this.container.resolve(dependency);
    }    
}  