#!/bin/bash
# Start the Twitter Bot webhook server

# Load .env file if it exists
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Run the bot
python twitter_bot.py