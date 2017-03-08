(function () {
  'use strict';

  let ws;
  const wsURI = new URL(window.location);

  wsURI.protocol = 'ws:';
  wsURI.pathname = '/ws/genie';

  function wsConnect(elem) {
    console.log(`connect ${wsURI.toString()}`);
    ws = new WebSocket(wsURI.toString());

    ws.addEventListener('message', msg => {
      const data = JSON.parse(msg.data);
      elem.innerText = data.message;
    });

    ws.addEventListener('open', () => {
      document.getElementById('status').innerText = 'connected';
    });

    ws.addEventListener('close', () => {
      document.getElementById('status').innerText = 'not connected';

      setTimeout(wsConnect, 3000);
    });
  }

  function wsSend(message) {
    if (ws) {
      ws.send(message);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    wsConnect(document.getElementById('messages'));

    const button = document.getElementById('genie');
    const command = document.getElementById('command');

    button.addEventListener('click', e => {
      e.preventDefault();
      wsSend(command.value);
      command.value = '';
      command.focus();
    });
  });
}());