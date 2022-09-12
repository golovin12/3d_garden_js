import * as THREE from "three";
import Experience from "../Experience";

export default class Kuvshinka{
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        // Setup
        this.resource = this.resources.items.kuvshinkaModel

        this.setModel()

    }

    setModel(){
        this.model = this.resource.scene
        this.model.scale.set(0.7, 0.7, 0.7)
        this.model.position.set(1.65, 0.43, -1.45)
        this.scene.add(this.model)

        this.model.traverse((child)=>{
            if (child instanceof THREE.Mesh){
                child.castShadow = true;
                child.material.side = THREE.DoubleSide;
                child.material.envMap = this.resources.items.environmentMapTexture
                child.material.envMapIntensity = 1
            }
        })
    }
}