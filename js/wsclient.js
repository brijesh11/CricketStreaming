
var webSocketClient = null;
var websocketUrl = "wss://honbglrhackathon04march2017.mybluemix.net/ws/cricscore";

 function connect() {

    webSocketClient = new WebSocket(websocketUrl);
	webSocketClient.onopen = function()
    {
        // Web Socket is connected, send data using send()
        //webSocketClient.send("Message to send");
	    alert("onopen");
    };
				
    webSocketClient.onmessage = function (evt) 
    { 
        var received_msg = JSON.parse(evt.data);
        //alert("Message is received..." + received_msg);
        console.log(received_msg);
        //getData(received_msg);
        processDataMain(received_msg);
    };
				
    webSocketClient.onclose = function()
    { 
        // websocket is closed.
        alert("Connection is closed..."); 
    }

    function processDataMain(scoreData) {
        updateScoring(scoreData);
    }

   

    function buildUI() {
        var tbl = $("#scorecard");
        tbl.append("<tr><td>Country</td><td>Score of</td>");
        for (var i = 0; i < 10; i++) {
            var newRow = "<tr><td>Runs</td><td> balls</td></tr>";
            tbl.append(newRow);

        }

    }


    function getData(score)
    {
        console.log(score);
        var tbl = $("#scorecard");
        tbl.append("<tr><td>Country</td><td>Score of" + score + "</td>");
        for(var i=0; i<score.length; i++)
        {
            var newRow = "<tr><td>" + score[i].topic + "</td><td>" + score[i].balls + "</td></tr>";
            tbl.append(newRow);

        }

    }
 }
      
 function updateScoring(scoreData) {
    //coreData.topic;
     var score = scoreData.payload;
     var strScore = "runs : " + score.runs + "\r\n" +
                    "score : " + score.score + "\r\n" +
                    "balls : " + score.balls + "\r\n" +
                    "extras : " + score.extras + "\r\n" +
                    "overs : " + Math.floor(score.balls / 6) + "." + score.balls % 6 + "\r\n" +
                    "batsman : " + score.batsman + "\r\n";

                   
     $("#topic").text(scoreData.topic);
     $("#scorecard_id").text(strScore);

 }
/*

 var strScore = "runs : " + score.runs + "</br>" +
                    "score : " + score.score + "</br>" +
                    "balls : " + score.balls + "</br>" +
                    "extras : " + score.extras + "</br>" +
                    "batsman : " + score.batsman + "</br>";
                    */


/*

{
  "topic": "AUS-IND-Test-2",
  "payload": {
    "runs": 4,
    "score": 244,
    "balls": 78,
    "extras": 10,
    "batsman": 253802
  },
  "_msgid": "3315e13a.ccea1e"
}
*/