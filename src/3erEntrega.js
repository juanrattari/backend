const fs = require ("fs");

class ProductManager{

    constructor(path) {

        this.path = path;
    }

    async getProducts () {
        try {
            if(fs.existsSync(this.path)){
            let data = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(data);
            }
            await fs.promises.writeFile(this.path, JSON.stringify([]))
        } catch (error) {
            throw new Error (error.message);
        }}

    async addProduct(product){
        try {
            let data = await this.getProducts();
            const verificationCode = data.find ((prod) => prod.code === product.code);     
            if (verificationCode){ 
                return 'Error: This product was loaded before';
            }   
            if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock){
                return 'Error: This product is not complete';
            }
            const nextId = data.length > 0 ? data[data.length - 1].id + 1 : 1;
            product.id = nextId;
                data.push(product) 
                const productsString = JSON.stringify(data, null ,2);
                await  fs.promises.writeFile(this.path, productsString)
            return 'This product was loaded succesfull';
        } catch (error) {
            throw new Error (error.message)
        }}
        
    async getProductsById(id){
        try {
            let data = await this.getProducts();
            const findProduct = data.find (prod => prod.id === id);
            if (!findProduct){
                return 'Error: Not found'
            } 
            return  findProduct;
        } catch (error) {
            throw new Error (error.message)
        }}

    async updateProduct(id, prodUpdate){
        try {
            let data = await this.getProducts();
            const productIndex = data.findIndex (prod => prod.id === id);
            if(productIndex !== -1){
                data[productIndex] = {...data[productIndex], ...prodUpdate}
                const productstoString = JSON.stringify(data, null ,2);
                await fs.promises.writeFile(this.path, productstoString)
                } 
        } catch (error) {
            throw new Error (error.message)
        }}

    async deleteProduct(id){
        try {
            let data = await this.getProducts();
            const productIndex = data.findIndex (prod => prod.id === id);
            if(productIndex === -1){
                return 'Not found'
            }
            data.splice(productIndex,1)
            const productstoString = JSON.stringify(data, null ,2);
            await fs.promises.writeFile(this.path, productstoString)   
        } catch (error) {
            throw new Error (error.message)
        }}
}

const productManagerCreate = new ProductManager('./src/cervezas.json')

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
    title: 'Golden',
    description: 'Beer',
    price: 1900,
    thumbnail: 'https://vinotecamasis.com.ar/wp-content/uploads/2022/01/Cerveza-Imperial-IPA-Lata-473-ml.png',
    code: 5,
    stock: 10,
}

const asyncFn = async () =>{

 /*
    await productManagerCreate.addProduct(product)
    await productManagerCreate.addProduct(product1)
    await productManagerCreate.addProduct(product2)
    await productManagerCreate.addProduct(product3)
    await productManagerCreate.addProduct(product4)
    console.log(await productManagerCreate.getProductsById(2));
    await productManagerCreate.deleteProduct(4)
    await productManagerCreate.updateProduct(2,product2)
*/
}

asyncFn();

module.exports = ProductManager