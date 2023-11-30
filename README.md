# APPRAISAL

This application is the appraisal page of Vroom website


## Install Instrunction

**download Appraisal project**
```
git clone https://gitlab.vroom.com/vroom-web/apps/appraisal.git
```

**install dependencies**
```  
npm install 
```

**download .env file**
```
npm run env
```


**running projecct**
```
npm run dev
open http://localhost:3000
```

**Access Token Setup**
1. Navigate to Gitlab setting -> Access Token
2. Name and Expires at of your choice and select API on scope section and press button to create token
3. open terminal and open bash_profile or zshrc
```
vim ~/.bash_profile or vim ~/.zshrc
```
4. press i and add following
```
export CI_JOB_TOKEN=<Your Access Token goes here>
export TEST_ENG_ENV=uat
```
5. press esc button and :wq and press enter
6. open new terminal and check environment variable by following
```
printenv
```
[Read more about git setup](https://tdalabs.atlassian.net/wiki/spaces/FEE/pages/2853634364/Getting+started+with+your+Workstation+-+Mac#Git-Setup)

### Git Commit Short SHA
In a CI/CD context, Gitlab supplies an environment variable named CI_COMMIT_SHORT_SHA. We use this for several things, such as the application's build ID and for the version endpoint.
This variable isn't defined on your local machine, so it gets injected by the npm run dev script.

## Segment tracking - how to test
Should work in all environments, may be tested by observing Network requests (Browser, Inspector, Network tab) and pattern 'api.segment.io/v1/' in it, 'api.segment.io/v1/p' means 'page view event', 'api.segment.io/v1/t' means 'track event', 'api.segment.io/v1/m' seems to be some 'counter' event, 'api.segment.io/v1/g' is of type 'group', there may be more.

There's also Chrome addon https://chrome.google.com/webstore/detail/segment-event-tracker/hbanigoffkilibdakdmmlgefndpjmajl that could potentially be used to verify Segment tracking.
