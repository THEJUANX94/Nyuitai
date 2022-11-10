import cors from 'cors';
import express from 'express'
import morgan from 'morgan'
import router from './routes/auth.routes';

const app = express();

//settings
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//routes
app.use(router);

app.get('/', (req, res) => {
    res.send('THE API is at http://localhost:' + app.get('port'));
});

export default app;