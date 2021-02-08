import type { NextApiRequest, NextApiResponse } from "next";

export default function initMiddleware(
  middleware: (
    arg0: NextApiRequest,
    arg1: NextApiResponse<any>,
    arg2: (result: any) => void
  ) => void
) {
  return (req: NextApiRequest, res: NextApiResponse) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}
