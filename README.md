<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# the-voice### Install Dependencies

This project needs some dependencies. Let's go install it.

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```

## Create environment

Make your own environment file with a copy of `env.example` and adjust values to suit your own environment.

```bash
cp .env.example .env
```

## Description

This project is implemented based on the following description:

Here are the requirements - 
You are a part of 'The Voice' TV show production team. you are in charge of developing a management system to monitor the participants performance in the show.
The show has 3 types of users: an admin, mentors, and candidates.
Each candidate belongs to one of the mentors teams, while mentors on the other hand can mentor more than one team.
Each candidate gains scores for songs he/she performs. Each performance is scored by all the mentors on a scale of 0-100
The mentor can review the scores of the candidates in his teams 
The admin can review the scores of all the candidates in all the teams
Notes:
The project should be developed using Express.js or Laravel on the server side and Vue or jQuery on the Front-end.
We expect you to create the supporting models, Business logic and views. 
Tasks:
Each activity is composed of : a song name, date of performance, each mentors' score, an average score.
Create a management command to generate fake users of all types with all the needed relations, and activities

Tasks(UI):
A mentor should be able to login into the management system.
Upon authentication the mentor should get a page listing the candidates in each team he mentors
Clicking a candidate will display a list of all his activities, his average score, and his team's average score
When an admin logins, he will view all the teams and their average scores
The admin will be able to filter the view so only some teams will be displayed, and will be able to click each team to see its candidates activities.