import { Request, Response, NextFunction } from 'express'
import * as Yup from 'yup'

export default async(request: Request, response: Response, next: NextFunction) => {
  try{
    const schema = Yup.object().shape({
      title: Yup.string().required('Título é obrigatório'),
      description: Yup.string().required('Descrição é obrigatório'),
      limitdate: Yup.string().required('Data é obrigatória'),
      creatoruserid: Yup.string().required('Id do criador é obrigatório')
    })

    await schema.validate(request.body, { abortEarly: false })
    return next()
  }catch(err: any){
    response.status(400).json({ error: 'Validação Falhou', messages: err.inner})
  }
}