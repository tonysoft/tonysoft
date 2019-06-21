window.apiRequest = function(baseURL, apiMethod, payload, callback) {
    var url = baseURL + "/" + apiMethod;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-type", "application/json");

    xhr.onreadystatechange = function() { //Call a function when the state changes.
        if(xhr.readyState == XMLHttpRequest.DONE) {
            var status = xhr.status;
            if (xhr.response) {
                var response = xhr.response;
                try {
                    response = JSON.parse(xhr.response);
                }catch(e){};

                callback(response);
            }
        }
    }

    try {
        xhr.send(JSON.stringify(payload));
    }
    catch(e) {
        console.log(e);
    }

}

window.copyObject = function(json) {
    return JSON.parse(JSON.stringify(json));
}


