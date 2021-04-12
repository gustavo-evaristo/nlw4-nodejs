/* eslint-disable no-mixed-spaces-and-tabs */
import { Column, Entity, PrimaryColumn, CreateDateColumn } from 'typeorm'

import { v4 as uuid } from 'uuid'

@Entity('surveysUsers')
class SurveysUsers {
  @PrimaryColumn()
  readonly id: string

  @Column()
  user_id: string

  @Column()
  survey_id: string

  @Column()
  value: number

  @CreateDateColumn()
  created_at: Date

  constructor() {
  	if (!this.id) {
  		this.id = uuid()
  	}
  }
}

export { SurveysUsers }
