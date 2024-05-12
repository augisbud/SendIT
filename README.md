## UAB Kreivarankiai | SendIT - realaus laiko susirašinėjimo programa

### Komandos nariai ir atsakomybės
- Leonardas Sinkevičius - `Team lead`, `Designer`, `Developer`
- Augustas Budnikas - `Architect`, `Tester`
- Edvinas Burba - `Developer`, `Tester`

### Naudojamos technologijos
**Front-end**
- React & Typescript & Vite
- SCSS

**Back-end**
- C++ 23
- SQLite
- [WebSocket](https://www.zaphoyd.com/projects/websocketpp/)
- Docker

### Paleidimas
Linux Aplinkoje Backend galima sukompiliuoti naudojantis:
```
mkdir build && cd build
cmake .. && make && ./executable
```


### Projekto strukūra

**Pagrindiniai komponentai**
- `User` (Naudotojas)
- `Message` (Žinutė)
 
**Duomenų tėkmė**

Programa duomenims saugoti turės 3 duobazės lenteles. 
1. Naudotojų lentelė
   - Lentelė bus pildoma tuomet, kai naujas naudotojas susikurs paskyrą per `registration` puslapį.
2. Žinučių lentelė
   - Kaskart kai žmogus parašys žinutę ji bus išsaugoma į duombazę. Jeigu gavėjas aktyvus, jis gaus pranešimą, jeigu ne, pamatys žinutę kitą kartą
     prisijungęs. Taip pat ši duomenų bazė bus naudojama tam, kad vartotojai galėtų matyti visą susirašinėjimo istoriją.
3. Draugų lentelė
   - Ši lentelė skirta saugoti vartotojų sąryšius tarpusavyje. (Ne draugai, iššiųstas kvietimas draugauti arba draugai) Tik draugai turės galimybę susirašinėti.

Visas įvedimas bus vykdomas per `input field` pagrindiniame aplikacijos puslapyje.
Išvestis bus formuojama iš duombazių duomenų ir paverčiama į puslapio elementus. (`div` su žinutės tekstu)


### Use-case diagrama
<img width="809" alt="Use-case diagram" src="https://github.com/augisbud/cpp-2024-2/assets/141874292/59f0871a-24a8-4af1-9f37-2d9adf6507c0">


### Activity diagrama
<img width="809" alt="Activity diagram" src="https://github.com/augisbud/cpp-2024-2/assets/141874292/81bb345e-6d0e-4e18-8f5e-d8b9c7ece194">
