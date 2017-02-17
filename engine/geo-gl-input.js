define( 
    'geo-gl-input', 
    [], 
    function() {
        return {
            parent: null, // engine            
            setParent: function(obj) {
                this.parent = obj;
            },       
            params: {
                alt: false,
                ctrl: false, 
                scaleMode: false,
                scale: {
                    baseScale: 0,
                    baseVectorSize: 0
                }
            },  
            MouseX: null,
            MouseY: null,
            isMouseDown: false,
            subcribe: function (docinst, canvas) {
                this.low_edge = docinst.getElementById("param_low_edge");
                
                if (this.low_edge) {
                    this.low_edge.onchange = this.onLowEdgeChange.bind(this);
                    this.low_edge.oninput = this.onLowEdgeChange.bind(this);
                }
                // Нажатие
                canvas.onmousedown = this.onMouseDown.bind(this);
                canvas.ontouchstart = this.onTouchStart.bind(this);
                // Отпускание
                docinst.onmouseup = this.onMouseUp.bind(this);
                docinst.ontouchend = this.onMouseUp.bind(this);
                // Движение
                docinst.onmousemove = this.onMouseMove.bind(this);
                docinst.ontouchmove = this.onTouchMove.bind(this);
                // Нажатие
                canvas.onwheel = this.onWheel.bind(this);
            },
            onTouchStart: function (event) {
                var 
                    touch = {
                        clientX: event.touches[0].clientX,
                        clientY: event.touches[0].clientY,
                        altKey: false,
                        ctrlKey: false
                    };               

                this.MouseX = event.clientX;
                this.MouseY = event.clientY;                   
                this.isMouseDown = true;
                this.params.alt = false;
                this.params.ctrl = false;

                if (event.touches.length === 2) {
                    // 2 касания режим масштабирования.
                    alert(
                         event.touches[0].clientX + ' : ' +
                         event.touches[0].clientY + ' : ' +
                         event.touches[1].clientX + ' : ' +
                         event.touches[1].clientY
                    );
                    /*
                    var 
                        p1 = vec2.fromValues(
                            event.touches[0].clientX,
                            event.touches[0].clientY
                        ),
                        p2 = vec2.fromValues(
                            event.touches[1].clientX,
                            event.touches[1].clientY
                        ); 
                    
                    this.params.scaleMode = true;
                    this.params.scale.baseVectorSize = vec2.dist(p1, p2);
                    this.params.scale.baseScale = this.parent.render.camera.distance;
                    */
                    
                }
                //alert('onTouchStart');
            },

            onTouchEnd: function (event) {

            },            

            onMouseDown: function (event) {
                this.MouseX = event.clientX;
                this.MouseY = event.clientY;   

                this.params.alt = event.altKey;
                this.params.ctrl = event.ctrlKey;               

                this.isMouseDown = true;
            },

            onMouseUp: function (event) {
                this.isMouseDown = false;
                this.params.scaleMode = false;
            },


            onTouchMove: function (event) {
                if (!this.parent || !this.isMouseDown) {
                    return;
                }                 

                event.clientX = event.touches[0].clientX;
                event.clientY = event.touches[0].clientY;

                if (!this.parent || !this.isMouseDown) {
                    return;
                }
                var 
                    camera = this.parent.render.camera,
                    newX = event.clientX,
                    newY = event.clientY;                    

                camera.yaw += (this.MouseX ? this.MouseX - newX : 0) / 10;
                camera.pitch += (this.MouseY ? this.MouseY - newY : 0) / 10;

                this.MouseX = newX;
                this.MouseY = newY;

                return false;
            },

            onMouseMove: function (event) {
                if (!this.parent || !this.isMouseDown) {
                    return;
                }
                var 
                    camera = this.parent.render.camera,
                    newX = event.clientX,
                    newY = event.clientY;                    
                if (this.params.alt) {                    
                    var 
                        side = vec3.clone(camera.side),
                        front = vec3.clone(camera.front),
                        shiftX = this.MouseX ? this.MouseX - newX : 0,
                        shiftY = this.MouseY ? this.MouseY - newY : 0,
                        v = vec3.create();

                    vec3.scale(side, side, shiftX / 250);
                    vec3.scale(front, front, -shiftY / 250);

                    vec3.add(v, side, front);     
                    camera.translate(v);

                } else {
                    camera.yaw += (this.MouseX ? this.MouseX - newX : 0) / 10;
                    camera.pitch += (this.MouseY ? this.MouseY - newY : 0) / 10; 
                }
                

                this.MouseX = newX;
                this.MouseY = newY;
            },
            onWheel: function (event) {
                if (!this.parent) {
                    return;
                }
                var 
                    camera = this.parent.render.camera; 

                camera.distance += event.deltaY / 1000;
            },
            onLowEdgeChange: function(event) {
                if (!this.parent) {
                    return;
                }                  
                this.parent.render.params.low_edge = this.low_edge.value / 1000;  
            }
        };
    } 
);