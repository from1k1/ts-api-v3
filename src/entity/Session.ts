import { Entity, PrimaryGeneratedColumn, PrimaryColumn, OneToOne, Unique, JoinColumn, Index } from "typeorm";
@Entity()
@Unique(["user", "token"])
export class Session {

    @PrimaryColumn()
    @Index({ unique: true })
    user: string;

    @PrimaryColumn()
    token: string;

}
