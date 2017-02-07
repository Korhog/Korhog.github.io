var 
    app = {}; // Объект приложения.

require.config({
    baseUrl: 'engine',
    paths: {
        jquery: 'js/jquery',
        message: 'js/message'
    }
});

require(['jquery', 'geo-gl-engine'], function($, engine) {  
    // Загружаем объект движка и передаем его в приложение. 
    app.engine = engine;
    initialize(); 
});

var initialize = function () {
    var 
        canvas = document.getElementById("canvas");  
    
    app.engine.initialize(document, canvas);

    // Run render loop
    var 
        loop = function () {
            app.engine.render.draw();
            requestAnimationFrame(loop);
        };
    requestAnimationFrame(loop);
};



/*
var gl;
// Мыша
var mouseDown = false;
var lastMouseX = null;
var lastMouseY = null;
var worldMatrix;
var viewMatrix;

var initEngine = function () {
    var canvas = document.getElementById("canvas");

    canvas.onmousedown = onMouseDown;
    document.onmouseup = onMouseUp;
    document.onmousemove = onMouseMove;
    canvas.onwheel = onWheel;

    // Init geometry;    
    var 
        size = 64,
        cs = 0;
        cube = generatePlane(size,size);

    cs = cube.size;


    // shader layout
    var vertexesBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexesBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, cube.vertices, gl.STATIC_DRAW);
    gl.enable(gl.DEPTH_TEST);

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
*/

  