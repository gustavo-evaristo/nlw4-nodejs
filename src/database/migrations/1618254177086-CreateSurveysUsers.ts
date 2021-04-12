/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable linebreak-style */
import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateSurveysUsers1618254177086 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		queryRunner.createTable(
			new Table({
				name: 'surveysUsers',

				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true
					},

					{
						name: 'user_id',
						type: 'uuid'
					},

					{
						name: 'survey_id',
						type: 'uuid'
					},

					{
						name: 'value',
						type: 'number',
						isNullable: true
					},
					{
						name: 'created_at',
						type: 'timestamp',
						default: 'now()'
					}
				], 
				foreignKeys: [
					{
						name: 'FKuser',
						referencedTableName: 'users',
						referencedColumnNames: ['id'],
						columnNames: ['user_id'],
						onDelete: 'CASCADE',
						onUpdate: 'CASCADE'
					},
					{
						name: 'FKsurvey',
						referencedTableName: 'survey',
						referencedColumnNames: ['id'],
						columnNames: ['survey_id'],
						onDelete: 'CASCADE',
						onUpdate: 'CASCADE'
					}
				]
			})
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		queryRunner.dropTable('surveysUsers')
	}
}
