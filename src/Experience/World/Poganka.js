import * as THREE from "three";
import Experience from "../Experience";

export default class Poganka{
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        // Setup
        this.resource = this.resources.items.pogankaModel

        this.setModel()

    }

    setModel(){
        this.model = this.resource.scene
        this.model.scale.set(0.06, 0.06, 0.06)
        this.model.position.set(-2, 0, -0.5)
        this.scene.add(this.model)

        this.model.traverse((child)=>{
            if (child instanceof THREE.Mesh){
                child.castShadow = true
            }
        })
    }
}