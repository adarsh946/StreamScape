import { signInSchema, signupSchema } from "../types";
import bcrypt from "bcryptjs";
import { prisma } from "../prisma";
``;
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const signUpController = async (req: Request, res: any) => {
  const parsedData = signupSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(401).json({
      message: "Invalid Input",
    });
    return;
  }

  const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);

  try {
    const userExists = await prisma.user.findFirst({
      where: {
        email: parsedData.data.email,
      },
    });

    if (userExists) {
      return res.status(401).json({
        message: "user already exists!",
      });
    }

    const user = await prisma.user.create({
      data: {
        fullname: parsedData.data.fullname,
        email: parsedData.data.email,
        password: hashedPassword,
      },
    });

    if (!user) {
      return res.status(401).json({
        message: "Registration Unsuccessfull",
      });
    }

    return res.status(201).json({
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
    const user = await prisma.user.findUnique({
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

    const token = jwt.sign(user.password, process.env.JWT_SECRET!);
    if (!token) {
      return res.status(403).json({
        message: "There is problem to create token",
      });
    }

    return res.json({
      token,
      userId: user.id,
    });
  } catch (error) {
    res.status(401).json({
      message: "Unauthorised Request",
    });
  }
};
