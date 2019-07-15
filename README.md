# AutoCW
A Discord bot for automatically moderating content warning lists

## Running with Docker
Running AutoCW is quite simple wth Docker. Make sure you have Docker and docker-compose installed, then:
1. Create a `config.json` file in the same directory as `docker-compose.yml` using `template-config.json` as a template
2. Build the bot: `docker-compose build`
3. Run the bot: `docker-compose up -d`

## Running the bot manually
If you'd like to run it manually, make sure you have Node.js installed, then:
1. Create a `config.json` file in the same directory as `docker-compose.yml` using `template-config.json` as a template
2. Run `npm install` from the root project directory
3. Run `npm start` from the root project directory