(function () {
  'use strict';

  let ws;
  let convo;
  const wsURI = new URL(window.location);

  wsURI.protocol = 'ws:';
  wsURI.pathname = '/ws/genie';

  const bubble = document.createElement('p');
  bubble.classList.add('bubble');

  function wsConnect(elem) {
    console.log(`connect ${wsURI.toString()}`);
    ws = new WebSocket(wsURI.toString());

    ws.addEventListener('message', msg => {
      const data = JSON.parse(msg.data);
      const result = bubble.cloneNode();
      result.innerText = data.message;
      result.setAttribute('from', 'watson');

      convo.appendChild(result);
    });

    ws.addEventListener('open', () => {
      console.log('connected');
      // document.getElementById('status').innerText = 'connected';
    });

    ws.addEventListener('close', () => {
      console.log('closed, will try and reconnect in 3s');
      // document.getElementById('status').innerText = 'not connected';

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

    convo = document.getElementById('conversation');

    button.addEventListener('click', e => {
      e.preventDefault();
      const value = command.value;

      if (value) {
        const input = bubble.cloneNode();
        input.innerText = value;
        input.setAttribute('from', 'user');

        convo.appendChild(input);

        wsSend(command.value);
        command.value = '';
      }
      command.focus();
    });
  });
}());