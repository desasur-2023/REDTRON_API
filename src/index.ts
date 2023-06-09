import app from "./app";
require("dotenv").config();
import { sequelize } from "./db";

const { PORT } = process.env;
const port = PORT || 3001;

app.listen(port,()=>{
    sequelize.sync({ force: true})
    console.log(`Server levantado en puerto ${port}`);
})
