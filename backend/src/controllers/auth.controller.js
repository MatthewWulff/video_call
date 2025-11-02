import User from "../models/User.js"

export async function signUp(req, res) {
  const { email, password, fullName } = req.body

  try {
    if (!email || !password || !fullName) {
      return res.status(400).json({ message: "All Fields Required" })
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" })
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" })
    }
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" })
    }
  } catch (error) {}
}
export async function login(req, res) {
  res.send("Login Route")
}
export function logOut(req, res) {
  res.send("Logout route")
}
