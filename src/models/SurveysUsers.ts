/* eslint-disable no-mixed-spaces-and-tabs */
import { Column, Entity, PrimaryColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm'

import { v4 as uuid } from 'uuid'
import { User } from './User'
import { Surveys } from './Surveys'

@Entity('surveysUsers')
class SurveysUsers {
  @PrimaryColumn()
  readonly id: string

  @Column()
  user_id: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id'})
  user: User

  @Column()
  survey_id: string

  
  @ManyToOne(() => Surveys)
  @JoinColumn({ name: 'survey_id'})
  survey: Surveys

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
