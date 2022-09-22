#!/bin/bash
set -ex

if [ $# -eq 2 ] 
    then
        
    if curl  -J -L "$1" --output "$HOME/Desktop/clover_engine"; then
        # Download second resouce
        if curl -J -L "$2" --output "$HOME/Desktop/clover_launcher"; then
            echo "Download Finished"
            # Move to $HOME/Destop
            # Install Clover Engine and Clover Launcher
            adb -s emulator-5554 install -g "$HOME/Desktop/clover_engine.apk"
            sleep 2
            adb -s emulator-5554 install -g "$HOME/Desktop/clover_launcher.apk"
            
            echo "Install downloaded apk success"
        else
            echo "Failed to download Clover Launcher"
            exit 1
        fi; 
    else
        echo "Failed to download Clover Engine"
        exit 1 
    fi;
    echo "Download Complete"    
else
    echo "Missing arguments. This script requires 2 arguments in order to process"
    exit 1
fi

