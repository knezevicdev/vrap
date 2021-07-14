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

**add .env file**


**running projecct**
```
npm run dev
open http://localhost:3000
```

**Access Token Setup**
1. Navigate to Gitlab setting -> Access Token
2. "Name" and "Expires at" of your choice and select "scope" API and press button to create token
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

## Code Style Guide

* [React](https://github.com/airbnb/javascript/tree/master/react)
* [Javascript](https://github.com/airbnb/javascript)
* [CSS](https://github.com/airbnb/css)
