import { Request, Response } from "express";
import { createLiveSessionSchema } from "../types";
import { prisma } from "../prisma";
import { title } from "process";

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

  console.log("111111111");

  try {
    let liveSessionId;
    let isExists = true;

    // while (isExists) {
    //   liveSessionId =
    //     `${randomIdGenerator()}-${randomIdGenerator()}-${randomIdGenerator()}` as string;
    //   await prisma.session.findUnique({ where: { id: liveSessionId } });
    // }

    const session = await prisma.session.create({
      data: {
        id: liveSessionId,
        title: parsedData.data?.title!,
        status: "active",
        startTime: "",
      },
    });

    if (!session) {
      throw new Error("unable to create the session");
    }
    res.status(200).json({
      sessionId: session.id,
    });
  } catch (error) {
    return res.status(500).json({
      error: "server Error",
    });
  }
};

export const allLiveSession = async (req: Request, res: any) => {
  const sessions = await prisma.session.findMany();
  if (!sessions) {
    return res.status(401).json({
      error: "sessions not found",
    });
  }
  res.status(200).json(
    sessions.map((e: any) => ({
      id: e.id,
      title: e.title,
      status: e.status,
      starTime: e.startTime,
    }))
  );
};
