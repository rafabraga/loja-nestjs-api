import {MigrationInterface, QueryRunner} from 'typeorm';

export class CriandoTabelaTeste1570990099045 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            CREATE TABLE TESTE (
                id int,
                nome varchar(50)
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        //
    }

}
