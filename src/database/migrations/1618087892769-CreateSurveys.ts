import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSurveys1618087892769 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'surveys',

                columns: [
                    {
                        name: 'id',
                        type: 'uuid'
                    },
                    {
                        name: 'title',
                        type: 'varchar'
                    },
                    {
                        name: 'description',
                        type: 'varchar'
                    },
                    {
                        name: 'created_at',
                        type: 'timestamps',
                        default: 'now()'
                    }                    
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('surveys')
    }

}
