import { BeforeInsert, Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { hash } from 'bcrypt';
import { List } from "./list.entity";

@Entity('users')
export class User extends BaseEntity {
  @Column({ type: 'varchar', nullable: false, unique: true })
  username: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @OneToMany(type => List, list => list.user)
  lists: List[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 3);
  }
}