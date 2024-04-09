import { _decorator, AudioSource, Component, Node ,resources,AudioClip,find} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AudioMgr')
export class AudioMgr extends Component {
    audioSource: AudioSource|null=null;

   private static inst:AudioMgr|null=null;

    static get Inst():AudioMgr{
        if(AudioMgr.inst==null){
            let n = new Node("AudioMgr");
            let i=n.addComponent(AudioMgr);

            find("Canvas")?.addChild(n);

            AudioMgr.inst=i;
        }
        return AudioMgr.inst;
    }


    protected onLoad(): void {
       let audioSource= this.node.addComponent(AudioSource);
       this.audioSource=audioSource;
       this.audioSource.loop=true;
    }

    test(){
        console.log("i am audiomgr test");
        //this.playMusic("audio/10-next-round")

        this.playEffect("audio/bel");
        this.playEffect("audio/chel");
    }

    playMusic(filePath:string){
        resources.load(filePath, AudioClip, (err, asset:AudioClip) => {
            if(err) return;

            if(this.audioSource){
                this.audioSource.clip=asset;
                this.audioSource.play();
            }
          

          });
    }
    playEffect(filePath:string){
        resources.load(filePath, AudioClip, (err, asset:AudioClip) => {
            if(err) return;

            let n = new Node(filePath);
            let a = n.addComponent(AudioSource);
            find("Canvas/AudioMgr")?.addChild(n);

            a.clip = asset;
            a.play();

            this.scheduleOnce(()=>{
                n.destroy();
            },2);

          });
    }


}


