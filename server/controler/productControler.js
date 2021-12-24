const formidable = require('formidable');
const { Product } = require("../model/productSchema");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");
const { connect } = require('http2');

module.exports.addProduct = (req, res) => {
    const form = formidable({ multiples: true });

    form.parse(req, async (err, fields, files) => {
        //console.log(fields);
        //console.log(files);
        const { p_name, actual_price, discount_price, catagari} = fields;
        if (err) {
            return res.status(400).json({ msg: "err", err });
        } else {
            //set image path
            const { mimetype } = files.p_photo;
            const split = mimetype.split("/");
            const extension = split[1].toLowerCase();
            files.p_photo.originalFilename = uuidv4() + "." + extension;
            const newPath = __dirname + `/../../client/public/ProductImages/${files.p_photo.originalFilename}`;
            //copy image and save data into mongoDB
            fs.copyFile(files.p_photo.filepath, newPath, async (err) => {
                if (!err) {
                    try {
                        const product = await Product.create({
                            photo: files.p_photo.originalFilename,
                            p_name,
                            actual_price,
                            discount_price,
                            catagari
                        });
                        return res.status(201).json({ msg: "Add Product Successfuly", product });
                    } catch (error) {
                        return res.status(400).json({ msg: "Internal Server Error", error });
                    }
                } else {
                    return res.status(400).json({ msg: "error", err });
                }
            })
        }
    });
};

module.exports.fetchProducts = async(req, res) => {
    const page = req.params.page;
    const parPage = 2;
    const skip = (Number(page)-1)*parPage;
    try {
        const count = await Product.find({}).countDocuments();
        const products = await Product.find({}).skip(skip).limit(parPage);
        return res.status(201).json({ products, parPage, count });
    } catch (error) {
        return res.status(400).json({ msg: "Server Error" });
    }
}

module.exports.fetchProduct = async(req, res) => {
    const id = req.params.id;
    try {
        const product = await Product.find({_id: id});
        return res.status(200).json({product});
    } catch (error) {
        return res.status(400).json({ msg: "Server Error" });
    }
}

module.exports.sendEmail = async(req, res) => {
    console.log("hj")
     const email = req.params.email;
//     console.log(req.body);
     console.log(email);
     if(!email){
         return res.status(400).json({ msg: "Plz enter email" });
     }else{
        let transporter = nodemailer.createTransport({
            service:'gmail',
            host: "smtp.email.com",
            port:465,
            
            secure: true, // true for 465, false for other ports
            auth: {
              user: "zabiullah18816@gmail.com", // generated ethereal user
              pass: "zabi18816", // generated ethereal password
            },
          });
          let info = await transporter.sendMail({
            from: 'zabiullah18816@gmail.com', // sender address
            to: email, // list of receivers
            subject: "Hello ✔", // Subject line
            html: "<h3>welcome in zee ecomerce</h3><p>Thanks for purchasing our product</p>", // html body
          });
          if(info.messageId){
              console.log("mail  end...")
          }
        return res.status(200).json({ msg: "Thanks for purchasing our product" });
     }
}