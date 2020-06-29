<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">

        <!-- Styles -->
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
            <tr>
                <td>{{ $coin->name }}</td>
                <td>{{ $coin->lastPrice() }}</td>
                <td>{{ $coin->lastVolume() }}</td>
                <td>{{ $coin->lastMarketCap() }}</td>
                <td><button>View Chart</button></td>
            </tr>
            @endforeach
            
        </table>
    </body>
</html>
