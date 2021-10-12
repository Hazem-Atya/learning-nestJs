import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan'
import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { DurationInterceptor } from './interceptors/duration.interceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions= {
    origin: ['http://localhost:4200']
  };
  app.enableCors(corsOptions);
  
  app.use(morgan('dev'));
  app.use(
    (req: Request, res: Response, next)=>{
      console.log('Middleware from app.use');
      next();
    }
  )

  app.useGlobalPipes(new ValidationPipe({
    transform:true,
    whitelist: true,
    forbidNonWhitelisted: true
  })) 
  //ici je dois faire une instance
  // car je ne peux pas utiliser l'injection 
  //des dépendances car le maints n'est associé à aucun module.
  app.useGlobalInterceptors(new DurationInterceptor());

  await app.listen(3000);
}
bootstrap();
