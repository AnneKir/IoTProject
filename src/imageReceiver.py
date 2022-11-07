import paho.mqtt.client as mqtt
import base64

client = mqtt.Client()
client.connect('mqtt.eclipseprojects.io')
client.subscribe("topic")

def on_message(client, userdata, message):
    msg = str(message.payload.decode('utf-8'))
    
    img = msg.encode("ascii")
    
    final_msg = base64.b64decode(img)
    
    open('receive_img.jpg', 'wb').write(final_msg)
    
        
client.on_message = on_message
client.loop_forever()