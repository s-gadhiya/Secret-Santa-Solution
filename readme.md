# Secret Santa Assignment Solution

This project implements a Secret Santa assignment system using a backtracking to find valid assignments while respecting previous year's constraints.

## Problem Overview

The solution needs to assign Secret Santas to employees while ensuring:

1. No employee can be their own Secret Santa
2. No employee gets the same person they had in the previous year
3. Each employee must be assigned exactly one Secret Santa
4. Each employee must be a Secret Santa for exactly one person

## Solution Approach

The solution uses a backtracking to:

1. Try assigning a valid Santa to each employee
2. If an assignment leads to an invalid state, it backtracks and tries different combinations
3. Continues until either a valid solution is found or all possibilities are exhausted

## Project Structure

- `input/` - Contains input CSV files
  - `employees.csv` - List of current employees
  - `previousSanta.csv` - Previous year's Secret Santa assignments
- `output/` - Generated Secret Santa assignments
- `fileReader.js` - Handles CSV file reading
- `fileWriter.js` - Handles CSV file writing
- `secretSanta.js` - Core logic for Secret Santa assignment
- `index.js` - Main application file

## Setup and Running

1. Install dependencies:

```bash
npm install
# or
yarn install
```

2. Prepare input files in the input directory:

   - employees.csv with columns: Employee_Name, Employee_EmailID
   - previousSanta.csv with columns: Employee_Name, Employee_EmailID, Secret_Child_Name, Secret_Child_EmailID

3. Run the application:

```bash
npm start
# or
yarn start
```

4. Check the results in output/result.csv

## Input File Format

### employees.csv

```plaintext
Employee_Name,Employee_EmailID
Hamish Murray,hamish.murray@acme.com
Layla Graham,layla.graham@acme.com
```

### previousSanta.csv

```plaintext
Employee_Name,Employee_EmailID,Secret_Child_Name,Secret_Child_EmailID
Hamish Murray,hamish.murray@acme.com,Benjamin Collins,benjamin.collins@acme.com
Layla Graham,layla.graham@acme.com,Piper Stewart,piper.stewart@acme.com
```

## Output

The program will generate output/result.csv in the output directory with new Secret Santa assignments. If no valid solution is possible, it will log an appropriate message.

```plaintext
Employee_Name,Employee_EmailID,Secret_Child_Name,Secret_Child_EmailID
Hamish Murray,hamish.murray@acme.com,Layla Graham,layla.graham@acme.com
Layla Graham,layla.graham@acme.com,Hamish Murray,hamish.murray@acme.com
```
