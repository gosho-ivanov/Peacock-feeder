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

document.addEventListener("DOMContentLoaded", function() {

    const dropdownButton = document.getElementById("scheduleSelcet");
    const addScheduleButton = document.getElementById("addSchedule");
    const editScheduleButton = document.getElementById("editSchedule");
    const removeScheduleButton = document.getElementById("removeSchedule");
    const loadButton = document.getElementById("loadSchedule");

    const dropdownMenu = document.querySelector(".dropdown-menu");
    const messageLocation = document.getElementById("message");
    var selectedSchedule;

    let schedulesDict = {
        "None": {}
    };

    for (let keys in schedulesDict){
        var existingSchedule = document.createElement("a");
        existingSchedule.classList.add("dropdown-item");
        existingSchedule.textContent = keys;
        existingSchedule.id = keys;
        existingSchedule.onclick = function() {
            selectSchedule(existingSchedule.id);
        }
        existingSchedule.href = "#";
        dropdownMenu.appendChild(existingSchedule);

    }

    addScheduleButton.addEventListener("click", function() {
        var scheduleName = prompt("Enter the name for the new schedule:");
        if (scheduleName) {
            addSchedule(scheduleName);
        }
    });
    
    removeScheduleButton.addEventListener("click", deleteSelectedSchedule);
    
    dropdownButton.addEventListener("click", function() {
        var dropdownMenu = document.querySelector("#scheduleSelcet + .dropdown-menu");
        dropdownMenu.classList.toggle("show");
    });
    
    editScheduleButton.addEventListener("click", editSchedule);
    
    loadButton.addEventListener("click", loadSchedule);


    function editSchedule(){
        const newScheduleName = prompt('Enter the new name for the schedule:');
        if (newScheduleName != ""){
            var newFoodDays = prompt("Enter the new dayly schedule for the feeding:");
            var newFoodHours = prompt("Enter the new hourly schedule for feeding:")
            var newFoodAmount = prompt("Enter the new food amount for feeding:")
            
            var newData = {
                foodDays: newFoodDays,
                foodHours: newFoodHours,
                portions: newFoodAmount
            }
            
            deleteSelectedSchedule();
            addSchedule(newScheduleName);
            selectSchedule(newScheduleName);

            console.log(newData);
            schedulesDict[newScheduleName] = newData;
            console.log(schedulesDict)
        }
    }

    function addSchedule(text) {
        var newItem = document.createElement("a");
        newItem.classList.add("dropdown-item");
        newItem.textContent = text;
        newItem.id = text;
        newItem.onclick = function() {
            selectSchedule(newItem.id);
        }
        newItem.href = "#";
        dropdownMenu.appendChild(newItem);

        messageLocation.textContent = "Edited Schedule: " + text;

        schedulesDict[text] = colectFeedingData();


    }
    
    function selectSchedule(scheduleName) {
        selectedSchedule = scheduleName;
        messageLocation.textContent = "Selected Schedule: " + scheduleName;
    }

    function deleteSelectedSchedule() {
        schedule = document.getElementById(selectedSchedule);
        console.log(selectedSchedule)
        if (selectedSchedule) {
            schedule.remove();
            delete schedulesDict[selectedSchedule];
            selectedSchedule = null;
            document.getElementById("message").textContent = "Item Deleted";
          } else {
            document.getElementById("message").textContent = "No item selected to delete";
          }
    }

    function loadSchedule(){
        if (selectedSchedule){
            const scheduleData = schedulesDict[selectedSchedule];

            const message = {
                days: scheduleData.foodDays.join(", "),
                time: scheduleData.foodHours,
                portions: scheduleData.foodPartions
            };

            const messageString = JSON.stringify(message);
            const topic = "peacock-feeder_schedules"

            const mqttMessage = new Paho.MQTT.Message(messageString);
            mqttMessage.destinationName = topic;
            client.send(mqttMessage);

            messageLocation.textContent = "Loaded Schedule: " + scheduleName;
        }
    }
    



    function colectFeedingData(){
        var feedDays = document.getElementById('foodDays').value;
        var feedHours = document.getElementById('foodHours').value;
        var foodPartions = document.getElementById('foodPortions').value;

        var data = {
            foodDays: feedDays,
            foodHours: feedHours,
            portions: foodPartions
        };

        // document.getElementById('foodDays').reset;
        // document.getElementById("foodHours").reset;
        // document.getElementById("foodAmount").reset;

        console.log(data);
        return data;
    }
});