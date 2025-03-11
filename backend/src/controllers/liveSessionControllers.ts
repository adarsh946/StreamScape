import { Request, Response } from "express";
import { createLiveSessionSchema } from "../types";
import { prisma } from "../../prisma/prisma";

const randomIdGenerator = () => {
  let alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  let res = "";
  for (let i = 0; i < 3; i++) {
    res = res + alphabet[Math.floor(Math.random() * 10) % 26];
  }
  return res;
};

export const createLiveSession = async (req: Request, res: any) => {
  const parsedData = createLiveSessionSchema.safeParse(req.body);
  if (!parsedData) {
    return res.status(403).json({
      message: "not found",
    });
  }

  try {
    let liveSessionId;
    let isExists = true;

    while (isExists) {
      liveSessionId =
        `${randomIdGenerator()}-${randomIdGenerator()}-${randomIdGenerator()}` as string;
      await prisma.session.findUnique({ where: { id: liveSessionId } });
    }

    const session = await prisma.session.create({
      data: {
        id: liveSessionId,
        title: parsedData.data?.title!,
      },
    });

    if (!session) {
      throw new Error("unable to create the session");
    }
  } catch (error) {}
};
