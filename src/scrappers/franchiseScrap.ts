import puppeteer from "puppeteer"



export async function getFranchisesData(path: string) {

    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto(path)

    const franchisesFromGames = await page.evaluate(() => {

        function getSeriesFromGameName(name: string, listOfGames: string[]): string {

            if (listOfGames.some(game => game === name) || listOfGames.some(game => game.includes(name)) || name.length === 0) {
                const result = name.split(' ').filter((word, index, fullName) => {

                    const acceptedWordsBellow3Chars = ['the', 'of', 'or']
                    const onlyWordsGreatterThan3Chars = word.length > 3 || acceptedWordsBellow3Chars.some(accepted => word.toLowerCase().includes(accepted))
                    const onlyOneWordInTheName = fullName.length === 1
                    const wordIsInTheBegginingOfName = name.split(word)[0] === ''

                    if (onlyOneWordInTheName) {
                        return onlyWordsGreatterThan3Chars && wordIsInTheBegginingOfName
                    }
                    return onlyWordsGreatterThan3Chars
                })
                    .join(' ')

                return result
            }

            const nameMinusOneChar = name.slice(0, name.length - 1).trim()
            return getSeriesFromGameName(nameMinusOneChar, listOfGames)

        }

        const [, games] = Array.from(document.querySelectorAll('table'))
        const firstColumnInsideEveryRow = 'tr > td:first-child'

        const gameNames = Array.from(games.querySelectorAll(firstColumnInsideEveryRow)) as HTMLTableCellElement[]

        const formatedNames = gameNames.map(name => name.innerText)

        const franchises = formatedNames
            .reduce((franchises, name, index, games) => {
                const namesWithourCurrentOne = games.filter(game => game !== name)

                const franchiseName = getSeriesFromGameName(name, namesWithourCurrentOne)
                const onlyOneGame = franchiseName === ''
                const nameOrFranchise = onlyOneGame ? name : franchiseName



                franchises.push(nameOrFranchise)
                return franchises

            }, [] as Array<string>)

        const notRepeatedFranchises = Array.from(new Set(franchises))

        type franchise = {name: string, games: string[]}
        const notTooGenericNames = (franchise: franchise) => {
            const tooGenericNames = ['Super', 'The', 'Battle', 'Soul', 'Power', 'Ninja', 'Ultimate', 'Fight', 'Fighters', 'Eternal', 'Fantas', 'Fighter', 'Cyber', 'Chaos', 'Breaker']

            return tooGenericNames.every(name => name !== franchise.name)
        }

        const franchisesAndItsGames = notRepeatedFranchises
            .map(word => word.replace(/\d/g, '').trim())
            .map(franchiseName => {
                return {name: franchiseName, games: formatedNames.filter(name => name.includes(franchiseName))}
            })
            .filter(notTooGenericNames)
            .filter(franchise => {
                const tooGeneriFranchiseNames = ['Street Fighter', 'Fatal Fury', 'Tekken', 'The King of Fighters']

                if (tooGeneriFranchiseNames.some(genericName => franchise.name.includes(genericName))) {
                    return tooGeneriFranchiseNames.some(genericName => franchise.name === genericName)
                }
                return false
            })
            .filter(franchise => franchise.games.length > 0)


        return franchisesAndItsGames
        
    })
    1
    await browser.close()

    const franchiseNames = Array.from(new Set(franchisesFromGames))


    return franchiseNames

}

