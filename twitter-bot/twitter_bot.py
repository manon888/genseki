"""
SparkFun Twitter Bot - Milestone Posting for @Mia
Run with: python twitter_bot.py

Usage:
  curl -X POST http://localhost:5000/post \
    -H "Content-Type: application/json" \
    -d '{"text": "Your milestone message here"}'
"""

import os
import logging
from flask import Flask, request, jsonify
from dotenv import load_dotenv
import tweepy

# Load .env file
load_dotenv()

app = Flask(__name__)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def get_twitter_client():
    """Authenticate with Twitter/X API using environment variables."""
    client = tweepy.Client(
        consumer_key=os.getenv("TWITTER_API_KEY"),
        consumer_secret=os.getenv("TWITTER_API_SECRET"),
        access_token=os.getenv("TWITTER_ACCESS_TOKEN"),
        access_token_secret=os.getenv("TWITTER_ACCESS_TOKEN_SECRET"),
    )
    return client

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint."""
    return jsonify({"status": "ok", "account": "@Mia"})

@app.route('/post', methods=['POST'])
def post_tweet():
    """Post a tweet from @Mia account."""
    try:
        data = request.get_json()
        
        if not data or 'text' not in data:
            return jsonify({"error": "Missing 'text' field in request body"}), 400
        
        tweet_text = data['text']
        
        # Validate tweet length (Twitter limits)
        if len(tweet_text) > 280:
            return jsonify({"error": f"Tweet too long ({len(tweet_text)}/280 chars)"}), 400
        
        # Post the tweet
        client = get_twitter_client()
        response = client.create_tweet(text=tweet_text)
        
        tweet_id = response.data.get('id')
        logger.info(f"Tweet posted successfully! ID: {tweet_id}")
        
        return jsonify({
            "success": True,
            "tweet_id": tweet_id,
            "text": tweet_text,
            "url": f"https://twitter.com/Mia/status/{tweet_id}" if tweet_id else None
        })
        
    except tweepy.TweepyException as e:
        logger.error(f"Twitter API error: {e}")
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return jsonify({"error": "Internal server error"}), 500

@app.route('/profile', methods=['GET'])
def profile():
    """Get @Mia profile info."""
    try:
        client = get_twitter_client()
        user = client.get_user(username="Mia")
        
        if user.data:
            return jsonify({
                "name": user.data.name,
                "username": user.data.username,
                "id": user.data.id
            })
        else:
            return jsonify({"error": "User not found"}), 404
            
    except Exception as e:
        logger.error(f"Error fetching profile: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Start the webhook server
    port = int(os.getenv("PORT", 5000))
    debug = os.getenv("DEBUG", "false").lower() == "true"
    
    logger.info(f"Starting Twitter Bot webhook server on port {port}...")
    logger.info(f"Post tweets to: http://localhost:{port}/post")
    
    app.run(host='0.0.0.0', port=port, debug=debug)