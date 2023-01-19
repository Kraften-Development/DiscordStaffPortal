import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

type Data = {
    message: string;
    severity: string;
}

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    await prisma.notifications.delete({
        where: {
            id: req.body,
        },
    }).catch((_) => {
        return res.status(400).json({
            message: 'Notifikationen blev ikke slettet korrekt, prøv igen.. (Eller reload siden)',
            severity: 'warning',
        })
    });
    return res.status(200).json({ severity: 'success', message: "Success" })
}
