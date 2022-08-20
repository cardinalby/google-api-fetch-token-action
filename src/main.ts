import * as ghActions from '@actions/core';
import { actionInputs } from './actionInputs';
import * as webstoreApi from 'typed-chrome-webstore-api';
import { actionOutputs } from './actionOutputs';

// noinspection JSUnusedLocalSymbols
async function run(): Promise<void> {
    try {
        await runImpl();
    } catch (error) {
        ghActions.setFailed(String(error));
    }
}

async function runImpl() {
    ghActions.info('Fetching access token...');
    let token = undefined;
    try {
        token = await webstoreApi.fetchToken(
            actionInputs.clientId,
            actionInputs.clientSecret,
            actionInputs.refreshToken
        );
    } catch (error) {
        let message;
        if (error) {
            message = (error as any).message;
            if ((error as any).response && (error as any).response.data) {
                message += ': ' + JSON.stringify((error as any).response.data);
            }
        } else {
            message = String(error);
        }
        ghActions.error(message);
        throw new Error(message);
    }
    ghActions.setSecret(token);
    actionOutputs.accessToken.setValue(token);
    ghActions.info('Success, passed to accessToken output');
}

// noinspection JSIgnoredPromiseFromCall
run();
