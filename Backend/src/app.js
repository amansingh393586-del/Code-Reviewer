
import express from 'express'
import aiRoutes from './routes/ai.routes.js'
import cors from 'cors'

const app = express()

app.use(cors({
  origin: "http://localhost:5173"
}));


app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello Developer! The Architect system is active.')
})

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'UP',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
    });
});

app.use('/ai', aiRoutes)

export default app