var invocation = new XMLHttpRequest();

function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    
    return xhr;
}

// Make the actual CORS request.
function makeCorsRequest() {
    var time = new Date().getTime();
    var url = $('#CorsURI').val(); // 'https://cors-test.appspot.com/test'

    var xhr = createCORSRequest('GET', url);
    if (!xhr) {
        alert('CORS not supported');
        return;
    }

    xhr.onload = function () {
        var text = xhr.responseText;
        time = new Date().getTime() - time;
        $('#CorsResponsTester').html("Response From: " + url + "<br />With context: " + text + "<br />It took: " + time + "ms" );
    };

    xhr.onerror = function () {
        alert('Error making the request.');
    };

    xhr.send();
};
