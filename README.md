# smaug-admin
En admin grænseflade til [Smaug](https://github.com/DBCDK/smaug).
 
## Features
Man kan logge ind på en Smaug instanse via en url til et smaug admin api en bruger og et password. Det er muligt at oprette, slette og redigere service klienter. Der er også muligt at få udstedt et nyt token til en service klient. 

Når man opretter en ny klient, for man udleveret en secret og et id. Secret vil kun blive vist ved oprettelse.
 
Config elementet på en klient skal indeholde gyldig json. 

## Installation og deploy
1. `git clone https://github.com/DBCDK/smaug-admin` 
2. `npm install`
3. `npm run serve`

Hvis man ønsker at starte applikationen så den benytter en bestemt Smaug, skal nedenstående environment variabler sættes. 

##Environment variabler
Adressen på den aktuelle version at borchk servicen

- `PORT` : Port som applikationen benytter (Default 1234) 
- `SMAUG_URI` : URI til Smaug admin api
- `SMAUG_USER` : Bruger til Smaug admin api
- `SMAUG_PASSWORD` : Password til smaug admin api
   
## Tests
For at afvikle tests kør `npm run test`. Tests afvikles med mocha og bruger jsdom til at simulere et browser miljø
Alle tests der ligger i en /__test__ mappe under /src vil blive afviklet.

## Lint
Lint afvikles med `npm run lint`
 
   