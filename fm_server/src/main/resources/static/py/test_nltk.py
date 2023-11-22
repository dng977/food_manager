from nltk.stem import PorterStemmer
from nltk.tokenize import word_tokenize
import pprint
import sys
import os
import re
def main():
    main_path = os.path.dirname(os.path.abspath(__file__))

    #receipt_store = sys.argv[1]
    filepath = main_path+ "/tesseract-text.txt"

    if not os.path.isfile(filepath):
        print("File path {} does not exist. Exiting...".format(filepath))
        sys.exit()

    bag_of_words = []
    with open(filepath, "r", encoding="utf8") as fp:
        cnt = 0
        for line in fp:
            bag_of_words.extend(line.strip().split(' '))
            cnt += 1
    ps = PorterStemmer()
    for w in bag_of_words:
        print(w, " : ", ps.stem(w))


if __name__ == '__main__':
    main()