varying vec2 vUv;
varying float vElevation;

void main()
{
    vec4 modelPosition = vec4(position, 0.5);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    vUv = uv;
    //Varyings
    vElevation = sqrt(modelPosition.x * modelPosition.x + modelPosition.y * modelPosition.y + modelPosition.z * modelPosition.z) - 1.1;
}