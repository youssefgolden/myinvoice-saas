import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1755685955366 implements MigrationInterface {
    name = 'Auto1755685955366'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "clients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(160) NOT NULL, "email" character varying(180), "address" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" uuid, CONSTRAINT "UQ_79b1e2eb223bd0f380a32c8bf16" UNIQUE ("email", "ownerId"), CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_17c0b2073ebd7875388fa98ab19" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_17c0b2073ebd7875388fa98ab19"`);
        await queryRunner.query(`DROP TABLE "clients"`);
    }

}
