function createDumpCube(width, height, depth) {    
    var cube = {};

    cube.size = 36;
    cube.vertices = new Float32Array(
        [
            // лицо
            // pos (x,y,x), normal (xyz), param(f)
            -(width * 0.5), (height * 0.5), -(depth * 0.5), 1.0, 0.0, 0.0,
            -(width * 0.5), -(height * 0.5), -(depth * 0.5), 1.0, 0.0, 0.0,
            (width * 0.5), -(height * 0.5), -(depth * 0.5), 1.0, 0.0, 0.0,

            -(width * 0.5), (height * 0.5), -(depth * 0.5), 1.0, 0.0, 0.0,
            (width * 0.5), -(height * 0.5), -(depth * 0.5), 1.0, 0.0, 0.0,
            (width * 0.5), (height * 0.5), -(depth * 0.5), 1.0, 0.0, 0.0,
            //тыл
            // pos (x,y,x), normal (xyz), param(f)
            -(width * 0.5), (height * 0.5), (depth * 0.5), 0.0, 1.0, 0.0,
            (width * 0.5), (height * 0.5), (depth * 0.5), 0.0, 1.0, 0.0,
            -(width * 0.5), -(height * 0.5), (depth * 0.5), 0.0, 1.0, 0.0,            
            -(width * 0.5), -(height * 0.5), (depth * 0.5), 0.0, 1.0, 0.0,
            (width * 0.5), (height * 0.5), (depth * 0.5), 0.0, 1.0, 0.0,
            (width * 0.5), -(height * 0.5), (depth * 0.5), 0.0, 1.0, 0.0,
            // пол
            // pos (x,y,x), normal (xyz), param(f)
            -(width * 0.5), -(height * 0.5), (depth * 0.5), 1.0, 1.0, 0.0,
            -(width * 0.5), -(height * 0.5), -(depth * 0.5), 1.0, 1.0, 0.0,
             (width * 0.5), -(height * 0.5), (depth * 0.5), 1.0, 1.0, 0.0,
            
            (width * 0.5), -(height * 0.5), (depth * 0.5), 1.0, 1.0, 0.0,
            -(width * 0.5), -(height * 0.5), -(depth * 0.5), 1.0, 1.0, 0.0,
            (width * 0.5), -(height * 0.5), -(depth * 0.5), 1.0, 1.0, 0.0,
            // крышка
            // pos (x,y,x), normal (xyz), param(f)
            -(width * 0.5), (height * 0.5), (depth * 0.5), 0.0, 1.0, 1.0,
            -(width * 0.5), (height * 0.5), -(depth * 0.5), 0.0, 1.0, 1.0,
             (width * 0.5), (height * 0.5), (depth * 0.5), 0.0, 1.0, 1.0,
            
            (width * 0.5), (height * 0.5), (depth * 0.5), 0.0, 1.0, 1.0,
            -(width * 0.5), (height * 0.5), -(depth * 0.5), 0.0, 1.0, 1.0,
            (width * 0.5), (height * 0.5), -(depth * 0.5), 0.0, 1.0, 1.0,
            // лево
            // pos (x,y,x), normal (xyz), param(f)
            -(width * 0.5), (height * 0.5), (depth * 0.5), 1.0, 0.0, 1.0,
            -(width * 0.5), -(height * 0.5), (depth * 0.5), 1.0, 0.0, 1.0,
            -(width * 0.5), (height * 0.5), -(depth * 0.5), 1.0,0.0, 1.0,
            
            -(width * 0.5), (height * 0.5), -(depth * 0.5), 1.0, 0.0, 1.0,
            -(width * 0.5), -(height * 0.5), (depth * 0.5), 1.0, 0.0, 1.0,
            -(width * 0.5), -(height * 0.5), -(depth * 0.5), 1.0, 0.0, 1.0,
            // право
            // pos (x,y,x), normal (xyz), param(f)
            (width * 0.5), (height * 0.5), (depth * 0.5), 0.0, 0.0, 1.0,
            (width * 0.5), -(height * 0.5), (depth * 0.5), 0.0, 0.0, 1.0,
            (width * 0.5), (height * 0.5), -(depth * 0.5), 0.0,0.0, 1.0,
            
            (width * 0.5), (height * 0.5), -(depth * 0.5), 0.0, 0.0, 1.0,
            (width * 0.5), -(height * 0.5), (depth * 0.5), 0.0, 0.0, 1.0,
            (width * 0.5), -(height * 0.5), -(depth * 0.5), 0.0, 0.0, 1.0  
        ]
    );

    return cube;
}