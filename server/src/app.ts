import express, { Application, Request, Response, NextFunction } from "express";
import mongodbConnection from "./config/db";
import cors from "cors";
import authRoutes from "./auth/auth.routes";
import cookieParser from "cookie-parser";
import votesRoutes from "./votes/votes.routes";

export class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.setMiddlewares();
    this.setRoutes();
    this.connectDB();
  }

  private async connectDB(): Promise<void> {
    await mongodbConnection();
  }
  private setMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: "http://localhost:3000",
        credentials: true,
      })
    );
    this.app.options("*", cors());

    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }
  private setRoutes(): void {
    this.app.get("/", (req: Request, res: Response) => {
      res.json({ message: "Server is running!" });
    });
    this.app.use("/auth", authRoutes);
    this.app.use("/votes", votesRoutes);

    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error(err);
        res.status(500).json({
          message: "Internal server error",
          error: err.message,
        });
      }
    );
  }
  public listen(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}
