/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.App = {
        resizeChart(height, width)
        {
            if(!window.Chart)
                return 'oups'
            window.Chart.applyOptions({ width, height })
            window.Chart.timeScale().fitContent();
        },
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
            document.getElementById('description').innerText = window.coins[coin].description
            document.getElementById('title').innerText = coin.toUpperCase()
            
        },
        initChart(coin,date)
        {
            if(date)
                window.currentTime = date
            var uri = 'api/coin/'+coin+(window.currentTime ? '?from='+window.currentTime : '')
            axios.get(uri)
                .then(function (response) {
                    var el = document.getElementById('parent-chart')
                    if(!window.Chart){
                        window.Chart = LightweightCharts.createChart(document.getElementById('chart'), { 
                            width: el.offsetWidth,
                            height: el.offsetHeight,
                            layout: {
                                backgroundColor: getComputedStyle(document.body).getPropertyValue('--bg-primary'),
                                textColor: getComputedStyle(document.body).getPropertyValue('--text-primary'),
                            },
                           
                        });
                    }
                    if(!window.Serie)
                        window.Serie = window.Chart.addLineSeries();
                    else{
                        window.Chart.removeSeries(window.Serie);
                        window.Serie = window.Chart.addLineSeries();
                    }
                    var sorted = response.data.prices.sort((a,b) => a.id - b.id)
                    window.Serie.setData(sorted)
                    window.Chart.timeScale().fitContent();
                    
                })
                .catch(function (error) {
                    console.error('No coin',error);
                });
                window.currentCoin = coin;
        },
        setChart(coin,date)
        {
            this.setActiveLink(coin)
            this.setCoinInfo(coin)
            this.initChart(coin,date)
            
        },
        setChartDataFrom(date)
        {
            this.setChart(window.currentCoin, date)
        }
       
}

