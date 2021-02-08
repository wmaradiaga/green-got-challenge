import type { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      const { firstName, lastName } = req.body;
      res.status(200).send({
        message: `${firstName.toUpperCase()} ${lastName.toUpperCase()}`,
      });
      return;
  }
};
