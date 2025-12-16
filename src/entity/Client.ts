import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name!: string;

    @Column()
    address!: string;

    @Column()
    postcode?: string;

    @Column("datetime")
    created_at?: Date;

    @Column("datetime")
    updated_at?: Date;
}