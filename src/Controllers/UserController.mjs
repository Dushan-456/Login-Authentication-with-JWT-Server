class UserController {
   // Regiter  new user------------------------------------------------------------------------------------------------------------------------------
   registerNewUser = async (req, res) => {
      const error = validationResult(req);
      const creatingError = errorCreate(error.array());
      if (error.array().length) {
         return res.status(400).json({
            msg: "error",
            error: creatingError,
            data: null,
         });
      }

      const {
         first_name,
         last_name,
         dob,
         gender,
         designation,
         mobile,
         gmail,
         age,
         fb_profile,
         address,
      } = matchedData(req);

      const profilePicture = req.file?.filename || null;

      try {
         const newUser = await UserModel.create({
            first_name,
            last_name,
            dob,
            gender,
            designation,
            mobile,
            gmail,
            age,
            fb_profile,
            address,
            profilePicture,
         });
         return res.status(201).json({
            msg: "User Created Successfull",
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

export default new UserController();
