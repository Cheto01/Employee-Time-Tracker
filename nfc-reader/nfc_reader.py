import nfc
import requests
import time

API_ENDPOINT = "http://My-backend-api/api/time-log/log"

def on_connect(tag):
    print("Card detected:", tag)
    card_id = str(tag)
    
    # Send data to backend
    payload = {
        "nfcCardId": card_id,
        "type": "in"  # In case I want to toggle this between 'in' and 'out'
    }
    
    try:
        response = requests.post(API_ENDPOINT, json=payload)
        print("Server response:", response.json())
    except requests.exceptions.RequestException as e:
        print("Error sending data to server:", e)
    
    return True

print("NFC reader is ready. Please tap a card.")

while True:
    with nfc.ContactlessFrontend('usb') as clf:
        clf.connect(rdwr={'on-connect': on_connect})
    time.sleep(1)