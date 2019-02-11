import { Entity, PrimaryGeneratedColumn, Column, OneToOne, Unique, Index, PrimaryColumn } from "typeorm";
import { Session } from './Session';
@Entity()
@Unique(["id", "login"])
export class User {
    @PrimaryGeneratedColumn('uuid')
    @Index({ unique: true })
    id: string;

    @Column()
    @Index({ unique: true })
    login: string;

    @Column()
    password: string;

    @Column()
    profile_pic: string;

}
