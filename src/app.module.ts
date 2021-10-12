import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirstMiddleware } from './middlewares/first.middleware';
import { logger } from './middlewares/logger.middleware';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //consumer.apply(FirstMiddleware).forRoutes('todo');
    /* consumer.apply(FirstMiddleware).forRoutes('todo'); 
       => appliquer le middleware sur toute les routes
    */
    // consumer.apply(FirstMiddleware, logger).forRoutes('hello',
    //   { path: 'todo', method: RequestMethod.GET },
    //   { path: 'todo', method: RequestMethod.DELETE },

    // );
    consumer.apply(FirstMiddleware).forRoutes('hello',
      { path: 'todo', method: RequestMethod.GET },
      { path: 'todo', method: RequestMethod.DELETE },
      
    ).apply(logger).forRoutes('').apply(HelmetMiddleware).forRoutes('');
  
  }
}
