import * as cdk from 'aws-cdk-lib'

import { CodePipeline, CodePipelineSource, ManualApprovalStep, ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { options } from '../config';
import { Options } from '../types/options';
import { DeployStage } from './deploy-stage';


interface PipelineStackProps extends cdk.StackProps{
  options: Options;
}

export class AppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: PipelineStackProps) {
    super(scope, id, props);


    const pipeline = new CodePipeline(this, `${props?.options.pipelineName}`,{
      synth: new ShellStep('Synth',{
        input: CodePipelineSource.gitHub(`${props?.options.rootAccount}/${props?.options.reposName}`,'main'),
        commands:[
          'npm i',
          'npm run build',
          'cd app',
          'npm ci',
          'npm run build',
          'npx cdk synth'
        ],
        primaryOutputDirectory: 'app/cdk.out'
      })
    });

    for(const option of props?.options.stageOptions??[]){
      const stage = new DeployStage(this,option.environment,{
        options: options,
        env:{account: option.account, region: props?.options.defaultRegion},
        stageEnvironment: option.environment
      })
      const stageDeployment = pipeline.addStage(stage);
      stageDeployment.addPre(new ManualApprovalStep(`Promote To ${option.environment}`))
    }


  }
}
