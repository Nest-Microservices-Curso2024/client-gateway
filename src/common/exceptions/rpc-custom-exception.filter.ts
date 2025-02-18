
import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';

import { RpcException } from '@nestjs/microservices';
import { error } from 'console';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {

    // console.log('Paso por aquí en nuestro Custom Filter')

    // // return throwError(() => exception.getError());

    // throw new UnauthorizedException('Hola Mundo')

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const rpcError = exception.getError();

    console.log(rpcError);
  
    if ( typeof rpcError == 'object' && 
       'status' in rpcError &&
       'message' in rpcError
    ) {
      const status = isNaN(+rpcError.status) ? 400 :+rpcError.status;
      return response.status(status).json(rpcError);
    }

    response.status(400).json({
      status: 400,
      message: rpcError,
      
    })

  }
}
