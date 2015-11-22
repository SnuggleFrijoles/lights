const int lightPin = 13;

void setup() {
	Serial.begin(9600);
	pinMode(lightPin, OUTPUT);
}

void loop() {
	if (Serial.available()) {
		int read = Serial.read();
                Serial.println(read, DEC);
                if (read == '1')
  			digitalWrite(lightPin, HIGH);
  		else
  			digitalWrite(lightPin, LOW);
	}
}
