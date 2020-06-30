/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.App = {
    setActiveLink(coin)
    {
        document.querySelectorAll('.nav-link').forEach(el => {
            el.classList.remove('active')
        })
        document.getElementById('nav-'+coin).classList.add('active')
    },
    setCoinInfo(coin)
    {
        document.getElementById('volume').innerText = window.coins[coin].last_volume
        document.getElementById('price').innerText = window.coins[coin].last_price
        document.getElementById('marketcap').innerText = window.coins[coin].last_marketcap
    },
    initChart(coin)
    {
        var el = document.getElementById('chart')
        while (el.firstChild) {
            el.firstChild.remove();
        }
        const chart = LightweightCharts.createChart(el, { width: 400, height: 300 });
        const lineSeries = chart.addLineSeries();
        axios.post('api/coin/'+coin)
            .then(function (data) {
                lineSeries.setData(data.prices)
            })
            .catch(function () {
                console.error('No coin');
            });
        
    },
    setChart(coin)
    {
        this.setActiveLink(coin)
        this.setCoinInfo(coin)
        this.initChart(coin)
        
    }
}

