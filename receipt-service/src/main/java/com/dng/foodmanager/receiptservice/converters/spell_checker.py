from spellchecker import SpellChecker
import pprint
import sys
import os
import re

#file_object = open("tesseract-text.txt", "r", encoding="utf8")
main_path = os.path.dirname(os.path.abspath(__file__))

import_new_words = True

def main():
    #receipt_store = sys.argv[1]
    filepath = main_path+ "/tesseract-text.txt"

    if not os.path.isfile(filepath):
        print("File path {} does not exist. Exiting...".format(filepath))
        sys.exit()

    bag_of_words = {}
    with open(filepath, "r", encoding="utf8") as fp:
        cnt = 0
        for line in fp:
            bag_of_words[cnt] = line.strip().split(' ')
            cnt += 1

    return spellChecker(bag_of_words)

def spellChecker(bag_of_words):
    store_name = ''
    store_array = ["aldi", "lidl"]

    food_values = []
    start_collecting_index = 0

    spell = SpellChecker(language=None, case_sensitive=False, distance=1)

    if import_new_words:
        spell.word_frequency.load_text_file(main_path + '/food_words.txt')
    else:
        spell.word_frequency.load_dictionary(main_path + '/dictionary.json')

    #print(spell.word_frequency.unique_words)
    #print(spell.word_frequency.total_words)

    end_loop_word = False
    #print(spell.word_frequency.dictionary)
    for (line, words) in bag_of_words.items():

        corrected_words = ''
        for word in words:
            if len(word) <= 2 or re.search("(.*[0-9][.,][0-9].*)|(.*[0-9]{3}.*)|(.*\W.*)", word) != None:
                continue

            # Get the one `most likely` answer
            candidates = spell.candidates(word)
            #print(word, candidates)
            word_to_add = ""

            if(len(candidates) > 2):
                word_to_add = word
            else:
                word_to_add = spell.correction(word)
            if not store_name:
                if word_to_add.lower() in store_array:
                    store_name = word_to_add

            corrected_words = corrected_words + " " + word_to_add

        if check_stopper(corrected_words):
            break

        if check_starter(corrected_words):
            start_collecting_index = line + 1

        if corrected_words:
            food_values.append(corrected_words)


        #print(line, corrected_words)
        #print("------------")
    print(store_name)
    for food_value in food_values[start_collecting_index:]:
        try:
            print(food_value)
        except:
            pass

    if import_new_words:
        spell.export(main_path + '/dictionary.json', gzipped=False)



store_array = ["aldi", "lidl"]

def check_store(word):
    if word in store_array:
        return store_array.index(word)
    return ''

def check_stopper(line):
    stopping_words = ["total","visa","card"]
    for sw in stopping_words:
        if sw in line.lower():
            return True


def check_starter(line):
    starting_words = ["your cashier", "today was", "selly", "oak"] + store_array
    for sw in starting_words:
        if sw in line.lower():
            return True

if __name__ == '__main__':
    main()

def order_bag_of_words(bag_of_words, desc=False):
    words = [(word, cnt) for word, cnt in bag_of_words.items()]
    return sorted(words, key=lambda x: x[1], reverse=desc)

def record_word_cnt(words, bag_of_words, line):
    for word in words:
        if word != '':
            if word.lower() in bag_of_words:
                bag_of_words[word.lower()] += 1
            else:
                bag_of_words[word.lower()] = 1

#    pp = pprint.PrettyPrinter(indent=4)
