var 
    app = {}; // Объект приложения.

require.config({
    baseUrl: 'engine',
    paths: {
        jquery: 'js/jquery',
        message: 'js/message'
    }
});

require(['jquery', 'geo-gl-engine'], function($, engine) {  
    // Загружаем объект движка и передаем его в приложение. 
    app.engine = engine;
    initialize(); 
});

var initialize = function () {
    var 
        canvas = document.getElementById("canvas");  
    
    app.engine.initialize(document, canvas);

    // Run render loop
    var 
        loop = function () {
            app.engine.render.draw();
            requestAnimationFrame(loop);
        };
    requestAnimationFrame(loop);
};