import React, { useState, useEffect } from 'react'

const Pagination = (props) => {
    const [allTableRows, setAllTableRows] = useState([]);
    const [allTableRowsSaved, setAllTableRowsSaved] = useState([]);
    const [currentData, setCurrentData] = useState([]);
    const [pagesRange, setPagesRange] = useState([1, 2, 3, 4]);
    const [currentPage, setcurrentPage] = useState(1);
    const [inputData, setInputData] = useState(0);

    useEffect(() => {
        setAllTableRows(props.data);
        setAllTableRowsSaved(props.data);
        let dataToShow = [...allTableRows];
        dataToShow = dataToShow.splice(0, 10);
        setCurrentData(dataToShow)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allTableRowsSaved, props.data])

    useEffect(() => {
        setAllTableRows(allTableRows);
    }, [allTableRows])

    const changeTableData = (num) => {
        let myDataToShow = [...allTableRows];

        if (num === 1) {
            myDataToShow = myDataToShow.splice(0, 10);
        } else {
            // debugger
            myDataToShow = myDataToShow.splice(((num - 1) * 10), 10);
        }
        setcurrentPage(num)
        setCurrentData(myDataToShow)
    }

    const lastPage = () => {
        nextPage(true);
    }
    const firstPage = () => {
        previousPage(true);
    }
    const nextPage = (num = null) => {
        let myDataToShow = [...allTableRows];
        if (!num) {
            let myNewPage = currentPage + 1;
            myDataToShow = myDataToShow.splice(((myNewPage - 1) * 10), 10);

            if (currentPage === pagesRange[pagesRange.length - 1]) {
                let myPagesRange = [...pagesRange];
                myPagesRange.push(pagesRange[pagesRange.length - 1] + 1);
                myPagesRange.shift();
                // debugger
                setPagesRange(myPagesRange)
            }
            setcurrentPage(myNewPage)
            setCurrentData(myDataToShow)
        } else {

            let myNewPage = Math.ceil(allTableRows.length / 10);
            myDataToShow = myDataToShow.splice(((myNewPage - 1) * 10), 10);
            
            let myNewRanges = [];
            for (let i = myNewPage,j=1; i >0 && j<=4 ; i--,j++) {
                myNewRanges.unshift(i)
            }

            setcurrentPage(myNewPage)
            setCurrentData(myDataToShow)
            setPagesRange(myNewRanges)
        }
    }

    const previousPage = (num = null) => {
        let myDataToShow = [...allTableRows];
        if (!num) {
            let myNewPage = currentPage - 1;
            if (myNewPage === 1) {
                myDataToShow = myDataToShow.splice(0, 10);
            } else {
                // debugger
                myDataToShow = myDataToShow.splice(((myNewPage - 1) * 10), 10);
            }

            if (currentPage === pagesRange[0]) {
                let myPagesRange = [...pagesRange];
                myPagesRange.unshift(pagesRange[0] - 1);
                myPagesRange.pop();

                setPagesRange(myPagesRange)
            }
            setcurrentPage(myNewPage)
            setCurrentData(myDataToShow)
        } else {
            let newPagesRange = Math.ceil(allTableRows.length / 10);
            myDataToShow = myDataToShow.splice(0, 10);

            let myNewRanges = [];
            for (let i = 1; i <= newPagesRange && i <= 4; i++) {
                myNewRanges.push(i)
            }

            setcurrentPage(1)
            setCurrentData(myDataToShow)
            setPagesRange(myNewRanges)

        }
    }

    const updatePagesRange = (filterdData) => {
        let newPagesRangeLength = Math.ceil(filterdData.length / 10);
        let newPagesRange = [];

        for (let p = 1; p <= newPagesRangeLength && p <= 4; p++) {
            newPagesRange.push(p)
        }
        // debugger
        setPagesRange(newPagesRange)
    }

    const filterData = (event) => {
        if (event.target.value.length === 0) {

            setInputData(0)
            setAllTableRows(allTableRowsSaved);
            updatePagesRange(allTableRowsSaved);
            changeTableData(1);
            let originalData = [...allTableRowsSaved]
            let dataToShow = originalData.splice(0, 10);
            setCurrentData(dataToShow);
            
        } else {
            setInputData(1)
            let AllData = [...allTableRowsSaved];
            let filterdData = AllData.filter(el => {
                return el.Country.includes(event.target.value)
            });
            
            let filterdDataToShow = [...filterdData].splice(0, 10);

            setAllTableRows(filterdData);
            updatePagesRange(filterdData);
            setCurrentData(filterdDataToShow);
            setcurrentPage(1)

        }

    }

    const checkLength = () => {
        // debugger
        return (currentPage === Math.ceil(allTableRows.length / 10)) || (allTableRows.length === 0)

    }
    return (
        <div className="data-table">
            <div className="search-input-parent">
                <span>Search </span><input type="text" placeholder="Country Name" onChange={(event) => filterData(event)} />
            </div>
            <table>
                <tbody>
                    <tr>
                        <th>id</th>
                        <th>Country Name</th>
                        <th>New Confirmed</th>
                        <th>Total Confirmed</th>
                        <th>New Deaths</th>
                        <th>New Recovered</th>
                        <th>Total Recovered</th>
                    </tr>
                    {currentData.length !==0 ? currentData.map((el, index) => {
                         return (
                            <tr key={index + el.Country}>
                                <td>{el.id}</td>
                                <td>{el.Country}</td>
                                <td className={el.NewConfirmed.highest && !inputData ? 'yellow-cell' : ''}>{el.NewConfirmed.data}</td>
                                <td>{el.TotalConfirmed}</td>
                                <td className={el.NewDeaths.highest && !inputData ? 'red-cell' : ''}>{el.NewDeaths.data}</td>
                                <td className={el.NewRecovered.highest && !inputData ? 'green-cell' : ''}>{el.NewRecovered.data}</td>
                                <td>{el.TotalRecovered}</td>
                            </tr>
                        )
                    }) : <tr><td className="no-data-available" colSpan="7">No Data Available</td></tr> }
                    
                </tbody>
            </table>
            <div className="pagination">
                <span onClick={() => firstPage()} className={currentPage === 1 || allTableRows.length === 0 ? 'disable-span' : ''}>First</span>
                <span onClick={() => previousPage()} className={currentPage === 1 || allTableRows.length === 0 ? 'disable-span' : ''}>Previous</span>
                {
                    pagesRange.map((el, index) => {
                        return (<span className={currentPage === el ? 'currentPage' : ''} key={index} onClick={() => changeTableData(el)}>{el}</span>)
                    })
                }
                <span onClick={() => nextPage()} className={checkLength() ? 'disable-span' : ''}>Next</span>
                <span onClick={() => lastPage()} className={checkLength() ? 'disable-span' : ''}>Last</span>
            </div>
        </div>
    )
}


export default Pagination;