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
        workplace = document.getElementById("workplace"),
        canvas = document.getElementById("canvas");

    app.engine.initialize(document, canvas);   

    document.getElementsByTagName("BODY")[0].onresize = function() {
        app.engine.resizeCanvas();
    };   

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
