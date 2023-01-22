import { stringify } from 'querystring';
import { CreationApiResponse } from '../pages/api/applications/create';
import { ApplicationState, CreateApplicationPayload } from '../typings';

const endpoint = 'api/applications';

interface ApplicationDetailsDTO {}

const headers = {
  'content-type': 'application/json; charset=utf-8',
};

type ApplicationCreationSuccess = {
  isOk: true;
  message: string;
};

type ApplicationCreationFailure = {
  isOk: false;
  message: string;
};

export type ApplicationCreateResponse =
  | ApplicationCreationSuccess
  | ApplicationCreationFailure;

export async function createApplication(
  applicationDetails: CreateApplicationPayload
): Promise<ApplicationCreateResponse> {
  const response = await fetch(`${endpoint}/create`, {
    method: 'POST',
    headers,
    body: JSON.stringify(applicationDetails),
  });
  const resp: CreationApiResponse = await response.json();
  if (response.ok) {
    return { isOk: true, message: resp.message };
  } else
    return {
      isOk: false,
      message: resp.message,
    };
}
