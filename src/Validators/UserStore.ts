import { Request, Response, NextFunction } from 'express'
import * as Yup from 'yup'

export default async(request: Request, response: Response, next: NextFunction) => {
  try{
    const schema = Yup.object().shape({
      name: Yup.string().required('Nome é obrigatório'),
      nickname: Yup.string().required('Nickname é obrigatório'),
      email: Yup.string().email('Formato do email está errado').required('Email é obrigatório')
    })

    await schema.validate(request.body, { abortEarly: false })
    return next()
  }catch(err: any){
    response.status(400).json({ error: 'Validação Falhou', messages: err.inner})
  }
}