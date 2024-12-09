import React,{ useContext, useState } from 'react'
import './sidebar.css'
import { Context } from '../../Context/Context'

const Sidebar = () => {

    const [extended, setExtended] = useState(false)
    const {onSent,prevPrompts,setRecentPrompt,newChat}=useContext(Context)
    const loadPrompt = async(prompt)=>{
      setRecentPrompt(prompt)
      await onSent(prompt)
    }
    return (
    <div className='sidebar'>
      <div className="top">
        <i className="ri-menu-2-line menu" onClick={()=>setExtended(prev=>!prev)}></i>
        <div onClick={()=>newChat()} className="new-chat">
            <i className="ri-add-line"></i>
            {extended?<p>New Chat</p>:null}
        </div>
        {extended
        ?<div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item,index)=>{
              return(
                  <div onClick={()=>loadPrompt(item)} className="recent-entery">
                  <i className="ri-chat-4-line"></i>
                  <p>{item.slice(0,18)}...</p>
              </div>
              )
            })}
           
        </div>
        :null}
      </div>
      <div className="bottom">
        <div className="itemb recent-entery">
            <i className="ri-question-line"></i>
            {extended?<p>Help</p>:null}
        </div>
        <div className="itemb recent-entery">
            <i className="ri-history-fill"></i>
            {extended?<p>Activity</p>:null}
        </div>
        <div className="itemb recent-entery">
            <i className="ri-settings-2-line"></i>
            {extended?<p>Settings</p>:null}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
