import express from 'express'
import usersRoute from './Routes/userRoutes';
import tasksRoute from './Routes/taskRoute';

const app = express()

app.use(express.json())

app.use('/user', usersRoute)
app.use('/task', tasksRoute)

app.listen(3333, () => console.log('server running on port 3333'))