import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Environment } from '../config';
import { Options } from '../types/options';
import * as s3 from 'aws-cdk-lib/aws-s3';



interface MainStackProps extends cdk.StackProps{
    options: Options,
    stageEnvironment: Environment;
}


export class MainStack extends cdk.Stack{
    constructor(scope: Construct,stageName: string, props: MainStackProps){
        super(scope, stageName, {...props});
        
        const bucket = new s3.Bucket(this,'DemoPipeline2Bucket',{
            bucketName: `${props.options.bucketName}-${props.stageEnvironment.toLocaleLowerCase()}`,
            websiteIndexDocument: 'index.html',
            publicReadAccess: true,
            removalPolicy: cdk.RemovalPolicy.DESTROY
        })

    }
}