import { Column, Entity, ManyToOne, OneToMany, RelationId } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Todo } from "./todo.entity";
import { User } from "./user.entity";

@Entity()
export class List extends BaseEntity {
  @Column('varchar')
  name: string;

  @OneToMany(type => Todo, todo => todo.list)
  todos: Todo[];

  @ManyToOne(() => User, (user: User) => user.lists, { onDelete: "CASCADE" })
  @RelationId('user')
  user: number;
}