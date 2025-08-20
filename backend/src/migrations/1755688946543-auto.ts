import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1755688946543 implements MigrationInterface {
    name = 'Auto1755688946543'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "business_profiles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "legalName" character varying(180) NOT NULL, "taxId" character varying(60), "address" text, "defaultCurrency" character varying(3) NOT NULL DEFAULT 'USD', "logoUrl" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" uuid, CONSTRAINT "REL_4b450201f2148f57c3a73dff33" UNIQUE ("ownerId"), CONSTRAINT "PK_29525485b1db8e87caf6a5ef042" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "invoices" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "invoiceNumber" character varying(40) NOT NULL, "issueDate" date NOT NULL, "dueDate" date, "currency" character varying(3) NOT NULL DEFAULT 'USD', "status" character varying(20) NOT NULL DEFAULT 'draft', "subtotal" numeric(12,2) NOT NULL DEFAULT '0', "taxTotal" numeric(12,2) NOT NULL DEFAULT '0', "total" numeric(12,2) NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" uuid, "clientId" uuid, CONSTRAINT "UQ_f9029123afa0673fb7fec10bb6d" UNIQUE ("invoiceNumber", "ownerId"), CONSTRAINT "PK_668cef7c22a427fd822cc1be3ce" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "business_profiles" ADD CONSTRAINT "FK_4b450201f2148f57c3a73dff334" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invoices" ADD CONSTRAINT "FK_7bc2047f5ae3214a34951eb0318" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invoices" ADD CONSTRAINT "FK_d9df936180710f9968da7cf4a51" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invoices" DROP CONSTRAINT "FK_d9df936180710f9968da7cf4a51"`);
        await queryRunner.query(`ALTER TABLE "invoices" DROP CONSTRAINT "FK_7bc2047f5ae3214a34951eb0318"`);
        await queryRunner.query(`ALTER TABLE "business_profiles" DROP CONSTRAINT "FK_4b450201f2148f57c3a73dff334"`);
        await queryRunner.query(`DROP TABLE "invoices"`);
        await queryRunner.query(`DROP TABLE "business_profiles"`);
    }

}
