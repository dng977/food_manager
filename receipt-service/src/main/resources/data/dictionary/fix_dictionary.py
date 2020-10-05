from spellchecker import SpellChecker
import pprint
import sys
import os
import re
#file_object = open("tesseract-text.txt", "r", encoding="utf8")

def main():
    print([5,4,2].index(1))
    s = "ab"
    print(re.search("(.*[0-9]\.[0-9].*)|(.*[0-9]{2}.*)", s) != None)
    contains_digit = any(map(str.isdigit, s))

    print(contains_digit)

if __name__ == '__main__':
    main()