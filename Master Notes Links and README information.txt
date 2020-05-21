

TWITTER API 
an example URL of a tweet:
"base_url" + user.screen_name + "/status/" + status.id
"https://twitter.com/SethDillon/status/1261713288620113920"
"https://twitter.com/user.screen_name/status/status.id"

https://developer.twitter.com/en/docs/tweets/rules-and-filtering/overview/premium-operators
https://help.twitter.com/en/rules-and-policies/twitter-automation?lang=en


https://twitter.com/search?q=%23questions&src=typed_query

fetch("https://api.twitter.com/1.1/search/tweets.json?q=%23questions ? -filter:retweets")

?q=%3Fq%3D%2523questions%20%3F%20-filter%3Aretweets


response keys:

"created_at"
"text"
"expanded_url"
"urls[0].url"

$ curl --request GET 
 --url 'https://api.twitter.com/1.1/search/tweets.json?q=from%3Atwitterdev&result_type=mixed&count=2' 
 --header 'authorization: OAuth oauth_consumer_key="consumer-key-for-app", 
 oauth_nonce="generated-nonce", oauth_signature="generated-signature", 
 oauth_signature_method="HMAC-SHA1", oauth_timestamp="generated-timestamp", 
 oauth_token="access-token-for-authed-user", oauth_version="1.0"'
$ twurl /1.1/search/tweets.json?q=from%3Atwitterdev&result_type=mixed&count=2

What I did:
I watched this video and ran "npm install twit -save" from the windows CLI
https://www.youtube.com/watch?v=s70-Vsud9Vk


FACEBOOK API

https://developers.facebook.com/support/

https://ogp.me/?fbclid=IwAR2IsQrzQt-85PHk9Xd586mewNKhVCXev00Gl7IX6O7snUllOcwbR59e2nY#types

https://developers.facebook.com/docs/sharing/webmasters#markup

PITCH DECK

https://docs.google.com/presentation/d/1dv2TSBIKWLv7cPyQvQncISu316iFXRXFCRaRKQ4m8dw/edit#slide=id.gd933c8c4a_0_32
MVP advice
https://medium.com/@sprocompany/what-is-a-minimum-viable-product-and-how-to-build-an-mvp-for-your-startup-9a02c0d4a56a
DB DESIGNER SCHEMA
https://app.dbdesigner.net/designer/schema/329635

CODE EXAMPLES USED
Testimonial cards
https://codepen.io/ibrahima92/pen/mdbLmVX
https://www.ibrahima-ndaw.com/blog/build-an-animated-testimonial-card/
TOggle switch
https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_switch
Custom Range Slider
https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_rangeslider
https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_js_rangeslider_pic
SLider Gallery in pure Javascript
https://medium.com/@fionnachan/how-to-write-a-slider-in-pure-javascript-838c0d98fd69

STRING PROCESSING METHODS
https://images.app.goo.gl/HXe1khH99anXBPUC8
.split(",")//converts a string into an array. Use the argument to specify the delimiter
.search("str")// can be used with regex to find one or more sbstrings in a string. Returns the number of the location of the first index of thee str argument
.replace(/Microsoft/g, "W3Schools")// can be used with regex to replace one or more sbstrings in a string. Returns the string with replaced text
.splice(5,12)// used to remove a specified amount of a string from a particular location.
.trim()//removes white space from around a string. Not safe for IE 7 or earlier. Can use replace with regex instead 
.includes("str")//returns true if the str arcgument is in the given string. Otherwiss return false. 

REGEX
Explainer article
https://levelup.gitconnected.com/read-this-if-you-dont-know-enough-about-regex-73141bb0e1a7
Online expression tester
https://regex101.com/

TRIGGERING PROCE55ING FROM THE COMMAND LINE
$ processing-java --sketch=`pwd`/sketch_name --run
inside .js:
let cmd = "processing-java --sketch=`pwd`/sketch_name --run"
let exec = require(child_process).exec;
let fs = require("fs");
exec(cmd, processing);
function processing(){
let filename = "rainbow/output.png";
let params = {encoding: "base64"};
 let b64 = fs.ReadFileSync(filename, params);
 T.post("media/upload", {media_data: b64}, uploaded)
console.log("finished!");
}
//To remove a foreign key from a table:
ALTER TABLE table_name 
DROP FOREIGN KEY constraint_name;

INSERT INTO questions (type_id, assessment_id, text, date, twurl, quiz_id) VALUES (1, 1, "Is this a question?", "2020-05-21 01:27:41", "http://www.twitter.com/avinash/status/1263256807138459600","test");
 