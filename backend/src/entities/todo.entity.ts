import { TodoDto } from "src/dto/todo.dto";
import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { List } from "./list.entity";

@Entity()
export class Todo extends BaseEntity {
  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  description: string;

  @ManyToOne(() => List, (list: List) => list.todos)
  list: List;

}