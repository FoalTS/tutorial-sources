import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class Todo {

  @ObjectIdColumn()
  id: number;

  @Column()
  text: string;

}
