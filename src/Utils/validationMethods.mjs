import { body, query } from "express-validator";

//Registration Fields validate------------------------------------------------------------------------------------------------------------------------
export const RegisterValidator = () => [
   body("username")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Please Enter Username"),

   body("email").isEmail().withMessage("Valid Email required"),
   body("mobile").notEmpty().withMessage("Mobile Number is required"),
   body("role").trim().escape().notEmpty().withMessage("Please Enter Role"),

   body("con_password")
      .notEmpty()
      .withMessage("please enter password")
      .isStrongPassword({
         minLength: 8,
         minLowercase: 1,
         minUppercase: 1,
         minNumbers: 1,
         minSymbols: 1,
      })
      .withMessage(
         "Password must include at least 8 characters, 1 lowercase, 1 uppercase, 1 number, and 1 symbol"
      ),
];


//login Fields validate------------------------------------------------------------------------------------------------------------------------

export const loginValidator = () => [
   body("Username")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Please Enter Username"),

   body("Password")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Please Enter Password"),
];
