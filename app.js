var 
    app = {}; // Объект приложения.

require.config({
    baseUrl: 'engine',
    paths: {
        jquery: 'js/jquery',
        message: 'js/message'
    }
});

require(['jquery', 'geo-gl-engine', 'geo-gl-loader'], function($, engine) {  
    // Загружаем объект движка и передаем его в приложение. 
    app.engine = engine;
    initialize(); 
});

var initialize = function () {
    var 
        control = document.getElementById("files"),
        canvas = document.getElementById("canvas");  

    control.addEventListener("change", function(event) {
        // Когда происходит изменение элементов управления, значит появились новые файлы
        document.getElementById("status-panel").style.visibility = "unset";
        
        var reader = new FileReader(),
            i = 0,
            files = control.files,
            len = files.length;

        reader.onload = function(event) {
            
            
            app.engine.render.mesh = loadMeshFromFile(event);
            //app.engine.render.camera.target = {x:mesh.center.x, y:20, z:mesh.center.z}
            //app.engine.render.mesh = generatePlane(128, 128);
            app.engine.render.setupDemoRender();
            document.getElementById("status-panel").style.visibility = "collapse";
            console.log('loading end'); 
        };
         
        reader.onerror = function(event) {
            console.error("Файл не может быть прочитан! код " + event.target.error.code);
        };
         
        reader.readAsText(files[0]);   
     
        for (; i < len; i++) {
            console.log("Filename: " + files[i].name);
            console.log("Type: " + files[i].type);
            console.log("Size: " + files[i].size + " bytes");
        }
     
    }, false);        
    
    app.engine.initialize(document, canvas);

    var 
        event = {            
            target: {
                result: geometry
            }
        };

    app.engine.render.mesh = loadMeshFromFile(event);
    app.engine.render.setupDemoRender();
    document.getElementById("status-panel").style.visibility = "collapse";
    console.log('loading end'); 
    // Run render loop
    var 
        loop = function () {
            app.engine.render.draw();
            requestAnimationFrame(loop);
        };
    requestAnimationFrame(loop);    
};
