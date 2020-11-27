import Express from 'express';

const app = Express();
const port = 3001;
app.use(Express.json());
app.use(Express.urlencoded({extended : true}))

// Handle 'root' endpoint for POST method
app.post("/", (req, res)=> {
    console.log(req.body.title)
    res.sendStatus(200);
})

// Handle 'someendpoint' endpoint for POST method
app.post("/someendpoint", (req, res)=> {
    console.log(req.body.title)
    res.sendStatus(200);
})

// Listen for requests on the given port
app.listen(port, ()=> console.log("Listening on port") + port)