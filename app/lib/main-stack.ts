import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Environment } from '../config';
import { Options } from '../types/options';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { CfnOutput } from 'aws-cdk-lib';
import { CloudFrontWebDistribution } from 'aws-cdk-lib/aws-cloudfront';


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
        // Deployment
        const src = new BucketDeployment(this, "DeployDemoPipeline2App", {
            sources: [Source.asset("../dist")],
            destinationBucket: bucket
        });
        new CfnOutput(this, 'DemoPipeline2AppS3Url', {
            value: bucket.bucketWebsiteUrl
        });

        const cloudFront = new CloudFrontWebDistribution(
            this,
            'frontend-app-distribution', {
                originConfigs:[
                    {
                        behaviors: [
                            {
                                isDefaultBehavior: true
                            }
                        ],
                        s3OriginSource: {
                            s3BucketSource: bucket
                        }
                    }
                ]
            }
        );
        new CfnOutput(this, 'spaceFinderWebAppCloudFrontUrl', {
            value: cloudFront.distributionDomainName
        })

    }
}