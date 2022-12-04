import puppeteer from 'puppeteer';

const parseClassListAsSelectorQuery = (classList: string) => `.${classList.split(' ').join('.')}`

async function gettingAllTheGamesData() {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://www.google.com/search?q=dolar+para+real&rlz=1C1GCEB_enBR1007BR1007&oq=dolar+para+real&aqs=chrome..69i57j0i271l2.2578j0j4&sourceid=chrome&ie=UTF-8')
    
    const resultElement = await page.evaluate(() => {
        const query = parseClassListAsSelectorQuery('wikitable sortable jquery-tablesorter')
    })

    await page.screenshot({path: 'foto.png'})

    await browser.close()

    return resultElement

}

gettingAllTheGamesData()
    .then(r => console.log(r))