import request from 'supertest'
import { app } from '../app'
import createConnection from '../database'

describe('Surveys', () => {
  
  beforeAll(async ()=> {
    const connection = await createConnection()
    await connection.runMigrations()
  })

  it('should be able to create a new survey', async () => {

    const response = await request(app).post('/surveys').send({
      title: 'Survey Example',
      description: 'example survey with jest'
    })

    expect(response.status).toBe(201)

  })

  it('should be able again to create a new survey', async () => {

    const response = await request(app).post('/surveys').send({
      title: 'Again Survey Example',
      description: 'Again example survey with jest'
    })

    expect(response.status).toBe(201)

  })

  it('should be able to list all surveys', async () => {

    const response = await request(app).get('/surveys')

    expect(response.body.length).toBe(2)

  })

})