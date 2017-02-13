var shaders = {
    vsBase: { 
        // Base vertex shader with params.
        source: [
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
        ].join('\n'),
        layoutParams: [
            {            
                name: 'position',
                size: 3,
                type: 'default',
                un: 'default',
                layoutSize: 6 * Float32Array.BYTES_PER_ELEMENT,
                offset: 0   
            }, 
            {            
                name: 'vertParam',
                size: 3,
                type: 'default',
                un: 'default',
                layoutSize: 6 * Float32Array.BYTES_PER_ELEMENT,
                offset: 3 * Float32Array.BYTES_PER_ELEMENT   
            },                     
        ]
    },
    psBase:{
        // Base vertex shader with params.
        source: [
            'precision mediump float;',
            '',
            'varying vec3 param;',
            'void main(void) {',
            '    float r = 1.0;',  
            '    float g = 1.0;',  
            '    float b = 1.0;',                                    
            '    if(param.y >= 0.75) {',            
            '       r = 1.0;',
            '       g = (0.25 - (param.y - 0.75)) * 4.0;',            
            '       b = 0.0;',
            '    } else if (param.y >= 0.5) {',
            '       r = 1.0 - param.y * 2.0;',
            '       g = 1.0;',            
            '       b = 0.0;',            
            '    } else if (param.y >= 0.25) {',
            '       r = 0.0;',
            '       g = 1.0;',            
            '       b = (0.25 - (param.y - 0.25)) * 4.0;',         
            '    } else {',  
            '       r = 0.0;',
            '       g = param.y * 4.0;',            
            '       b = 1.0;',            
            '    }',                    
            '    ',
            '    gl_FragColor = vec4(r, g, b, 1.0);',
            '}'
        ].join('\n'),
        layoutParams: {}  
    }
};