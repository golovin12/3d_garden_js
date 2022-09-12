import * as THREE from "three";
import Experience from "../Experience";

export default class Kolokol{
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        // Setup
        this.resource = this.resources.items.kolokolModel

        this.setModel()

    }

    setModel(){
        this.model = this.resource.scene
        this.model.scale.set(0.2, 0.2, 0.2)
        this.model.position.set(-0.5, 0, -2)
        this.scene.add(this.model)

        this.model.traverse((child)=>{
            if (child instanceof THREE.Mesh){
                child.castShadow = true;
                child.material.side = THREE.DoubleSide;
            }
        })
    }
}