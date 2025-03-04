import {React, useEffect} from 'react'
import { useForm,useFieldArray, Field, FieldErrors } from 'react-hook-form'
import {DevTool} from '@hookform/devtools'
let renderCount =0;
type formValues = {
  username: string;
  email: string;
  channel: string;
  social:{
    twitter:string;
    facebook:string;
  }
  phoneNumbers: string[];
  phNumbers: {
    number: string;
  }[];
  age:number;
  dob:Date;
}
export const YoutubeForm = () => {

  const form = useForm<formValues>({
    defaultValues:{
      username:'Luffy',
      email:'',
      channel:'',
      social:{
        twitter:'',
        facebook:''
    },
    phoneNumbers:['',''],
    phNumbers:[{number:''}],
    age:0,
    dob:new Date(),
  },
  mode:'all',
})
  const { register, control,handleSubmit,formState ,watch,  getValues,setValue,reset,trigger } = form;
  const {errors,touchedFields,dirtyFields,isDirty,isValid,isSubmitting ,isSubmitted,isSubmitSuccessful,submitCount} = formState;

  // console.log("touchh",touchedFields,dirtyFields,isDirty,isValid)
  console.log({isSubmitting,isSubmitted,isSubmitSuccessful,submitCount})

   const {fields,append,remove} =useFieldArray({
    name:'phNumbers',
    control
  })
  const onSubmit = (data:formValues)=>{
    console.log("form submitted",data)
  }
  const handleGetValue = ()=>{
    console.log(getValues(["username","channel"]))
  }

  const handlesetValue = ()=>{
   setValue('username','Zoro')
  }
  const onError =(errors:FieldErrors<formValues>) =>{
    console.log("errors",errors)

  }

  

  // const watchUsername= watch("username")

  // useEffect(()=>{
  //   const subscription = watch((value) => {
  //     console.log(value);
  //   })
  //   return () => subscription.unsubscribe();
  // },[watch])

useEffect(()=>{
  if(isSubmitSuccessful){
    reset()
  }
},[isSubmitSuccessful,reset])
  renderCount++
  return (
    <div>
      <h2>Youtube Form {renderCount/2}</h2>
      {/* <h3>Username: {watchUsername}</h3> */}
      <form onSubmit={handleSubmit(onSubmit,onError  )} noValidate>
        <div className='form-control'>
          <label htmlFor="username">username</label>
        <input type="text" id="username" 
        {...register("username",{required:'username is required'})}/>
        <p className='error'>{errors.username?.message}</p>
        </div>

        <div className='form-control'>
        <label htmlFor="email">email</label>
        <input type="email" id="email"  {...register("email",{pattern:
          {
            value:/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message:'email is invalid',
          },
          validate:{
            notAdmin:(fieldValue)=>{
              return fieldValue !== 'admin@example.com" ' || 'enter different email'
          }
          }
        })} />
         <p className='error'>{errors.email?.message}</p>
         </div>

         <div className='form-control'>
        <label htmlFor="channel">channel</label>
        <input type="text" id="channel" {...register("channel")} /><br></br><br></br>
        <p className='error'>{errors.channel?.message}</p>
        </div>
        {/* {...register("username",{required:'username is required'})}/> */}
        <div className='form-control'>
        <label htmlFor="age">age</label>
        <input type="number" id="age" {...register("age",{ valueAsNumber:true, required:'age is required'})} /><br></br><br></br>
        <p className='error'>{errors.age?.message}</p>
        </div>

        <div className='form-control'>
        <label htmlFor="dob">dob</label>
        <input type="date" id="dob" {...register("dob",{valueAsDate:true,required:'dob is requred'})} /><br></br><br></br>
        <p className='error'>{errors.dob?.message}</p>
        </div>

        <div className='form-control'>
        <label htmlFor="twitter">twitter</label>
        <input type="text" id="twitter" {...register("social.twitter",{disabled:watch("channel") ==="",})} /><br></br><br></br>
       
        </div>

        <div className='form-control'>
        <label htmlFor="facebook">facebook</label>
        <input type="text" id="facebook" {...register("social.facebook")} /><br></br><br></br>
       
        </div>

        <div className='form-control'>
        <label htmlFor="primary-phone">primary phone number</label>
        <input type="text" id="primary-phone" {...register("phoneNumbers.0")} /><br></br><br></br>
       
        </div>
        <div className='form-control'>
        <label htmlFor="secondary-phone">secondary phone number</label>
        <input type="text" id="secondary-phone" {...register("phoneNumbers.1")} /><br></br><br></br>
       
        </div>

        <div>
          <label>List of phone numbers</label>
          <div>
            {
              fields.map((field,index)=>{
                 return <div className='form-control' key={field.id}>
                  <input type="text" {...register(`phNumbers.${index}.number` as const)} />
                  {
                    index > 0 &&(
                      <button type='button' onClick={()=>remove(index)}>remove</button>
                    )
                  }
                  </div> })
              
            }
            <button type='button' onClick={()=>append({number:''})}>Add phone number</button>
          </div>
        </div>

        {/* <button disabled={!isDirty || !isValid || isSubmitting} type="submit">Submit</button> */}
        <button  type="submit">Submit</button>
        <button type='button' onClick={handleGetValue}>get values</button>
        <button type='button' onClick={handlesetValue}>set values</button>
        <button type='button' onClick={()=>trigger()}>validate</button>
        <button type='button' onClick={()=>reset()}>reset</button>
      </form>
      <DevTool control={control} />
    </div>
  )
}
