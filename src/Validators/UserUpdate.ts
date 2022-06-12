import { Request, Response, NextFunction } from 'express'
import * as Yup from 'yup'

export default async(request: Request, response: Response, next: NextFunction) => {
  try{
    const schema = Yup.object().shape({
      name: Yup.string().min(1, 'Campo não pode ser vazio'),
      nickname: Yup.string().min(1, 'Campo não pode ser vazio'),
    })

    await schema.validate(request.body, { abortEarly: false })
    return next()
  }catch(err: any){
    response.status(400).json({ error: 'Validação Falhou', messages: err.inner})
  }
}