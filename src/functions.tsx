import mqtt, { IClientOptions, MqttClient, IPublishPacket, OnMessageCallback } from 'mqtt';


function uploadImage(topic: string, files: FileList, client: MqttClient) {
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file != null) {
        const byteArray = getByteArray(file);
        byteArray.then(value => {
          // console.log("Success: " + value); // Success!
          client.publish("RainbowDash/" + topic, value.toString());
          console.log("publishing file to topic: " + topic);
          // console.log("byte array to string: " + value.toString());
          return value.toString;
        })
      }
    }
  }
  
function uploadImageTry2(topic: string, files: FileList, client: MqttClient) {
for (let i = 0; i < files.length; i++) {
    const img = files.item(i);
    if (img != null) {
    console.log("im in if, line 47")
    const imageToBase64 = require('image-to-base64');
    imageToBase64(img).then(
        (response: any) => {
        console.log(response); 
        client.publish("RainbowDash/" + topic, response);
        console.log("publishing file to topic: " + topic);
        }
    ).catch((error: any) => {
        console.log(error); 
        }
    )
    }
}
}
  
function uploadImageTry3(topic: string, files: FileList, client: MqttClient) {
for (let i = 0; i < files.length; i++) {
    const img = files.item(i);
    if (img != null) {
        const url = URL.createObjectURL(img);
        console.log("url: " + url);
        client.publish("RainbowDash/" + topic, url);
        console.log("publishing file to topic: " + topic);
        }   
    }
}

  async function getByteArray(file: File) {
    //Get file from your input element
  
    //Wait for the file to be converted to a byteArray
    const byteArray = await fileToByteArray(file);
  
    //Do something with the byteArray
    console.log(byteArray);
    return byteArray;
  }
  
  function fileToByteArray(file: any): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
      try {
        let reader = new FileReader();
        let fileByteArray: any = [];
        reader.readAsArrayBuffer(file);
        reader.onloadend = (evt) => {
          if (evt.target != null) {
            if (evt.target.result != null) {
              if (evt.target.readyState === FileReader.DONE) {
                let arrayBuffer = evt.target.result,
                  array = new Uint8Array(arrayBuffer as ArrayBuffer);
                for (let byte of array) {
                  fileByteArray.push(byte);
                }
              }
            }
          }
          console.log("Promise fileByteToArray: " + fileByteArray.toString())
          resolve(fileByteArray);
        }
      }
      catch (e) {
        reject(e);
      }
    })
  }
  
  
  
  function convertBackToImage(byteArrayImg: Uint8Array) {
    return "data:image/jpeg;base64," + byteArrayImg;
  }

  function showURLImage(byteArrayImg: string){
    return byteArrayImg;
  }