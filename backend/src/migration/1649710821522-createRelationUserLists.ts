import {MigrationInterface, QueryRunner} from "typeorm";

export class createRelationUserLists1649710821522 implements MigrationInterface {
    name = 'createRelationUserLists1649710821522'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "list" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "list" ADD CONSTRAINT "FK_46ded14b26382088c9f032f8953" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "list" DROP CONSTRAINT "FK_46ded14b26382088c9f032f8953"`);
        await queryRunner.query(`ALTER TABLE "list" DROP COLUMN "userId"`);
    }

}
