define(
   'geo-gl-shader', [],
   function (shaders) {
      return {
         parent: null, // engine
         setParent: function (obj) {
            this.parent = obj;
         },
         createPixelShader: function (source) {
            if (!this.parent) {
               return;
            }

            var
               gl = this.parent.render.gl,
               shader = gl.createShader(gl.FRAGMENT_SHADER);

            gl.shaderSource(shader, source.source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
               console.error('Error: compile pixel shader', gl.getShaderInfoLog(shader));
               return null;
            }

            return {
               shader: shader,
               layout: []
            };
         },
         createVertexShaderWithLayout: function (source, program) {
            if (!this.parent) {
               return;
            }

            var
               gl = this.parent.render.gl,
               shader = gl.createShader(gl.VERTEX_SHADER);

            gl.shaderSource(shader, source.source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
               console.error('Error: compile vertext shader', gl.getShaderInfoLog(shader));
               return null;
            }

            return {
               shader: shader,
               layout: []
            };
         },
         setupVertextLayoutFromVS: function (vs, program) {
            var
               gl = this.parent.render.gl;

            for (var idx in vs.layoutParams) {
               var
                  param = vs.layoutParams[idx],
                  attr = gl.getAttribLocation(program, param.name);

               gl.vertexAttribPointer(
                  attr,
                  param.size,
                  gl.FLOAT,
                  gl.FALSE,
                  param.layoutSize,
                  param.offset
               );

               gl.enableVertexAttribArray(attr);
            }
         }
      };
   }
);
