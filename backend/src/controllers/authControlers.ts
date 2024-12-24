import { signInSchema, signupSchema } from "../types";
import bcrypt from "bcryptjs";
import client from "../prisma/prisma";
import { Request, Response } from "express";

export const signUpController = async (req: Request, res: Response) => {
  const parsedData = signupSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(401).json({
      message: "Invalid Input",
    });
    return;
  }

  const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);

  try {
    const user = await client.user.create({
      data: {
        fullname: parsedData.data.fullname,
        email: parsedData.data.email,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      userId: user.id,
    });
  } catch (error) {
    res.status(403).json({
      message: "Unauthorized Request",
    });
  }
};

export const signInController = async (req: Request, res: Response) => {
  const parsedData = signInSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(403).json({
      message: "Invalid Input",
    });
    return;
  }

  try {
    const user = await client.user.findUnique({
      where: {
        email: parsedData.data.email,
      },
    });

    if (!user) {
      res.status(403).json({
        message: "user not found",
      });
      return;
    }

    const isValidPassword = await bcrypt.compare(
      parsedData.data.password,
      user?.password
    );
    if (!isValidPassword) {
      res.status(403).json({
        message: "password is Incorrect",
      });
    }
  } catch (error) {
    res.status(401).json({
      message: "Unauthorised Request",
    });
  }
};
