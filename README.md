![Build Status](https://github.com/cardinalby/google-api-fetch-token-action/workflows/build-test/badge.svg)

# The purpose 

The action fetches an access token from Google API. 

It can be used to **prevent your Refresh Token from being expired**.

According to [Google's guide](https://developers.google.com/identity/protocols/oauth2#expiration), 
the refresh token might stop working if it has not been used for six months.

If you use it in your workflow running less often than 6 months, you can face the problem. 
[Schedule](https://help.github.com/en/actions/reference/events-that-trigger-workflows#scheduled-events-schedule) 
this action to periodically access Google API and fetch access token to avoid that.

Based on [typed-chrome-webstore-api](https://www.npmjs.com/package/typed-chrome-webstore-api) package.

## About Google API access
To setup API access you need to specify `clientId`, `clientSecret` and `refreshToken` inputs.
To find out how to obtain them you can read:
* [Using the Chrome Web Store Publish API](https://developer.chrome.com/webstore/using_webstore_api) 
* [How to generate Google API keys](https://github.com/DrewML/chrome-webstore-upload/blob/master/How%20to%20generate%20Google%20API%20keys.md)

## Inputs

* `clientId` **Required**
* `clientSecret` **Required**
* `refreshToken` **Required**

Don't forget to store these values in secrets!

## Outputs
* `accessToken` fetched access token

## Usage example
Create a separate workflow with a scheduled job:
```yaml
name: "fetch-access-token"
on:
  schedule:
    - cron:  '0 3 2 * *' # At 03:00 on day-of-month 2

jobs:
  fetchToken:
    runs-on: ubuntu-latest
    steps:
      - uses: cardinalby/google-api-fetch-token-action@v1
        with:
          clientId: ${{ secrets.G_API_CLIENT_ID }}
          clientSecret: ${{ secrets.G_API_CLIENT_SECRET }}
          refreshToken: ${{ secrets.G_API_REFRESH_TOKEN }}
```

## See also

If you are developing WebExtension for Google Web Store, take a look at
[webext-buildtools-chrome-webstore-action](https://github.com/cardinalby/webext-buildtools-chrome-webstore-action)
to upload and publish your extension. It works nice together with this action utilizing the same refresh token.

If you are interested in the building the entire deployment workflow for WebExtension, 
you can read this [article](https://dev.to/cardinalby/webextension-deployment-and-publishing-using-github-actions-522o).