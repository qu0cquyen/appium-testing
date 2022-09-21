#!/bin/bash
set -ex
npm install -g appium@next
appium driver install xcuitest
appium driver install uiautomator2
appium -v
appium &>/dev/null &


