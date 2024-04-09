import { _decorator, Component, Node } from 'cc';
import { AudioMgr } from '../../AudioMgr/AudioMgr';
const { ccclass, property } = _decorator;

@ccclass('TestResMgr')
export class TestAudioMgr extends Component {


    start() {

        AudioMgr.Inst.test();
        
    }

    update(deltaTime: number) {
        
    }
}


