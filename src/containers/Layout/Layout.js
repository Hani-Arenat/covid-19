import React,{useEffect,useState} from 'react'
import TimeSeries from '../../components/covid-time-series/covid-time-series';
import CovidInfo from '../../components/covid-info/covid-info';
import DataTable from '../../components/covid-data-table/covid-data-table'
import {Route,Switch} from "react-router-dom"

import './Layout.css'

const Layout = props =>{
    const [summaryData,setSummaryData] = useState({})

  useEffect(()=>{
    fetch('https://api.covid19api.com/summary')
    .then(res=>res.json())
    .then(data=>{
        
      setSummaryData(data)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
    return(
        
        <div className="layout">
            <Switch>
            <Route exact path="/" component={()=> <DataTable summary={summaryData} /> } />
            <Route path="/CovidInfo" component={()=> <CovidInfo summary={summaryData} />} />
            <Route path="/TimeSeries" component={TimeSeries} />
            </Switch>
        </div>
    
    )
}

export default Layout;