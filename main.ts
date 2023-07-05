stats.turnStats(true)
function updateCube() {
    size = 38;
    centerX = scene.screenWidth() / 2;
    centerY = scene.screenHeight() / 2;

    let vertices = [
        //top jaw
        { x: -size / 4, y: -size / 2, z: 0 },//0
        { x: size / 4, y: -size / 2, z: 0 },
        { x: 0, y: -size / 2 - (size / 8), z: -size / 2 },
        //bottom jaw
        { x: -size / 4, y: -size / 2, z: 0 },//3
        { x: size / 4, y: -size / 2, z: 0 },
        { x: 0, y: -size / 2 + (size / 8), z: -size / 2 },
        //head
        { x: 0, y: -size / 2 + (size / 4), z: 0 },//6
        { x: 0, y: -size / 2 - (size / 4), z: 0 },
        { x: 0, y: -size / 2, z: size / 4 },//left eye
        { x: -size / 4, y: -size / 2 - (size / 8), z: 0 },//9
        { x: (-size / 4) + (size / 6), y: -size / 2 - (size / 8), z: 0 },
        { x: (-size / 4) + (size / 12), y: -(size / 2) - (size / 4), z: 0 },
        //right eye
        { x: size / 4, y: -size / 2 - (size / 8), z: 0 },//12
        { x: (size / 4) - (size / 6), y: -size / 2 - (size / 8), z: 0 },
        { x: (size / 4) - (size / 12), y: -(size / 2) - (size / 4), z: 0 },
        //left eye pupil
        { x: -size / 4.5, y: -size / 2 - (size / 7), z: -1 },//15
        { x: (-size / 4.5) + (size / 10), y: -size / 2 - (size / 7), z: -1 },
        { x: (-size / 4) + (size / 12), y: -(size / 2) - (size / 5), z: -1 },
        //right eye pupil
        { x: size / 4.5, y: -size / 2 - (size / 7), z: -1 },//18
        { x: (size / 4.5) - (size / 10), y: -size / 2 - (size / 7), z: -1 },
        { x: (size / 4) - (size / 12), y: -(size / 2) - (size / 5), z: -1 }
    ];

    let rotatedVertices = vertices.map(vertex => {
        let x = vertex.x;
        let y = vertex.y;
        let z = vertex.z;

        // Rotate around the X-axis
        let cosX = Math.cos(angleX);
        let sinX = Math.sin(angleX);
        let rotatedY = y * cosX - z * sinX;
        let rotatedZ = y * sinX + z * cosX;

        // Rotate around the Y-axis
        let cosY = Math.cos(angleY);
        let sinY = Math.sin(angleY);
        let rotatedX = x * cosY + rotatedZ * sinY;
        let rotatedZ2 = -x * sinY + rotatedZ * cosY;

        // Rotate around the Z-axis
        let cosZ = Math.cos(angleZ);
        let sinZ = Math.sin(angleZ);
        let rotatedX2 = rotatedX * cosZ - rotatedY * sinZ;
        let rotatedY2 = rotatedX * sinZ + rotatedY * cosZ;

        // Project onto 2D
        let scaleFactor = 200 / (200 + rotatedZ2);
        let projectedX = rotatedX2 * scaleFactor;
        let projectedY = rotatedY2 * scaleFactor;

        // Translate to screen coordinates
        let screenX = centerX + projectedX;
        let screenY = centerY + projectedY;

        return { x: screenX, y: screenY, z: rotatedZ2 };
    });

    let triangles = [
        //head
        { indices: [0, 1, 2], color: 12 },
        { indices: [3, 4, 5], color: 12 },
        { indices: [4, 5, 6], color: 7 },
        { indices: [3, 5, 6], color: 9 },
        { indices: [1, 2, 7], color: 7 },
        { indices: [0, 2, 7], color: 9 },
        { indices: [7, 1, 8], color: 9 },
        { indices: [7, 0, 8], color: 13 },
        { indices: [6, 1, 8], color: 9 },
        { indices: [6, 0, 8], color: 13 },
        { indices: [9, 10, 11], color: 1 },
        { indices: [12, 13, 14], color: 1 },
        { indices: [15, 16, 17], color: 15 },
        { indices: [18, 19, 20], color: 15 }
    ];

    // Sort triangles based on the average Z-coordinate of their vertices
    triangles.sort((b, a) => {
        let zA = (rotatedVertices[a.indices[0]].z + rotatedVertices[a.indices[1]].z + rotatedVertices[a.indices[2]].z) / 3;
        let zB = (rotatedVertices[b.indices[0]].z + rotatedVertices[b.indices[1]].z + rotatedVertices[b.indices[2]].z) / 3;
        return zA - zB;
    });
    //scene.setBackgroundImage(assets.image`myImage0`)
    scene.backgroundImage().fill(14);
    
    // Draw the sorted triangles
    for (let i = 0; i < triangles.length; i++) {
        let triangle = triangles[i];
        let indices = triangle.indices;
        let color = triangle.color;

        scene.backgroundImage().fillTriangle(rotatedVertices[indices[0]].x, rotatedVertices[indices[0]].y, rotatedVertices[indices[1]].x, rotatedVertices[indices[1]].y, rotatedVertices[indices[2]].x, rotatedVertices[indices[2]].y, color);
    }
}

let vertices: number[] = [];
let centerY = 0;
let centerX = 0;
let size = 0;
let rotate = false
let angleZ = 0;
let angleY = 0;
let angleX = 0;
let bg = scene.backgroundImage();

// Set up the initial cube
updateCube();

game.onUpdate(function () {
    
    if (controller.anyButton.isPressed()) {
        rotate = true
    } else {
        rotate = true
    }
    
    
    if (rotate) {
        if (controller.left.isPressed()) {
            angleY += 0 - 0.05
        }
        if (controller.right.isPressed()) {
            angleY += 0.05
        }
        if (controller.up.isPressed()) {
            angleX += 0 - 0.05
        }
        if (controller.down.isPressed()) {
            angleX += 0.05
        }
    } else {
        angleY -= 0.05
        angleX += 0.05
        angleZ += 0.05
    }
    
    updateCube()   
    
    
})