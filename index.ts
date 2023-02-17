import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

function performArithmeticOperation(
  numbers: number[],
  operation: string
): number | Error {
  let result: number;

  if (operation === "+") {
    result = numbers.reduce((total, num) => total + num);
  } else if (operation === "-") {
    result = numbers.reduce((total, num) => total - num);
  } else if (operation === "*") {
    result = numbers.reduce((total, num) => total * num);
  } else if (operation === "/") {
    result = numbers.reduce((total, num) => total / num);
  } else {
    return new Error("Invalid Operation");
  }

  return result;
}

app.get("/", (req: Request, res: Response) => {
  const result = performArithmeticOperation(req.body.numbers, req.body.action);
  res.send({
    result,
    error: false,
  });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
