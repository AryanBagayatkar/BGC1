import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) =>{

    const [input , setInput] = useState("")
    const [recentPrompt,setRecentPrompt] = useState("");
    const [prevPrompts,setPrevPrompts] = useState([]);
    const [showReuslt,setShowResult] = useState(false);
    const [loading,setLoading] = useState(false);
    const [resultData,setResultData] = useState("");
    
    const delay = (index,nextword)=>{
      setTimeout(function(){
        setResultData(prev=>prev+nextword);
      },75*index)      
    }

    const newChat = ()=>{
        setLoading(false)
        setShowResult(false)
    }

    const onSent = async (prompt) => {
        setShowResult(true)
        setLoading(true)
        setResultData("")
        let response;
        if (prompt !== undefined) {
            response = await run(prompt)
            setRecentPrompt(prompt)
        } else {
            setPrevPrompts(prev=>[...prev,input])
            setRecentPrompt(input)
            response=await run(input)
        } 
        
        let star = response.split("**");
        let newstar = " ";
        for(let i = 0; i < star.length;i++){
            if(i === 0 || i%2 !==1){
              newstar += star[i];                          
            }
            else{
                newstar += "<b>"+star[i]+"</b>"
            }      
        }
        let newResponse2 = newstar.split("*").join("</br>")
        let newResponse3 = newResponse2.split(" ");
        for(let i = 0; i<newResponse3.length;i++){
            const nextword = newResponse3[i];
            delay(i,nextword+" ");
        }
        setLoading(false)
        setInput("")
    }

    const contextValue = {
       prevPrompts,
       setPrevPrompts,
       onSent,
       setRecentPrompt,
       recentPrompt,
       showReuslt,
       loading,
       resultData,
       input,
       setInput,
       newChat
    }

    return(
        <Context.Provider value = {contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;