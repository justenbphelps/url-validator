let axios = require('axios')
const open = require('open')
const HttpsProxyAgent = require('https-proxy-agent')
const readXlsxFile = require('read-excel-file/node')
const createCsvWriter = require('csv-writer').createObjectCsvWriter
const csvWriter = createCsvWriter({
    path: 'result.csv',
    header: [
        { id: 'url', title: 'URL' },
        { id: 'status', title: 'Status Code' },
        { id: 'valid', title: 'Valid' },
    ],
})

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
const proxyAgent = new HttpsProxyAgent({
    host: 'zproxy.lum-superproxy.io',
    port: '22225',
    auth: {
        username: 'lum-customer-hl_7f6ad60e-zone-isp',
        password: 've02avsc1wwo',
    },
})

axios = axios.create({ proxyAgent })

let urls = []

// check validity of given url
const checkValidity = async (url) => {
    const isValid = await axios
        .get(url, {
            rejectUnauthorized: false,
        })
        .then((response) => {
            return {
                status: response.status,
                url: url,
                valid: response.status === 200 ? true : false,
            }
        })
        .catch((err) => {
            console.error(err)
            return {
                status: 'error: ' + err,
                url: url,
                valid: null,
            }
        })
    return isValid
}

const run = async () => {
    let file = `${process.argv.slice(2)[0]}`
    if (file === null || file === 'undefined') {
        console.log('No file given. Please name file to be validated')
        return
    }

    readXlsxFile(file).then(async (rows) => {
        if (rows.length < 2) {
            throw console.error('Not enough rows to continue script')
        }
        rows.shift()
        console.log('Starting validation...')
        const check = rows.map(async (url) => {
            url = url[0]
            await checkValidity(url).then((val) => {
                urls.push(val)
            })
        })
        Promise.all(check).then(() => {
            csvWriter.writeRecords(urls).then(async () => {
                console.log('The CSV file was written successfully')
                await open('./result.csv')
            })
        })
    })
}

run()
