<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.js" integrity="sha256-R4pqcOYV8lt7snxMQO/HSbVCFRPMdrhAFMH+vr9giYI=" crossorigin="anonymous"></script>
        <!-- Styles -->
        {{-- <script
            src="https://code.jquery.com/jquery-3.5.1.min.js"
            integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
            crossorigin="anonymous">
        </script> --}}

        <style>
            .hide {
                display: none;
            }
        </style>
    </head>
    <body>
        
        <table>
            <tr>
                <th>Name</th>
                <th>Last price (h)</th>
                <th>Volume</th>
                <th>Market cap</th>
                <th>Action</th>
            </tr>
            @foreach ($coins as $coin)
            <div>
                <tr>
                    <td>{{ $coin->name }}</td>
                    <td>{{ $coin->lastPrice() }}</td>
                    <td>{{ $coin->lastVolume() }}</td>
                    <td>{{ $coin->lastMarketCap() }}</td>
                <td><button onclick="showCoinChart('{{$coin->id_coingecko}}')">View Chart</button></td>
                </tr>
                <tr id="{{ $coin->id_coingecko }}-chart" class="hide">
                    <td colspan="5"><canvas id="{{ $coin->id_coingecko }}-canva"></canvas></td>
                </tr>
            </div>
            
            
            @endforeach
            
        </table>
        <script>


            
      
        
            function showCoinChart(id_coingecko)
            {
                var el = document.getElementById(id_coingecko+'-chart')
                if(el.classList.contains('hide') )
                    el.classList.remove('hide')
                else el.classList.add('hide')

                var ctx = document.getElementById(id_coingecko+'-canva').getContext('2d');
			    window.myLine = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
                
            }
        </script>
</html>
