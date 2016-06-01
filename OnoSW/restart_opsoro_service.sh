#!/bin/sh

FOLDER=/home/pi/OnoSW/
SERVICE=opsoro
STARTFILE=__init__.py

# Stop service
sudo service $SERVICE stop

# Make sure we can run the python script
sudo chmod 755 $FOLDER$STARTFILE
sudo chmod +x $FOLDER$STARTFILE

# Start service
sudo service $SERVICE start
sleep .5
# Check service status
sudo service $SERVICE status