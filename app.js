var gl;

var initEngine = function() {
   gl = document.getElementById("canvas").getContext("experimental-webgl");
   gl.clearColor(0.5, 0.75, 0.85, 1);
   gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
};

function vertextShader(vertPosition, vertColor) {
   return {
      fragColor: vertColor,
      gl_Position: [vertPosition.x, vertPosition.y, 0.0, 1.0]
   };
};
