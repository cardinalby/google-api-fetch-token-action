import { actionInputs as inputs } from 'github-actions-utils';

export const actionInputs = {
    clientId: inputs.getString('clientId', true, true),
    clientSecret: inputs.getString('clientSecret', true, true),
    refreshToken: inputs.getString('refreshToken', true, true),
}