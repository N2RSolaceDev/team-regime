import os
import discord
from discord.ext import commands
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
TOKEN = os.getenv("TOKEN")

# Set up intents
intents = discord.Intents.default()
intents.guilds = True  # Needed to detect member joins
intents.members = True

# Create bot instance
bot = commands.Bot(command_prefix="!", intents=intents)

@bot.event
async def on_ready():
    print(f'{bot.user.name} is online.')

@bot.event
async def on_member_join(member):
    channel = bot.get_channel(1393341385037447285)  # Replace with your target channel ID
    
    if channel is None:
        print("Channel not found.")
        return

    embed = discord.Embed(
        title="Welcome to the Server!",
        description=f"Hello {member.mention}, we're glad you're here!\n\nRead the rules and enjoy your stay.",
        color=discord.Color.green()
    )
    
    embed.set_image(url="https://www.solbot.store/Team_Regime.png ")
    embed.set_thumbnail(url=member.avatar.url)
    embed.set_footer(text="Server Name", icon_url=member.guild.icon.url if member.guild.icon else None)
    
    await channel.send(embed=embed)

# Run the bot
bot.run(TOKEN)
