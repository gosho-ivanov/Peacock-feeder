from . import motor_functionality as motor
import RPi.GPIO as GPIO
import paho.mqtt.client as mqtt
import json
import threading

client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)
success_msg = "successfully_fed"

pins = {
        "DIR" : 7,
        "STEP" : 1,
        "I1" : 16,
        "I2" : 12,
        "MS1" : 20,
        "MS2" : 21,
    }

def on_connect(client, userdata, flags, rc, properties=None):
    print("Connected with result code "+str(rc))
    client.subscribe('peacock_feed')

def on_message(client, userdata, message):
    payload = str(message.payload.decode("utf-8"))
    if payload:
        if payload == success_msg:
            print(payload)
        else:
            try:
                data = json.loads(payload)
                if 'food' in data and 'water' in data:
                    food = data['food']
                    water = data['water']
                    steps = motor.step_calculations()

                    motor.motor_step(pins["MS1"], pins["MS2"], pins["STEP"], steps)
                    
                    client.publish('peacock_feed', success_msg)
            except json.JSONDecodeError:
                print("Invalid JSON format in payload:", payload)


def main():
    GPIO.setmode(GPIO.BCM)

    client.on_connect = on_connect
    client.on_message = on_message
    client.connect("broker.hivemq.com", 1883, 60)
    client.loop_forever()


    for pin in pins.values():
        GPIO.setup(pin, GPIO.OUT)
    

if __name__ == "__main__":
    main()
