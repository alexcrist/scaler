# 📼 Scaler

> Scaler is a web application that allows you to play notes according to mathematical formulas like `y = sin(x)`. 

https://alexcrist.github.io/scaler/

## 🪀 Features

* Play notes according to mathematical formulas
* Create and loop multiple formulas
* Enable / disable particular beats
* Save and share creations
* Allows modification of:
  * Note durations
  * Tempo
  * Beats per measure
  * Pitch range
  * Scale

## 💻 Software developement

To run the project locally, you'll need Node (v14.17.4) and NPM (v7.20.6).

After cloning or downloading the code, install the project's dependencies with `npm install`.

From there, you can run the project by starting the developement server with `npm run start`.

The project can be automatically deployed to GitHub with `npm run deploy`.

## 🔭 Future improvements

* Test on more browsers
  * iOS Safari
  * Firefox (Android?)
* Allow formulas with implicit multiplication like `sin(2x)`
* Formula validation (error, bad formula)
* Handle infinity
* Add more scales
* Allow export to MIDI
* Refactor code to use a re-usable Button component
