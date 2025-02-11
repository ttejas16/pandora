import { LineGeometry } from "three/examples/jsm/Addons.js";
import { Line2 } from "three/examples/jsm/lines/webgpu/Line2.js";

const geometry = new LineGeometry();
geometry.setPositions([
    -10, 0, 0,
    0, 10, 0,
    10, 0, 0
]);
geometry.setColors([255, 255, 255])


const matLine = new LineMaterial({
    color: 'red',
    linewidth: 20, // in pixels
    vertexColors: true,
    //resolution:  // to be set by renderer, eventually
    dashed: false
});

const line = new Line2(geometry, matLine);
line.computeLineDistances();
line.scale.set(1, 1, 1);



export default Foo;