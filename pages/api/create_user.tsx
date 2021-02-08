import type { NextApiRequest, NextApiResponse } from "next";
import initMiddleware from "@/middleware/init-middleware";
import validateMiddleware from "@/middleware/validate-middleware";
import { check, validationResult } from "express-validator";

const validateBody = initMiddleware(
  validateMiddleware(
    [
      check("firstName").isString().isLength({ min: 1 }),
      check("lastName").isString().isLength({ min: 1 }),
    ],
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
      res.status(200).send({
        message: `${firstName.toUpperCase()} ${lastName.toUpperCase()}`,
      });
      return;
  }
};
