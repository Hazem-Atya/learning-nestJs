import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class AddTodoDTO {
    @IsString()
    @IsNotEmpty()
    @MaxLength(25)
    @MinLength(6,{
        message:"La taille minimale du champ name est de 6 caractères."
    })
    name: string;
    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    description: string;
    
}