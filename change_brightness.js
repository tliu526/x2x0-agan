#!/usr/bin/env node
// Changes brightness by read/writing to .x330_backlight
var HID = require('node-hid');
fs = require('fs');

MAX_VAL = 15
MIN_VAL = 0

var devices = HID.devices();
device = new HID.HID(4292,33742);

fs.readFile('/home/tliu/.x330_backlight', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    change_val = parseInt(process.argv[2]);
    data = data.replace("\n", ''); // clear the newline
    brightness = parseInt(data) + change_val;

    brightness = Math.max(MIN_VAL, Math.min(brightness, MAX_VAL));
    console.log(brightness);
    device.write([6, brightness*16]); // send to the usb device

    // write to file
    fs.writeFile('/home/tliu/.x330_backlight', brightness + "\n", function (err) {
    if(err) {
      return console.log(err);
    }
    });
  });

