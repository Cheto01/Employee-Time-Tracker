import nfc
import requests
import time
import logging
from datetime import datetime

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

API_ENDPOINT = "http://localhost:5000/api/time-logs"

def on_connect(tag):
    logging.info(f"Card detected: {tag}")
    card_id = str(tag)
    
    # Get current time
    current_time = datetime.now().time()
    
    # Determine if it's clock in or clock out based on time of day
    # Assume clock in before 12 PM, clock out after
    log_type = "in" if current_time.hour < 12 else "out"
    
    payload = {
        "nfcCardId": card_id,
        "type": log_type
    }
    
    try:
        response = requests.post(API_ENDPOINT, json=payload)
        if response.status_code == 201:
            logging.info(f"Time logged successfully. Type: {log_type}")
        else:
            logging.error(f"Error logging time: {response.text}")
    except requests.exceptions.RequestException as e:
        logging.error(f"Error sending data to server: {e}")
    
    return True

def main():
    logging.info("NFC reader is ready. Please tap a card.")
    
    while True:
        with nfc.ContactlessFrontend('usb') as clf:
            clf.connect(rdwr={'on-connect': on_connect})
        time.sleep(1)

if __name__ == "__main__":
    main()