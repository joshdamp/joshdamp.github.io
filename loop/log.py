# mark a section done in LOOP.md and append its log line: python loop/log.py <section> "<line>"
import sys, re
sec, line = sys.argv[1], sys.argv[2]
s = open('LOOP.md', encoding='utf8').read()
s, n = re.subn(rf'(\| \d \| {sec} \|[^\n]*\| )pending \|', r'\1done |', s)
assert n == 1, sec
open('LOOP.md', 'w', encoding='utf8').write(s.rstrip('\n') + f'\n- {sec}, {line}\n')
