var gl;
var mouseDown = false;
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


    canvas.addEventListener('touchmove', function(event) {
    // Если 1 палец внутри элемента
    if (event.targetTouches.length == 1) {
        var touch = event.targetTouches[0];
        // Place element where the finger is
        canvas.style.left = touch.pageX + 'px';
        canvas.style.top = touch.pageY + 'px';
    }
    }, false);

    canvas.onmousedown = onMouseDown;

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
    var cube = createDumpCube(2, 0.4, 2); 


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
    var 
        mWorldLocation = gl.getUniformLocation(program.prog, 'mWorld'),
        mViewLocation = gl.getUniformLocation(program.prog, 'mView'),
        mProjLocation = gl.getUniformLocation(program.prog, 'mProj'),

        worldMatrix = new Float32Array(16),
        viewMatrix = new Float32Array(16),
        projMatrix = new Float32Array(16);

    mat4.identity(worldMatrix);
    mat4.lookAt(viewMatrix, [0, 3, -5], [0, 0, 0], [0, 1, 0]);
    mat4.perspective(
        projMatrix,
        glMatrix.toRadian(45),
        800 / 600,
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
        if (mouseDown) {
            angle = performance.now() / 1000 / 6 * 2 * Math.PI;
            mat4.rotate(worldMatrix, identityMatrix, angle, [0, 1, 0]);
            gl.uniformMatrix4fv(mWorldLocation, gl.FALSE, worldMatrix);    
        } 

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, cube.size);
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
    mouseDown = true;}

function onMouseMove(event) {
    
}