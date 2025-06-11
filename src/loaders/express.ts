import path from "path";
import express, {Express} from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import logger from "morgan";
import {router as tasksRouter} from "@/routes/tasks";
import {errorHandler} from "@/middlewares/error_handler";
import expressLayouts from "express-ejs-layouts";
import methodOverride from "method-override";

export const loadMiddlewares = (app: Express) => {
  loadSecureHeaders(app);
  loadLogger(app);
  loadStatic(app);
  loadMethodOverride(app);
  loadViews(app);
  loadBodyParser(app);
  loadCookieParser(app);
  loadRouter(app);
  loadErrorHandler(app);
};

const loadLogger = (app: Express) => {
  app.use(logger("dev"));
};

const loadStatic = (app: Express) => {
  app.use(express.static("public"));
};

const loadBodyParser = (app: Express) => {
  app.use(express.json());
  app.use(express.urlencoded({extended: false}));
};

const loadViews = (app: Express) => {
  app.set("view engine", "ejs");
  app.set("views", path.join(path.resolve(), "src/views"));
  app.use(expressLayouts);
};

const loadCookieParser = (app: Express) => {
  app.use(cookieParser());
};

const loadMethodOverride = (app: Express): void => {
  app.use(methodOverride("_method"));
};

const loadRouter = (app: Express) => {
  app.use("/", tasksRouter);
};

const loadSecureHeaders = (app: Express) => {
  app.use(helmet());
  if (app.get("env") === "development" || app.get("env") === "test") {
    // Setting upgradeInsecureRequests to null in development/test environment
    // since safari redirects to https even on localhost and the page cannot be displayed.
    app.use(
      helmet.contentSecurityPolicy({
        useDefaults: true,
        directives: {
          upgradeInsecureRequests: null,
        },
      }),
    );
  }
};

const loadErrorHandler = (app: Express) => {
  app.use(errorHandler);
};
