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
        var reader = new FileReader(),
            i = 0,
            files = control.files,
            len = files.length;

        reader.onload = function(event) {
            var 
                contents = event.target.result,
                lines = contents.split(/\r?\n/);
            
            lines.forEach(function(line, idx, lines) {
                var 
                    pack = line.split(/\s/),
                    vertice = {};
                if (pack.length > 2) {
                    vertice.x = parseFloat(pack[0]);
                    vertice.y = parseFloat(pack[1]);
                    vertice.z = parseFloat(pack[2]);
                }

                if (pack.length == 4) {
                    vertice.p = parseFloat(pack[3]);
                }                

                console.log(vertice);                
            });
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
    /*
    app.engine.initialize(document, canvas);

    // Run render loop
    var 
        loop = function () {
            app.engine.render.draw();
            requestAnimationFrame(loop);
        };
    requestAnimationFrame(loop);
    */
};