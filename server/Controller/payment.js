const router = require("express").Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");

router.post("/orders", async ( req, res ) => {
    try{
        const instance = new Razorpay({
            key_id: process.env.KEY_ID,
            key_secret: process.env.KEY_SECRET
        });

        const options = {
            amount: req.body.amount * 100,  // 100 => 100 paisa * 100 = rs. 100.00
            currency: "INR",
            //receipt: crypto.randomBytes(10).toString("hex"),
        };

        instance.orders.create(options,(error, orders) => {
            if(error){
                console.log(error);
                return res.status(500).json({ message: "Something went wrong "});
            }
            res.status(200).json({ data: orders })
        })
    } catch(error){
        res.status(500).json({ message: "Internal Srever ERror!"});
        console.log(error);
    }
});

router.post("/verify", async (req, res) => {
    try{
        const { razorpay_order_id, razorpay_payment_id } = req.body;

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = Crypto.createHmac("sha256",  process.env.KEY_SECRET).update(sign.toString()).digest("hex");

        if(razorpay_signature === expectedSign){
            return res.status(200).json({ message: "payment Verified "})
        } else {
            return res.status(400).json({ message: "payment Failed "});
        }

    } catch (error){
        res.status(500).json({ message: "Internal Server Error!"});
        console.log(error);
    }
});

module.exports = router;