import { clerkClient } from "@clerk/express";
import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      free_usage: number;
      free_usage_of_premium_features: number;
      plan: "premium" | "free";
      auth: any;
    }
  }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, has } = await req.auth();
    const hasPremiumPlan = await has({ plan: "premium" });

    const user = await clerkClient.users.getUser(userId);
    const privateMetadata = user.privateMetadata || {};

    req.free_usage = (privateMetadata.free_usage as number) || 0;
    req.free_usage_of_premium_features =
      (privateMetadata.free_usage_of_premium_features as number) || 0;

    req.plan = hasPremiumPlan ? "premium" : "free";

    next();
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
