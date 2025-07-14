const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const dotenv = require('dotenv');
const express = require('express'); // HTTP server
const app = express();

// Load environment variables
dotenv.config();

// Create a new Discord client
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

// Basic HTTP server route
app.get('/', (req, res) => {
  res.send('Bot is running!');
});

// Start the HTTP server (required by some hosting providers)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌍 HTTP server is listening on port ${PORT}`);
});

// When the bot is ready
client.once('ready', () => {
  console.log(`✅ ${client.user.tag} is now online and ready!`);
});

// When a new member joins
client.on('guildMemberAdd', (member) => {
  const channelId = '1393341385037447285'; // Replace with your actual channel ID
  const guild = member.guild;
  const channel = guild.channels.cache.get(channelId);

  if (!channel) {
    console.error(`❌ Channel with ID ${channelId} not found.`);
    return;
  }

  const welcomeEmbed = new EmbedBuilder()
    .setTitle("Welcome to The Regime!")
    .setDescription(`Hello ${member}, we're glad you're here!\n\nRead The Regime Rules and requirements.`)
    .setColor(0x00FF00) // Green color
    .setImage('https://www.solbot.store/Team_Regime.png ')
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setFooter({ text: guild.name, iconURL: guild.iconURL() })
    .setTimestamp();

  channel.send({ embeds: [welcomeEmbed] });
});

// Log in with the bot token from .env
client.login(process.env.TOKEN);
