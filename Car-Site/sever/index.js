import exp from 'express';
import dot from 'dotenv';
import mon from 'mongoose';
import cors from 'cors';

const app = exp();
app.use(cors());
app.use(exp.json()); // This middleware should come before defining routes
dot.config();

const carSchema = new mon.Schema({
     make:{type:String},
     model:{type:String},
     year:{type:Number},
     price:{type:Number},
     image:{type:String},
     mobile:{type:Number},
})

const carCollection = mon.model('/car', carSchema);
app.post('/car',async(req,res) =>{
    const data = { make: req.body.make, model:req.body.model, year:req.body.year, price: req.body.price, image:req.body.image,mobile:req.body.mobile };
   try{
    const entry = new carCollection(data);
    await entry.save();
    res.status(200).json(data);
    console.log("Car added sucessfully.....!");
   } catch(error){
    res.status(400).json(error);
    console.log("Failed to add Car in DB...!");
   }

})

app.get('/car',async(req,res)=>{
    try{
      const data = await carCollection.find({}).exec();
      res.status(200).json(data);
      console.log("Get data Sucess!....");
    }catch(error){
      res.status(400).json(error);
      console.log("Failed to get the data!");
    }
})

const connect = async() =>{
    try{
        await mon.connect(process.env.MONGO)
        console.log("Connected to Data Base....!");
    } catch(err){
        console.log("Failed to connect  to data base");
    }
}

app.listen(process.env.PORT, () =>{
    connect()
    console.log('Sever is running......!');
})