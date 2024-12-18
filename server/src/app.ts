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
    console.log('setting middlewares');
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    // Specify the exact origin for CORS when credentials are included
    this.app.use(
      cors({
        origin: "https://your-frontend-domain.com , https://nepta-online-voting-system-4p84.vercel.app, *", // Replace with your actual front-end URL
        credentials: true, // Enable cookies and credentials
      })
    );
  

    // Handle preflight requests for OPTIONS
    // this.app.options("*", cors());
    this.app.options("*", cors());

    this.app.use(cookieParser());
    // Specify the exact origin for CORS when credentials are included
    console.log('middlewares set');
  }

  private setRoutes(): void {
    this.app.get("/", (req: Request, res: Response) => {
      res.json({ message: "Server is running! Check cors" });
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
