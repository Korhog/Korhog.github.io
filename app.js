var gl;
// Мыша
var mouseDown = false;
var lastMouseX = null;
var lastMouseY = 0;
var worldMatrix;
var angleX = 0;
var angleY = 0;

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
    var 
        mWorldLocation = gl.getUniformLocation(program.prog, 'mWorld'),
        mViewLocation = gl.getUniformLocation(program.prog, 'mView'),
        mProjLocation = gl.getUniformLocation(program.prog, 'mProj'),
        
        viewMatrix = new Float32Array(16),
        projMatrix = new Float32Array(16);

    mat4.identity(worldMatrix);
    mat4.lookAt(viewMatrix, [0, 1, -1], [0, 0, 0], [0, 1, 0]);
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
        gl.uniformMatrix4fv(mWorldLocation, gl.FALSE, worldMatrix);  
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
    
    var identityMatrix = new Float32Array(16);
    mat4.identity(identityMatrix);

    angleX += (lastMouseX ? newX - lastMouseX : 0) / 10;
    angleY += (lastMouseY ? lastMouseY - newY : 0) / 10;
    mat4.rotate(worldMatrix, identityMatrix,  glMatrix.toRadian(angleX), [0, 1, 0]);
    mat4.rotate(worldMatrix, worldMatrix,  glMatrix.toRadian(angleY), [1, 0, 0]);

    lastMouseX = newX;
    lastMouseY = newY;
  }