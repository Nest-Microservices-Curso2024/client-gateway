import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    PORT: number;
    PRODUCT_MICROSERVICES_HOST: string;
    PRODUCT_MICROSERVICES_PORT: number;
}

const envsShema = joi.object({
    PORT: joi.number().required(),
    // DATABASE_URL: joi.string().required()
    PRODUCT_MICROSERVICES_HOST: joi.string().required(),   
    PRODUCT_MICROSERVICES_PORT:joi.number().required(),
})
.unknown(true);

const { error, value } = envsShema.validate( process.env ) ;
if ( error ) {
 throw new Error(`Config validation error: ${ error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
    port: envVars.PORT,
    productsMicroserviceHost: envVars.PRODUCT_MICROSERVICES_HOST,
    productsMicroservicePort: envVars.PRODUCT_MICROSERVICES_PORT,
}
