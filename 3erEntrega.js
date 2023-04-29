const fs = require ("fs");

class ProductManager{

    constructor(path) {

        this.path = path;
        this.products = [];   
    try {
        const productsString = fs.readFileSync(this.path, "utf-8");
        const products = JSON.parse(productsString);
        this.products = products;    
    } catch (error) {
        return 'file not found'
    }
    }

    addProduct(product){
     const verificationCode = this.products.find ((prod) => prod.code === product.code);     
     if (verificationCode){ 
         return 'Error: This product was loaded before';
     }   
     if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock){
         return 'Error: This product is not complete';
     }
    let nextId = this.getNextId ()
     product.id = nextId;
        this.products.push(product) 
        const productsString = JSON.stringify(this.products, null ,2);
        fs.writeFileSync(this.path, productsString)
     return 'This product was loaded succesfull';
    }

    getNextId(){
        let lastId = 0;
          try {
            const productsString = fs.readFileSync(this.path, "utf-8");
            const products = JSON.parse(productsString); 
            if (products.length > 0){
                lastId = products[products.length -1].id;
            }
            return lastId + 1;         
        } catch (error) {
            return 1
        }
    }
    
   getProducts(){
     const productsString = fs.readFileSync(this.path, "utf-8");
     const productsGet = JSON.parse(productsString);
     return productsGet.length > 0 ? productsGet : 'No products';
   }
   
   getProductsById(id){
     const productsString = fs.readFileSync(this.path, "utf-8");
     const productsById = JSON.parse(productsString); 
     const findProduct = productsById.find (prod => prod.id === id);
     if (!findProduct){
       return 'Error: Not found'
     } 
     return  findProduct;
   }

   updateProduct(id, prodUpdate){
    const productIndex = this.products.findIndex (prod => prod.id === id);
    if(productIndex === -1){
        return 'Not found'
    }else{
        if(typeof(prodUpdate) === 'object'){
            this.products[productIndex] = {...this.products[productIndex], ...prodUpdate, id: this.products[productIndex].id}
            const productstoString = JSON.stringify(this.products, null ,2);
            fs.writeFileSync(this.path, productstoString)
        }
    }
   }

   deleteProduct(id){
    const productIndex = this.products.findIndex (prod => prod.id === id);
    if(productIndex === -1){
        return 'Not found'
    }
    this.products.splice(productIndex,1)
    const productstoString = JSON.stringify(this.products, null ,2);
    fs.writeFileSync(this.path, productstoString)
   }
}

const productManagerCreate = new ProductManager('cervezas.json')

const product = {
    title: 'Ipa',
    description: 'Beer',
    price: 1000,
    thumbnail: 'https://vinotecamasis.com.ar/wp-content/uploads/2022/01/Cerveza-Imperial-IPA-Lata-473-ml.png',
    code: 1,
    stock: 50,
}

const product1 = {
    title: 'Apa',
    description: 'Beer',
    price: 1500,
    thumbnail: 'https://vinotecamasis.com.ar/wp-content/uploads/2022/01/Cerveza-Imperial-IPA-Lata-473-ml.png',
    code: 2,
    stock: 60,
}

const product2 = {
    title: 'Stout',
    description: 'Beer',
    price: 1200,
    thumbnail: 'https://vinotecamasis.com.ar/wp-content/uploads/2022/01/Cerveza-Imperial-IPA-Lata-473-ml.png',
    code: 3,
    stock: 30,
}
const product3 = {
    title: 'Lager',
    description: 'Beer',
    price: 1900,
    thumbnail: 'https://vinotecamasis.com.ar/wp-content/uploads/2022/01/Cerveza-Imperial-IPA-Lata-473-ml.png',
    code: 4,
    stock: 10,
}

const product4 = {
    title: 'Lager',
    description: 'Beer',
    price: 1900,
    thumbnail: 'https://vinotecamasis.com.ar/wp-content/uploads/2022/01/Cerveza-Imperial-IPA-Lata-473-ml.png',
    code: 5,
    stock: 10,
}


/*
productManagerCreate.addProduct(product);
productManagerCreate.addProduct(product1);
productManagerCreate.addProduct(product2);
productManagerCreate.addProduct(product3);
productManagerCreate.addProduct(product4);

console.log(productManagerCreate.getProductsById(5));

productManagerCreate.updateProduct(5,{title: 'Pilsen'})
productManagerCreate.deleteProduct(1)
console.log(productManagerCreate.getProducts());
*/
