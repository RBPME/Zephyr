#include <esp_now.h>
#include <WiFi.h>

//Define sensorPin and needed variabels
  #define sensor 18
  bool val;
  bool state = LOW;

//wifi name and password
  const char* ssid = "Pude";
  const char* password = "12345678";

// Macadress of other device
  uint8_t broadcastAddress[] = {0x0C, 0xB8, 0x15, 0xC3, 0x43, 0x18};

// Peer info
  esp_now_peer_info_t peerInfo;

// Formats MAC Address
void formatMacAddress(const uint8_t *macAddr, char *buffer, int maxLength) {
  snprintf(buffer, maxLength, "%02x:%02x:%02x:%02x:%02x:%02x", macAddr[0], macAddr[1], macAddr[2], macAddr[3], macAddr[4], macAddr[5]);
}

// Called when data is sent
void sentCallback(const uint8_t *macAddr, esp_now_send_status_t status) {
  char macStr[18];
  formatMacAddress(macAddr, macStr, 18);
  Serial.print("Last Packet Sent to: ");
  Serial.println(macStr);
  Serial.print("Last Packet Send Status: ");
  Serial.println(status == ESP_NOW_SEND_SUCCESS ? "Delivery Success \n" : "Delivery Fail \n");
}

void broadcast(const String &message){
  esp_err_t result = esp_now_send(broadcastAddress, (const uint8_t *)message.c_str(), message.length());
  // On success
  if (result == ESP_OK) {
    Serial.print("Broadcast message success: \t");
    Serial.println(message);
  // Error codes
  } else if (result == ESP_ERR_ESPNOW_NOT_INIT) {
    Serial.println("ESP-NOW not Init.");
  } else if (result == ESP_ERR_ESPNOW_ARG) {
    Serial.println("Invalid Argument");
  } else if (result == ESP_ERR_ESPNOW_INTERNAL) {
    Serial.println("Internal Error");
  } else if (result == ESP_ERR_ESPNOW_NO_MEM) {
    Serial.println("ESP_ERR_ESPNOW_NO_MEM");
  } else if (result == ESP_ERR_ESPNOW_NOT_FOUND) {
    Serial.println("Peer not found.");
  } else {
    Serial.println("Unknown error");
  }
  
}

void setup() {
  //Define Sensor as input
    pinMode(sensor,INPUT);
  
  // Open serial monitor
    Serial.begin(115200);
    Serial.println("Serial monitor initialised \n");

  //WIFI
  // connect to defined network
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("WiFi Connected to channel");
  Serial.println(WiFi.channel());

  Serial.println("wifi initialised \n");

  // Initialize ESP-NOW
  if (esp_now_init() == ESP_OK) {
    Serial.println("ESP-NOW Init Success \n");
    esp_now_register_send_cb(sentCallback);
  } else {
    Serial.println("ESP-NOW Init Failed");
    delay(3000);
    ESP.restart();
  }

  // Register peer
    memcpy(peerInfo.peer_addr, broadcastAddress, 6);
    peerInfo.channel = 0;  
    peerInfo.encrypt = false;
  
  // Add peer        
  if (esp_now_add_peer(&peerInfo) != ESP_OK){
    Serial.println("Failed to add peer");
    return;
  }
}

//send data when change
void loop() {
  val = digitalRead(sensor);
  if(val && !state){
    state = true;
    broadcast("on");
  } else if(!val && state){
    state = false;
    broadcast("off");
  }
  delay(500);

}
