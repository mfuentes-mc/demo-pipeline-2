import { Environment } from "../config"


export type Options={
    defaultRegion:string,
    bucketName: string,
    reposName: string,
    pipelineName: string,
    stackName: string,
    rootAccount: string,
    stackNamePrefix: string,
    account: string,
    stageOptions: StageOptions[]
}

export type StageOptions={
    environment: Environment,
    account: string

}

export const findStageOption = (options: Options, environment: Environment) =>{
    
    const stageOption = options.stageOptions.find(option=>option.environment==environment);
    if(!stageOption){
        throw new Error("No encontramos el stage")
    }
    return stageOption;
}


