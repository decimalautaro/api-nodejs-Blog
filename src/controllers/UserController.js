import { encrypt, compare } from "../utils/handlePassword.js";
import { tokenSign } from "../utils/handleJWT.js";
import { handleHttpError } from "../utils/handleError.js";
import { User } from "../models/Users.js";

const register = async (req, res) => {
  try {
    const params = req.body;
    const passwordHash = await encrypt(params.password);
    const body = { ...params, password: passwordHash };

    const existUser = await User.findOne({ email: params.email });

    if (existUser) {
      return res.status(400).json({
        status: "error",
        message: "User already exists.",
      });
    }

    const dataUser = await User.create(body);
    dataUser.save((error) => {
      if (error || !dataUser) {
        return res.status(404).json({
          status: "error",
          message: "User has not been saved.",
        });
      }
    });

    const data = {
      token: await tokenSign(dataUser),
      user: dataUser,
    };

    return res.status(200).json({
      status: "success",
      user: data,
      message: "User created successfully.",
    });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "Error registering.");
  }
};

const login = async (req, res) => {
  try {
    const params = req.body;
    const user = await User.findOne({ email: params.email });

    if (!user) {
      handleHttpError(res, "Username does not exist.", 404);
      return;
    }

    const hashPassword = user.get("password");

    const check = await compare(params.password, hashPassword);

    if (!check) {
      handleHttpError(res, "Incorrect password.", 401);
      return;
    }
    user.set("password", undefined, { strict: false });
    const data = {
      token: await tokenSign(user),
      user,
    };

    res.send({ data });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "Login error.");
  }
};

export { register, login };
