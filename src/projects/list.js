import { React, useState } from "react";
import { useNavigate } from "react-router-dom";


const ProjectList = ({ name, time, id}) => {
    const navigate = useNavigate();
    return (
            <div className="w-1/2 bg-slate-300 backdrop-blur-lg px-3 py-5 rounded-md">
                <div className="flex justify-between items-center ">
                    <li className="list-none w-2/3 text-left break-normal cursor-pointer" onClick={() => {
                        navigate(`/project/${id}`)
                    }}>{name}</li>
                    <div className="flex gap-2">
                        <button className="bg-white text-blue-600 px-2 py-2 font-medium rounded-md">{time} hours</button>
                    </div>
                </div>
        </div>
    );
};

export default function List() {
    const tempProjects = JSON.parse(localStorage.getItem("projects"));
    const [project, setProject] = useState("");
   if(tempProjects){
    for(var i=0;i<tempProjects.length;i++){
        var totalTime = 0;
        for(var j=0;j<tempProjects[i].task.length;j++){
            totalTime += tempProjects[i].task[j].timeSpent;
        }
        tempProjects[i].time = totalTime;
    }
    }
    const [projects, setProjects] = useState(tempProjects?tempProjects : []);
    const add = () => {
        const temp = projects;
        temp.push({
            name: project,
            time: 0,
            task : [],
            id : projects.length,
        });
        setProjects(temp);
        setProject("");
        localStorage.setItem("projects", JSON.stringify(projects));
    }
    return (
        <div className="h-screen flex justify-center items-center flex-col gap-8 mt-[-10vw]">
            <div className="flex justify-center items-center gap-6">
                <input
                    className="w-72 border-2  rounded-md px-3 py-3 bg-[#E8ECF4] backdrop-blur-lg"
                    value={project}
                    onChange={(e) => {
                        setProject(e.target.value);
                    }}
                    placeholder="Enter a new project"
                />
                <button
                    className="h-full px-5 py-2 bg-[#0264F6] text-white font-medium rounded-md"
                    onClick={add}
                >
                    Add Project
                </button>
            </div>
            {
                projects && projects.map((project) => {
                    return <ProjectList {...project} />
                })
            }

        </div>
    );
}
