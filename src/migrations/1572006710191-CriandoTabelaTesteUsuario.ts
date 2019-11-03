import {MigrationInterface, QueryRunner} from 'typeorm';

export class CriandoTabelaTesteUsuario1572006710191 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            CREATE TABLE TESTE_USUARIO (
                id int,
                nome varchar(50),
                email varchar(50),
                senha varchar(50),
                tentativasInvalidasSenha int
            );

            INSERT INTO TESTE_USUARIO VALUES (1, 'Rafael Braga', 'rafabraga90@gmail.com', '123456', 0);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        //
    }

}
