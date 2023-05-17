import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [ProductModule, TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
