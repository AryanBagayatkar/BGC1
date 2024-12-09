import React, { useContext } from 'react'
import './Main.css'
import { Context } from '../../Context/Context'
import logo from "../../assets/logo.jpeg"
const Main = () => {
    const { input,
            onSent,
            recentPrompt,
            loading,
            setInput,
            resultData,showReuslt
    } = useContext(Context);
  return (
    <div className="main">
        <div className="nav">
            <a href="/"><img src={logo} alt="Logo" /></a>
            <div className="avatatar">🧒</div>  
        </div>
        <div className="main-container">
            {!showReuslt
            ?<>
                <div className="greet">
                    <p><span>Hello, Dev.</span></p>
                    <p>How can i help you today?</p>
                </div>
                <div className="cards">
                    <div className="card">
                        <p>Suggest beautiful places on upcomming journey.</p>
                        <i className="ri-map-pin-fill"></i>
                    </div>
                    <div className="card">
                        <p>Briefly sumarize the concept of suburban regions</p>
                        <i className="ri-lightbulb-line"></i>
                    </div>
                    <div className="card">
                        <p>Improve your brainstorming skills</p>
                        <i className="ri-message-2-line"></i>
                    </div>
                    <div className="card">
                        <p>Improve your readability of following code</p>
                        <i className="ri-code-s-slash-line"></i>
                    </div>
                </div>
            </>
            : <div className="result">
                <div className="ask-title">
                <div className="avatatar">🧒</div>                     
                    <p><b>{recentPrompt}</b></p>
                </div>
                <hr />
                <div className="result-ask">
                    {loading
                    ?
                    <div className="load"> <hr /> <hr /> <hr />
                    </div>
                    :
                    <p dangerouslySetInnerHTML={{__html:resultData}}></p>}
                </div>
            </div>
            }
            
            <div className="main-bottom">
                <div className="search-box">
                    <input type="text" value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Enter prompt here"/>
                    <div>
                    {input?<i onClick={()=>onSent()} className="ri-arrow-right-fill"></i>:null}                         
                </div>
                </div>
                <p className="bottom-info">
                    Gemini may display inaccurate info, it doesn't save any user data, It genrates only text data.
                 </p>
            </div>
        </div>
        
    </div>
  )
}

export default Main