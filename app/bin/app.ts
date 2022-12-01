#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { options } from '../config';
import { AppStack } from '../lib/app-stack';

const app = new cdk.App();
new AppStack(app, `${options.stackNamePrefix}-${options.stackName}`,{
    env:{
        account: options.account,
        region: options.defaultRegion
    },
    options: options
});
