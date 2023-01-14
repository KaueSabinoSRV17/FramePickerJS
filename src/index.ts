import { getFranchisesData } from "./scrappers/franchiseScrap"

getFranchisesData('https://wiki.supercombo.gg/w/SuperCombo_Wiki:Game_Directory')
    .then(franchises => console.log(franchises))