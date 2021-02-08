import type { NextApiRequest, NextApiResponse } from "next";

export default function validateMiddleware(validations, validationResult) {
  return async (req: NextApiRequest, res: NextApiResponse, next: Function) => {
    await Promise.all(
      validations.map((validation: { run: (arg0: NextApiRequest) => any }) =>
        validation.run(req)
      )
    );

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(422).json({ errors: errors.array() });
  };
}
