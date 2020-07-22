import React, {useState,useEffect} from 'react'
import {Line} from 'react-chartjs-2';
import './covid-time-series.css'
const TimeSeries = (props)=>{

    const [dataSet,setDataSet] = useState({
        labels: [],
        datasets: [
          {
            label: 'Average Cases',
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: []
          }
        ]
      })

      useEffect(()=>{
        fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=90')
        .then(res=>res.json())
        .then(data=>{
            let allDataSet = {...dataSet};
            let dates =Object.keys(data.cases);
           
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            let months = new Map();
            let monthCounts = new Map();
            dates.forEach((dateString)=>{
                
                let myDate = monthNames[new Date(dateString).getMonth()];
                if(months.has(myDate)){
                    months.set(myDate, months.get(myDate)+data.cases[dateString]);
                    monthCounts.set(myDate, monthCounts.get(myDate)+1);
                    
                }else{
                    months.set(myDate, data.cases[dateString]);
                    monthCounts.set(myDate,1)
                }

            })
            
            for (var [key, value] of months) {
                allDataSet.labels.push(key);
                allDataSet.datasets[0].data.push((value/monthCounts.get(key)).toFixed(0));// avg
            }
            
            
            setDataSet(allDataSet)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
    
  
    return(
        <div className="time-series-line-chart">
        <Line
          data={dataSet}
          options={{
            title:{
              display:true,
              text:'Covid-19 Time Series Chart',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
    )
}

export default TimeSeries