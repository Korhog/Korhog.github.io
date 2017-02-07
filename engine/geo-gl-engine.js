define (
    'geo-gl-engine',
    ['geo-gl-render', 'geo-gl-input', 'geo-gl-shader', 'geo-gl-shaders'], 
    function(render, input, shader) {  
        return {
            render: render,
            inputController: input,
            shaderFactory: shader,
            initialize: function(docinst, canvas) {
                // Инициализируемся
                render.setParent(this);
                shader.setParent(this);
                input.setParent(this);

                input.subcribe(docinst, canvas);
                render.initialize(canvas);
                console.log('initialize');
            }
        };
    }
);