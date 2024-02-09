const topic = "peacock_feeder";
let client = new Paho.Client("broker.hivemq.com", 8000, topic);
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
client.connect({onSuccess:onConnect});

function onConnect() {
  console.log("onConnect");
}

function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString);
  /* if (message is 'successfully fed')*/
  msg.classList.remove("d-none")
}

function feed() {
    const foodAmount = document.getElementById("food").value;
    const waterAmount = document.getElementById("water").value;
    let message = new Paho.Message("food="+foodAmount+";water="+waterAmount);
    message.destinationName = topic; // "peacock_feeder"
    client.send(message); // Format: food=X;water=Y
    /* Server has to send a MQTT message 
    that will trigger the "Feeding in progress" message. */
}

const msg = document.getElementById("message");

msg.classList.add("d-none");