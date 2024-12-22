import { signupSchema } from "../types";
import bcrypt from "bcryptjs";
import client from "../prisma/prisma";

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
