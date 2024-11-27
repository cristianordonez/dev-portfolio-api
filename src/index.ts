import 'dotenv/config'
import app from './app'

const port = process.env.PORT || 3000
const env = process.env.ENV
app.listen(port, () => {
    /* eslint-disable no-console */
    console.log(`Environment: ${env}\nListening: http://localhost:${port}`)
})
