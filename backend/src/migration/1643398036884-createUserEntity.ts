import {MigrationInterface, QueryRunner} from "typeorm";

export class createUserEntity1643398036884 implements MigrationInterface {
    name = 'createUserEntity1643398036884'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" DROP CONSTRAINT "FK_b26d47a28b6cc4ea63f21fd1cd8"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "todo" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "todo" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "todo" ALTER COLUMN "description" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "list" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "list" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "list" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "list" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "todo" ADD CONSTRAINT "FK_b26d47a28b6cc4ea63f21fd1cd8" FOREIGN KEY ("listId") REFERENCES "list"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" DROP CONSTRAINT "FK_b26d47a28b6cc4ea63f21fd1cd8"`);
        await queryRunner.query(`ALTER TABLE "list" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "list" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "list" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "list" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "todo" ALTER COLUMN "description" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "todo" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "todo" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "todo" ADD CONSTRAINT "FK_b26d47a28b6cc4ea63f21fd1cd8" FOREIGN KEY ("listId") REFERENCES "list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
