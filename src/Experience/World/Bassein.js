import * as THREE from "three";
import Experience from "../Experience";
import waterVertexShader from "../shaders/water/vertex.glsl";
import waterFragmentShader from "../shaders/water/fragment.glsl";

export default class Bassein{
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        // Setup
        this.resource = this.resources.items.basseinModel

        this.setModel()

    }

    setModel(){
        this.model = this.resource.scene
        this.model.scale.set(0.3, 0.3, 0.3)
        this.model.rotation.set(0, 3.14/2 + 3.14, 0)
        this.model.position.set(2.3, 0, -2)
        this.scene.add(this.model)

        this.model.traverse((child)=>{
            if (child instanceof THREE.Mesh){
                child.castShadow = true;
                child.material.side = THREE.DoubleSide;
                if (child.name == "water"){
                    child.material = new THREE.ShaderMaterial({
                        vertexShader: waterVertexShader,
                        fragmentShader: waterFragmentShader,
                        uniforms:
                            {
                                uBigWavesElevation: { value: 0.005},
                                uBigWavesFrequency: { value: new THREE.Vector2(0, 0)},
                                uTime: {value: 1},
                                uBigWavesSpeed: {value: 0.5},
                                uDepthColor: {value: new THREE.Color('#186691')},
                                uSurfaceColor: {value: new THREE.Color('#9bd8ff')},
                                uColorOffset: {value: 0.08},
                                uColorMultiplier: {value: 5},
                            }
                    });
                    child.material.side = THREE.DoubleSide;
                    child.material.envMap = this.resources.items.environmentMapTexture
                    child.material.envMapIntensity = 1
                }
            }
        })
    }
}