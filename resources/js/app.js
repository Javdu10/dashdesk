/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.App = function(){
    var Char = null;
    var Serie = null;
    return {
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
            
            axios.get('api/coin/'+coin)
                .then(function (response) {
                    if(!this.Chart){
                        this.Chart = LightweightCharts.createChart(document.getElementById('chart'), { 
                            width: 400, 
                            height: 300,
                            localization: {
                                dateFormat: 'yyyy/MM/dd H:m:s',
                            },
                        });
                    }
                    if(!this.Serie)
                        this.Serie = this.Chart.addLineSeries();
                    else{
                        this.Chart.removeSeries(this.Serie);
                        this.Serie = this.Chart.addLineSeries();
                    }
                    var sorted = response.data.prices.sort((a,b) => a.id - b.id)
                    this.Serie.setData(sorted)
                })
                .catch(function (error) {
                    console.error('No coin',error);
                });
            
        },
        setChart(coin)
        {
            this.setActiveLink(coin)
            this.setCoinInfo(coin)
            this.initChart(coin)
            
        }
    }   
}()

