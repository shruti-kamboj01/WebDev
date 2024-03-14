import React, { useState } from 'react'




const RequirementField = ({label, name, value,placeholder, errors, register}) => {

  const[fields, setField] = useState("");
  const [requirement, setRequirements] = useState([])

  const handleAddFields = () => {
      if(fields)
      setField([...requirement, fields])
      setField("")
  }

  function removeField(i) {
    setField(fields.filter((ele, index) => index !== i))
  }
  return (
    <div className=''>
       <label className='label-style'>{label} <span className="text-pink-200 text-xs">*</span></label>
     
       <input 
       className='form-style w-full'
       name={name}
       value={requirement}
       placeholder={placeholder}
       onChange={(e) => setRequirements(e.target.value)}

       />
       <button className='text-yellow-100 text-base' onClick={handleAddFields}>Add</button>
       {fields.length > 0 && (
        fields.map((ele, i) => {
         return (
          <div key={i}>
             <span>{ele}</span> 
             <span className='text-richblack-200 text-sm'
             onClick={()=> removeField(i)} >Clear</span> 
          </div>
         )
       }))}
       
       
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
        {label} is required</span>
      )
      }

    </div>
  )
}

export default RequirementField