import puppeteer from 'puppeteer';
import { PrismaClient } from '@prisma/client'
import { Game } from './models/game';

const prisma = new PrismaClient()

async function gettingAllTheGamesData() {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://wiki.supercombo.gg/')
    
    const resultElement = await page.evaluate(() => {
        const array = Array.from(document.querySelectorAll('table'))
        const gamesTable = array[1]
        const games = Array.from(gamesTable.querySelectorAll('tr'))
        const dataTitles = games.shift()
        
        const getAllCellsFromTableRow = (tableRow: HTMLTableRowElement) => Array.from(tableRow.querySelectorAll('td'))

        return games
            .filter(game => {
                const convertCompletionImageToPercentage = (alt: string) => Number(alt.replace(/\D/g, ''))
                const completionImageTag = game.querySelectorAll('td')[4].childNodes[0].childNodes[0] as HTMLImageElement

                const completionpercentage = convertCompletionImageToPercentage(completionImageTag.alt)
                const validGame = completionpercentage > 20

                return validGame
            })
            .filter(game => {
                const data = getAllCellsFromTableRow(game)
                const [gameNameTd] = data
                
                const [gameName] = Array.from(gameNameTd.childNodes) as HTMLElement[]
                const onlyGamesThatAreNotDepricated = gameName.tagName === 'A'

                return onlyGamesThatAreNotDepricated
            })
            .map(game => {
                const dataCells = getAllCellsFromTableRow(game)
                const [name,, year, developer] = dataCells.map(cell => cell.innerText)                

                return {name, year, developer} as Game
            })

        
    })

    await browser.close()

    const gamesOnDatabase = resultElement.forEach(async game => {
        await prisma.game.create({
            data: {...game}
        })
    })

    console.log(gamesOnDatabase)
    return gamesOnDatabase
}

//gettingAllTheGamesData();

(async () => {
   const games = await prisma.game.findMany() 
   console.log(games)
})()