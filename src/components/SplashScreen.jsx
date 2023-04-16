import { React, useState} from 'react'
import Combobox from "react-widgets/Combobox";
import "react-widgets/styles.css";
import { state } from "../state";
import { useSnapshot } from "valtio";
import NumberPicker from "react-widgets/NumberPicker";
import DatePicker from "react-widgets/DatePicker"
import ourJson from '../schoolAndId';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const schoolArr = ourJson

// const data = [
//   {
//     name: 'Page A',
//     field1: 4000,
//     field2: 2400,
//     amt: 2400,
//   },
//   {
//     name: 'Page B',
//     field1: 3000,
//     field2: 1398,
//     amt: 2210,
//   },
//   {
//     name: 'Page C',
//     field1: 2000,
//     field2: 9800,
//     amt: 2290,
//   },
//   {
//     name: 'Page D',
//     field1: 2780,
//     field2: 3908,
//     amt: 2000,
//   },
//   {
//     name: 'Page E',
//     field1: 1890,
//     field2: 4800,
//     amt: 2181,
//   },
//   {
//     name: 'Page F',
//     field1: 2390,
//     field2: 3800,
//     amt: 2500,
//   },
//   {
//     name: 'Page G',
//     field1: 3490,
//     field2: 4300,
//     amt: 2100,
//   },
// ];

// export default class Example extends PureComponent {
//   static demoUrl = 'https://codesandbox.io/s/simple-line-chart-kec3v';

//   render() {
//     return (
//       <ResponsiveContainer width="100%" height="100%">
//         <LineChart
//           width={500}
//           height={300}
//           data={data}
//           margin={{
//             top: 5,
//             right: 30,
//             left: 20,
//             bottom: 5,
//           }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Line type="monotone" dataKey="field2" stroke="#8884d8" activeDot={{ r: 8 }} />
//           <Line type="monotone" dataKey="field1" stroke="#82ca9d" />
//         </LineChart>
//       </ResponsiveContainer>
//     );
//   }
// }


  // for (let year of yearArr){
  //   getIDQuery(schoolName,year, endPoint).then(
  //     schoolId => {
  //       console.log(schoolId)
  //       getFinanceQuery(schoolId, year).then(financeInfo => resultArr = resultArr.push(financeInfo['result'])).then(info => console.log(resultArr))}
  //   )
  // }


// const getFinanceQuery = (schoolID, year) => {
//   let getFinanceInfoURL = "https://educationdata.urban.org/api/v1/college-university/ipeds/"
//   getFinanceInfoURL = getFinanceInfoURL.concat("finance/",year,"/?unitid=",schoolID)
//   console.log(getFinanceInfoURL)
//   return fetch(getFinanceInfoURL).then(function (response){
//     return response.json()})}



// const getIDQuery = (schoolName, year,endPoint) => {
//   let getIdURL = "https://educationdata.urban.org/api/v1/college-university/ipeds/"
//   getIdURL = getIdURL.concat(endPoint,"/",year,"/")
//   // console.log("New Query for ", schoolID, year, endPoint)
//   return fetch(getIdURL).then(function (response) {
//       return response.json()}).then(dataReceived => {
//         for (let result of dataReceived['results']){
//           console.log(result['inst_name'])
//           if (result['inst_name'] == schoolName) {
//             return (result['unitid'])
//             break
//           }
//           else{
//             console.warn('No school found')
//           }
//         }}
//       ).catch(function (err) {
//       // There was an error
//       console.warn('Something went wrong.', err);}); 
//     }
  

const dictionaryForInput = 
{"Total annual revenue": "rev_total_current",
    "Net assets": "assets_net",
    "Net annual income": "income_net",
    "Net tuition revenues":	"rev_tuition_fees_net",
"Total annual expenses":	"exp_total_current"
  }




const SplashScreen = () => {
  const [queriedData, setQueriedData] = useState([])
  const [isGraph, setIsGraph] = useState(false)
  const [graphData, setGraphData] = useState([
    {
      name: 'Page A',
      field1: 4000,
      field2: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      field1: 3000,
      field2: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      field1: 2000,
      field2: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      field1: 2780,
      field2: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      field1: 1890,
      field2: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      field1: 2390,
      field2: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      field1: 3490,
      field2: 4300,
      amt: 2100,
    },
  ])
  const [firstCombo, setFirstCombo] = useState('')
  const [secondCombo, setSecondCombo] = useState('')
  const [isLoading, setLoading] = useState(false)


  const handleQuery = (schoolName, start, end) => {
    // let year = 2013
    // let schoolId = 121257
    setLoading(true)
    let endPoint = "directory"
    let resultArr = []
    let yearArr = []
    let startDate = start.getFullYear()
    let endDate = end.getFullYear()
    console.log(startDate)
    console.log(endDate)
    let schoolId = ""
    for (let values of Object.entries(ourJson)){
      console.log(values)
      if (values[0] == schoolName){
        schoolId = values[1]
        break
      }
    }
    console.log(schoolId)
    getFinanceQueryRecursive(schoolId, startDate, endDate, resultArr).then(dataReturned => {
          state.isSplashScreen = false
          console.log("The query result is ")
          console.log(state.queryResult)
        })
    }
  
  const getFinanceQueryRecursive = (schoolID, year, end, result) => {
    if (year > end){
      state.queryResult = result
      console.log("The result returned is ")
      console.log(result[0][0])
      setQueriedData(result[0])
      setIsGraph(true)
      let newGraphData = []
      console.log("This is the altered state info")
      for (let entry of result){
        console.log("This is the current entry")
        console.log(entry)
        newGraphData.push({
          name: entry[0]['year'],
          field1: entry[0][dictionaryForInput[firstCombo]],
          field2: entry[0][dictionaryForInput[secondCombo]],
          amt: 2200
        })
        setLoading(false)
      }
      console.log(newGraphData)
      setGraphData(newGraphData)
      return result
    }
  
    let getFinanceInfoURL = "https://educationdata.urban.org/api/v1/college-university/ipeds/"
    getFinanceInfoURL = getFinanceInfoURL.concat("finance/",year,"/?unitid=",schoolID)
    console.log(getFinanceInfoURL)
    console.log("Is the url")
    return fetch(getFinanceInfoURL).then(function (response){
      return response.json()}).then(data => {
        console.log(data['results'])
        getFinanceQueryRecursive(schoolID, year + 1, end, result.concat([data['results']]))
      })}







 
  const stateInfo = useSnapshot(state);
  return (
    <div className='flex font-Inter flex-row'>
        <div className='flex gap-3 flex-col w-2/4 p-5'>
            <div className='text-zinc-300 text-4xl'>Social Equity lookup</div>

            <div className='text-zinc-300 text-2xl'>Built during a 5C Hackathon, this is a webapp to see statistics for different schools using IPEDS dataset. The range for all college datasets is from 2003 to 2017. If it is taking a while to load please don't click go again, we are gathering the data using the API!</div>
            <div>
            <Combobox
                hideCaret
                hideEmptyPopup
                data={Object.keys(schoolArr)}
                value={stateInfo.schoolName}
                placeholder="School Name"
                onChange={schoolName => state.schoolName = schoolName}/>
            <div className='flex gap-32 py-5 flex-row justify-center'>
              
              {/* <input onChange={startYear => state.startYear = startYear} value={stateInfo.startYear} placeholder='Start Year' className='text-zinc-700 text-2xl rounded-md'/>

              <input onChange={endYear => state.endYear = endYear} value={stateInfo.endYear}  placeholder='End Year' className='text-zinc-700 text-2xl rounded-md'/> */}

              {/* <NumberPicker 
              onChange={startYear => state.startYear = startYear} 
              value={stateInfo.startYear}
              placeholder='Set Start Year'
              defaultValue={2017}
              format={"-$#,###.00"} /> */}

              <DatePicker
                  onChange={startYear => state.startYear = startYear} value={stateInfo.startYear}
                  defaultValue={new Date('December 17, 2003 03:24:00')}
                  valueFormat={{ year: "numeric" }}
                  calendarProps={{ views: ["decade"] }}
                />

              <DatePicker
              onChange={endYear => state.endYear = endYear} value={stateInfo.endYear} 
                  defaultValue={new Date('December 17, 2017 03:24:00')}
                  valueFormat={{ year: "numeric" }}
                  calendarProps={{ views: ["decade"] }}
                />    

    


            </div>
            
            <Combobox
                  hideEmptyPopup
                  data={Object.keys(dictionaryForInput)}
                  onChange={value => setFirstCombo(value)} value={firstCombo}
                  defaultValue={''}
                  
                  // valueFormat={{ year: "numeric" }}
                  // calendarProps={{ views: ["decade"] }}
                  placeholder='field1'
                />

              <Combobox
              hideEmptyPopup
              data={Object.keys(dictionaryForInput)}
              onChange={value => setSecondCombo(value)} value={secondCombo}
              defaultValue={''}
              placeholder='field2'
                  // valueFormat={{ year: "numeric" }}
                  // calendarProps={{ views: ["decade"] }}
                />

            <button onClick={() => {handleQuery(stateInfo.schoolName, stateInfo.startYear, stateInfo.endYear)}} className='text-zinc-300 bg-slate-700 text-2xl rounded-md'>Go!</button>
            {/* <button onClick={() => console.log(queriedData)}>Press me!</button> */}
            {isLoading && <div className='text-zinc-300 text-2xl'>Loading!</div>}

            </div>


        
        
        
        </div>

        <div className='ml-20 flex-2'>
         <div>
          <LineChart
          width={500}
          height={300}
          data={ 
              graphData
              
            


          }
        // }
          margin={{
            top: 5,
            right: 30,
            left: 40,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="field1" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="field2" stroke="#82ca9d" />
        </LineChart>
         </div>
          <a className='text-zinc-300 text-2xl' href='https://docs.google.com/spreadsheets/d/1_Htj6foIGgFBatEAXnPqFrJmBwkPn5uWrzckCox4VK4/edit#gid=0'>Click here to view more information</a>
        </div>
    </div>
  )
}

export default SplashScreen