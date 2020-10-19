import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { UserDetails } from './user.details.entity';
import { Role } from '../role/role.entity';
//decorador para que esta clase se convierta en una tabla
@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({type: 'varchar', unique: true, length: 25, nullable: false })
  username: string;

  @Column({type: 'varchar', nullable: false})
  email: string;

  @Column({type: 'varchar', nullable: false})
  password: string;
  
  @Column({type: 'varchar', default: 'ACTIVE' ,length: 8})
  status: string;
  
  @CreateDateColumn({type: 'timestamp', name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({type: 'timestamp', name: 'updated_at'})
  updatedAt: Date;

  // relacion con role
  @ManyToMany(() => Role, role => role.users, { eager: true })
  @JoinTable({ name: 'user_roles'}) // con esto le damos el nombre al campo
  roles: Role[];

  // relacion con detalle
  @OneToOne(() => UserDetails, { 
    // No tiene q ver con delete cascade
    cascade: true,
    nullable: false,
    // pues cada vez q hagamos un select de nuestra entidad user, el automaticamente me trae detalle
    eager: true 
  })
  @JoinColumn({ name: 'detail_id' }) // con esto le damos el nombre al campo
  details: UserDetails;
}