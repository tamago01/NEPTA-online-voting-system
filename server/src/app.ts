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

    // CORS configuration: Allow requests only from https://www.neptaelection.com
    const corsOptions = {
      origin: '*',  // Allow frontend domain
      methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],  // Allowed HTTP methods
      allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
      credentials: true,  // Allow cookies/credentials
    };

    // Use CORS middleware with custom options
    this.app.use(cors(corsOptions));

    // Handle preflight requests for OPTIONS (CORS preflight)
    this.app.options('*', cors(corsOptions)); // This handles OPTIONS requests globally

    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private setRoutes(): void {
    this.app.get("/", (req: Request, res: Response) => {
      res.json({ message: "Server is running!" });
    });
    this.app.use("/auth", authRoutes);
    this.app.use("/votes", votesRoutes);

    // Error handling middleware
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
