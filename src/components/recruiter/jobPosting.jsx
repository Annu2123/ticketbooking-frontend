
import { useState } from "react"
export default function JobPosting(){
    const[title,setTitle]=useState("")
    const[skills,setSkills]=useState([])
    const[ description,setDescription]=useState("")
    const[salaryMin,setSalaryMin]=useState("")
    const[salaryMax,setSalaryMax]=useState("")
    const[location,setLocation]=useState("")
    const[experiance,setExperiance]=useState("")
    const[applicatonDeadline,setApplicationDeadline]=useState("")

    const handleSubmit=(e)=>{
        e.preventDefault()
        const skill=skills.split(",")
        const jobForm={
            title:title,
            skills:skill,
            description:description,
            salaryRange:{min:salaryMin,max:salaryMax},
            location:location,
            experiance:experiance,
            applicatonDeadline:applicatonDeadline
        }
        console.log("jobform",jobForm)
    }
    return (
        <>
        <h1>post job</h1>
        <form onSubmit={handleSubmit}>
            <label>title":</label>
            <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}}/><br/>
            <label>description:</label>
            <input type="text" value={description} onChange={(e)=>{setDescription(e.target.value)}}/><br/>
            <label>enter skills</label>
            <input type="text" value={skills} onChange={(e)=>{setSkills(e.target.value)}}/><br/>
            <label>location</label>
            <input type="text" value={location} onChange={(e)=>{setLocation(e.target.value)}}/><br/>
            <label>Minimum Saalry</label>
            <input type="number" value={salaryMin} onChange={(e)=>{setSalaryMin(e.target.value)}}/><br/>
            <label>salaryMax </label>
            <input type="number" value={salaryMax} onChange={(e)=>{setSalaryMax(e.target.value)}}/><br/>
            <label>experiance require</label>
            <input type="number" value={experiance} onChange={(e)=>{setExperiance(e.target.value)}}/><br/>
            <label>application deadline</label>
            <input type="date" value={applicatonDeadline} onChange={(e)=>{setApplicationDeadline(e.target.value)}}/><br/>
            <input type="submit"/>
        </form>
        </>
    )
}