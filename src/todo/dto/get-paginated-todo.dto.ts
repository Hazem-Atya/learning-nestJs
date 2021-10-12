import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class GetPaginatedTodoDTO {
    @IsNumber()
    @IsOptional()
    @Type(()=>Number)
    page: number;
    @IsNumber()
    @IsOptional()
    @Type(()=>Number)
    item: number;
    

}