function siftData1(arg){
    return {
      "currentTemp": parseInt( (arg.main.temp - 273.15).toFixed(0) ),
      "maxTemp" : parseInt( (arg.main.temp_max - 273.15).toFixed(0) ),
      "minTemp" : parseInt( (arg.main.temp_min - 273.15).toFixed(0) ),
      "feelsLikeTemp" : parseInt( (arg.main.feels_like - 273.15).toFixed(0) ),
      "humidity" : parseInt(arg.main.humidity),
      "pressure" : parseInt(arg.main.pressure),
      "timeofpull": arg.dt_txt,
      "wind": parseFloat(arg.wind.speed)
    }
  }

  function forecast(arg){
    cityname = $(arg).attr('cityname');
    countrycode = $(arg).attr('countrycode');    
    fetch("https://api.openweathermap.org/data/2.5/forecast?q="+cityname+","+countrycode+"&appid=7c8dbd49d04a027ca793cacda2634369&cnt=20").then(function(response){
      
      response.json().then(function(data) {
          
          console.log(data);

          var dataNew = []
          var dataNew1 = []
          var dataNew2 = []
          var dataNew3 = []

          for(var i = 0 ; i < data.list.length ; i++){
            t = siftData1( data.list[i] )
            tempData = [t.timeofpull, t.currentTemp, t.maxTemp, t.minTemp, t.feelsLikeTemp]
            dataNew.push(tempData)
            dataNew1.push([ t.timeofpull, t.humidity ])
            dataNew2.push([ t.timeofpull, t.pressure ])
            dataNew3.push([ t.timeofpull, t.wind ])
          }

          console.log(dataNew);

          var template = "<div id='chart_div"+cityname.replace(" ","") + countrycode +"' style='width: 100%; min-height: 500px;'></div><div id='chart_div1"+cityname.replace(" ","") + countrycode +"' style='width: 100%; min-height: 500px;'></div><div id='chart_div2"+cityname.replace(" ","") + countrycode +"' style='width: 100%; min-height: 500px;'></div><div id='chart_div3"+cityname.replace(" ","") + countrycode +"' style='width: 100%; min-height: 500px;'></div>"
          $("#forecastdisplay" + cityname.replace(" ","") + countrycode).append(template)

          google.charts.load('current', {'packages':['corechart']});
          google.setOnLoadCallback(function(){

            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Date And Time');
            data.addColumn('number', 'Temperature');
            data.addColumn('number', 'Maximum Temperature');
            data.addColumn('number', 'Minimum Temperature');
            data.addColumn('number', 'Feels Like Temperature');
            // data.addColumn('number', 'Humidity');
            // data.addColumn('number', 'Pressure');
            // data.addColumn('number', 'Wind');

            data.addRows(dataNew);

            // Set chart options
            var options = {
              'title':'Temperature Forecast for the Past 20 Periods(° C)',
              chartArea: {width: '80%', height: '35%'},
              hAxis: { 
                  direction: -1, 
                  slantedText: true, 
                  slantedTextAngle: 90 ,// here you can even use 180 ,
                  format:'MMM d, y',
                  fontSize: 5,
                  // title: "Timestamps",
                  showTextEvery: '1', textPosition: 'out'
              },
              legend: { position: 'top' }
            };

            // Instantiate and draw our chart, passing in some options.
            var chart = new google.visualization.LineChart(document.getElementById('chart_div'+cityname.replace(" ","") + countrycode));
            function resizeChart () {
                chart.draw(data, options);
            }
            if (document.addEventListener) {
                window.addEventListener('resize', resizeChart);
            }
            else if (document.attachEvent) {
                window.attachEvent('onresize', resizeChart);
            }
            else {
                window.resize = resizeChart;
            }
            chart.draw(data, options);

            //

            var data1 = new google.visualization.DataTable();
            data1.addColumn('string', 'Date And Time');
            data1.addColumn('number', 'Humidity');            

            data1.addRows(dataNew1);

            // Set chart options
            var options1 = {
              'title':'Humidity Forecast for the Past 20 Periods(%)',
              chartArea: {width: '80%', height: '35%'},
              hAxis: { 
                  direction: -1, 
                  slantedText: true, 
                  slantedTextAngle: 90 ,// here you can even use 180 ,
                  format:'MMM d, y',
                  fontSize: 5,
                  // title: "Timestamps",
                  showTextEvery: '1', textPosition: 'out',                  
              },
              colors: ['blue', 'red', 'green', 'yellow', 'gray'],
              legend: { position: 'top' }
            };

            // Instantiate and draw our chart, passing in some options.
            var chart1 = new google.visualization.LineChart(document.getElementById('chart_div1'+cityname.replace(" ","") + countrycode));
            function resizeChart1 () {
                chart1.draw(data1, options1);
            }
            if (document.addEventListener) {
                window.addEventListener('resize', resizeChart1);
            }
            else if (document.attachEvent) {
                window.attachEvent('onresize', resizeChart1);
            }
            else {
                window.resize = resizeChart1;
            }
            chart1.draw(data1, options1);

            //

            var data2 = new google.visualization.DataTable();
            data2.addColumn('string', 'Date And Time');
            data2.addColumn('number', 'Pressure');            

            data2.addRows(dataNew2);

            // Set chart options
            var options2 = {
              'title':'Pressure Forecast for the Past 20 Periods(hpa)',
              chartArea: {width: '80%', height: '35%'},
              hAxis: { 
                  direction: -1, 
                  slantedText: true, 
                  slantedTextAngle: 90 ,// here you can even use 180 ,
                  format:'MMM d, y',
                  fontSize: 5,
                  // title: "Timestamps",
                  showTextEvery: '1', textPosition: 'out'
              },
              colors: ['red', 'green', 'yellow', 'gray'],
              legend: { position: 'top' },
              lineDashStyle: [5,1,4]
            };

            // Instantiate and draw our chart, passing in some options.
            var chart2 = new google.visualization.LineChart(document.getElementById('chart_div2'+cityname.replace(" ","") + countrycode));
            function resizeChart2 () {
                chart2.draw(data2, options2);
            }
            if (document.addEventListener) {
                window.addEventListener('resize', resizeChart2);
            }
            else if (document.attachEvent) {
                window.attachEvent('onresize', resizeChart2);
            }
            else {
                window.resize = resizeChart2;
            }
            chart2.draw(data2, options2);

            //

            var data3 = new google.visualization.DataTable();
            data3.addColumn('string', 'Date And Time');
            data3.addColumn('number', 'Wind Speed');            

            data3.addRows(dataNew3);

            // Set chart options
            var options3 = {
              'title':'Wind Forecast for the Past 20 Periods(m/s)',
              chartArea: {width: '80%', height: '35%'},
              hAxis: { 
                  direction: -1, 
                  slantedText: true, 
                  slantedTextAngle: 90 ,// here you can even use 180 ,
                  format:'MMM d, y',
                  fontSize: 5,
                  // title: "Timestamps",
                  showTextEvery: '1', textPosition: 'out'
              },
              legend: { position: 'top' },
              colors: ['green', 'yellow', 'gray'],              
            };

            // Instantiate and draw our chart, passing in some options.
            var chart3 = new google.visualization.LineChart(document.getElementById('chart_div3'+cityname.replace(" ","") + countrycode));
            function resizeChart3 () {
                chart2.draw(data3, options3);
            }
            if (document.addEventListener) {
                window.addEventListener('resize', resizeChart3);
            }
            else if (document.attachEvent) {
                window.attachEvent('onresize', resizeChart3);
            }
            else {
                window.resize = resizeChart3;
            }
            chart3.draw(data3, options3);

          });

          
      });
    });

    
  }

  function siftData(arg){
    return {
      "currentTemp": (arg.main.temp - 273.15).toFixed(0) + "° C",
      "maxTemp" : (arg.main.temp_max - 273.15).toFixed(0) + "° C",
      "minTemp" : (arg.main.temp_min - 273.15).toFixed(0) + "° C",
      "feelsLikeTemp" : (arg.main.feels_like - 273.15).toFixed(0) + "° C",
      "humidity" : (arg.main.humidity) + " %",
      "pressure" : (arg.main.pressure) + " hpa",
      "weather": arg.weather,
      "icon": arg.weather[0].icon,
      "weatherMain": arg.weather[0].main,
      "weatherDescription": arg.weather[0].description,
      "visibility": arg.visibility + " m",
      "timeofpull": new Date(arg.dt).toTimeString().split(' ')[0],
      "sunrise": new Date(arg.sys.sunrise).toTimeString().split(' ')[0],
      "sunset": new Date(arg.sys.sunset).toTimeString().split(' ')[0],
      "wind": arg.wind.speed + " m/s" + (arg.wind.deg?", " + arg.wind.deg + " deg":"")
    }
  }

  function fetchApiCall(arg){
    fetch("https://api.openweathermap.org/data/2.5/weather?appid=7c8dbd49d04a027ca793cacda2634369&q="+arg.cityName+","+arg.countryCode+"&appid=7c8dbd49d04a027ca793cacda2634369").then(function(response){
      response.json().then(function(data) {
          console.log(data);
          data = siftData(data)
          console.log(data)          

          $("#temp"+arg.cityName.replace(" ","")+arg.countryCode).html(data.currentTemp)
          $("#timeofpull"+arg.cityName.replace(" ","")+arg.countryCode).html(data.timeofpull)
          $("#maxtemp"+arg.cityName.replace(" ","")+arg.countryCode).html(data.maxTemp)
          $("#mintemp"+arg.cityName.replace(" ","")+arg.countryCode).html(data.minTemp)
          $("#pressure"+arg.cityName.replace(" ","")+arg.countryCode).html(data.pressure)
          $("#sunrise"+arg.cityName.replace(" ","")+arg.countryCode).html(data.sunrise)
          $("#sunset"+arg.cityName.replace(" ","")+arg.countryCode).html(data.sunset)
          $("#humidity"+arg.cityName.replace(" ","")+arg.countryCode).html(data.humidity)
          $("#wind"+arg.cityName.replace(" ","")+arg.countryCode).html(data.wind)
          $("#feelsLikeTemp"+arg.cityName.replace(" ","")+arg.countryCode).html(data.feelsLikeTemp)
          $("#visibility"+arg.cityName.replace(" ","")+arg.countryCode).html(data.visibility)

          $("#icon"+arg.cityName.replace(" ","")+arg.countryCode).html('');
          for( i = 0 ; i < data.weather.length ; i++ ){
            var text = '<img src="http://openweathermap.org/img/wn/'+data.weather[i].icon+'@2x.png"><br><h3>'+data.weather[i].main+'</h3><p>'+data.weather[i].description+'</p>'
            
            $("#icon"+arg.cityName.replace(" ","")+arg.countryCode).append(text);
          }

      });
    });
  }

  function putMap(target1, lat, lng, zoom1){

    var map = new ol.Map({
      "target": target1,
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([lng, lat]),
        zoom: zoom1
      })
    });

  }

  

  function createMasterTemplate( arg ){

    var template = "";
    template += "<div class='container facet'>";
    template += "<div class='row'>";  
      template += "<div class='col-lg-1'>";  
      template += "<img src='https://www.countryflags.io/"+arg.countryCode+"/flat/64.png' style=''>";
      template += "</div>";

      template += "<div class='col-lg-3'>";  
      template += "<h1 class='facetHeading'>"+arg.cityName+"</h1>";
      if( arg.description )
        template += "<p class='facetDescription'>"+arg.description+"</p>";
      
      template += "</div>";

      template += "<div class='col-lg-8'>";  
      if( arg.mapData ){
        template += "<div class='container dataDisplayFacet'>";  
        template += "<div id='map"+arg.cityName.replace(" ","")+arg.countryCode+"' class='map'></div>";      
          template += "<div class='row'>";
            
            template += "<div class='col-lg-3' style='padding: 0;'>";
            template += "<h4 class=' badge badge-warning' style='padding: 10px;'><i class='fas fa-temperature-high'></i> Current Temperature: </h4><h3 class='facetTempDisplay' id='temp"+arg.cityName.replace(" ","")+arg.countryCode+"'></h3>";
            template += "<h4 class=' badge badge-warning' style='padding: 10px;'><i class='fas fa-temperature-high'></i> Feels Like: </h4><h3 class='facetTempDisplay' id='feelsLikeTemp"+arg.cityName.replace(" ","")+arg.countryCode+"'></h3>";

            template += "<h4 class=' badge badge-warning' style='padding: 10px;'><i class='far fa-clock'></i> Pulled At: </h4><h3 class='facetTempDisplay' id='timeofpull"+arg.cityName.replace(" ","")+arg.countryCode+"'></h3>";            
            template += "</div>";

            template += "<div class='col-lg-2' style='padding: 0; text-align: center;' id='icon"+arg.cityName.replace(" ","")+arg.countryCode+"'>";            
            template += "</div>";

            template += "<div class='col-lg-7'>";
            template += "<h4 class='badge badge-danger' style='margin: 0px; padding: 10px; border-radius:0 !important;'><i class='fas fa-chevron-up'></i> Max: <span id='maxtemp"+arg.cityName.replace(" ","")+arg.countryCode+"'></span></h4>";
            template += "<h4 class='badge badge-primary' style='margin: 0px; padding: 10px; border-radius:0 !important;'><i class='fas fa-chevron-down'></i> Min: <span id='mintemp"+arg.cityName.replace(" ","")+arg.countryCode+"'></span></h4>";       
            template += "<h4 class='badge badge-warning' style='margin: 0px; padding: 10px; border-radius:0 !important;'><i class='far fa-eye'></i> Visibility: <span id='visibility"+arg.cityName.replace(" ","")+arg.countryCode+"'></span></h4>";       

            template += "<div class='container'>"
              template += "<div class='row' style='margin: 0; padding: 0;'>"              
                template += "<div class='col-lg-6 alert alert-warning' style='margin: 0px; padding: 10px; border-radius:0 !important;'>"
                template += "Humidity"
                template += "</div>";
                template += "<div class='col-lg-6' style='margin: 0px; padding: 10px; border-radius:0 !important;'>"
                template += "<span id='humidity"+arg.cityName.replace(" ","")+arg.countryCode+"'></span>"   
                template += "</div>";
              template += "</div>";

              template += "<div class='row' style='margin: 0; padding: 0;'>"              
                template += "<div class='col-lg-6 alert alert-warning' style='margin: 0px; padding: 10px; border-radius:0 !important;'>"
                template += "Pressure"
                template += "</div>";
                template += "<div class='col-lg-6' style='margin: 0px; padding: 10px; border-radius:0 !important;'>"
                template += "<span id='pressure"+arg.cityName.replace(" ","")+arg.countryCode+"'></span>"   
                template += "</div>";
              template += "</div>";

              template += "<div class='row' style='margin: 0; padding: 0;'>"              
                template += "<div class='col-lg-6 alert alert-warning' style='margin: 0px; padding: 10px; border-radius:0 !important;'>"
                template += "Wind"
                template += "</div>";
                template += "<div class='col-lg-6' style='margin: 0px; padding: 10px; border-radius:0 !important;'>"
                template += "<span id='wind"+arg.cityName.replace(" ","")+arg.countryCode+"'></span>"   
                template += "</div>";
              template += "</div>";
              
            template += "</div>";

            template += "<h4 class='badge badge-pill badge-light' style='margin: 0px; padding: 10px; border-radius:0 !important;'><i class='far fa-sun'></i> Sunrise: <span id='sunrise"+arg.cityName.replace(" ","")+arg.countryCode+"'></span></h4>";
            template += "<h4 class='badge badge-pill badge-dark' style='margin: 0px; padding: 10px; border-radius:0 !important;'><i class='far fa-moon'></i> Sunset: <span id='sunset"+arg.cityName.replace(" ","")+arg.countryCode+"'></span></h4>";            

            template += "</div>";

          template += "</div>";
        template += "</div>";
      }

      template += "<button cityName='"+arg.cityName+"' countryCode='"+arg.countryCode+"' onclick='forecast(this)' class='btn btn-sm btn-danger' style='margin: 10px;'><i class='fas fa-plus'></i> More</button>";
        
      template += "</div>";

      template += "<div id='forecastdisplay"+arg.cityName.replace(" ","")+arg.countryCode+"' class='container'></div>";
    
    template += "</div>";
    
    template += "</div>";
    return template;

  }

  $(document).ready(function(){

    var masterObject = {      
      cities : [
        {
          "cityName":"New Delhi",
          "countryCode":"IN",
          "description":"New Delhi is an urban district of Delhi which serves as the capital of India and seat of all three branches of the Government of India.",
          "mapData" : {
            "lat": 28.644800,
            "lng" : 77.216721,
            "zoom" : 7
          }
        },
        {
          "cityName":"Kolkata",
          "countryCode":"IN",
          "description":"Kolkata, also known as Calcutta is the capital of the Indian state of West Bengal. According to the 2011 Indian census, it is the seventh most populous city; the city had a population of 4.5 million, while the suburb population brought the total to 14.1 million, making it the third-most populous metropolitan area in India",
          "mapData" : {
            "lat": 22.572645,
            "lng" : 88.363892,
            "zoom" : 7
          }
        },
        {
          "cityName":"Chennai",
          "countryCode":"IN",
          "description":"Chennai, also known as Madras(the official name until 1996), is the capital of the Indian state of Tamil Nadu.",
          "mapData" : {
            "lat": 13.067439,
            "lng" : 80.237617,
            "zoom" : 7
          }
        },
        {
          "cityName":"Mumbai",
          "countryCode":"IN",
          "description":"Mumbai(also known as Bombay, the official name until 1995) is the capital city of the Indian state of Maharashtra. According to United Nations, as of 2018, Mumbai was the second most populous city in India after Delhi and the seventh most populous city in the world with a population of 19.98 million.",
          "mapData" : {
            "lat": 19.076090,
            "lng" : 72.877426,
            "zoom" : 7
          }
        },
        {
          "cityName":"Bangalore",
          "countryCode":"IN",
          "description":"Bangalore, officially known as Bengaluru, is the capital of the Indian state of Karnataka. It has a population of over ten million, making it a megacity and the third-most populous city and fifth-most populous urban agglomeration in India.",
          "mapData" : {
            "lat": 12.972442,
            "lng" : 77.580643,
            "zoom" : 7
          }
        },
        {
          "cityName":"Hyderabad",
          "countryCode":"IN",
          "description":"Hyderabad is the capital and largest city of the Indian state of Telangana and de jure capital of Andhra Pradesh. Occupying 650 square kilometres (250 sq mi) along the banks of the Musi River, located on the Deccan Plateau in the northern part of South India.",
          "mapData" : {
            "lat": 17.387140,
            "lng" : 78.491684,
            "zoom" : 7
          }
        },
        {
          "cityName":"Washington",
          "countryCode":"US",
          "description":"Washington, D.C., formally the District of Columbia and commonly referred to as Washington; D.C.; or the district, is the capital of the United States. Founded after the American Revolution as the seat of government of the newly independent country, Washington was named after George Washington, the first president of the United States and a Founding Father.",
          "mapData" : {
            "lat": 39.014050,
            "lng" : -77.065674,
            "zoom" : 7
          }
        },        
        {
          "cityName":"Atlanta",
          "countryCode":"US",
          "description":"Atlanta is the capital and most populous city in the U.S. state of Georgia. With an estimated 2018 population of 498,044, it is also the 37th most-populous city in the United States. The city serves as the cultural and economic center of the Atlanta metropolitan area, home to 5.9 million people and the ninth largest metropolitan area in the nation. Atlanta is the seat of Fulton County, the most populous county in Georgia. Portions of the city extend eastward into neighboring DeKalb County.",
          "mapData" : {
            "lat": 33.753746,
            "lng" : -84.386330,
            "zoom" : 7
          }
        },
        {
          "cityName":"London",
          "countryCode":"GB",
          "description":"London is the capital and largest city of England and the United Kingdom. Standing on the River Thames in the south-east of England, at the head of its 50-mile (80 km) estuary leading to the North Sea, London has been a major settlement for two millennia. Londinium was founded by the Romans. The City of London, London's ancient core − an area of just 1.12 square miles (2.9 km2) and colloquially known as the Square Mile − retains boundaries that follow closely its medieval limits. The City of Westminster is also an Inner London borough holding city status. Greater London is governed by the Mayor of London and the London Assembly.",
          "mapData" : {
            "lat": 51.509865,
            "lng" : -0.118092,
            "zoom" : 7
          }
        },
      ],      
      init: function(){
        this.cities.forEach(function(currentObject,index){
          console.log(currentObject)
          $(".masterDisplay").append(createMasterTemplate(currentObject))
          if( currentObject.mapData )
            putMap( 
              "map" + currentObject.cityName.replace(" ", "")+currentObject.countryCode,
              currentObject.mapData["lat"],
              currentObject.mapData["lng"],
              currentObject.mapData["zoom"],
            )

          fetchApiCall(currentObject)
        })
      }
    }

    masterObject.init();

  })