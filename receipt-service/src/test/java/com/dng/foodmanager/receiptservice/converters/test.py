import re

line = "ASDASD"
line = re.sub(r'[/\\-]', ' ', line)
priceSearch = re.search(r'\d+\.\d\d', line)
starting_number_search = re.search(r'[a-zA-Z]', line)
if(priceSearch):
    line = line[:priceSearch.span()[0]]
if starting_number_search:
    line = line[starting_number_search.span()[0]: ]
print(not re.search('[a-z]{2}', line.lower()))
print(line)