function createDumpCube(width, height, depth) {
   var cube = {};

   cube.size = 32;
   cube.vertices = new Float32Array(
      [
         // лицо
         // x     y     x     p
         -0.5,  0.5, -0.5,  1.0,
         -0.5, -0.5, -0.5,  0.0,
          0.5, -0.5, -0.5, -1.0,

          0.5,  0.5, -0.5,  1.0,
         -0.5,  0.5, -0.5,  0.0,
          0.5, -0.5, -0.5, -1.0 
      ]
   );

   return cube;
}