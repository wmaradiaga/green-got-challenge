import type { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const first_name = req.query.first_name;
  res
    .status(200)
    .send({ message: `Hello ${first_name ? first_name : "Eren"}!` });
};
