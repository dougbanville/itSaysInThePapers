var https = require('https');
module.exports = {

    httpGet : function(url, api, callback) {
        var options = {
            host: url,
            method: 'GET',
            //headers: headers
        };
        //console.log(headers)
        if(api){
        }
        console.log("httpGet(): START " + options.host);
    
        var req = https.get(url, res => {
            res.setEncoding('utf8');
            var returnData = "";
    
            res.on('data', chunk => {
                returnData = returnData + chunk;
            });
    
            res.on('end', () => {
                //console.log("httpGet(): END ");
                //console.log("httpGet(): END " + JSON.stringify(returnData));
                callback(returnData);  // this will execute whatever function the caller defined, with one argument
            });
            res.on('error', () => {
                console.log("ERROR");
            })
        });
        req.end();
    }
    
}