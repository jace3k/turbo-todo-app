import { Optional } from "@nestjs/common";
import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import { BaseEntity } from "./base.entity";
import { List } from "./list.entity";

@Entity()
export class Todo extends BaseEntity {
  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar', default: '' })
  description: string;

  @ManyToOne(() => List, (list: List) => list.todos, { onDelete: "CASCADE" })
  @RelationId('list')
  list: number;

}