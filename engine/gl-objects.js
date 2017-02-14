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

function polygon(x1, y1, x2, y2) {
    var 
        p = {},
        z = Math.cos(Math.PI * x1 * y1 * 40) / 20,
        r = Math.random(),
        g = Math.cos(Math.PI * x1 * y1 * 40),
        b = Math.random(),
        triangle = {};
    

    p.triangles = [
        {
            vertices: [
                {
                    x:x1, 
                    y:z,
                    z:y1,
                    r: r,
                    g: g,
                    b: b
                },
                {
                    x:x1, 
                    y:z,
                    z:y2,
                    r: r,
                    g: g,
                    b: b
                },
                {
                    x:x2, 
                    y:z,
                    z:y1,
                    r: r,
                    g: g,
                    b: b
                } 
            ]
        },
        {
            vertices: [
                {
                    x:x2, 
                    y:z,
                    z:y1,
                    r: r,
                    g: g,
                    b: b
                },
                {
                    x:x1, 
                    y:z,
                    z:y2,
                    r: r,
                    g: g,
                    b: b
                },
                {
                    x:x2, 
                    y:z,
                    z:y2,
                    r: r,
                    g: g,
                    b: b
                } 
            ]
        }
    ]; 

    return p;
}

function generatePlane(n, m) {
    var 
        poligons = 0,
        width = 1.0 / n,
        height = 1.0 / m,
        polyList = [],        
        plane = {};  
      

    // Генерация сетки
    for (var x = 0; x < n; x++) {
        for (var y = 0; y < m; y++) {
            // вывод кооддинат двух треугльников.               
            polyList[polyList.length] = polygon(x * width - 0.5, y * height - 0.5, x * width + width - 0.5, y * height + height - 0.5);    
        }
    } 

    
    var 
        arr = [],
        asize = 0,
        tri;
    for (var idx_poly in polyList) {
        var 
            poly = polyList[idx_poly];

        for(var idx_tri in poly.triangles) {
            // Обходим треугольники.
            tri = poly.triangles[idx_tri];
            for (var idx_vertice in tri.vertices) {
                // Pos Vector3
                arr[arr.length] = tri.vertices[idx_vertice].x;
                arr[arr.length] = tri.vertices[idx_vertice].y;
                arr[arr.length] = tri.vertices[idx_vertice].z;
                // RGB
                arr[arr.length] = tri.vertices[idx_vertice].r;
                arr[arr.length] = tri.vertices[idx_vertice].g;
                arr[arr.length] = tri.vertices[idx_vertice].b;
            } 
        }
    }

    plane.vertices = new Float32Array(arr);
    plane.size = polyList.length * 2 * 3;
    return plane;
}

function loadMeshFromFile(data) {
    var 
        contents = data.target.result,
        lines = contents.split(/\r?\n/),
        cnt = 0,
        mesh = {}, 
        arr = [],          
        vertices = [];

    mesh.center = {x:0, y:0, z:0};        

    lines.forEach(function(line, idx, lines) {
        if (idx === 0) {
            mesh.center.x = parseFloat( line.match(/[\d.-]+/g)[0]);
            mesh.center.y = parseFloat( line.match(/[\d.-]+/g)[1]);
            return;
        }

        var 
            vertices = line.match(/\([^(]+?\)/g);
        
        for (var i in vertices) {
            // Pos Vector3
            arr[arr.length] = parseFloat( vertices[i].match(/[\d.-]+/g)[0] ) / 10000;
            arr[arr.length] = parseFloat( vertices[i].match(/[\d.-]+/g)[2] ) / 1000 - 2;
            arr[arr.length] = parseFloat( vertices[i].match(/[\d.-]+/g)[1] ) / 10000;
            // RGB
            arr[arr.length] = 0;
            arr[arr.length] = parseFloat( vertices[i].match(/[\d.-]+/g)[3]);
            arr[arr.length] = 0;  
            cnt += 1;
        }             
    }); 

    mesh.vertices = new Float32Array(arr);
    mesh.size = cnt;
    console.log('vertices: ' + cnt);
    delete(data.target.result);

    return mesh;  
}