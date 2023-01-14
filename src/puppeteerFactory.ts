import puppeteer from "puppeteer"

export module puppeteerFactory {

    export async function launchNewPage(initialUrl: string = "https://wiki.supercombo.gg/") {

        const browser = await puppeteer.launch()
        const page = await browser.newPage()

        await page.goto(initialUrl)

        return page
        
    }


}