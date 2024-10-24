import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { PRODUCT_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';


@Controller('products')
export class ProductsController {
  constructor(

    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy

  ) {}

  @Post()
  createProduct( @Body() createProductDto: CreateProductDto) {
   return this.productsClient.send({ cmd: 'create_product ' }, createProductDto);
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto){
    // return 'Esta función muestra todos los productos';
    return this.productsClient.send({ cmd: 'find_all_products'}, paginationDto);
  }
  @Get(':id')
  async findOne(@Param('id') id: string){ //Si queremos utilizar el await necesitamos que el método sea asíncrono(async)

    return this.productsClient.send({  cmd: 'find one product'}, { id })
    .pipe(
      catchError( err =>{ throw new RpcException(err) } )
    )
    //Manejo de excepciones y muestra de mensajes de errores
    // try {

    //   const product = await firstValueFrom(

    //     this.productsClient.send({  cmd: 'find one product'}, { id })
    //   );

    //   return product;

    // } catch ( error ) {
    //   // console.log(error);
    //   // throw new BadRequestException(error);
    //   throw new RpcException(error);

    // }

    
  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: string,){
    return this.productsClient.send({ cmd: 'delete_product'}, { id })
    .pipe(
      catchError( err=> { throw new RpcException(err) } )
    )
  }

 @Patch(':id')
 patchProduct(
  @Param('id', ParseIntPipe) id: number,
  @Body() updateProductDto: UpdateProductDto
 ){
  return this.productsClient.send({ cmd: 'update_product' }, {
    id,
    ...updateProductDto
  }).pipe(
    catchError( err => { throw new RpcException(err) } )
  )


 }
}
