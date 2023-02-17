import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import http from "http";

dotenv.config();

const port = process.env.PORT;
const app: Express = express();
app.use(express.json());

const server = http.createServer(app);

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

app.post("/", (req: Request, res: Response) => {
  console.log(req.body);
  const result = performArithmeticOperation(req.body.numbers, req.body.action);
  res.send({
    result,
    error: false,
  });
});

app.get("*", (req, res) =>
  res.status(404).json({ message: "Route does not exist" })
);

server.listen(port, "0.0.0.0");
server.on("listening", function () {
  console.log(
    "Express server started on port %s at %s",
    server.address().port,
    server.address().address
  );
});
