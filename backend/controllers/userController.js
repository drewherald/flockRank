const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);

    res.status(200).json({ email, userName: user.userName, token });
  } catch (e) {
    res.status(400).json({ error: e.message });
    console.log(e.message);
  }
};

//signup user
const signupUser = async (req, res) => {
  const { email, userName, password } = req.body;

  try {
    const user = await User.signup(email, userName, password);

    //create token
    const token = createToken(user._id);

    res.status(200).json({ email, userName, token });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

//update user

const updateUser = async (req,res) => {
  const { email, password } = req.body;

  try{

    const newPass = await User.updateUser(email, password)
    const user = await User.findOneAndUpdate(
        { email: email },
        {
          password: newPass
        },
        { new: true }
      );
    

    
    if (!user) {
      return res.status(404).json({ error: "No such user" }); 


    }
    res.status(200).json(user);

  }catch(error){
    res.status(400).json({ error: error.message});
    console.log(error)
  }
}

//forgot password
const sendEmail = async (req, res) => {

  try{
    
    const { recipient_email, OTP } = req.body

    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 587,
      secure: false,
      auth: {
          user:process.env.EMAIL,
          pass:process.env.EMAIL_PASSWORD
      }
    })
       
  
      const mail_configs = await transporter.sendMail( {
        from: process.env.EMAIL,
        to: recipient_email,
        subject: "FlockRank Password Recovery",
        html: `<!DOCTYPE html>
  <html lang="en" >
  <head>
    <meta charset="UTF-8">
    <title>FlockRank Password Recovery</title>
    
  
  </head>
  <body>
  <!-- partial:index.partial.html -->
  <div style="font-family: Helvetica,Arial,sans-serif;min-width:50svw;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
      <div style="border-bottom:1px solid #eee">
        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">FlockRank.net</a>
      </div>
      <p style="font-size:1.1em">Hi,</p>
      <p>Thank you for choosing FlockRank. Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 5 minutes</p>
      <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
      <p style="font-size:0.9em;">Regards,<br />FlockRank.net</p>
      <hr style="border:none;border-top:1px solid #eee" />
      <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
        <p>FlockRank.net</p>
      </div>
    </div>
  </div>
  <!-- partial -->
    
  </body>
  </html>`,
      }).then(() => console.log('done'))
  }catch(e){
    console.log(e)
  }


}

module.exports = { signupUser, loginUser, updateUser, sendEmail };
