import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from 'src/models/list.entity';
import { ListsController } from './lists.controller';

@Module({
  imports: [TypeOrmModule.forFeature([List])],
  controllers: [ListsController]
})
export class ListsModule {}
