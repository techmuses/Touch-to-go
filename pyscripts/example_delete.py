#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
PyFingerprint
Copyright (C) 2015 Bastian Raschke <bastian.raschke@posteo.de>
All rights reserved.

"""

from pyfingerprint.pyfingerprint import PyFingerprint
import mysql.connector


## Deletes a finger from sensor
##

emp_no=input('enter emp_no: ')

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="",
    database="COMPANY"
)

mycursor = mydb.cursor()

def sql_delete(emp_no) :

    sql1 = "SELECT SERIAL_NO FROM EMPLOYEE WHERE EMP_NO=" + str(emp_no)

    mycursor.execute(sql1)

    myresult=mycursor.fetchall()

    sr_no=myresult[0][0]

    print(sr_no)





    sql="DELETE FROM EMPLOYEE WHERE EMP_NO=" + str(emp_no)
    mycursor.execute(sql)


        #sql = "SELECT EMP_NO FROM EMPLOYEE WHERE SERIAL_NO=" + str(positionNumber)

        # val = (str(positionNumber))


        # mycursor.execute(sql)

    mydb.commit()
    return sr_no




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

## Tries to delete the template of the finger
try:
    positionNumber = sql_delete(emp_no)
    positionNumber = int(positionNumber)

    if ( f.deleteTemplate(positionNumber) == True ):
        print('Template deleted!')
        



# sql_delete(emp_no)



except Exception as e:
    print('Operation failed!')
    print('Exception message: ' + str(e))
    exit(1)
