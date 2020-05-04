import {MigrationInterface, QueryRunner} from "typeorm";

export class fixNameDateDetail1588617245036 implements MigrationInterface {
    name = 'fixNameDateDetail1588617245036'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_details" ALTER COLUMN "lastname" DROP NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_details" ALTER COLUMN "lastname" SET NOT NULL`, undefined);
    }

}
