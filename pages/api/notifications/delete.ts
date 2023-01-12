// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

type Data = {
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    await prisma.notifications.delete({
        where: {
            id: req.body,
        },
    }).catch(err => {
        console.log(err)
        return res.status(400).json({ message: "Kunne ikke slette!" })
    })
    return res.status(200).json({ message: "Succes" })
}
