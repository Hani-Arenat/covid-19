import React,{useEffect,useState} from 'react'
import Pagination from './Pagination'
import './covid-data-table.css'



const DataTable = (props)=>{
    
     const [tableRows,setTableRows] = useState([]);

      useEffect(()=>{
          
        if (props.summary && props.summary.Countries) {
          let dataRows = props.summary.Countries
          let myRows = []
          for (let i in dataRows) {

            myRows.push(
              { 
                "id":i,
                "Country": dataRows[i].Country,
                "NewConfirmed": {data:dataRows[i].NewConfirmed,highest:false},
                "TotalConfirmed": dataRows[i].TotalConfirmed,
                "NewDeaths": {data:dataRows[i].NewDeaths,highest:false},
                "NewRecovered": {data:dataRows[i].NewRecovered,highest:false},
                "TotalRecovered": dataRows[i].TotalRecovered
              }
            )
          }
    
          setTableRows(myRows);
          setHighestData(myRows);
    
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [props.summary])
      
      const getMax = (numaricArray)=>{
        let max = numaricArray.reduce(function(a, b) {
          return Math.max(a, b);
        });
        
        return max;
      }

      const setHighestData = (dataRows)=>{
        let res = [];
        
        for(let i=0; i < dataRows.length;){
          let arr = dataRows.splice(i,10)
          
          let numaricArray = arr.map(el=> el.NewConfirmed.data);
          let maxVal = getMax(numaricArray)
          let highestElementIndex = arr.findIndex(el=> el.NewConfirmed.data === maxVal);
          arr[highestElementIndex].NewConfirmed.highest = true;

          numaricArray = arr.map(el=> el.NewRecovered.data);
          maxVal = getMax(numaricArray)
          highestElementIndex = arr.findIndex(el=> el.NewRecovered.data === maxVal);
          arr[highestElementIndex].NewRecovered.highest = true;

          numaricArray = arr.map(el=> el.NewDeaths.data);
          maxVal = getMax(numaricArray)
          highestElementIndex = arr.findIndex(el=> el.NewDeaths.data === maxVal);
          arr[highestElementIndex].NewDeaths.highest = true;
          
          res.push(arr)
        }

        let finalArray = Array.prototype.concat(...res);
        setTableRows(finalArray)
      }
       
      return (
        <div className="covid-table-page">
        <h1>Covid-19 Data Table</h1>
        <Pagination data={tableRows} />
        </div>
      )
    }
    

export default DataTable;