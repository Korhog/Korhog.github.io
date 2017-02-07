define(
    'geo-gl-camera',     
    [],
    function() {
        return {
            parent: null, // engine
            setParent: function(obj) {
                this.parent = obj;
            },            
            distance: 2,
            yaw: 0, // rotation by Y
            pitch: -45,
            view: function(matrix) {
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

                mat4.lookAt(matrix, [v[0], v[1], v[2]], [0, 0, 0], [0, 1, 0]);    
            }  
        }; 
    }
);