import zmq from 'zeromq';
import { ipcMain } from 'electron';
import * as types from '../constants/zmq_action_types';
const fs = require('fs');
const Json2csvParser = require('json2csv').Parser;
const EventMessage = require('../messages/event');
const chalk = require("chalk");
const prefix = chalk.bold.blue;
const bgTaskColor = chalk.magenta;
const data = {};
import throttle from "lodash.throttle";
function writeLog(...params) {
  console.info(prefix('workbench') + ' ' + chalk.bold(bgTaskColor('[zmq]')), bgTaskColor(...params));
}

function onMessage(sender, event_message, service, cb) {
  // console.warn(arguments);
  const msg = new EventMessage(event_message);
  
  let jsonData = JSON.parse(JSON.stringify(msg))[service.key];
  // // const state = this.state;
  // let parsedJson;

  writeLog(`${service.id} msg received.`);
  let newData = {};
  if (service.id === "logMessage") {
    jsonData = JSON.parse(jsonData);
  }
  newData = {
    fields: Object.keys(jsonData),
    latestMessage: jsonData
  };
  if (!data[service.id]) {
    data[service.id] = {};
  }
  data[service.id] = {
    ...data[service.id],
    ...newData
  };

  let msgResp = {};
  msgResp[service.id] = data[service.id]
  sender.send(types.MESSAGE, msgResp);
}

export function startZmq() {
  return new Promise((resolve, reject) => {
    const sock = zmq.socket('sub');
    sock.subscribe('');
    
    let msgHandler;
    ipcMain.on(types.CONNECT, (evt, ip, service) => {
      const { sender } = evt;
      const addr = `tcp://${ip}:${service.port}`;
      msgHandler = throttle((msg) => { return onMessage(sender, msg, service); }, 200, { leading: true });
      sock.on('message', msgHandler);
      writeLog(`Connecting to ${addr}`, service.key);
      sock.connect(addr);
    });

    ipcMain.on(types.DISCONNECT, (evt, ip, service) => {
      const { sender } = evt;
      const addr = `tcp://${ip}:${service.port}`;
      sock.removeListener('message', msgHandler);
      writeLog(`Disconnect from ${addr}`, service.key);
      sock.disconnect(addr);
    });

    writeLog("Started ØMQ Service");
    resolve();
  });
}