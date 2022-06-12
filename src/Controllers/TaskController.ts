import { Request, Response } from 'express'
import { v4 as uuid4 } from 'uuid'
import db from '../config/database'

class UserController{
  async show(request: Request, response: Response){
    try{
      const { id } = request.params

      const task = await db('tasks').innerJoin('users', 'users.id', 'tasks.creatoruserid').where('tasks.id', id)

      if(!task.length) return response.status(400).json({ error: 'Task não encontrada'})

      response.status(200).json(task)
    }catch(err: any){
      response.status(400).json(err.message)
    }
  }

  async store(request: Request, response: Response){
    try{
      const { title, description, limitdate, creatoruserid } = request.body

      const user = await db('users').where('id', creatoruserid)

      if(!user.length) return response.status(400).json({ error: 'Não existe usuário com este ID em nosso sistema'})

      const task = await db('tasks').where('title', title).andWhere('id', creatoruserid)

      if(task.length) return response.status(400).json({error: 'Já existe uma tarefa com este título'})

      const newTask = {
        id: uuid4(),
        title,
        description,
        limitdate,
        creatoruserid
      }

      await db('tasks').insert(newTask)

      response.status(201).json(newTask)
    }catch(err: any){
      response.status(400).json(err.message)
    }
  }
}

export default new UserController()