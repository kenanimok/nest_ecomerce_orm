import { Module } from '@nestjs/common';
import { CustomConfigModule } from './config/config.module';
import { DatabaseModule } from './config/database.module';
// import { CustomConfigModule } from './config.module';
// import { DatabaseModule } from './database.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    CustomConfigModule,
    DatabaseModule,
    UsersModule,
    // Other modules and components
  ],
})
export class AppModule {}
