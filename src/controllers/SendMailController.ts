import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository'
import { UserRepository } from '../repositories/UserRepository'
import { SurveysRepository } from '../repositories/SurveysRepository'

class SendMailController {
	async execute(req: Request, res: Response): Promise<Response> {
		const { email, survey_id } = req.body

		const usersRepository = getCustomRepository(UserRepository)
		const surveysRepository = getCustomRepository(SurveysRepository)
		const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

		//Verificar se existe o Usuario com aquele ID
		const userAlreadyExists = await usersRepository.findOne({ email })

		if (!userAlreadyExists) {
			return res.status(400).json({ error: 'User does not exists' })
		}

		//Verificar se existe a pesquisa com aquele ID
		const surveyAlreadyExists = await surveysRepository.findOne({
			id: survey_id,
		})

		if (!surveyAlreadyExists) {
			return res.status(400).json({ error: 'Surveys does not exists' })
		}

		//Salvando as informações na tabela surveys_users
		const surveysUsers = surveysUsersRepository.create({
			user_id: userAlreadyExists.id,
			survey_id
		})

		await surveysUsersRepository.save(surveysUsers)

		return res.status(201).json(surveysUsers)
	}
}

export { SendMailController }
