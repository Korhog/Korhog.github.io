var gl;
// Мыша
var mouseDown = false;
var lastMouseX = null;
var lastMouseY = null;
var worldMatrix;
var viewMatrix;

var camera = {
    distance: 2,
    rotate: 0,
    tangage: -45,
    view :function(matrix) {
        var
            rotMatrix = new Float32Array(16),
            v = vec3.fromValues(0, 0, this.distance);
            // Получаем матрицу поворота рысканья
        mat4.identity(rotMatrix);
        mat4.rotate(rotMatrix, rotMatrix, glMatrix.toRadian(this.tangage), [1, 0, 0]);
        vec3.transformMat4(v, v, rotMatrix);
        mat4.identity(rotMatrix);
        mat4.rotate(rotMatrix, rotMatrix, glMatrix.toRadian(this.rotate), [0, 1, 0]);
        vec3.transformMat4(v, v, rotMatrix);    

        mat4.lookAt(matrix, [v[0], v[1], v[2]], [0, 0, 0], [0, 1, 0]);   

        console.log(this.distance, this.rotate, this.tangage);
    }
};

var vertextShaderCode = [
'precision mediump float;',
'',
'attribute vec3 position;',
'attribute vec3 vertParam;',
'varying vec3 param;',
'',
'uniform mat4 mWorld;',
'uniform mat4 mView;',
'uniform mat4 mProj;',
'',
'void main(void) {',
'    param = vertParam;',
'    gl_Position = mProj * mView * mWorld * vec4(position, 1.0);',
'}'
].join("\n");

var pixelShaderCode = [
'precision mediump float;',
'',
'varying vec3 param;',
'void main(void) {',
'    float r = 1.0;',
'    ',
'    gl_FragColor = vec4(param, 1.0);',
'}'
].join("\n");


var initEngine = function () {
    var canvas = document.getElementById("canvas");

    canvas.onmousedown = onMouseDown;
    document.onmouseup = onMouseUp;
    document.onmousemove = onMouseMove;
    canvas.onwheel = onWheel;

    //canvas.onmousedown = handleMouseDown;
    //document.onmouseup = handleMouseUp;
    //document.onmousemove = handleMouseMove;

    gl = document.getElementById("canvas").getContext("webgl");
    if (!gl) {
        gl = canvas.getContext("experimental-webgl");
    }

    gl.clearColor(0.5, 0.75, 0.85, 1);   

    var
        vs = createVertextShader(vertextShaderCode),
        ps = createPixelShader(pixelShaderCode),
        program = createProgram();

    program.attachShaders(vs, ps);

    gl.linkProgram(program.prog);
    if (!gl.getProgramParameter(program.prog, gl.LINK_STATUS)) {
        console.error('Error: link program');
        return;
    }

    gl.validateProgram(program.prog);
    if (!gl.getProgramParameter(program.prog, gl.VALIDATE_STATUS)) {
        console.error('Error: validate program');
        return;
    }

    // Init geometry;    
    var 
        size = 512,
        cs = 0;
        cube = generatePlane(size,size);

    cs = cube.size;


    // shader layout
    var vertexesBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexesBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, cube.vertices, gl.STATIC_DRAW);
    gl.enable(gl.DEPTH_TEST);

    var posAttrLocation = gl.getAttribLocation(program.prog, 'position');
    gl.vertexAttribPointer(
        posAttrLocation, // положение атрибута.
        3,
        gl.FLOAT,
        gl.FALSE,
        6 * Float32Array.BYTES_PER_ELEMENT,
        0
    );

    var paramAttrLocation = gl.getAttribLocation(program.prog, 'vertParam');
    gl.vertexAttribPointer(
        paramAttrLocation, // положение атрибута.
        3,
        gl.FLOAT,
        gl.FALSE,
        6 * Float32Array.BYTES_PER_ELEMENT,
        3 * Float32Array.BYTES_PER_ELEMENT
    );

    gl.enableVertexAttribArray(posAttrLocation);
    gl.enableVertexAttribArray(paramAttrLocation);

    gl.useProgram(program.prog);
    worldMatrix = new Float32Array(16);
    viewMatrix = new Float32Array(16);
    var 
        mWorldLocation = gl.getUniformLocation(program.prog, 'mWorld'),
        mViewLocation = gl.getUniformLocation(program.prog, 'mView'),
        mProjLocation = gl.getUniformLocation(program.prog, 'mProj'),       
        
        projMatrix = new Float32Array(16);

    mat4.identity(worldMatrix);
    camera.view(viewMatrix);
    mat4.perspective(
        projMatrix,
        glMatrix.toRadian(45),
        1024 / 768,
        0.1,
        1000.0
    );

    gl.uniformMatrix4fv(mWorldLocation, gl.FALSE, worldMatrix);
    gl.uniformMatrix4fv(mViewLocation, gl.FALSE, viewMatrix);
    gl.uniformMatrix4fv(mProjLocation, gl.FALSE, projMatrix);
    
    var identityMatrix = new Float32Array(16);
    mat4.identity(identityMatrix);
    var angle = 0;
    var loop = function() {
        // Чистим экран
        //gl.uniformMatrix4fv(mWorldLocation, gl.FALSE, worldMatrix); 
        gl.uniformMatrix4fv(mViewLocation, gl.FALSE, viewMatrix);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, cs);
        requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);    
};

function createVertextShader(shaderCode) {
    var shader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(shader, shaderCode);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Error: compile vertext shader', gl.getShaderInfoLog(shader));
        return null;
    }
    return shader;
}

function createPixelShader(shaderCode) {
    var shader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(shader, shaderCode);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Error: compile pixel shader', gl.getShaderInfoLog(shader));
        return null;
    }
    return shader;
}

function createProgram() {
    var
        program = gl.createProgram(),
        f1 = function (vertexShader, pixelShader) {
            gl.attachShader(this, vertexShader);
            gl.attachShader(this, pixelShader);
        };

    return {
        prog: program,
        attachShaders: f1.bind(program)
    };
}

function onMouseDown(event) {
    lastMouseX = event.ClientX;
    lastMouseY = event.ClientY;   
    mouseDown = true;
}

  function onMouseUp(event) {
    mouseDown = false;
  }

  function onMouseMove(event) {
    if (!mouseDown) {
      return;
    }
    var newX = event.clientX;
    var newY = event.clientY;
    
    camera.rotate += (lastMouseX ? lastMouseX - newX : 0) / 10;
    camera.tangage += (lastMouseY ? lastMouseY - newY : 0) / 10;
    camera.view(viewMatrix);   
   
    //mat4.rotate(worldMatrix, wo;rldMatrix,  glMatrix.toRadian(angleY), [1, 0, 0]);
    lastMouseX = newX;
    lastMouseY = newY;
  }

  function onWheel(event) {
      camera.distance += event.deltaY / 1000;
      camera.view(viewMatrix);
  }

  