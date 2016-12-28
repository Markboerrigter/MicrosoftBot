import json
from pprint import pprint

file = open('data.json')
file = json.load(file)

data = []
for key in file:
	data.append(file[key]['image_url'])
	
	
with open('images.json', 'w') as outfile:
    json.dump({'images': data}, outfile)
