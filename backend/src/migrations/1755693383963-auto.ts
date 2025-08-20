import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1755693383963 implements MigrationInterface {
    name = 'Auto1755693383963'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "invoice_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "position" integer NOT NULL DEFAULT '0', "description" text NOT NULL DEFAULT '', "quantity" numeric(12,3) NOT NULL DEFAULT '1', "unitPrice" numeric(12,2) NOT NULL DEFAULT '0', "taxPercent" numeric(5,2) NOT NULL DEFAULT '0', "lineTotal" numeric(12,2) NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "invoiceId" uuid, CONSTRAINT "PK_53b99f9e0e2945e69de1a12b75a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "invoice_items" ADD CONSTRAINT "FK_7fb6895fc8fad9f5200e91abb59" FOREIGN KEY ("invoiceId") REFERENCES "invoices"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invoice_items" DROP CONSTRAINT "FK_7fb6895fc8fad9f5200e91abb59"`);
        await queryRunner.query(`DROP TABLE "invoice_items"`);
    }

}
