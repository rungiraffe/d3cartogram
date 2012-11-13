#calculate.py - calculates ratios; converts csv dump from MySQL to text file for Javascript import

import csv
import decimal

fcsv = csv.reader(open('../43_homestate.csv', 'rU'), dialect='excel')
ftxt = open("../ratios_maxdel_NaN_10.txt", "w")

stateCounts = []
Ratio = []

#fill the state count arrays from the count field in the csv file
for row in fcsv:
	count = decimal.Decimal(row[1])
	stateCounts.append(count)

#Number of Members in New York (the largest delegation)
maxDelegation = 38
	
for number in stateCounts:	
	if number > 0:
		result = round(decimal.Decimal(number / maxDelegation * 10), 3)
	else:
		result = 'NaN'
		#there is a space; tried result = 0 and empty string and it did not help my d3 problem
	Ratio.append(result)
	
for item in Ratio:	
	ftxt.write(",%s" % item)

ftxt.close()