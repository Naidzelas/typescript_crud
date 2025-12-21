import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('clients')
export class Client {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name!: string;

    @Column({ nullable: true })
    address?: string;

    @Column({ nullable: true })
    postcode?: string;

    @CreateDateColumn({ type: "datetime2" })
    created_at?: Date;

    @UpdateDateColumn({ type: "datetime2" })
    updated_at?: Date;
}