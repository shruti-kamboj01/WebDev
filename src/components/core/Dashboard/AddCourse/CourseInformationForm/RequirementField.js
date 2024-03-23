import React, { useState,useEffect } from 'react'

const RequirementField = ({label, name, value,placeholder, errors, register,setValue}) => {

  const[fields, setField] = useState("");
  const [requirement, setRequirements] = useState([])

  useEffect(() => {
    setValue(name, requirement)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requirement])

  const handleAddFields = () => {
      if(fields)
      setRequirements([...requirement, fields])
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
       value={fields}
       placeholder={placeholder}
       onChange={(e) => setField(e.target.value)}

       />
       <button className='text-yellow-100 text-base' onClick={handleAddFields}>Add</button>
       {requirement.length > 0 && (
       <ul>
        {
          requirement.map((fields, i) => (
         
          <div key={i} className='flex gap-x-3 items-center'>
             <span className='text-base font-medium'>{fields}</span> 
             <span className='text-richblack-200 text-sm font-medium'
             onClick={()=> removeField(i)} >Clear</span> 
          </div>
         
          ))}
       </ul>
       )}
       
       
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
        {label} is required</span>
      )
      }

    </div>
  )
}

export default RequirementField