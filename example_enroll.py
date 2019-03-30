#!/usr/bin/env python
# -*- coding: utf-8 -*-

import time
from pyfingerprint.pyfingerprint import PyFingerprint
import json
import os
import Adafruit_GPIO.SPI as SPI
import Adafruit_SSD1306
from PIL import Image
from PIL import ImageDraw
from PIL import ImageFont
import subprocess
import datetime
import RPi.GPIO as GPIO
import mysql.connector

RST = 0
DC = 23
SPI_PORT = 0
SPI_DEVICE = 0


disp = Adafruit_SSD1306.SSD1306_128_64(rst=RST)
disp.begin()


disp.clear()
disp.display()


width = disp.width
height = disp.height
image = Image.new('1', (width, height))


draw = ImageDraw.Draw(image)
draw.rectangle((0,0,width,height), outline=0, fill=0)

padding = -2
top = padding
bottom = height-padding
x = 0


font = ImageFont.load_default()

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="",
    database="COMPANY"
)

mycursor = mydb.cursor()


def sql_enroll(emp_no,positionNumber):

    
    
    
    
    sql = "INSERT INTO EMPLOYEE (SERIAL_NO, EMP_NO) VALUES (%s, %s)"
    val = (str(positionNumber),str(emp_no))
    mycursor.execute(sql, val)

    mydb.commit()
    

    
## Enrolls new finger
##

## Tries to initialize the sensor
try:
    f = PyFingerprint('/dev/ttyUSB0', 57600, 0xFFFFFFFF, 0x00000000)

    if ( f.verifyPassword() == False ):
        raise ValueError('The given fingerprint sensor password is wrong!')

except Exception as e:
    print('The fingerprint sensor could not be initialized!')
    print('Exception message: ' + str(e))
    exit(1)

## Gets some sensor information
print('Currently used templates: ' + str(f.getTemplateCount()) +'/'+ str(f.getStorageCapacity()))

## Tries to enroll new finger
try:
    draw.text((x, top + 35),       'Waiting for finger...' ,  font=font, fill=255)
    print('Waiting for finger...')
    disp.image(image)
    disp.display()
    time.sleep(.1)


    ## Wait that finger is read
    while ( f.readImage() == False ):
        pass

    ## Converts read image to characteristics and stores it in charbuffer 1
    f.convertImage(0x01)

    ## Checks if finger is already enrolled
    result = f.searchTemplate()
    positionNumber = result[0]

    if ( positionNumber >= 0 ):
        disp.clear()
        disp.display()
        draw.rectangle((0,0,width,height), outline=0, fill=0)   
        draw.text((x, top + 40),'Finger already exists' ,  font=font, fill=255)
        disp.image(image)
        disp.display()
        time.sleep(.1)

        print('Template already exists at position #' + str(positionNumber))
        os.system("python ~/Desktop/fingerprint/main.py")
    disp.clear()
    disp.display()
    draw.rectangle((0,0,width,height), outline=0, fill=0)
    draw.text((x, top + 40),       'Remove finger' ,  font=font, fill=255)
    disp.image(image)
    disp.display()
    time.sleep(.1)
    print('Remove finger...')
    time.sleep(2)

    disp.clear()
    disp.display()
    draw.rectangle((0,0,width,height), outline=0, fill=0)
   
    draw.text((x, top + 35),       'Waiting for same' ,  font=font, fill=255)
    draw.text((x, top + 43),       'finger again' ,  font=font, fill=255)
    disp.image(image)
    disp.display()
    

    print('Waiting for same finger again...')
    time.sleep(.1)

    ## Wait that finger is read again
    while ( f.readImage() == False ):
        pass

    ## Converts read image to characteristics and stores it in charbuffer 2
    f.convertImage(0x02)

    ## Compares the charbuffers
    if ( f.compareCharacteristics() == 0 ):
        disp.clear()
        disp.display()
        draw.rectangle((0,0,width,height), outline=0, fill=0)   
        draw.text((x, top + 35),       'Fingers do not match' ,  font=font, fill=255)
        disp.image(image)
        disp.display()
        time.sleep(2)

        raise Exception('Fingers do not match')
        disp.clear()
        disp.display()
        draw.rectangle((0,0,width,height), outline=0, fill=0)   
        os.system("python ~/Desktop/fingerprint/main.py")

    ## Creates a template
    f.createTemplate()



    ## Saves template at new position number
    positionNumber = f.storeTemplate()

    disp.clear()
    disp.display()
    draw.rectangle((0,0,width,height), outline=0, fill=0)   
    draw.text((x, top + 24),       'Please enter employee' ,  font=font, fill=255)
    draw.text((x, top + 32),        'no:' ,  font=font, fill=255)
    disp.image(image)
    disp.display()
    
    
    emp_no = raw_input("What is your Employ no:? ")  #TAKING NAME FROM HERE


    
    
    disp.clear()
    disp.display()
    draw.rectangle((0,0,width,height), outline=0, fill=0)   
    draw.text((x, top + 16),        'Employee no. :' ,  font=font, fill=255)
    draw.text((x, top + 26),        str(emp_no) ,  font=font, fill=255)
    draw.text((x, top + 36),        'Is the No. ok ?' ,  font=font, fill=255)
    draw.text((x, top + 46),        'press y if : yes' ,  font=font, fill=255)
    draw.text((x, top + 56),        'press n if : no' ,  font=font, fill=255)
    disp.image(image)
    disp.display()
    while 1:
        ans = raw_input("compare name:")
        ans1 = 'y'
       
        if  ans1 == str(ans):
            disp.clear()
            disp.display()
            draw.rectangle((0,0,width,height), outline=0, fill=0)
            draw.text((x, top + 26),        'Employee Number:' ,  font=font, fill=255)
            disp.image(image)
            disp.display()


            sql_enroll(emp_no, positionNumber)

            draw.text((x, top + 32),        'Employee added suceessfully' ,  font=font, fill=255)
            GPIO.cleanup()  
            break
        else:
            disp.clear()
            disp.display()
            draw.rectangle((0,0,width,height), outline=0, fill=0)   
            draw.text((x, top + 24),       'Please enter employee' ,  font=font, fill=255)
            draw.text((x, top + 32),        'no:' ,  font=font, fill=255)
            disp.image(image)
            disp.display()
            emp_no = raw_input("What is your Employ NO:? ")
            disp.clear()
            disp.display()
            draw.rectangle((0,0,width,height), outline=0, fill=0)   
            draw.text((x, top + 16),        'Employee No:' ,  font=font, fill=255)
            draw.text((x, top + 26),        str(emp_no) ,  font=font, fill=255)
            draw.text((x, top + 36),        'Is the no. ok ?' ,  font=font, fill=255)
            draw.text((x, top + 46),        'press y if : yes' ,  font=font, fill=255)
            draw.text((x, top + 56),        'press n if : no' ,  font=font, fill=255)
            disp.image(image)
            disp.display()
            os.system("python ~/Desktop/fingerprint/main.py")



    




    # disp.clear()
    # disp.display()
    # draw.rectangle((0,0,width,height), outline=0, fill=0)   
    # draw.text((x, top + 35),       'Employee Added SucessFully!' ,  font=font, fill=255)
    # disp.image(image)
    # disp.display()

  



#     def append_record(record):
#         with open('my_file', 'a') as f:
#             json.dump(record, f)
#             f.write(os.linesep)

# # demonstrate a program writing multiple records
#     my_dict = {positionNumber:name}
#     append_record(my_dict)

    
    disp.clear()
    disp.display()
    draw.rectangle((0,0,width,height), outline=0, fill=0)   
    draw.text((x, top + 24),       'Employee Added Sucess ' ,  font=font, fill=255)
    disp.image(image)
    disp.display()
    time.sleep(2)
    os.system("python ~/Desktop/fingerprint/main.py")
    print('Finger enrolled successfully!')
    print('New template position #' + str(positionNumber))

except Exception as e:
    print('Operation failed!')
    print('Exception message: ' + str(e))
    exit(1)






# CREATE TABLE EMPLOYEE (NAME VARCHAR(255), EMP_NO VARCHAR(255), SERIAL_NO VARCHAR(255))
