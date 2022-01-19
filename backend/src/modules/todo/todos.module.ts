import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { List } from "../../entities/list.entity";
import { Todo } from "../../entities/todo.entity";
import { TodosController } from "./todos.controller";
import { TodosService } from "./todos.service";

@Module({
  imports: [TypeOrmModule.forFeature([Todo]), TypeOrmModule.forFeature([List])],
  providers: [TodosService],
  controllers: [TodosController],
})
export class TodosModule { }
