define(
   'geo-gl-camera', [],
   function () {
      return {
         // модуль не есть камера, в дальнейшем он должен перехать в метод создания камеры.
         parent: null, // engine
         setParent: function (obj) {
            this.parent = obj;
         },
         target: vec3.fromValues(0, 0, 0),
         front: vec3.fromValues(0, 0, -1), // Вектор направления
         side: vec3.fromValues(1, 0, 0), // Вектор бокового смещения
         distance: 2,
         yaw: 0, // rotation by Y
         pitch: -45,
         pitchRange: {
            mix: -89.9,
            max: 89.9
         },
         view: function (matrix) {
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

            this.front = vec3.fromValues(0, 0, -1); // Вектор направления
            this.side = vec3.fromValues(1, 0, 0); // Вектор бокового смещения

            // Получаем матрицу поворота рысканья
            mat4.identity(rotMatrix);
            mat4.rotate(rotMatrix, rotMatrix, glMatrix.toRadian(this.pitch), [1, 0, 0]);
            vec3.transformMat4(v, v, rotMatrix);
            mat4.identity(rotMatrix);
            mat4.rotate(rotMatrix, rotMatrix, glMatrix.toRadian(this.yaw), [0, 1, 0]);
            vec3.transformMat4(v, v, rotMatrix);
            // поворачиваем фронтальный и боковой вектора
            vec3.transformMat4(this.front, this.front, rotMatrix);
            vec3.transformMat4(this.side, this.side, rotMatrix);
            vec3.add(v, v, this.target);

            mat4.lookAt(
               matrix, [v[0], v[1], v[2]], [this.target[0], this.target[1], this.target[2]], [0, 1, 0]);
         },
         translate: function (vector) {
            if (typeof (vector) !== 'undefined')
               vec3.add(this.target, this.target, vector);
         },
         reset: function () {
            this.target = vec3.fromValues(0, 0, 0);
         }
      };
   }
);
