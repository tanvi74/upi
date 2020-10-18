import React ,{useState} from 'react';
import XLSX from 'xlsx';
import axios from 'axios';

const CsvData = (props) => {

    const [file,setFile] = useState("");
    const [json,setJson] = useState([]);
    const [limit,setLimit] = useState(0);
    const [avg,setAvg] = useState(0);

    const onChange = async (e) => {
        e.preventDefault();
        setFile(e.target.files[0]);
        var selectedFile = e.target.files[0];
        var reader = new FileReader();
        reader.readAsBinaryString(selectedFile);
        reader.onload = async function(event) {
          var dataa = event.target.result;
          var workbook = XLSX.read(dataa, {
            type: 'binary',
          });
          var XL_row_object = XLSX.utils.sheet_to_row_object_array(
            workbook.Sheets[workbook.SheetNames[0]], {raw: false}
          );
          var json_object = XL_row_object;
        //   console.log(json_object)
          if (json_object) setJson([...json_object]);
          const url = `${window.apiHost}/user/data`;
            const data={
                json_object: json_object,
                username: props.username,
                name: props.name,
                accountNumber: props.accountNumber
            }
            const resp = await axios.post(url,data);
            console.log(resp.data);
        MonthlyBalance(json_object);
        };
        
      };


      const MonthlyBalance = (json) =>{
            json.shift();
            const balance = [0,0,0,0,0,0,0,0,0,0,0,0];

            // Calculating Monthly Balance

            json.forEach((item)=>{
                const [month,date,year] = item.Date.split('/');
                const m = Number(month);
                console.log(m,typeof(m));
                if(item.Withdraw!==undefined){
                    const amt = Number(item.Withdraw);
                    balance[m]-= amt;
                }

                if(item.Deposit!==undefined){
                    const amt = Number(item.Deposit);
                    balance[m]+= amt;
                }
            })   

            console.log(balance);
            

            // Calculating Average Monthly Balance
            let avg = 0;
            balance.forEach((item)=>{
                avg = avg+item;
            })
           console.log(avg);
           avg = avg/12;
            setAvg(avg);

            // Calculating Credit Limit    
           let creditLimit = avg*1.2;
           console.log(creditLimit);

           setLimit(creditLimit);

      }

    return (
        <div>
             <input type="file" onChange={onChange} accept=".xls, .xlsx, .csv" id="fileup"/>
                <h4>Average Monthly Balance: {avg}</h4>
                <h4>Credit Limit: {limit}</h4>
                
                {limit===0 ? null : limit<0 ? <><h4>Your account is having insufficient balance</h4></> : <><h4>Your account is sufficient balance</h4></>

                }
        </div>
    )
}

export default CsvData


