import * as THREE from "three";
import Experience from "../Experience";
import kaktusVertexShader from "../shaders/kaktus/vertex.glsl";
import kaktusFragmentShader from "../shaders/kaktus/fragment.glsl";

export default class Kaktus{
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        // Setup
        this.resource = this.resources.items.kaktusModel

        this.setModel()

    }

    setModel(){
        this.model = this.resource.scene
        this.model.scale.set(0.5, 0.5, 0.5)
        this.model.position.set(-1.5, 0, 2)
        this.scene.add(this.model)

        this.model.traverse((child)=>{
            if (child instanceof THREE.Mesh){
                child.castShadow = true;

                // console.log(child)
                if (child.name == "Сфера") {
                    child.material = new THREE.ShaderMaterial({
                        vertexShader: kaktusVertexShader,
                        fragmentShader: kaktusFragmentShader,
                        uniforms:
                            {
                                uTime: {value: 1},
                                uDepthColor: {value: new THREE.Color('#1a7749')},
                                uSurfaceColor: {value: new THREE.Color('#ffff00')},
                                uColorOffset: {value: 0.08},
                                uColorMultiplier: {value: 4},
                            }
                    });
                }
                child.lights = true;
                child.material.side = THREE.DoubleSide;
            }
        })
    }
}