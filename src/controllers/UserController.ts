import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { UserRepository } from '../repositories/UserRepository'

class UserController {
	async create(req: Request, res: Response): Promise<Response> {
		const { name, email } = req.body

		if (!name || !email) {
			return res.status(400).json({ error: 'invalid fields' })
		}

		const userRepository = getCustomRepository(UserRepository)

		const userAlreadyExists = await userRepository.findOne({ email })

		if (userAlreadyExists) {
			return res.status(400).json({ error: 'user already exists' })
		}

		const user = userRepository.create({ name, email })

		await userRepository.save(user)

		return res.status(201).json(user)
	}

	async show(req: Request, res: Response): Promise<Response> {
		const userRepository = getCustomRepository(UserRepository)

		const all = await userRepository.find()

		return res.status(200).json(all)
	}
}

export default new UserController 
