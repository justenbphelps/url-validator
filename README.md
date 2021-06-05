# URL Validator

## Setup:

_Note: this only has to be done once_

Follow the below instructions in the order given

**Install Node:**

https://nodejs.org/en/download/

**Install/Update NPM:**

```bash
# all code given in these blocks
# are to be run in the terminal

npm install -g npm
```

**Clone url-checker repository to local machine**

```bash
git clone <GITHUB REPO URL>
cd url-validator
```

**Install dependencies**

```bash
npm i
```

---

## Usage

The actual usage of the script is very simple. The setup and install is the most involved part of the process.

To run the script, just make sure you are in the `url-validator` directory/folder, and place the file to be checked in the same folder

Run Command:

```bash
node validate.js <FILE_NAME.xlsx>
```

After the validation is complete, there will be a file named `result.csv` that you can import into Excel or Google Sheets to see the validation results for each given url.

---

### Additional Info

This is currently running on a Proxy server I am paying for and hosting. If this solution is useful to you and you think you will continue usage, I would prefer if you hosted it. I can walk you through how to do this at anytime :)

Proxy host:
https://brightdata.com/
