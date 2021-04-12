/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable linebreak-style */
import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class survey1618254055674 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'survey',

				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
					},

					{
						name: 'title',
						type: 'varchar',
					},

					{
						name: 'description',
						type: 'varchar',
					},

					{
						name: 'created_at',
						type: 'timestamps',
						default: 'now()',
					},
				],
			})
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('survey')
	}
}
