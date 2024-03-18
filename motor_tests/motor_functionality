import math
import RPi.GPIO as GPIO
import time

def motor_step (ms1_pin, ms2_pin, step_pin, steps):

    max_steps = 200
    delay = 1/max_steps
    if steps == int(steps):
        for _ in range(int(steps)):
            GPIO.output(step_pin, GPIO.HIGH)
            time.sleep(delay)
            GPIO.output(step_pin, GPIO.LOW)
            time.sleep(delay)
    else:
        fractional_part = (steps - int(steps)) * 1000
        
        half_steps = fractional_part // 500
        fractional_part -= 500*half_steps

        if fractional_part >= 500/2:
            half_steps += 1
            fractional_part = 0
        
        quarter_steps = fractional_part // 250
        fractional_part -= 250*quarter_steps

        if fractional_part >= 250/2:
            quarter_steps += 1
            fractional_part = 0

        eighth_steps = fractional_part // 125
        fractional_part -= 125 *  eighth_steps

        if fractional_part >= 125/2:
            eighth_steps += 1
            fractional_part = 0

        for _ in range(math.floor(steps)):
            GPIO.output(step_pin, GPIO.HIGH)
            time.sleep(delay)
            GPIO.output(step_pin, GPIO.LOW)
            time.sleep(delay)
        
        GPIO.output(ms1_pin, GPIO.HIGH)
        for _ in range(half_steps):
            GPIO.output(step_pin, GPIO.HIGH)
            time.sleep(delay)
            GPIO.output(step_pin, GPIO.LOW)
            time.sleep(delay)

        GPIO.output(ms1_pin, GPIO.LOW)
        GPIO.output(ms2_pin, GPIO.HIGH)
        for _ in range(quarter_steps):
            GPIO.output(step_pin, GPIO.HIGH)
            time.sleep(delay)
            GPIO.output(step_pin, GPIO.LOW)
            time.sleep(delay)

        GPIO.output(ms1_pin, GPIO.HIGH)
        for _ in range(eighth_steps):
            GPIO.output(step_pin, GPIO.HIGH)
            time.sleep(delay)
            GPIO.output(step_pin, GPIO.LOW)
            time.sleep(delay)

def step_calculation(portions):

    steps = 0
    total_portions_revolution = 6
    
    #Portions per full rotation
    full_rotations = portions // total_portions_revolution
    portions -= portions * full_rotations
    steps += 200 * full_rotations
    
    #Remaining portions
    steps += (200 / 6) * portions

    return steps