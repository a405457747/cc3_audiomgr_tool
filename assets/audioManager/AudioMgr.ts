import { _decorator, AudioSource, Component, Node ,resources,AudioClip} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AudioMgr')
export class AudioMgr extends Component {
    audioSource: AudioSource;
    effectDict: {};

    protected onLoad(): void {
       let audioSource= this.node.addComponent(AudioSource);
       this.audioSource=audioSource;
       this.audioSource.loop=true;
       //console.log(this.audioSource);

       this.effectDict ={};
        //this.playMusic("audios/bel")

        this.playEffect("audios/10-next-round");
    }

    playMusic(filePath:string){
        resources.load(filePath, AudioClip, (err, asset) => {
            this.audioSource.clip=asset;
            this.audioSource.play();
          });
    }
    playEffect(filePath:string){

        /*
        if(this.effectDict.hasOwnProperty(filePath)){
                this.effectDict[filePath].play();
        }else{
            console.log("111");
            resources.load(filePath, AudioClip, (err, asset) => {
                let newAs =this.node.addComponent(AudioSource);
                newAs.clip=asset;
                newAs.play();
                this.effectDict[filePath]=newAs;
              });
        }
        */
        resources.load(filePath, AudioClip, (err, asset) => {
            this.audioSource.clip=asset;
            this.audioSource.play();
          });
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}


