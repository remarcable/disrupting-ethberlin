# ETHBerlin Schedule

The ETHBerlin organizers say they value **decentralization** and **independence**. But why are only **few highly selected companies** allowed to give talks or host experiences? Where is the stage for hackers?!

This grassroots project aims to change that bottom-up.

## Table of Contents

- [Installation](#installation)

## Installation

The project has two parts, the backend and the frontend.

1. Clone this repository:

   ```bash
   git clone https://github.com/remarcable/ethberlin-schedule.git
   ```

2. Install dependencies

   ```bash
   cd ethberlin-schedule
    npm i
    cd ethberlin-schedule/frontend
    npm i
   ```

3. Copy the `.env.example` file to `.env` and update the values. You will need to add a Telegram bot token:

   ```bash
   cp .env.example .env
   cp frontend/.env.example .env
   ```

4. Run the backend:

   ```bash
   npm run dev
   ```

5. Run the frontend

   ```bash
   cd frontend
   npm run dev
   ```

Open up localhost:3001 to view the schedule.
