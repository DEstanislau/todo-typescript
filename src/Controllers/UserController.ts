import { Request, Response } from 'express'
import { v4 as uuid4 } from 'uuid'
import db from '../config/database'

class UserController{
  async show(request: Request, response: Response){
    try{
      const { id } = request.params

      const user = await db('users').where('id', id)

      if(!user.length) return response.status(400).json({ error: 'Usuário não encontrado'})

      response.status(200).json(user)
    }catch(err: any){
      response.status(400).json(err.message)
    }
  }

  async index(request: Request, response: Response){
    try{

      const users = await db('users')

      response.status(200).json(users)
    }catch(err: any){
      response.status(400).json(err.message)
    }
  }

  async store(request: Request, response: Response){
    try{
      const { name, nickname, email } = request.body

      const userExists = await db('users').where('email', email)

      if(userExists.length) return response.status(400).json({ error: 'Usuário já cadastrado com este email'})

      const user = {
        id: uuid4(),
        name,
        nickname,
        email
      }

      await db('users').insert(user)

      response.status(201).json(user)
    }catch(err: any){
      response.status(400).json(err.message)
    }
  }

  async update(request: Request, response: Response){
    try{
      const body = request.body
      const { id } = request.params

      const getUser = async (id: string) => {
        return db('users').where('id', id)
      }

      const user = await getUser(id)

      if(!user.length) return response.status(400).json({ error: 'Usuário não existe'})

      await db('users').where('id', id).update(body)

      const userUpdated = await getUser(id)

      response.status(200).json(userUpdated)
    }catch(err: any){
      response.status(400).json(err.message)
    }
  }
}

export default new UserController()