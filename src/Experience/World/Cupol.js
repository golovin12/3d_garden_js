import * as THREE from "three";
import Experience from "../Experience";
import cupolVertexShader from "../shaders/cupol/vertex.glsl";
import cupolFragmentShader from "../shaders/cupol/fragment.glsl";

export default class Cupol{
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        // Setup
        this.resource = this.resources.items.cupolModel

        this.setModel()

    }

    setModel(){
        this.model = this.resource.scene
        this.model.scale.set(0.25, 0.25, 0.25)
        this.model.position.set(0, 0, 0)
        this.scene.add(this.model)

        this.model.traverse((child)=>{
            if (child instanceof THREE.Mesh){
                child.castShadow = true
                child.material = new THREE.ShaderMaterial({
                    vertexShader: cupolVertexShader,
                    fragmentShader: cupolFragmentShader,
                });
                child.material.transparent = true;
                child.material.side = THREE.DoubleSide;
            }
        })
    }
}