import React,{useEffect,useState} from 'react'
import './home.css'
import {FaPlus,FaSearch} from 'react-icons/fa'
import axios from 'axios'

const Home = () => {

    const [inputs,setInputs] = useState({
        title:  "", desc : ""
    })
    const [colorData,setColor]  = useState([])
    const [val,setVal] = useState('')

    useEffect(() => {
      const fetchData = async () =>{
        try {
            const res = await axios.get('https://demo2965432.mockable.io/highon/colors')
            console.log(res)
            setColor(res.data.data)
        } catch (error) {
         console.log(error)
        }
      }
      fetchData()
    }, [])

    const handleChange= (e) =>{
        setInputs((prev)=> ({...prev, [e.target.name] : e.target.value}))
    }
    const handleAdd= (e) =>{
          let userData = {
            title:  inputs.title,
            desc : inputs.desc
          }
        
        setInputs({...inputs, userData})
        alert('data added')
        e.preventDefault()
    }

    const searchHandler= (e) =>{
        if(!val){
            alert('Please enter to search')
        }
        

    
        e.preventDefault()
    }
    
  return (
    <div className='container'>

          <div className="input_Div">
              <FaSearch className='icon'/>
              <input 
                type="text" 
                value={val}
                onChange={searchHandler}
                name="serach"  placeholder="Enter to serach"/>
          </div>

          <div className="form_Container">
                   
                   <div className="color_Div">
                    <select name="color" className='select' onChange={setColor}>
                        {
                            colorData?.map((col,i)=>(
                            <div className='options' key={col.id}>
                             {/* <option className='option' value="Red">
                                <input type="color"  value={col.code}/>
                             </option> */}
                               <input type="color"  value={col.code}/>
                              </div>
                            ))
                            
                        }
                    </select>
                   </div>
                   
                      <input 
                         type="text"
                         value={inputs.title}
                         onChange={handleChange}  
                        name="title" 
                          placeholder='Enter title'/>
                     <textarea  
                        name="desc"
                        value={inputs.desc}
                        onChange={handleChange} 
                          id="" cols="30" rows="10" placeholder='Enter desc'/>

                     <div className="btn_Div">
                        <FaPlus className='plus'/>
                        <button className='add_btn' onClick={handleAdd}>Create a color card</button>
                     </div>
          </div>


          <div className="cardContainer">
                <div className="cards">
                      
                       {/* {inputs.map((item,i)=>(
                        <div className="card">
                           <div className="color"></div>

                        </div>
                       ))} */}

                </div>
          </div>
    </div>
  )
}

export default Home