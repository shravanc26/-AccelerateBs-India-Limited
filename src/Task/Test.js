import React from 'react'
import TaskAddModel from './TaskAddModel'

export default function Test() {
    const temp = JSON.parse(localStorage.getItem("projects"));
    console.log(temp);
  return (
    <div>
        <div>
        <TaskAddModel />
        </div>
    </div>
  )
}
