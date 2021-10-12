import { Global, Module } from "@nestjs/common";
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Global() //un module global est vu par tout les modules (il suffit de l'importer
          // dans le module principal)
@Module({
  controllers: [TodoController],
  providers: [TodoService]
})
export class TodoModule {}
