import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "../user/user.entity";

// recordar que es plural para la bd y singular para los modelos. 
@Entity('roles')
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({type: 'varchar', length: 20, nullable: false })
  name: string;

  @Column({type: 'text', nullable: false})
  description: string;
  // default es el valor q agrega por default
  @Column({type: 'varchar', default: 'ACTIVE' ,length: 8})
  status: string;
  
  @CreateDateColumn({type: 'timestamp', name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({type: 'timestamp', name: 'updated_at'})
  updatedAt: Date;

  // relacion con usuario, muchos a muchos..
  // La logica es: un usuario puede tener muchos roles y role puede tener muchos usuarios..
  @ManyToMany(() => User, user => user.roles)
  @JoinColumn()
  users: User[];
}