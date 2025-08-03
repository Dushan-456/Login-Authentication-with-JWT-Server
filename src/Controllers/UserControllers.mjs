import { matchedData, validationResult } from "express-validator";
import { errorCreate } from "../Utils/error-creator.mjs";
import Users from "../Models/Users.mjs";
import bcrypt from "bcrypt";
import { tokenGen } from "../Utils/jwt.mjs";

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

      const hashedpwd = await bcrypt.hash(con_password, 10);

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

   //  user login------------------------------------------------------------------------------------------------------------------------------

   userLogin = async (req, res) => {
      const error = validationResult(req);
      const loginError = errorCreate(error.array());
      if (error.array().length) {
         return res.status(400).json({
            msg: "error",
            error: loginError,
            data: null,
         });
      }

      const { emailOrUsername, password } = matchedData(req);

      try {
         const user = await Users.findOne({
            $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
         });

         if (!user) {
            return res.status(404).json({
               msg: "error",
               error: { general: "User not found" },
               data: null,
            });
         }

         const isMatch = await bcrypt.compare(password, user.password);
         if (!isMatch) {
            return res.status(401).json({
               msg: "error",
               error: { general: "Invalid credentials" },
               data: null,
            });
         }
         if (user && isMatch) {
            // Token genarate with jwt auth---------------------------------------------------------------------------------------------
            const payload = {
               id: user._id,
               username: user.username,
               role: user.role,
            };
            const token = tokenGen(payload);

            return res.status(200).json({
               msg: "Login Successfull",
               error: null,
               data: {
                  token,
               },
            });
         }
      } catch (error) {
         console.error("Login Error:", err);
         return res.status(500).json({
            msg: "error",
            error: { general: "Internal server error" },
            data: null,
         });
      }
   };
}

export default new UserControllers();
