var client = new Paho.MQTT.Client("broker.hivemq.com", 8000, "client_" + new Date().getTime());
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

client.connect({
  onSuccess: function () {
      console.log("Connected to MQTT broker");
      client.subscribe("peacock_feed");
  },
  onFailure: function (responseObject) {
      console.log("Failed to connect: " + responseObject.errorMessage);
  }
  });
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:" + responseObject.errorMessage);
  }
}

function onMessageArrived(message) {
  console.log("onMessageArrived:" + message.payloadString);

  if (message.payloadString === "successfully_fed") {
    console.log("Received success message");

    document.getElementById("success_msg").innerText = "Successfully fed";
    setTimeout(function () {
      console.log("Hiding success message");
      document.getElementById("success_msg").innerText = "";
    }, 6000);
  }
}

function feed() {
  document.getElementById("success_msg").innerText = "Feeding in progress...";
  const foodAmount = document.getElementById("food").value;
  const waterAmount = document.getElementById("water").value;
  const data = {
    food: foodAmount,
    water: waterAmount
  };
  var message = new Paho.MQTT.Message(JSON.stringify(data));
  message.destinationName = 'peacock_feed'; 
  client.send(message); 
}

const msg = document.getElementById("message");
