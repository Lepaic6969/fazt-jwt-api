import Product from '../models/product.model.js';

export const getProducts=async(req,res)=>{
    try{
        const products=await Product.find();
        res.json(products);
    }catch(error){
        //500 -> Error interno del servidor
        res.status(500).json({message:error.message});
    }
}
export const getProductById=async(req,res)=>{
    const {id}=req.params;
    try{
        const product=await Product.findById(id);
        if(!product){
            //404 -> Recurso no encontrado
            return res.status(404).json({message:'El producto no existe.'})
        }
        return res.json(product);

    }catch(error){
        //500 -> Error interno del servidor
        res.status(500).json({message:error.message});
    }
}
export const createProduct=async(req,res)=>{
    const {name,category,price,image} =req.body;
    if(!name || !category || !price || !image){
        //400 -> Bad Request
        res.status(400).json({message:'Recuerde enviar todos los campos: name, category, price, image'});
    }
    const product=new Product(
     {
         name,
         category,
         price,
         image
     });
 
     try{
         const newProduct=await product.save();
         //201 -> Created
         res.status(201).json(newProduct);
     }catch(error){
         //500 -> Error interno del servidor
         res.status(500).json({message:error.message});
     }
}
export const updateProduct=async(req,res)=>{
    const {id}=req?.params;
    try{
        const productUpdated=await Product.findByIdAndUpdate(id,req.body,{
             new:true
        });
        if(!productUpdated){
            //404 -> Recuerso no encontrado
            return res.status(404).json({message:'¡El producto no existe!'});
        }
        //200 -> Respuesta exitosa
        res.status(200).json(productUpdated);

    }catch(error){
        //500 -> Error interno del servidor
        res.status(500).json({message:error.message});
    }
}
export const deleteProduct=async(req,res)=>{
    const {id}=req.params;
    try{
        const product=await Product.findByIdAndDelete(id);
        
        if(!product){
            //404 -> Recurso no encontrado
            return res.status(404).json({message:'¡El producto no existe!'});
        }
        //200 -> Respuesta Exitosa
        return res.status(200).json(product);

    }catch(error){
        //500 -> Error interno del servidor
        res.status(500).json({message:error.message});
    }
 
}
