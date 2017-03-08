[{"id":"188f7804.87b978","type":"tab","label":"Flow 1"},{"id":"d587b4d.cd69848","type":"websocket-listener","z":"188f7804.87b978","path":"/ws/genie","wholemsg":"false"},{"id":"a8be10b4.52a22","type":"websocket in","z":"188f7804.87b978","name":"","server":"d587b4d.cd69848","client":"","x":110,"y":300,"wires":[["7b1bacd7.168224"]]},{"id":"7b1bacd7.168224","type":"debug","z":"188f7804.87b978","name":"","active":true,"console":"true","complete":"payload","x":382,"y":299,"wires":[]},{"id":"9e48b102.e6848","type":"websocket in","z":"188f7804.87b978","name":"","server":"d587b4d.cd69848","client":"","x":110,"y":400,"wires":[["1fa51955.dc04b7"]]},{"id":"1fa51955.dc04b7","type":"watson-conversation-v1","z":"188f7804.87b978","name":"Lava Conversation","workspaceid":"b36eb16f-b2c4-4acd-a6ba-e90aaa28a641","multiuser":false,"context":true,"x":150,"y":480,"wires":[["4bcbd5a6.40c69c"]]},{"id":"4bcbd5a6.40c69c","type":"function","z":"188f7804.87b978","name":"Clean Conversation","func":"var data = msg.payload;\nvar entity;\nvar message = data.output.text[0];\n\nif (data.entities.length && data.entities) {\n    entity = data.entities[0].entity;\n}\n\nvar payload = {\n    entity: entity,\n    message: message,\n};\n\nreturn {\n    payload: payload,\n};","outputs":1,"noerr":0,"x":150,"y":580,"wires":[["c7612a5a.411108"]]},{"id":"c7612a5a.411108","type":"websocket out","z":"188f7804.87b978","name":"","server":"d587b4d.cd69848","client":"","x":140,"y":640,"wires":[]},{"id":"3fa7b5a0.1b167a","type":"comment","z":"188f7804.87b978","name":"Clean Conversation","info":"Cleans up the conversation output to only include the first entity and the first dialog response","x":150,"y":540,"wires":[]}]