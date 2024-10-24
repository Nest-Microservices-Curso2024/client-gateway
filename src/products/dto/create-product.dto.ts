import { Type } from "class-transformer";
import { IsNumber, IsString, Min } from "class-validator";

export class CreateProductDto {


    @IsString()
    public name: string;

    @IsNumber({
        maxDecimalPlaces: 4, //Número máximo de decimales
    })
   // @IsPositive() //Precio siempre sea positivo
    @Min(0) // Valor mínimo de cero
    @Type(() => Number)
    public price: number;


}
