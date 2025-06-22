import Product from "../models/product.js";
const addMaterial = async (req, res) => {
    try {
      console.log("Request Body:", req.body);
  
      const { name, materialType, price, college, image, download_link, isFree } = req.body;
  
      // Validate required fields
      if (
        !name ||
        !materialType ||
        typeof price !== 'number' ||
        !college
      ) {
        return res.status(400).send({ message: 'Please fill all required fields' });
      }
      
  
      const material = await Product.create({
        name,
        materialType,
        price,
        college,
        image,
        download_link,
        isFree,
      });
  
      res.status(201).send({success:true,message:"created in db"});
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).send({ message: "Error creating product", error: error.message });
    }
  };

  const getMaterials = async (req,res) =>{
    try{
        const material = await Product.find();
        res.status(200).send(material);
        
    }
    catch(error){
      return res.status(500).send({message:"internal server error"});
    }
  }

  export {addMaterial,getMaterials};