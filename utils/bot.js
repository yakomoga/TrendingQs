console.log("The bot is starting...");
var Twit = require("twit");
const db = require("../model/helper");

var T = new Twit({
  consumer_key: "DFnBBA8LmhIlHtWdJon0V9dpt",
  consumer_secret: "LPG2d2RLki6HPW8dEHESpS1vmrAhSM7LefB9lMTMH8ysY9THzh",
  access_token: "77510613-jLnWYpPTBFY3uYmbsQBasjhUZNwLX91KGZY73Nl5n",
  access_token_secret: "Vph2LxWdNsf669xGRMddhp62EWBRjuiGsuYxFYLiZkY3W",
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  strictSSL: true, // optional - requires SSL certificates to be valid.
});

//This sets the twitter bot to get new questions once a day and to inject them into the database
//the input of the second parameter is time and the units are milliseconds
setInterval(T.get, 1000 * 60 * 60 * 24);

function isEnquiry(string) {
  let qarray = [
    "who",
    "when",
    "what",
    "where",
    "why",
    "how",
    "if",
    "either",
    "or",
    "rather",
    "prefer",
    "which",
    "am",
    "is",
    "are",
    "were",
    "do",
    "does",
    "did",
    "have",
    "has",
    "had",
    "can",
    "could",
    "will",
    "shall",
    "would",
    "should",
    "in",
    "at",
    "to",
    "from",
    "on",
    "over",
    "under",
  ];
  //let word;
  qarray.forEach((word) => {
    //maybe I should change the condition to be at the beginning of the string, or when it follows a comma
    if (string.includes(word)) {
      return true;
    } else return false;
  });
}

//Here we're going to strip out any @mentions, hashtags
function cleanText(string) {
  let mystring = string.replace(/\s([@#][\w_-]+)/gim, "");
  return mystring;
}

//Here we're going to test for what type of question it is
//It can either be a yes/no type question with only two choices
function isBinary() {}
//Or it can be a mutiple choice, with more than two choices but exclusive or
function isDropdown() {}
//Or it can be a mutiple choice, with more than two choices and any that apply
function isChecklist() {}

//Or it can be a rating scale question "to what extent do you agree?"
function isRating() {}

T.get(
  "search/tweets",
  {
    q: "%23questions ? -filter:retweets",
    count: 50,
    lang: "en",
    truncated: false,
  },
  function (err, data, response) {
    //console.log(data.statuses[1].text);
    let rand = Math.floor(Math.random() * 100);
    let myArray = data.statuses;
    let twurl;
    let text;
    let timestamp = "";
    let strmonth = "";
    let year = "";
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let intMonth;
    myArray.forEach((status) => {
      //console.log("Here's the raw text: ", status.text);
      text = cleanText(status.text);
      isEnquiry(text) ? console.log(text) : console.log("Rejected!");
      console.log("Here's the processed text: ", text);
      //Should make this into a function called convert date
      year = status.created_at.slice(-4);
      strmonth = status.created_at.slice(4, 7);
      intMonth = months.findIndex((e) => e === strmonth);
      intMonth++;
      strmonth = 0 + String(intMonth);
      timestamp = year + "-" + strmonth + "-" + status.created_at.slice(8, -10);
      //end of convert date function
      console.log(timestamp);
      twurl =
        "http://www.twitter.com/" +
        status.user.screen_name +
        "/status/" +
        status.id;
      console.log(twurl);
      //It doesn't like this syntax as it can't seem to locate the function that I wrote...
      //upload to database
      //`INSERT INTO questions (type_id, text, date, twurl) VALUES (1, ${text}, ${timestamp}, ${twurl});`;
      db(
        `INSERT INTO questions (type_id, text, date, twurl) VALUES (1, ${text}, ${timestamp}, ${twurl});`
      )
        .then((results) => {
          console.log(results);
        })
        .catch((err) => res.status(500).send(err));
    });

    //console.log(data.statuses[3].text);
    //console.log(data.statuses[3].created_at);
    //console.log(data.statuses[3].expanded_url);
  }
);
