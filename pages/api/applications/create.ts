import { create } from 'domain';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export interface CreationApiResponse {
  message: string;
}

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<CreationApiResponse>
) {
  const { body } = req;
  prisma.application
    .create({
      data: {
        ...body,
      },
    })
    .catch((err: any) => {
      res.status(409).json({ message: 'Din ansøgning kunne ikke oprettes!' });
    });
  res.status(200).json({ message: 'Din ansøgning er nu blevet sendt afsted' });
}
