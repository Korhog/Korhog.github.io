var gl;
var vertextShaderCode = [
'precision mediump float;',
'',
'attribute vec2 position;',	
'void main(void) {',
'    gl_Position = vec4(position, 0.0,  1.0);',
'}'
].join("\n");

var pixelShaderCode = [
'precision mediump float;',
'',
'void main(void) {',
'    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);',
'}'
].join("\n");


var initEngine = function() {
   gl = document.getElementById("canvas").getContext("webgl");
   if(!gl) {
      gl = document.getElementById("canvas").getContext("experimental-webgl");
   }

   gl.clearColor(0.5, 0.75, 0.85, 1);
   gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

   var 
      vs = createVertextShader(vertextShaderCode),
      ps = createPixelShader(pixelShaderCode),
      program = createProgram();

   program.attachShaders(vs, ps);

   gl.linkProgram(program.prog);
   if(!gl.getProgramParameter(program.prog, gl.LINK_STATUS)) {
      console.error('Error: link program');
      return;
   }

   gl.validateProgram(program.prog);
   if(!gl.getProgramParameter(program.prog, gl.VALIDATE_STATUS)) {
      console.error('Error: validate program');
      return;
   }

   // Init geometry;


   var vertexes = new Float32Array([
   // x     y     x     p
      0.0,  0.5,
     -0.5, -0.5,
      0.5, -0.5
   ])

   // shader layout
   var vertexesBufferObject = gl.createBuffer();
   gl.bindBuffer(gl.ARRAY_BUFFER, vertexesBufferObject);
   gl.bufferData(gl.ARRAY_BUFFER, vertexes, gl.STATIC_DRAW);

   var posAttrLocation = gl.getAttribLocation(program.prog, 'position');
   gl.vertexAttribPointer(
      posAttrLocation, // положение атрибута.
      2,
      gl.FLOAT,
      gl.FALSE,
      2 * Float32Array.BYTES_PER_ELEMENT,
      0
   );

   gl.enableVertexAttribArray(posAttrLocation);
   gl.useProgram(program.prog);
   gl.drawArrays(gl.TRIANGLES, 0, 3);
};

function createVertextShader(shaderCode) {
   var shader = gl.createShader(gl.VERTEX_SHADER);
   gl.shaderSource(shader, shaderCode);
   gl.compileShader(shader);
   if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Error: compile vertext shader', gl.getShaderInfoLog(shader));
      return null;
   }
   return shader;
};

function createPixelShader(shaderCode) {
   var shader = gl.createShader(gl.FRAGMENT_SHADER);
   gl.shaderSource(shader, shaderCode);
   gl.compileShader(shader);   
   if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Error: compile pixel shader', gl.getShaderInfoLog(shader));
      return null;
   }
   return shader;
};

function createProgram() {
   var   
      program = gl.createProgram(),
      f1 = function(vertexShader, pixelShader) { 
         gl.attachShader(this, vertexShader);
         gl.attachShader(this, pixelShader);
      };

   return {
      prog: program,
      attachShaders: f1.bind(program)
   };
}
