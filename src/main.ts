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
    const token = await webstoreApi.fetchToken(
        actionInputs.clientId,
        actionInputs.clientSecret,
        actionInputs.refreshToken
    );
    ghActions.setSecret(token);
    actionOutputs.accessToken.setValue(token);
    ghActions.info('Success, passed to accessToken output');
}

// noinspection JSIgnoredPromiseFromCall
run();