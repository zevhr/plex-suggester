## PlexSuggester Bot
This is a simple Discord.js bot that requests your Plex Media Server to provide suggestions based on your library.  
## Reqs
Node.js, NPM and a Discord Bot Application. That's it. All that's needed.
## How to begin
Firstly, clone the repository via GIT or the download source on this repo page.  
Then, rename .env.sample to .env and open it. Modify the fields as they apply to you.  

- serverip - The IP of your Plex server (needs to be on the same network as this bot)
- x_plex_token - The token of your Plex server. See [here]() to learn how to get this.
- startupMessage - True or false to send you a DM every time the bot starts
- token - The bot token of your application
- clientid - The Client ID of your bot application
- guildid - Your servers Guild ID
  
 To obtain your Client ID, click the **OAuth** tab of the Discord Developers Dashboard and copy it from there.  
 To obtain your Guild ID, enable **Developer Tools** in **User Settings > Advanced** of your Discord client.  
## Starting the bot
Once you've provided everything required, open a terminal/command prompt and cd to the folder you cloned/downloaded from GitHub. Type **npm start** and let the app do its thing. Once ready, you're all set!

## Using RedBot?
No need to run this as a separate instance! Use the Python cog!
  
```
repo add awex-cogs https://github.com/awexthedev/cogs
cog install awex-cogs Plex
```