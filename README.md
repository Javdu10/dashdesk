# CDG

## Être capable d’afficher un graphique pour au moins deux cryptomonnaies.
- NANO
- ETH
- XMR
## Les données du graphique doivent être chargées de manière asynchrones
 - Au clic sur une crypto, `App.setChart({name_of_the_coin})`
 - Une requete HTTP : `/api/coin/{name_of_the_coin}` || `/api/coin/{name_of_the_coin}?from={date}`
Si aucune date n'est renseignée, alors cela retourne les 7 dernières valeurs présentent dans la BDD
 - La meme chart est ensuite modifié
```javascript
if(!window.Serie)
    window.Serie = window.Chart.addLineSeries();
else{
    window.Chart.removeSeries(window.Serie);
    window.Serie = window.Chart.addLineSeries();
}
var sorted = response.data.prices.sort((a,b) => a.id - b.id)
window.Serie.setData(sorted)
window.Chart.timeScale().fitContent();
```

## Dispositifs connus en œuvre pour rendre l'interface efficace
- Utilisation du Cache laravel pour la récupération des prix
- Utilisation de Laravel Mix pour Compiler les assets
- Possibilité d'utiliser un CDN, mais comme ici c'est en local ca ne serait pas efficace

## Un style CSS doit être appliqué sans Bootstrap ou autres lib

# Bonus
- Tache Cron avec une commande Artisan "dashdesk:refresh" toute les 5 minutes
- Pas de Bootstrap ou autres lib
- Donnée d'analyse ? volume, marketcap journalier ?
- 3 cryptomonnaies NANO, ETH, XMR
- Responsive ([TradingView chartlib responsive issue](https://github.com/tradingview/lightweight-charts/issues/71#issuecomment-643126762))
### Amélioration supplémentaire
- CI/CD avec GithubAction
- Tests avec PHPUnit et Dusk
