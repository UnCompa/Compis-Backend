import mongoose from "mongoose"

const url = "mongodb+srv://uncompa:Pachecomalo1_@cluster.2w5zdjs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster"
mongoose.connect(url, {}).then(()=>{
    console.log("Base conectada");
}).catch((e)=> {
    console.log(e);
})