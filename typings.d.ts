import { ApplicationType } from '@prisma/client';

/**
 * localhost:3000/apply
 */
export type ApplicationState = {
  name: string;
  username: string;
  age: string;
  description: string;
  reason: string;
  whychooseyou: string;
  screenshare: string;
  previousexperience: string;
  voicechat: string;
  availability: string;
  commitment: boolean;
  additionalinfo: string;
};

export interface CreateApplicationPayload extends ApplicationState {
  age: number;
  availability: number;
  applicationType: ApplicationType;
  userId: string;
}
