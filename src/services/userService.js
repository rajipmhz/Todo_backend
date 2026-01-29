const bcrypt = require("bcryptjs");
const User = require("../models/user");

const register = async (data) => {

  const existingUser=await User.findOne({
    where:{email:data.email}
  });

  if(existingUser){
    const error=new Error("User already exists with this email");
    throw error;
  }
  const hashedPassword = await bcrypt.hash(data.password, 10);

  return User.create({
    name: data.name,
    email: data.email,
    password: hashedPassword,
  });
};

const validateUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  return user;
};

const findUserById = async (id) => {
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    return user;
  } catch (err) {
    console.error("Error finding user:", err);
    throw err;
  }
};

module.exports = {
  register,
  validateUser,
  findUserById
};
