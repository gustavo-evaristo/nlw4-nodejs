/* eslint-disable no-mixed-spaces-and-tabs */
import { Column, Entity, PrimaryColumn, CreateDateColumn } from 'typeorm'

import { v4 as uuid } from 'uuid'

@Entity('survey')
class Surveys {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
  	if (!this.id) {
  		this.id = uuid()
  	}
  }
}

export { Surveys }
