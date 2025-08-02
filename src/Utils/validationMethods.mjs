import { body, query } from "express-validator";

//Registration Fields validate------------------------------------------------------------------------------------------------------------------------
export const RegisterValidator = () => [
   body("Username")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Please Enter Username"),

   body("Name").trim().escape().notEmpty().withMessage("Please Enter Name"),

   body("Password")
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
         "Password must include at least 8 characters, 2 lowercase, 1 uppercase, 1 number, and 1 symbol"
      ),
];

export const userDataValidator = () => [
   body("first_name").notEmpty().withMessage("First Name is required"),
   body("last_name").notEmpty().withMessage("Last Name is required"),
   body("dob").notEmpty().withMessage("DOB is required"),
   body("gender").notEmpty().withMessage("Gender is required"),
   body("designation").notEmpty().withMessage("Designation is required"),
   body("mobile").notEmpty().withMessage("Mobile Number is required"),
   body("fb_profile").notEmpty().withMessage("Fb Profile is required"),
   body("gmail").isEmail().withMessage("Valid Gmail required"),
   body("age").isInt().withMessage("Age must be a number"),
   body("address").notEmpty().withMessage("Address is required"),
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

//common body Fields validate------------------------------------------------------------------------------------------------------------------------
export const comValidate = (...keys) => {
   const validateValues = [];
   keys.forEach((k) => {
      validateValues.push(
         body(k).trim().escape().notEmpty().withMessage("Please enter values")
      );
   });
   return validateValues;
};
//common Query  validate------------------------------------------------------------------------------------------------------------------------
export const comQueryValidate = (...keys) => {
   const validateValues = [];
   keys.forEach((k) => {
      validateValues.push(
         query(k).trim().escape().notEmpty().withMessage("Please enter values")
      );
   });
   return validateValues;
};
