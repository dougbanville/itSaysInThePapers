const https = require('https');
const httpFunctions= require('./httpFunctions');
const uuidv1 = require('uuid/v1');

exports.handler = (event, context, callback) => {
    // TODO implement
    let message = "howdy!";
    let papers= `https://feeds.rasset.ie/sitesearch/clipperlive/select/?q=*:*&fq=programmeid:5&fq=ispodcast%20:true&fq=title:says%20in%20papers&sort=published%20desc&wt=json&rows=1`;

    
    try{

        httpFunctions.httpGet(papers, true,  r=> {
            
            let result = JSON.parse(r);
            result = result.response.docs;
            //console.log(result[0].podcast_url);
            let streamUrl = result[0].podcast_url.replace("http://","https://");
            let newResponse = {
                streamUrl : streamUrl,
                uid: uuidv1(),
                redirectionURL: "https://www.rte.ie/news",
                updateDate: "2018-07-11T13:05:20.+0000",
                mainText: result[0].description,
                titleText: result[0].title
            }
            console.log(newResponse);
            callback(null,newResponse);


        });

    }catch(e){

        console.log(e);

    }

    
};
