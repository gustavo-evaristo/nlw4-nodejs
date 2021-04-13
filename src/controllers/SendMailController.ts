import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository'
import { UserRepository } from '../repositories/UserRepository'
import { SurveysRepository } from '../repositories/SurveysRepository'
import SendMailService from '../services/SendMailService'
import { resolve } from 'path'

class SendMailController {
	async execute(req: Request, res: Response): Promise<Response> {
		const { email, survey_id } = req.body

		const usersRepository = getCustomRepository(UserRepository)
		const surveysRepository = getCustomRepository(SurveysRepository)
		const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

		//Verificar se existe o Usuario com aquele ID
		const user = await usersRepository.findOne({ email })

		if (!user) {
			return res.status(400).json({ error: 'User does not exists' })
		}

		//Verificar se existe a pesquisa com aquele ID
		const survey = await surveysRepository.findOne({
			id: survey_id,
		})

		if (!survey) {
			return res.status(400).json({ error: 'Surveys does not exists' })
		}

		const variables = {
			name: user.name,
			title: survey.title,
			description: survey.description,
			user_id: user.id,
			link: process.env.URL_MAIL,
		}

		const npsPath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs')

		const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
			where: {
				user_id: user.id,
				value: null,
			},

			relations: ['user', 'survey'],
		})

		if (surveyUserAlreadyExists) {
			await SendMailService.execute(email, survey.title, variables, npsPath)
			return res.status(200).json(surveyUserAlreadyExists)
		}

		//Salvando as informações na tabela surveys_users
		const surveysUsers = surveysUsersRepository.create({
			user_id: user.id,
			survey_id,
		})

		await surveysUsersRepository.save(surveysUsers)

		await SendMailService.execute(email, survey.title, variables, npsPath)

		return res.status(201).json(surveysUsers)
	}
}

export default new SendMailController()
