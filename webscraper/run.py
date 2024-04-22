import json
import requests
from bs4 import BeautifulSoup

# Function to scrape champion data from a given URL
def scrape_champions_data(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    champion_rows = soup.find_all('tr')
    champions_data = []
    for row in champion_rows[1:]:
        cells = row.find_all('td')
        if len(cells) == 8:
            rank = cells[0].text.strip()
            champion_name = cells[1].text.strip()
            tier = cells[2].text.strip()
            role_img = cells[3].find('img')
            role = ''
            if role_img:
                role = role_img.get('alt')
            win_rate = cells[4].text.strip()
            pick_rate = cells[5].text.strip()
            ban_rate = cells[6].text.strip()
            counters_cell = cells[7]
            counters_divs = counters_cell.find_all('a')
            counters_alt_values = []
            for div in counters_divs:
                a = div.find('div')
                if a:
                    img = div.find('img')
                    if img:
                        alt = img.get('alt')
                        if alt:
                            counters_alt_values.append(alt)
            counters = ', '.join(counters_alt_values)
            champion_data = {
                "championName": champion_name,
                "tier": tier,
                "role": role,
                "winRate": win_rate,
                "pickRate": pick_rate,
                "banRate": ban_rate,
                "counters": counters
            }
            champions_data.append(champion_data)
    return champions_data

# URLs for different regions and template URL for ranks
regions = {
    "Global": "global",
    "Euw": "euw",
    "Na": "na",
    "Eune": "eune",
    "Oce": "oce",
    "Kr": "kr",
    "Jp": "jp"
    # Add more regions as needed
}

ranks = {
    "All": "all",
    "Challenger": "challenger",
    "Grandmaster": "grandmaster",
    "Master": "master",
    "Diamond_plus": "diamond_plus",
    "Diamond": "diamond",
    "Emerald_plus": "emerald_plus",
    "Emerald": "emerald",
    "Platinum_plus": "platinum_plus",
    "Platinum": "platinum",
    "Gold_plus": "gold_plus",
    "Gold": "gold",
    "Silver": "silver",
    "Bronze": "bronze",
    "Iron": "iron"

}

template_url = 'https://www.op.gg/champions?tier={}&region={}'

# Initialize a dictionary to store champion data grouped by regions and ranks
all_champions_data = {}

# Generate URLs for each region and rank combination
for region, region_code in regions.items():
    region_data = {}
    for rank, rankCode in ranks.items():
        url = template_url.format(rankCode, region_code)
        print(url)
        champions_data = scrape_champions_data(url)
        region_data[rank.lower()] = champions_data
    all_champions_data[region.lower()] = region_data

# Define the output file path
output_file = 'all_champions_data.json'

# Write all champion data to the JSON file
with open(output_file, 'w') as json_file:
    json.dump(all_champions_data, json_file, indent=4)

print("Champion data exported to:", output_file)
