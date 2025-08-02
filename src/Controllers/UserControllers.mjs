import { matchedData, validationResult } from "express-validator";
import { errorCreate } from "../Utils/error-creator.mjs";
import Users from "../Models/Users.mjs";
import  bcrypt from 'bcrypt'

class UserControllers {
   // Regiter  new user------------------------------------------------------------------------------------------------------------------------------
   registerNewUser = async (req, res) => {
      const error = validationResult(req);
      const registerError = errorCreate(error.array());
      if (error.array().length) {
         return res.status(400).json({
            msg: "error",
            error: registerError,
            data: null,
         });
      }

      const { username, email, mobile, role, con_password } = matchedData(req);

      const hashedpwd = await bcrypt.hash(con_password,10);

      try {
         const newUser = await Users.create({
            username,
            email,
            mobile,
            role,
            password: hashedpwd,
         });
         return res.status(201).json({
            msg: "User Registered Successfull",
            data: newUser,
         });
      } catch (error) {
         console.log(error);

         if (error.code === 11000) {
            const duplicatedField = Object.keys(error.keyPattern)[0]; // 'email' or 'username'

            let message = "Duplicate value";
            if (duplicatedField === "email") {
               message = "This email is already registered";
            } else if (duplicatedField === "username") {
               message = "This username is already taken";
            }

            return res.status(409).json({
               msg: "error",
               error: message,
               data: null,
            });
         }
         return res.status(500).json({
            msg: "error",
            error: "Internal Server Error",
         });
      }
   };
}

export default new UserControllers();
