import puppeteer from 'puppeteer';

async function fetchingCurrencyCurrentValues() {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://www.google.com/search?q=dolar+para+real&rlz=1C1GCEB_enBR1007BR1007&oq=dolar+para+real&aqs=chrome..69i57j0i271l2.2578j0j4&sourceid=chrome&ie=UTF-8')
    
    const resultElement = await page.evaluate(() => {
        const elementArray = Array.from(document.querySelectorAll('input'))
        const resultElement = document.querySelector('.lWzCpb.a61j6') as HTMLInputElement
        return resultElement.value
    })

    await page.screenshot({path: 'foto.png'})

    await browser.close()

    return resultElement

}

fetchingCurrencyCurrentValues()
    .then(r => console.log(r))