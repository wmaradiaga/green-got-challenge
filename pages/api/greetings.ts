import type { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { first_name } = req.query;
  res
    .status(200)
    .json({ message: `Hello ${first_name ? first_name : "Eren"}!` });
};
