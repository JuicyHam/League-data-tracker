import httpx
import requests
import json
from collections import defaultdict


async def fetch_item_data():
    items_above_minimum_gold = []  # Define items_above_minimum_gold as a global variable
    minimum_gold_value = 2200

    # Define the Data Dragon base URL and version
    DATA_DRAGON_BASE_URL = "https://ddragon.leagueoflegends.com"
    VERSION = "14.8.1"  # Use the current version of League of Legends

    # Construct the URL for item data
    item_url = f"{DATA_DRAGON_BASE_URL}/cdn/{VERSION}/data/en_US/item.json"

    # Make a request to the Data Dragon API to get item data
    response = requests.get(item_url)

    # Check if the request was successful
    if response.status_code == 200:
        # Parse the JSON response
        item_data = response.json()
        items_above_minimum_gold = []

        # Extract information about item types and other attributes as needed
        for item_id, item_info in item_data['data'].items():
            if 'gold' in item_info and 'total' in item_info['gold'] :
                # If the condition is met, add the item to the list
                if item_info['gold']['total'] >= minimum_gold_value:
                    items_above_minimum_gold.append(item_id)
                

        return items_above_minimum_gold, item_data['data']
    else:
        return None
        print("Failed to fetch item data from Data Dragon API")



# Initialize a new HTTP client with your Supabase URL and API key
supabase_url = 'https://rcmjgcvtxwitojqgczej.supabase.co'
supabase_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjbWpnY3Z0eHdpdG9qcWdjemVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM5NDE3MDcsImV4cCI6MjAyOTUxNzcwN30.04CcmcDTi6-Q6vjht2t-kmMLtEa9PLdbHrKUZ8k4bu0'
player_ranks_cache = {}
currentGameVersion = "14.8"
async def fetch_match_data():
    async with httpx.AsyncClient() as client:
        # Make a request to Supabase to get all match data
        response = await client.get(
            f'{supabase_url}/rest/v1/match_info',
            headers={'apikey': supabase_key}
        )
        if response.status_code == 200:
            return response.json()
        else:
            print(f'Error: {response.status_code}')
            return ""

async def fetch_summoner_tier(puuid):
    async with httpx.AsyncClient() as client:
        # Make a request to Supabase to get the summoner info for the given PUUID
        response = await client.get(
            f'{supabase_url}/rest/v1/summoner_info?puuid=eq.{puuid}',
            headers={'apikey': supabase_key}
        )
        if response.status_code == 200:
            summoner_info = response.json()
            if summoner_info:
                ranked = json.loads(summoner_info[0]['ranked'])
                if isinstance(ranked, list) and not ranked:
                    return ""
                else:
                    if ranked[0]['queueType'] == 'RANKED_SOLO_5x5':
                        return ranked[0]['tier']
                    if ranked[1]:
                        return ranked[1]['tier']
                
        return ""



async def main():
    complete_items, full_item_list = await fetch_item_data()
    match_data = await fetch_match_data()
    print(len(match_data))
    boots_ids = ['3009', '3117', '3158', '3006', '3047', '3020', '3111']
    if match_data:
        # Dictionary to store data as rank[champion{wins. losses}]
        rank = defaultdict(
            lambda: defaultdict(
                lambda: defaultdict(
                    lambda: defaultdict(
                        lambda: {'wins': 0, 'losses': 0,
                                'items': defaultdict(lambda: {'wins': 0, 'losses': 0}),
                                'starter': defaultdict(lambda: {'wins': 0, 'losses': 0}),
                                'runes': defaultdict(lambda: {'wins': 0, 'losses': 0}),
                                'boots': defaultdict(lambda: {'wins': 0, 'losses': 0}),
                                'opponents': defaultdict(lambda: {'wins': 0, 'losses': 0})
                                }
                    )
                )
            )
        )
        total_games = {}
        banned_champions = defaultdict(
            lambda: defaultdict(lambda: defaultdict(int))
        )
        total_games = defaultdict(lambda: defaultdict(int))
        for match in match_data:
            match_id = match['match_id']
            match_data_json = json.loads(match['match_data'])  # Parse JSON string into dictionary
            queueId = match_data_json['queueId']
            gameVersion = match_data_json['gameVersion']
            region = match_data_json['platformId']
            if not(queueId == 420 and gameVersion and gameVersion.startswith(currentGameVersion)):
                continue
            # Extract PUUIDs of participants
            participants = match_data_json['participants']
            tier = ""
            for participant in participants:
                puuid = participant['puuid']
                # Check if player's rank is already cached
                if puuid in player_ranks_cache:
                    if player_ranks_cache[puuid] != "":
                        tier = player_ranks_cache[puuid]
                        print(f"Riot Id: {participant['riotIdGameName']} Tier: {tier}")
                        break
                else:
                    # Fetch summoner tier for the participant and cache it
                    tier = await fetch_summoner_tier(puuid)
                    player_ranks_cache[puuid] = tier
                    if tier != "":
                        print(f"Riot Id: {participant['riotIdGameName']} Tier: {tier}")
                        break
            for participant in participants:
                champion_played = participant['championId']
                win = participant['win']
                role = participant['individualPosition']
                perks = participant['perks']
                stat_perks = [perks['statPerks']['offense'], perks['statPerks']['flex'], perks['statPerks']['defense']]
                primary_perks = [selection['perk'] for selection in perks['styles'][0]['selections']]
                secondary_perks = [selection['perk'] for selection in perks['styles'][1]['selections']]
                
                combined_perks = primary_perks + secondary_perks + stat_perks
                for other_participant in participants:
                    if other_participant['individualPosition'] == role and other_participant['teamId'] != participant['teamId']:
                        # Found the player on the other team with the same role
                        other_champion_played = other_participant['championId']
                        rank[region][tier][role][champion_played]['opponents'][other_champion_played]['wins'] += int(win)
                        rank[region][tier][role][champion_played]['opponents'][other_champion_played]['losses'] += int(not win)

                        rank["global"][tier][role][champion_played]['opponents'][other_champion_played]['wins'] += int(win)
                        rank["global"][tier][role][champion_played]['opponents'][other_champion_played]['losses'] += int(not win)

                if tier:
                    # Update data for the participant's champion
                    
                    build_orders = match_data_json['buildOrders']
                    full_items = set()
                    participant_id = str(participant['participantId'])
                    starter = []
                    total_gold_spent = 0
                    boots = None
                    for order in build_orders[participant_id]:
                        
                        if order['type'] == 'BUY':
                            item_id = str(order['itemId'])
                            if item_id in boots_ids:
                                boots = item_id           
                            if total_gold_spent + full_item_list[item_id]['gold']['total'] <= 500 and item_id != "3340" and item_id != "3363" and item_id != "3364":
                                starter.append(order['itemId'])
                                total_gold_spent += full_item_list[item_id]['gold']['total']
                            if item_id in complete_items:
                                full_items.add(order['itemId'])
                        elif order['type'] == 'SELL':
                            full_items.discard(order['itemId'])
                        if len(full_items) >= 3:
                            break
                    # Store the first three full items for the participant's champion
                    rank[region][tier][role][champion_played]['wins'] += int(win)
                    rank[region][tier][role][champion_played]['losses'] += int(not win)
                    rank[region][tier][role][champion_played]['starter'][tuple(starter)]['wins'] += int(win)
                    rank[region][tier][role][champion_played]['starter'][tuple(starter)]['losses'] += int(not win)
                    rank[region][tier][role][champion_played]['items'][tuple(full_items)]['wins'] += int(win)
                    rank[region][tier][role][champion_played]['items'][tuple(full_items)]['losses'] += int(not win)
                    rank[region][tier][role][champion_played]['runes'][tuple(combined_perks)]['wins'] += int(win)
                    rank[region][tier][role][champion_played]['runes'][tuple(combined_perks)]['losses'] += int(not win)
                    rank[region][tier][role][champion_played]['boots'][boots]['wins'] += int(win)
                    rank[region][tier][role][champion_played]['boots'][boots]['losses'] += int(not win)
                    
                    rank["global"][tier][role][champion_played]['wins'] += int(win)
                    rank["global"][tier][role][champion_played]['losses'] += int(not win)
                    rank["global"][tier][role][champion_played]['starter'][tuple(starter)]['wins'] += int(win)
                    rank["global"][tier][role][champion_played]['starter'][tuple(starter)]['losses'] += int(not win)
                    rank["global"][tier][role][champion_played]['items'][tuple(full_items)]['wins'] += int(win)
                    rank["global"][tier][role][champion_played]['items'][tuple(full_items)]['losses'] += int(not win)
                    rank["global"][tier][role][champion_played]['runes'][tuple(combined_perks)]['wins'] += int(win)
                    rank["global"][tier][role][champion_played]['runes'][tuple(combined_perks)]['losses'] += int(not win)
                    rank["global"][tier][role][champion_played]['boots'][boots]['wins'] += int(win)
                    rank["global"][tier][role][champion_played]['boots'][boots]['losses'] += int(not win)
            total_games["global"][tier] += 1
            total_games[region][tier] += 1
            local_banned = []
            for team in match_data_json['teams']:
                for ban in team['bans']:
                    champion_banned = ban['championId']
                    if champion_banned not in local_banned:
                        banned_champions[region][tier][champion_banned] += 1
                        banned_champions["global"][tier][champion_banned] += 1
                        local_banned.append(champion_banned)


        # Print the data
        for region, region_data in rank.items():
            for tier, tier_data in region_data.items():
                for role, role_data in tier_data.items():
                    print(f'Region: {region}, Tier: {tier}, Tier: {role}')
                    for champion, champion_data in role_data.items():
                        wins = champion_data['wins']
                        losses = champion_data['losses']
                        print(f'Champion: {champion}, Wins: {wins}, Losses: {losses}')
                        for items, items_data in champion_data['items'].items():
                            print(f'Items: {items}, Wins: {items_data['wins']}, Losses: {items_data['losses']}')
                        for items, items_data in champion_data['runes'].items():
                            print(f'Runes: {items}, Wins: {items_data['wins']}, Losses: {items_data['losses']}')
                        for items, items_data in champion_data['starter'].items():
                            print(f'Starter: {items}, Wins: {items_data['wins']}, Losses: {items_data['losses']}')
                        for items, items_data in champion_data['boots'].items():
                            print(f'Boots: {items}, Wins: {items_data['wins']}, Losses: {items_data['losses']}')

        combined_data = {
            "rank": rank,
            "banned_champions": banned_champions,
            "total_games": total_games
        }

        def convert_keys_to_strings(dictionary):
            new_dict = {}
            for key, value in dictionary.items():
                if isinstance(key, tuple):
                    key = str(key)
                elif isinstance(key, str):
                    key = key.lower()  # Convert key to lowercase if it's a string
                if isinstance(value, dict):
                    value = convert_keys_to_strings(value)
                new_dict[key] = value
            return new_dict

        


        rank_string_keys = convert_keys_to_strings(combined_data)

        

        file_path = "rank_data.json"
        with open(file_path, "w") as json_file:
            json.dump(rank_string_keys, json_file, indent=4)

# Run the main function
if __name__ == '__main__':
    import asyncio
    asyncio.run(main())