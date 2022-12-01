import * as cdk from 'aws-cdk-lib';
import {Options} from '../types/options';

let stackName = "DemoPipeline2";
let stackPrefix = "main";


export enum Environment{
    DEV= 'DEV',
    QA='QA',
    STAGING='STAGING',
    PROD='PROD'
}


export const options:Options={
    bucketName: "demo-pipeline-2-mfuentes",
    account: "108072982334",
    defaultRegion: "us-west-2",
    rootAccount: "mfuentes-mc",
    reposName: "demo-pipeline-2",
    pipelineName: `${stackPrefix}-${stackName}-pipeline`,
    stackName: stackName,
    stackNamePrefix: stackPrefix,
    stageOptions:[
        {
            environment: Environment.DEV,
            account: '108072982334'
        },
        {
            environment: Environment.QA,
            account: '108072982334'
        },
        {
            environment: Environment.STAGING,
            account: '108072982334'
        },
        {
            environment: Environment.PROD,
            account: '108072982334'
        }
    ]
}


