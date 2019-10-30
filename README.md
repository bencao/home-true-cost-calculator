# Home True Cost Calculator

When buying the house, you would like to keep two important metrics in mind: 

- Essential Monthly Cost (When mortgage is paid off, you still have to pay this amount)
- Monthly Cost (Essential Monthly Cost + Mortgage Payment)

To make it easier to calculate these two metrics and understand the true cost, I built this tool to help me track a list of houses without much effort.

## Usage

```
yarn install

# list all
node index.js

# list only specific zipcode
node index.js 07974

# edit homes.json to add/remove houses
```

## Example Output

The tool generates tables like the following one:

```
NAME                                              | MONTHLY | ESSENTIAL(TAX+INS+MAIN+COMMU) | PRICE | TAX      | WALK    | SQFT | COMMENT
==== Minimal ====                                 | 2836    | 1039 (834 + 80 + 125 + 0)     | 500K  | 10000    | 15 mins | 1500 |
76 Magnolia Dr, New Providence, NJ 07974          | 3076    | 1154 (930 + 80 + 144 + 0)     | 535K  | 11152.3  | 18 mins | 1723 | Corner
329 Livingston Ave, New Providence, NJ 07974      | 3146    | 1209 (986 + 80 + 143 + 0)     | 539K  | 11824.36 | 7 mins  | 1710 | Corner,Small Yard
35 Bradford St, New Providence, NJ 07974          | 3482    | 1416 (1156 + 100 + 160 + 0)   | 575K  | 13860.02 | 19 mins | 1910 |
59 Oxbow Dr, New Providence, NJ 07974             | 3561    | 1441 (1042 + 80 + 139 + 180)  | 590K  | 12501.29 | 26 mins | 1660 |
35 Badgley Dr, New Providence, NJ 07974           | 3845    | 1330 (1069 + 100 + 161 + 0)   | 700K  | 12827.58 | 15 mins | 1922 | Flip
171 Hickson Dr, New Providence, NJ 07974          | 3895    | 1649 (1310 + 140 + 199 + 0)   | 625K  | 15710.62 | 18 mins | 2385 |
62 Candlewood, New Providence, NJ 07974 (reduced) | 4248    | 1733 (1400 + 140 + 193 + 0)   | 700K  | 16791.76 | 11 mins | 2305 | Water Issue
====  Ideal  ====                                 | 4296    | 1601 (1334 + 100 + 167 + 0)   | 750K  | 16000    | 15 mins | 2000 |
130 Knollwood Dr, New Providence, NJ 07974        | 4370    | 1858 (1487 + 160 + 211 + 0)   | 699K  | 17838.81 | 13 mins | 2525 |
64 Chestnut St, New Providence, NJ 07974          | 4427    | 1915 (1486 + 190 + 239 + 0)   | 699K  | 17829.07 | 11 mins | 2857 |
3 Newcomb Dr, New Providence, NJ 07974            | 4550    | 1607 (1162 + 100 + 165 + 180) | 819K  | 13937.94 | 21 mins | 1978 | Flip
113 Evergreen Ave, New Providence, NJ 07974       | 4656    | 1893 (1306 + 180 + 227 + 180) | 769K  | 15671.66 | 25 mins | 2718 |
==== Stretch ====                                 | 5434    | 2200 (1750 + 200 + 250 + 0)   | 900K  | 21000    | 15 mins | 3000 |
```
