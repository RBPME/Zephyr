#include <esp_now.h>
#include <WiFi.h>
#include <HTTPClient.h>

//Define DACpin and vibpins
  #define DAC 25
  #define vib1 18
  #define vib2 19
  #define vib3 21
  #define vib4 22
  #define vib5 23


//wifi name and password
  const char* ssid = "Sde-Guest";
  const char* password = "";

// Web adress of api
  const char* serverName = "http://10.142.108.105:4173/api";
// wariabel for apiKey
  String apiKey;

//delay variabels
  unsigned long lastTime = 0;
  unsigned long timerDelay = 50000; //timer set to on min

//Is a timer now var
  String alarmActive = "";
//format incomming message
  String FormatMes(String str) {
    return str.substring(12,str.length()-2);
  }

// Formats MAC Address
void formatMacAddress(const uint8_t *macAddr, char *buffer, int maxLength){
  snprintf(buffer, maxLength, "%02x:%02x:%02x:%02x:%02x:%02x", macAddr[0], macAddr[1], macAddr[2], macAddr[3], macAddr[4], macAddr[5]);
}

// Callback function executed when data is received
void OnDataRecv(const uint8_t * mac, const uint8_t *incomingData, int len) {
  // Only allow a maximum of 250 characters in the message + a null terminating byte
    char buffer[ESP_NOW_MAX_DATA_LEN + 1];
    int msgLen = min(ESP_NOW_MAX_DATA_LEN, len);
    strncpy(buffer, (const char *)incomingData, msgLen);

  // Make sure we are null terminated
    buffer[msgLen] = 0;

  // Format the MAC address
    char macStr[18];
    formatMacAddress(mac, macStr, 18);

  // Send Debug log message to the serial port
    Serial.printf("Received message from: %s - %s \n", macStr, buffer);
    Serial.println(strcmp("on",buffer));
    if(strcmp("on",buffer) == 0) {
      all(LOW);
    }
}

//vibration patterns
  void sweep(){
    digitalWrite(vib1,HIGH);
    digitalWrite(vib5,LOW);
    delay(500);
    digitalWrite(vib2,HIGH);
    digitalWrite(vib1,LOW);
    delay(500);
    digitalWrite(vib3,HIGH);
    digitalWrite(vib2,LOW);
    delay(500);
    digitalWrite(vib4,HIGH);
    digitalWrite(vib3,LOW);
    delay(500);
    digitalWrite(vib5,HIGH);
    digitalWrite(vib4,LOW);
    delay(500);
  }
  void all(bool e){
    digitalWrite(vib1,e);
    digitalWrite(vib2,e);
    digitalWrite(vib3,e);
    digitalWrite(vib4,e);
    digitalWrite(vib5,e);
  }

void setup() {
  //Vibration pins
    pinMode(vib1,OUTPUT);
    pinMode(vib2,OUTPUT);
    pinMode(vib3,OUTPUT);
    pinMode(vib4,OUTPUT);
    pinMode(vib5,OUTPUT);
  
  
  // Open serial monitor
    Serial.begin(115200);
    Serial.println("Serial monitor intialised");
  
  
  //Make wifi for sensor to connect
    WiFi.mode(WIFI_AP_STA);
    WiFi.softAP("Pude", "12345678",1,1);
    
  // connect to defined network    
    WiFi.begin(ssid, password);
    Serial.print("Connecting ");
    while(WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.print(".");
    }
    Serial.println("");
    Serial.println("Connection successfull \n");
    Serial.print("Wi-Fi Channel: ");
    Serial.println(WiFi.channel());


    Serial.println(WiFi.macAddress());
  //Get apiKey from webserver
  if(WiFi.status()== WL_CONNECTED){
    Serial.println("Ready to get api key");
    while(apiKey == ""){   
      WiFiClient client;
      HTTPClient http;
      http.begin(client, serverName);
    
      http.addHeader("register","true");
      int response1 = http.GET();
      String message = http.getString();
      apiKey = FormatMes(message);
      Serial.println(response1);
      http.end();
    }
    
    Serial.println(apiKey);

 }

  /* Set device as a Wi-Fi Station
    WiFi.mode(WIFI_STA);
    Serial.println("wifi enabeld");*/

  //Begin ESP-NOW and connect to other device
  if(esp_now_init()== ESP_OK){
    Serial.println("ESP-NOW ready to recieve");
    esp_now_register_recv_cb(OnDataRecv);
  }
  
  /*
  // Register peer
  memcpy(peerInfo.peer_addr, broadcastAddress, 6);
  peerInfo.channel = 0;  
  peerInfo.encrypt = false;
  
  // Add peer        
  if (esp_now_add_peer(&peerInfo) != ESP_OK){
    Serial.println("Failed to add peer");
    return;
  }*/
}

void loop() {
  if((millis()-lastTime) > timerDelay){ //Wait 1 min
    //Start HTTP coms
      HTTPClient http; 
      WiFiClient client;
      http.begin(client, serverName);
    //send to api
      http.addHeader("api-key",apiKey);
      int responseCode = http.GET();
      alarmActive = FormatMes(http.getString());
      Serial.print(responseCode);
      Serial.print("\t message: ");
      Serial.println(alarmActive);
      
    if(alarmActive == "nu"){
      Serial.println("VÅGN OP!!!");
      all(HIGH);
    } else {
      Serial.println("No alarm");
    }
    lastTime = millis();
    http.end();
  }
}
