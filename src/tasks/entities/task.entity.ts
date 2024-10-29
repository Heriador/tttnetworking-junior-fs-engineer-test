import { Status } from "src/tasks/status.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({ nullable: false })
    end_date: Date;
}


