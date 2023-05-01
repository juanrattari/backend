const express = require ("express");
const ProductManager = require ('./3erEntrega.js')
const data  = new ProductManager('./src/cervezas.json')

const app = express();
const PORT = 5050;

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.listen ( PORT, ()=>{
    console.log(`La app esta corriendo por el puerto ${PORT}`)
})


app.get ('/products', async (req,res) =>{
    try {
        const limit = req.query.limit
        const products = await data.getProducts();
        if (limit){
           res.status(200).json(products.slice(0,limit))
        } else {
           res.status(200).json(products)
        }
    } catch (error) {
        res.status(500).json({message: "Error"})
    }
});

app.get ('/products/:pid', async (req,res) =>{
    try {
        const id = req.params.pid
        const product = await data.getProductsById(parseInt(id) );
        if (product){
            res.status(200).json(product)
        } else {
            res.status(404).json({error: 'Product not found'})
        }       
    } catch (error) {
        res.status(500).json({message: "Error"})
    }
});
 
