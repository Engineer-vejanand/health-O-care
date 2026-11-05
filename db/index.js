const mongoose = require("mongoose"); //database connectivity

const connectDB = async () => {
    try{
      const connectionInstance= await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
      console.log(`\nMONGO DB connected !! DB HOST: ${connectionInstance.connection.host}`)
    }
    catch(error){
        console.log("ERROR:",error)
        process.exit(1)
    }
}

module.exports ={ connectDB }
