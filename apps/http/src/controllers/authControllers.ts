import client from "@prisma/client";

export const singUpController = (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(401).json({
      message: "Invalid Input",
    });
  }
};

export const signInController = (req, res) => {};
