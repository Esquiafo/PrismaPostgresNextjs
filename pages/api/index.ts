import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
){
    if (req.method=="GET") {
    res.status(200).json({status: 200})
    }else{
    res.status(200).json({status: 200})
}
}
  