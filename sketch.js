let angle = 0;
let x_rotation;
let maxD;

const frames = 60;

let windowBigDim = 1000;
 
const block_count = 40;
let block_size;

const window_size = 800;

function setup() {
    createCanvas(window_size, window_size, WEBGL);
    x_rotation = atan(cos(QUARTER_PI));
    maxD = dist(0, 0, 200, 200);

    block_size = window_size / block_count;
}

function keyPressed() {
    if (key == " ") {
        const options = {
            units: "frames",
            delay: 0
        }
        saveGif("beesandbombs.gif", frames, options);
    }
}

function draw() {
    background(100);
    const o = window_size * .80;
    ortho(-o, o, o, -o, 0, window_size * 1.4);
    rotateX(x_rotation);
    rotateY(-QUARTER_PI);

    for (let z = 0; z < height; z += block_size) {
        for (let x = 0; x < width; x += block_size) {
            push();
            let d = dist(x, z, width / 2, height / 2);
            let offset = map(d, 0, maxD, -PI, PI);
            let a = angle + offset;
            let h = floor(map(sin(a), -1, 1, 100, 300));
            translate(x - width / 2, 0, z - height / 2);
            normalMaterial();
            box(block_size, h, block_size);
            pop();
        }
    }

    angle -= TWO_PI / frames;
}
