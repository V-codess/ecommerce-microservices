import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface CustomJwtPayload extends JwtPayload {
  userId: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: CustomJwtPayload;
      role?: CustomJwtPayload;
    }
  }
}

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Missing auth header" });
  const token = authHeader;
  if (!token) return res.status(401).json({ message: "Token missing" });

  try {    
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as CustomJwtPayload;
    req.user = decoded;
    if(req.user.role !== "1"){
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
  } catch {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
