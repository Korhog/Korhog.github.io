var file = {
    load: function(name) {
        var reader = new FileReader();

        reader.onload = function(event) {
            var contents = event.target.result;
            console.log("Содержимое файла: " + contents);
        };
         
        reader.onerror = function(event) {
            console.error("Файл не может быть прочитан! код " + event.target.error.code);
        };
         
        reader.readAsText('input.txt');
    }
};

require(['jquery'], function ($) {
    file.$ = $;
});