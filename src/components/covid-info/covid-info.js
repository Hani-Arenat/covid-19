import React, {useState,useEffect} from 'react'
import {Bar} from 'react-chartjs-2';
import './covid-info.css'
const TimeSeries = (props)=>{
    const [bar,setBar] = useState([])
    const [dataSet,setDataSet] = useState({
        labels: ['TotalConfirmed','TotalRecovered','TotalDeaths'],
        datasets: [
          {
            label: 'Global Information',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: []
          }
        ]
      })

      useEffect(()=>{
        
           if(Object.keys(props.summary).length){
            let allDataSet = {...dataSet};
            allDataSet.datasets[0].data.push(props.summary.Global.TotalConfirmed);
            allDataSet.datasets[0].data.push(props.summary.Global.TotalRecovered);
            allDataSet.datasets[0].data.push(props.summary.Global.TotalDeaths);
            
            setDataSet(allDataSet)

            let myBar = <Bar
            data={dataSet}
            options={{
              title:{
                display:true,
                text:'Covid-19 Global Information',
                fontSize:20
              },
              legend:{
                display:true,
                position:'right'
              }
            }}
          />
            setBar(myBar)
           }
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [props.summary])
    
  
    return(
        <div className="info-chart">
        {bar}
      </div>
    )
}

export default TimeSeries