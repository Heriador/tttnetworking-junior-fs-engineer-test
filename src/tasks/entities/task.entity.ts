import { User } from "src/users/entities/user.entity";
import { Status } from "../status.enum";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("tasks")
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column()
    description: string;

    @Column({ default: Status.pending })
    status: Status;

    @Column({ nullable: false, type: "date" })
    end_date: Date;

    @Column({ nullable: false })
    userId: number;

    @ManyToOne(() => User, user => user.tasks)
    user: User;
}


