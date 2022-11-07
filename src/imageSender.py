import paho.mqtt.client as mqtt
import base64

client = mqtt.Client()
client.connect('mqtt.eclipseprojects.io')
client.subscribe("topic")

with open("yee.jpg", "rb") as image:
    img = image.read()
    
message = img

base64_bytes = base64.b64encode(message)

base64_message = base64_bytes.decode('ascii')

client.publish('topic', base64_message)