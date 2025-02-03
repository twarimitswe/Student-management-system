require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const studentRoutes=require('./routes/studentRoutes');

const app=express();
app.use(cors());
app.use(express.json());
app.use('/upload',express.static('upload'));
app.use('/student', studentRoutes);

app.set('view engine', 'ejs');
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Connected Database"))
.catch(err =>(err));

const PORT=process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`));
