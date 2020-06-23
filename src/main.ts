import * as ghActions from '@actions/core';
import { actionInputs } from './actionInputs';
import * as webstoreApi from 'typed-chrome-webstore-api';
import { actionOutputs } from './actionOutputs';

// noinspection JSUnusedLocalSymbols
async function run(): Promise<void> {
    try {
        await runImpl();
    } catch (error) {
        ghActions.setFailed(error.message);
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
        let message = error.message;
        if (error.response && error.response.data) {
            message += ': ' + JSON.stringify(error.response.data);
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