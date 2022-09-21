#!/bin/bash
set -ex
npm install -g appium@next
appium driver install flutter
appium -v
appium &>/dev/null &


