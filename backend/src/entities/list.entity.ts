import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Todo } from "./todo.entity";

@Entity()
export class List extends BaseEntity {
  @Column('varchar')
  name: string;

  @OneToMany(type => Todo, todo => todo.list)
  todos: Todo[];
}