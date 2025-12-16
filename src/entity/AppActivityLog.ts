import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity('app_activity_log')
export class AppActivityLog {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    code!: number;

    @Column()
    action!: string;

    @Column('nvarchar', { length: 'MAX' })
    payload!: string;

    @CreateDateColumn({ type: "datetime2" })
    created_at?: Date;
}
