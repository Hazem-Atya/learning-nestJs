import { Injectable, NotFoundException } from '@nestjs/common';
import { AddTodoDTO } from './dto/add-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {

    private todos: Todo[]=[];

    getTodos(): Todo[]{
        return this.todos;
    }
    addTodo(newTodo: AddTodoDTO): Todo {
        const { name, description } = newTodo;
        let id;
        if (this.todos.length) {
            id = this.todos[this.todos.length - 1].id + 1;
        } else {
            id = 1;
        }
        const todo= {
            id,
            name,
            description,
            createdAt: new Date()
        }
        this.todos.push(todo);
        return todo;
        // this.todos.push(todo);
        // // console.log("the id is "+id);
        // return todo;
    }
    getTodoById(id: number): Todo {
        const obj = this.todos.find(todo => todo.id == id);
        if (obj == undefined)
            throw new NotFoundException("le Todo ayant l'id " + id + " not found");
        else return obj;
    }
    deleteTodo(id:number){
        const index = this.todos.findIndex((todo) => todo.id === +id); //+id transforme la chaine id en un entier, car les paramètres de la requete sont vu comme des chaines
        if (index >= 0) {
          this.todos.splice(id, 1);
          console.log(`l'élement ayant l'id ` + id + " a été supprimé");
        }
        else {
          throw new NotFoundException(`le todo d'id ${id} n'existe pas`);
        }
        return {
          message: `Le todo d'id ${id} a été supprimé`,
          count: 1
        };
    }
    updateTodo(id: number, todo: Partial<AddTodoDTO>){
        let old = this.getTodoById(id);
        old.name = todo.name ? todo.name : old.name;
        old.description = todo.description ? todo.description : old.description;
        return old;
    }
}
