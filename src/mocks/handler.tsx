import { rest } from "msw"
import { response } from "./data"

export const handlers = [
  rest.get(
    "https://openexchangerates.org/api/latest.json?app_id=3e734355952d4104a3ffa61f259ec05e",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(response))
    }
  ),
]
