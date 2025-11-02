import mongoose from "mongoose"
import bcryptjs from "bcryptjs"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema(
  {
    fullName: {
      typer: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      default: "",
    },
    profilePic: {
      type: String,
      default: "",
    },
    nativeLanguage: {
      type: String,
      default: "",
    },
    learningLanguage: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    isOnBoarded: {
      type: Boolean,
      default: false,
    },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
)


const User = mongoose.model("User",userSchema)

userSchema.pre("save", async function(next){
    try{
        const salt  = await bcryptjs.genSalt(10)
        this.password = await bcrypt.hash(this.password,salt)


        next()
    }catch(error){
        next(error)

    }
})
 
export default User
