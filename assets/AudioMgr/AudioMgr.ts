import { _decorator, AudioSource, Component, Node ,resources,AudioClip,find} from 'cc';
const { ccclass, property ,executionOrder} = _decorator;


@ccclass('AudioMgr')
@executionOrder(-1)
export class AudioMgr extends Component {
    audioSource: AudioSource|null=null;

   private static inst:AudioMgr|null=null;


   @property([AudioClip])
   musicClips:AudioClip[]=[];

   @property([AudioClip])
   effectClips:AudioClip[]=[];

   effectClipCache={}

    static get Inst():AudioMgr{
        /*
        if(AudioMgr.inst==null){
            let n = new Node("AudioMgr");
            let i=n.addComponent(AudioMgr);

            find("Canvas")?.addChild(n);

            AudioMgr.inst=i;
        }
        */
        return AudioMgr.inst;
    }


    protected onLoad(): void {
        AudioMgr.inst=this;

       this.audioSource=this.node.getComponent(AudioSource);;
       this.audioSource.loop=true;
        console.log("audioMgr onload");
      // this.playMusicSync("10-next-round");

    }

    test(){

        /*
        console.log("i am audiomgr test");
        //this.playMusic("audio/10-next-round")
        this.playEffect("audio/bel");
        this.playEffect("audio/chel");
        */

        /*
        this.playEffectSync("bel");
        this.playEffectSync("bel");
        this.playEffectSync("chel");
        */

        this.schedule(()=>{
            this.playEffectSync("bel");
        },1,5,1);
    }

    playEffectSync(name:string){
        let clip:AudioClip=null;
        for(let item of this.effectClips){
            if(item.name===name){
                clip =item;
                break;
            }
        }

        if(name in this.effectClipCache){
            this.effectClipCache[name].play();
        }else {
         let new_com =this.node.addComponent(AudioSource);
            new_com.clip =clip;
            new_com.play();
            this.effectClipCache[name]=new_com;
        }

    }

    playMusicSync(name:string){
        let clip:AudioClip=null;
        for(let item of this.musicClips){
            if(item.name===name){
                clip =item;
                break;
            }
        }
        this.audioSource.clip =clip;
        this.audioSource.play();
    }

    pauseMusic(){
        this.audioSource.pause();
    }

    
    resumeMusic(){
        this.audioSource.play();
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


