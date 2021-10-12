import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Put, Query, Req, Res, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { Request, Response } from "express";
import { DurationInterceptor } from "src/interceptors/duration.interceptor";
import { UpperAndFusionPipe } from "src/pipes/upper-and-fusion.pipe";
import { AddTodoDTO } from "./dto/add-todo.dto";
import { GetPaginatedTodoDTO } from "./dto/get-paginated-todo.dto";
import { Todo } from "./entities/todo.entity";
import { TodoService } from "./todo.service";

@UseInterceptors(DurationInterceptor)
@Controller("todo")
export class TodoController {
  constructor(
    private todoService: TodoService
  ) { }
  @Get()
  getTodos(
    @Query() myQueryParams: GetPaginatedTodoDTO
  ) {
  //  console.log(myQueryParams instanceof GetPaginatedTodoDTO);
  //  console.log(myQueryParams);
    return this.todoService.getTodos();
  }
  // @Get("1")
  // getTodos1(
  //   @Req() request: Request,
  //   @Res() response: Response
  // ) {
  //   console.log(request);
  //   response.status(205);
  //   response.json({ contenu: 'Je suis Hazem' });
  // }

  @Post()
  addTodo(
    @Body(ValidationPipe) newTodo: AddTodoDTO,
    // @Body('id') id:number
  ): Todo {
    return this.todoService.addTodo(newTodo);
  }

  @Delete(':id')
  deleteTodo(
    @Param("id", ParseIntPipe) id
  ) {
    console.log(typeof (id));
    return this.todoService.deleteTodo(+id); //le "+" n'est pas nécéssaire car on a utilisé 
    //un parse int pipe
  }

  @Put(':id')
  modifierTodo(
    @Param('id', ParseIntPipe) id,
    @Body() todo: Partial<AddTodoDTO>
  ) {
    return this.todoService.updateTodo(id, todo);
    // old={
    //   ...old,
    //   ...todo
    // }
  }

  @Get(":id")
  getTodoById(@Param('id', new ParseIntPipe(    // Ici on fait un new pour personnaliser le pipe
    {
      errorHttpStatusCode: HttpStatus.NOT_FOUND,

    }
  )) id): Todo {
    return this.todoService.getTodoById(id);
  }

  @Post('pipe')
  testPipe(
    @Param('data', UpperAndFusionPipe) paramData,
    @Body(UpperAndFusionPipe) data
  ) { return data; }
}
