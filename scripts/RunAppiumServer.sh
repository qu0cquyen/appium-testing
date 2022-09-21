#!/bin/bash
set -ex
npm install -g appium@next
appium driver install uiautomator2
appium -v
appium server &>/dev/null &


