import type { NextApiRequest, NextApiResponse } from "next";
import initMiddleware from "@/middleware/init-middleware";
import validateMiddleware from "@/middleware/validate-middleware";
import { check, validationResult } from "express-validator";

const validateBody = initMiddleware(
  validateMiddleware(
    [check("firstName").notEmpty(), check("lastName").notEmpty()],
    validationResult
  )
);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      await validateBody(req, res);

      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({ errors: errors.array() });

      const { firstName, lastName } = req.body;
      return res.status(200).json({
        message: `${firstName.toUpperCase()} ${lastName.toUpperCase()}`,
      });
    default:
      return res.status(401).json({ message: "Not implemented yet" });
  }
};
