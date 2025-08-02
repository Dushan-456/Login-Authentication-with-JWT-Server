import { matchedData, validationResult } from "express-validator";
import { errorCreate } from "../Utils/error-creator.mjs";
import Users from "../Models/Users.mjs";

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

      try {
         const newUser = await Users.create({
            username,
            email,
            mobile,
            role,
            password:con_password,
         });
         return res.status(201).json({
            msg: "User Registered Successfull",
            data: newUser,
         });
      } catch (error) {
         console.log(error);

         if (error.code === 11000) {
            return res.status(409).json({
               msg: "error",
               error: "This Email Already registerd",
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
