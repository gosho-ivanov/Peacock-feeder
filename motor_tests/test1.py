from . import motor_functionality as motor
import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)

pins = {
    "DIR" : 20,
    "STEP" : 21,
    "I1" : 12,
    "I2" : 13,
    "MS1" : 17,
    "MS2" : 18,
}
for pin in pins.values():
    GPIO.setup(pin, GPIO.OUT)

steps = motor.step_calculations(int(input()))

motor.motor_step(pins["MS1"], pins["MS2"], pins["STEP"], steps)