define(
    'geo-gl-render',     
    ['geo-gl-camera'],
    function(camera) {
        console.log('render-initialized');
        return {
            camera: camera, // main scene camera
            scene: null, // current scene 
            program: null,
            mesh: null, // потом удалим.

            parent: null, // engine
            setParent: function(obj) {
                this.parent = obj;
                this.camera.setParent(obj);
            },         
            initialize: function(canvas) {
                // Render initialization
                var 
                    glctx = canvas.getContext("webgl"),
                    fatta = function (vertexShader, pixelShader) {
                        this.gl.attachShader(this.program.prog, vertexShader);
                        this.gl.attachShader(this.program.prog, pixelShader);
                    };

                if (!glctx) {
                    glctx = canvas.getContext("experimental-webgl");
                }
                
                if (!glctx) {
                    console.error('Error: initialize render');
                } 
                this.gl = glctx; 
                this.program = {
                    prog: glctx.createProgram(),
                    attachShaders: fatta.bind(this)
                };               

                this.setClearColor([0.15, 0.21, 0.24]);
                this.setupDemoRender();
                console.log(this.gl);              
            },
            setClearColor: function(rgb) {
                var 
                    gl = this.gl;

                gl.clearColor(rgb[0], rgb[1], rgb[2], 1); 
                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); 
            },
            setupRender: function () {

            },
            setupDemoRender: function () {
                // инициализация 
                var 
                    gl = this.gl,
                    factory = this.parent.shaderFactory,
                    program = this.program,
                    vs = factory.createVertexShaderWithLayout(shaders.vsBase, program.prog),
                    ps = factory.createPixelShader(shaders.psBase);

                program.attachShaders(vs.shader, ps.shader);
                
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
                this.mesh = generatePlane(256,256);

                // shader layout
                var vertexesBufferObject = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, vertexesBufferObject);
                gl.bufferData(gl.ARRAY_BUFFER, this.mesh.vertices, gl.STATIC_DRAW);
                gl.enable(gl.DEPTH_TEST);

                factory.setupVertextLayoutFromVS(shaders.vsBase, program.prog);

                gl.useProgram(program.prog);


                var 
                    worldMatrix = new Float32Array(16),
                    viewMatrix = new Float32Array(16),
                    projMatrix = new Float32Array(16),

                    mWorldLocation = gl.getUniformLocation(program.prog, 'mWorld'),
                    mViewLocation = gl.getUniformLocation(program.prog, 'mView'),
                    mProjLocation = gl.getUniformLocation(program.prog, 'mProj'); 

                    

                mat4.identity(worldMatrix);
                this.camera.view(viewMatrix);
                mat4.perspective(
                    projMatrix,
                    glMatrix.toRadian(45),
                    1024 / 768,
                    0.1,
                    1000.0
                );                   


                gl.uniformMatrix4fv(mWorldLocation, gl.FALSE, worldMatrix);                
                gl.uniformMatrix4fv(mProjLocation, gl.FALSE, projMatrix);
            },            
            draw: function() {
                // Base frame render   
                if (!this.mesh)
                    return;   

                var 
                    gl = this.gl,
                    viewMatrix = new Float32Array(16),
                    mViewLocation = gl.getUniformLocation(this.program.prog, 'mView');

                this.camera.view(viewMatrix);

                gl.uniformMatrix4fv(mViewLocation, gl.FALSE, viewMatrix);
                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
                gl.drawArrays(gl.TRIANGLES, 0, this.mesh.size);      
            }                  
        };         
    }
);