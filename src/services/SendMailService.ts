/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import nodemailer, { Transporter } from 'nodemailer'
import fs from 'fs'
import handlebars from 'handlebars'


class SendMailService {
  private client: Transporter;

  constructor() {
  	nodemailer.createTestAccount().then((account) => {
  		const transporter = nodemailer.createTransport({
  			host: account.smtp.host,
  			port: account.smtp.port,
  			secure: account.smtp.secure,
  			auth: {
  				user: account.user,
  				pass: account.pass,
  			},
  		})

  		this.client = transporter
  	})
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  async execute(to: string, subject: string, variables: object, path: string) {

  	const templateFileContent = fs.readFileSync(path).toString('utf8')

  	const mailTemplateParse = handlebars.compile(templateFileContent)

  	const html = mailTemplateParse(variables)

  	const message = await this.client.sendMail({
  		to,
  		subject,
  		html,
  		from: 'NPS <noreplay@nps.com.br>'
  	})

  	console.log('Message sent: %s', message.messageId)
  	console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
  	
  }
}

export default new SendMailService()
