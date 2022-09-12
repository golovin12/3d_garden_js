import * as THREE from "three";
import Experience from "../Experience";

export default class Palma{
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        // Setup
        this.resource = this.resources.items.palmaModel

        this.setModel()

    }

    setModel(){
        this.model = this.resource.scene
        this.model.scale.set(0.3, 0.3, 0.3)
        this.model.position.set(2, 0, 2)
        this.scene.add(this.model)

        this.model.traverse((child)=>{
            if (child instanceof THREE.Mesh){
                child.castShadow = true
                child.material.envMap = this.resources.items.environmentMapTexture
                child.material.envMapIntensity = 1
            }
        })
    }
}