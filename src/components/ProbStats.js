import React,{useState,useEffect} from "react"
import {useSelector} from "react-redux"
import Navbar from "./Navbar"
import axios from "axios"
import {link} from "../base_url"
import "../App.css"
import { keys } from "../keys"
const ProbStats=()=>{

    const [data,setData]=useState([])
    const [tests,setTests]=useState([])
    const [test,setTest]=useState([])
    const [maindata,setMainData]=useState([])
 const click1=()=>{
  let c=0;
  let c1=0
if(maindata.length>0){
  let g=maindata[0];

  g && g.all_topics.forEach(e=>{
    let sum=0;

   e && e.all_series.forEach(k=>{
     sum+= k.problem_count
    })
    e['nProblem']=sum;
    if(e.topic.lang=="en")
    c+=sum;
    else
    c1+=sum;
  })
g['nProblemEN']=c; 
g['nProblemBN']=c1; 
  let b=[]
  b.push(g)
  console.log(b);
  setData(b)
document.getElementById("1").classList.add("active");
document.getElementById("2").classList.remove("active");
document.getElementById("3").classList.remove("active");
document.getElementById("4").classList.remove("active");
}

 }   
 const click2=()=>{
  let g=maindata[1];
  let b=[]
  let c=0;
  let c1=0;
 

  g.all_topics.forEach(e=>{
    let sum=0;
    e.all_series.forEach(k=>{
     sum+= k.problem_count
    })
    
    
    e['nProblem']=sum;
     if(e.topic.lang=="en")
    c+=sum;
    else
    c1+=sum;
    
  })

  g['nProblemEN']=c; 
  g['nProblemBN']=c1; 
  b.push(g)
  setData(b)
  document.getElementById("2").classList.add("active");
  document.getElementById("1").classList.remove("active");
document.getElementById("3").classList.remove("active");
document.getElementById("4").classList.remove("active");
  
   }  

   const click3=()=>{
    let g=maindata[2];

    let b=[]
    
    
let c=0;
let c1=0;
  g.all_topics.forEach(e=>{
    let sum=0;
    e.all_series.forEach(k=>{
     sum+= k.problem_count
    })
    e['nProblem']=sum;
      if(e.topic.lang=="en")
    c+=sum;
    else
    c1+=sum;

  
  })

  g['nProblemEN']=c; 
  g['nProblemBN']=c1; 
    b.push(g)
    setData(b)
    document.getElementById("3").classList.add("active");
    document.getElementById("1").classList.remove("active");
document.getElementById("2").classList.remove("active");
document.getElementById("4").classList.remove("active");
     }  
     const click4=()=>{
      let g=maindata[3];
  
      let b=[]
      
      
  let c=0;
  let c1=0;
    g.all_topics.forEach(e=>{
      let sum=0;
      e.all_series.forEach(k=>{
       sum+= k.problem_count
      })
      e['nProblem']=sum;
        if(e.topic.lang=="en")
      c+=sum;
      else
      c1+=sum;
  
    
    })
  
    g['nProblemEN']=c; 
    g['nProblemBN']=c1; 
      b.push(g)
      setData(b)
      console.log(b)
      document.getElementById("4").classList.add("active");
      document.getElementById("1").classList.remove("active");
  document.getElementById("2").classList.remove("active");
  document.getElementById("3").classList.remove("active");

       }  

const click5 =(id)=>{


  axios({
          method: 'get',
          url: link.url+'api/tests/getTopicsSeries',
    
          headers: {
            'authorization': keys.authorization,
            
          }
        }).then(res => {console.log(res.data);
        
          let b=[]
      
      
  let c=0;
  let c1=0;
  res.data.data.filter(e=>e.test.test_id==id).forEach(d=>{
      d.all_topics.forEach(e=>{
      let sum=0;
      e.all_series.forEach(k=>{
       sum+= k.problem_count
      })
      e['nProblem']=sum;
      c+=sum;
       
    
    })
   d['nProblemEN']=c;
    })
   
      b.push(res.data.data.filter(e=>e.nProblemEN>=0)[0])
     
        
        
        
     console.log(b)   

     setData(b)
        
        
        
        
        
        })
      
      


}

    useEffect(()=>{

      axios({
            method: 'get',
            url: link.url+'api/tests/getTopicsSeries',
      
            headers: {
              'authorization': keys.authorization,
              
            }
          }).then(res => {setTests(res.data.data)})
        
        
        


        axios({
            method: 'get',
            url: link.url+'admin/getLevelsTopicsSeries',
      
            headers: {
              'authorization': keys.authorization,
              
            }
          }).then(res => { 
            
            res.data.forEach(data=>{
              data.all_topics.forEach(topic=>{
                topic.all_series.sort((a, b) => {
                  const nameA = a.name.toUpperCase(); // ignore upper and lowercase
                  const nameB = b.name.toUpperCase(); // ignore upper and lowercase
                  if (nameA < nameB) {
                    return -1;
                  }
                  if (nameA > nameB) {
                    return 1;
                  }
                  // names must be equal
                  return 0;
                })
                
              })


            })
            setMainData(res.data) }); 
      
        
        },[]) 
return (
<div>
<Navbar/>
<h2 style={{marginBottom:"30px"}}>Problem Stats </h2>
<ul class="nav nav-tabs" style={{cursor:"pointer"}}>
  <li class="nav-item ">
    <a id="1" class="nav-link " onClick={click1} >Level-1</a>
  </li>
  <li class="nav-item">
    <a id="2" class="nav-link" onClick={click2} >Level-2</a>
  </li>
  <li class="nav-item">
    <a id="3" class="nav-link"  onClick={click3} >Level-3</a>
  </li>
  <li class="nav-item">
    <a id="4" class="nav-link"  onClick={click4} >Level-4</a>
  </li>
  <li class="nav-item">
  <div class="d">
  {/* <label for="exampleInput1">Language (en or bn) </label> */}
    {/* <input onChange={(e)=>setLang(e.target.value)} style={{width:"50%",margin:"auto"}} type="text" class="form-control" id="exampleInput1" aria-describedby="emailHelp" /> */}
  <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example"
  
  value={test}
  onChange={(e)=>{setTest(e.target.value);click5(e.target.value)}}
  >
    <option >Select Online Test</option>

    {
    tests && tests.map(test=>{

return (

<>

 <option value={test.test.test_id}>{test.test.name}</option>

</>

)




      })
    }

  


</select>
  </div>
  
  </li>
  </ul>
  <br/>
  <div style={{marginTop:"30px"}}>
 <h4> English Version:</h4>
 </div>
<table class="table table-bordered"  style={{marginTop:"50px"}}>
  <thead>
    <tr>
   
    
      <th scope="col">Topics</th>
      <th scope="col">Serieses</th>
      <th scope="col">Problem Count</th>
      
      <th scope="col">Topic Wise Count</th>
    </tr>
  </thead>
  {data && data.map((e,i)=>(

 e && e.all_topics.filter(e=>e.topic.lang=="en").map(topic=>(

    <>

<tr>


<td  id="td" rowspan={topic.all_series.length} scope="col" >{topic.topic.name} </td>
<td>{topic.all_series[0].name}</td> 
<td>{topic.all_series[0].problem_count}</td>

  <td  id="td" rowspan={topic.all_series.length}>
    {topic.nProblem}
  </td>

</tr>
{topic.all_series.slice(1).map(s=>(
  <>
<tr>
 <td>{s.name}</td> 
 <td>{s.problem_count}</td>

 

 </tr>

 
  </>
  ))
}



    </>

  ))



  ))}
  {data.length>0?<tr>
    <td></td> 
    <td></td> 
    <td>Total Problems : </td>
    <td> {data.length>0? data[0].nProblemEN:null}</td>
   
    </tr>
  
  :null
  }

</table>
<div style={{marginTop:"30px"}}>
 <h4> Bangla Version:</h4>
 </div>
<table class="table table-bordered"  style={{marginTop:"50px"}}>
  <thead>
    <tr>
   
    
      <th scope="col">Topics</th>
      <th scope="col">Serieses</th>
      <th scope="col">Problem Count</th>
      
      <th scope="col">Topic Wise Count</th>
    </tr>
  </thead>
  {data && data.map((e,i)=>(

 e && e.all_topics.filter(e=>e.topic.lang=="bn").map(topic=>(

    <>

<tr>


<td  id="td" rowspan={topic.all_series.length} scope="col" >{topic.topic.name} </td>
<td>{topic.all_series[0].name}</td> 
<td>{topic.all_series[0].problem_count}</td>

  <td  id="td" rowspan={topic.all_series.length}>
    {topic.nProblem}
  </td>

</tr>
{topic.all_series.slice(1).map(s=>(
  <>
<tr>
 <td>{s.name}</td> 
 <td>{s.problem_count}</td>

 

 </tr>

 
  </>
  ))
}



    </>

  ))



  ))}
  {data.length>0?<tr>
    <td></td> 
    <td></td> 
    <td>Total Problems : </td>
    <td> {data.length>0? data[0].nProblemBN:null}</td>
   
    </tr>
  
  :null
  }

</table>
</div>
	)

}
export default ProbStats;