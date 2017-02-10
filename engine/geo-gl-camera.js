define(
    'geo-gl-camera',     
    [],
    function() {
        return {
            // модуль не есть камера, в дальнейшем он должен перехать в метод создания камеры. 
            parent: null, // engine            
            setParent: function(obj) {
                this.parent = obj;
            }, 
            target: {x:0, y:0, z:0},           
            distance: 2,
            yaw: 0, // rotation by Y
            pitch: -45,
            pitchRange: { mix:-89.9, max:89.9},
            view: function(matrix) {                
                // ОБраничивам ма
                if (this.pitch > this.pitchRange.max) {
                    this.pitch = this.pitchRange.max;  
                }

                if (this.pitch < this.pitchRange.min) {
                    this.pitch = this.pitchRange.min;  
                }                

                var
                    rotMatrix = new Float32Array(16),
                    v = vec3.fromValues(0, 0, this.distance);
                // Получаем матрицу поворота рысканья
                mat4.identity(rotMatrix);
                mat4.rotate(rotMatrix, rotMatrix, glMatrix.toRadian(this.pitch), [1, 0, 0]);
                vec3.transformMat4(v, v, rotMatrix);
                mat4.identity(rotMatrix);
                mat4.rotate(rotMatrix, rotMatrix, glMatrix.toRadian(this.yaw), [0, 1, 0]);
                vec3.transformMat4(v, v, rotMatrix);    
                //mat4.lookAt(matrix, [v[0], v[1], v[2]], [4291.675, 20, 68955.77], [0, 1, 0
                mat4.lookAt(matrix, [v[0], v[1], v[2]], [0, 0, 0], [0, 1, 0]);    
            }  
        }; 
    }
);