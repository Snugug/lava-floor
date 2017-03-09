[{"id":"2dad6a9c.6bccc6","type":"websocket in","z":"2d8d48e6.cb60b8","name":"","server":"ec6f30f3.2d051","client":"","x":110,"y":200,"wires":[["9c737f8f.43de9"]]},{"id":"9c737f8f.43de9","type":"debug","z":"2d8d48e6.cb60b8","name":"","active":true,"console":"true","complete":"payload","x":382,"y":199,"wires":[]},{"id":"425e4063.7bc9b","type":"websocket in","z":"2d8d48e6.cb60b8","name":"","server":"ec6f30f3.2d051","client":"","x":110,"y":300,"wires":[["b00abfe0.e9e59"]]},{"id":"b00abfe0.e9e59","type":"watson-conversation-v1","z":"2d8d48e6.cb60b8","name":"Lava Conversation","workspaceid":"b36eb16f-b2c4-4acd-a6ba-e90aaa28a641","multiuser":false,"context":true,"x":150,"y":380,"wires":[["7cc66c2a.3edc14"]]},{"id":"7cc66c2a.3edc14","type":"function","z":"2d8d48e6.cb60b8","name":"Clean Conversation","func":"var data = msg.payload;\nvar entity;\nvar message = data.output.text[0];\n\nif (data.entities.length && data.entities) {\n    entity = data.entities[0].entity;\n}\n\nvar payload = {\n    entity: entity,\n    message: message,\n};\n\nreturn {\n    payload: payload,\n};","outputs":1,"noerr":0,"x":150,"y":480,"wires":[["3cc6112e.a9ccbe","8d57ead6.fb1018"]]},{"id":"3cc6112e.a9ccbe","type":"websocket out","z":"2d8d48e6.cb60b8","name":"","server":"ec6f30f3.2d051","client":"","x":140,"y":540,"wires":[]},{"id":"baae7a04.076208","type":"comment","z":"2d8d48e6.cb60b8","name":"Clean Conversation","info":"Cleans up the conversation output to only include the first entity and the first dialog response","x":150,"y":440,"wires":[]},{"id":"8ed687e.2663f78","type":"node-hue-in","z":"2d8d48e6.cb60b8","server":"fa7c83e6.1607f","lightID":"light1","name":"Light 1","x":810,"y":180,"wires":[]},{"id":"8d57ead6.fb1018","type":"function","z":"2d8d48e6.cb60b8","name":"Color Change","func":"var weather = msg.payload.entity;\nvar payload = [];\n\n// Color Palettes\nvar lava = [\n    '#d75964',\n    '#de825c',\n    '#dea35c',\n    '#debd5c',\n    '#ded75c',\n    '#e1828b',\n];\n\nvar water = [\n    '#8e51c4',\n    '#5351c4',\n    '#518bc4',\n    '#51c4b7',\n    '#69c853',\n    '#77a5d1',\n];\n\n// Switch on the weather\nswitch(weather) {\n    case 'lava':\n        push(lava);\n        break;\n    case 'water':\n        push(water);\n        break;\n    \n    case 'on':\n        for (var i = 0; i < 7; i++) {\n            payload.push({\n                payload: {\n                    on: true,\n                }\n            });\n        }\n        break;\n    case 'off':\n        for (var i = 0; i < 7; i++) {\n            payload.push({\n                payload: {\n                    on: false,\n                }\n            });\n        }\n        break;\n}\n\nfunction push(colors) {\n    var items = colors.slice(0);\n    // Generates random colors, brightnesses, and durations for each change\n    for (var i = 0; i < 7; i++) {\n        var colorIndex = Math.floor(Math.random() * items.length);\n        var color = items[colorIndex];\n        var bri = Math.floor(Math.random() * 51) + 50;\n        var dur = Math.floor(Math.random() * 1001) + 1000;\n\n        // Remove item from array to ensure a unique color for each light\n        items.splice(colorIndex, 1);\n        \n        // Push to payload array\n        payload.push({\n            payload: {\n                on: true,\n                hex: color,\n                bri: bri,\n                duration: dur,\n            }\n        });\n    }\n}\n\nnode.log(JSON.stringify(payload));\n\nreturn payload;","outputs":"6","noerr":0,"x":480,"y":340,"wires":[["8ed687e.2663f78"],["346cda28.b95556"],["e64482d.8daad8"],["2570ee3d.795de2"],["8a1fbf7e.7fa63"],["4f41dad1.4fbe64"]]},{"id":"4fa4924c.43d17c","type":"comment","z":"2d8d48e6.cb60b8","name":"Color Change","info":"Takes the entity from conversation, builds an array of colors to change the lights, and then sets the lights!","x":470,"y":260,"wires":[]},{"id":"346cda28.b95556","type":"node-hue-in","z":"2d8d48e6.cb60b8","server":"fa7c83e6.1607f","lightID":"light2","name":"Light 2","x":810,"y":240,"wires":[]},{"id":"e64482d.8daad8","type":"node-hue-in","z":"2d8d48e6.cb60b8","server":"fa7c83e6.1607f","lightID":"light3","name":"Light 3","x":810,"y":300,"wires":[]},{"id":"2570ee3d.795de2","type":"node-hue-in","z":"2d8d48e6.cb60b8","server":"fa7c83e6.1607f","lightID":"light6","name":"Light 4","x":810,"y":380,"wires":[]},{"id":"8a1fbf7e.7fa63","type":"node-hue-in","z":"2d8d48e6.cb60b8","server":"fa7c83e6.1607f","lightID":"light8","name":"Light 5","x":810,"y":440,"wires":[]},{"id":"4f41dad1.4fbe64","type":"node-hue-in","z":"2d8d48e6.cb60b8","server":"fa7c83e6.1607f","lightID":"light9","name":"Light 6","x":810,"y":500,"wires":[]},{"id":"ec6f30f3.2d051","type":"websocket-listener","z":"2d8d48e6.cb60b8","path":"/ws/genie","wholemsg":"false"},{"id":"fa7c83e6.1607f","type":"node-hue-bridge","z":"","name":"Hue Bridge","address":"10.20.5.61","key":"UyCDABdXokWg-wxG4L-kE6sHFAZcXahkvW7LpLgE","interval":"10000"}]