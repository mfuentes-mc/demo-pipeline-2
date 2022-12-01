import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Environment } from '../config';
import { Options } from '../types/options';
import { MainStack } from './main-stack';



interface DeployStageProps extends cdk.StageProps{
    options: Options,
    stageEnvironment: Environment
}

export class DeployStage extends cdk.Stage{
    constructor(scope: Construct,stageName: string, props: DeployStageProps){
        super(scope, stageName, props);
        new MainStack(this,`${props.options.stackNamePrefix}-${props.options.stackName}-AppStage`,{
            options: props.options,
            stageEnvironment: props.stageEnvironment
        })

    }
}