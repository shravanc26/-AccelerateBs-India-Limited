import { React, useState } from "react";

import { useParams } from "react-router-dom";

const ListTask = ({ taskName, timeSpent, description }) => {
    return (
        <div>
            <div className="w-1/2 bg-slate-100 px-3 py-5 rounded-md m-4">
                <div className="flex justify-between items-center ">
                    <li className="list-none w-2/3 text-left break-normal" >{taskName}</li>
                    <li className="list-none w-2/3 text-left break-normal" >{timeSpent}</li>
                    <li className="list-none w-2/3 text-left break-normal" >{description}</li>
                </div>
            </div>
        </div>
    )
}


export default function TaskAddModel() {
    const [showModal, setShowModal] = useState(false);
    const [description, setDescription] = useState("");
    const [taskName, setTaskName] = useState("");
    const [timeSpent, setTimeSpent] = useState();
    const projects = JSON.parse(localStorage.getItem("projects"));
    const { id } = useParams();
    const [projectName, setProjectName] = useState([projects[id].name])
    const [tasks, setTasks] = useState(projects[id].task);
    const add = () => {
        const temp = tasks;
        temp.push({
            taskName: taskName,
            timeSpent: timeSpent,
            description: description,
        });
        setTasks(temp);
        setShowModal(false);
        setTaskName("");
        setTimeSpent();
        setDescription("");
        projects[id].task = tasks;
        localStorage.setItem("projects", JSON.stringify(projects));
    }
    return (
        <div className=" flex-column justify-center items-center flex-col gap-8 ml-[30vw] mt-[20vh]">
            <div className="ml-5 mb-5">  
            <span> Project Name : </span>
            <span className="text-2xl font-semibold">
                {projectName}
            </span>
            </div>
            <div className="ml-5">

                <button
                    className="px-5 py-2 bg-[#0264F6] text-white font-medium rounded-md"
                    type="button"
                    onClick={() => setShowModal(true)}
                >
                    Add Task
                </button>
            </div>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-[30vw] my-6 mx-auto max-w-xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">

                                    <h3 className="text-2xl font-semibold">
                                        Add Task
                                    </h3>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex flex-col gap-5">
                                    <input
                                        className="border-2  rounded-md px-3 py-3 bg-[#E8ECF4] backdrop-blur-lg"
                                        value={taskName}
                                        onChange={(e) => {
                                            setTaskName(e.target.value);
                                        }}
                                        placeholder="Enter a new task"
                                    />
                                    <input
                                        type="number"
                                        className="border-2  rounded-md px-3 py-3 bg-[#E8ECF4] backdrop-blur-lg"
                                        value={timeSpent}
                                        onChange={(e) => {
                                            setTimeSpent(parseInt(e.target.value));
                                        }}
                                        placeholder="Enter number of hours spent in hours"
                                    />
                                    <input
                                        className="border-2  rounded-md px-3 py-3 bg-[#E8ECF4] backdrop-blur-lg"
                                        value={description}
                                        onChange={(e) => {
                                            setDescription(e.target.value);
                                        }}
                                        placeholder="Enter description"
                                    />
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="h-full px-5 py-2 bg-[#0264F6] text-white font-medium rounded-md"
                                        type="button"
                                        onClick={add}
                                    >
                                        Add Task
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}

            <div className="w-1/2 bg-slate-500 backdrop-blur-lg px-3 py-5 rounded-md m-4">
                <div className="flex justify-between items-center text-white ">
                    <li className="list-none w-2/3 text-left break-normal" >Name</li>
                    <li className="list-none w-2/3 text-left break-normal" >Time Spent</li>
                    <li className="list-none w-2/3 text-left break-normal" >Description</li>
                </div>
            </div>
            {
                tasks && tasks.map((task) => {
                    return <ListTask {...task} />
                })
            }
        </div>
    );
}