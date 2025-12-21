import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity('outgoing_requests')
export class OutgoingRequest {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    endpoint!: string;

    @Column({ length: 10 })
    method!: string;

    @Column('nvarchar', { length: 'MAX' })
    payload!: string;

    @Column()
    code!: number;

    @CreateDateColumn({ type: "datetime2" })
    created_at?: Date;
}
