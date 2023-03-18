import "./quiz.css"
import { useState, useEffect, useMemo } from 'react';
import Trivia from "../components/Trivia";
import Timer from "../components/Timer";
import Start from '../components/Start';

const Quiz = () => {

    const [username, setUsername] = useState(null)
    const [questionNumber, setQuestionNumber] = useState(1)
    const [stop, setStop] = useState(false)
    const [earned, setEarned] = useState("$ 0")

    const data = [
        {
            id:1,
            question: "Rolex is a company that specializes in what type of product ?",
            answers: [
                {
                    text:"Phones",
                    correct: false,
                },
                {
                    text:"Watches",
                    correct: true,
                },
                {
                    text:"Food",
                    correct: false,
                },
                {
                    text:"Cosmetic",
                    correct: false,
                },
            ]

        },
        {
            id:2,
            question: "Meemie Beauty is a company that specializes in what type of product ?",
            answers: [
                {
                    text:"Tech",
                    correct: false,
                },
                {
                    text:"Agriculture",
                    correct: false,
                },
                {
                    text:"Drugs",
                    correct: false,
                },
                {
                    text:"Cosmetics",
                    correct: true,
                },
            ]

        },
        {
            id:3,
            question: "Apple is a company that specializes in what type of product ?",
            answers: [
                {
                    text:"Phones",
                    correct: true,
                },
                {
                    text:"Spaceships",
                    correct: false,
                },
                {
                    text:"Sports",
                    correct: false,
                },
                {
                    text:"Tourism",
                    correct: false,
                },
            ]

        },
    ]

    const moneyPyramid = useMemo(() =>
        [
            { id:1, amount: "$ 100", },
            { id:2, amount: "$ 200", },
            { id:3, amount: "$ 300", },
            { id:4, amount: "$ 400", },
            { id:5, amount: "$ 1000", },
            { id:6, amount: "$ 2000", },
            { id:7, amount: "$ 4000", },
            { id:8, amount: "$ 8000", },
            { id:9, amount: "$ 16000", },
            { id:10, amount: "$ 32000", },
            { id:11, amount: "$ 64000", },
            { id:12, amount: "$ 125000", },
            { id:13, amount: "$ 250000", },
            { id:14, amount: "$ 500000", },
            { id:15, amount: "$ 1000000", },
        ].reverse()
    , [])

    useEffect(()=>{
        questionNumber > 1 && setEarned(moneyPyramid.find( m => m.id === questionNumber - 1).amount)
    }, [moneyPyramid, questionNumber])

    return (  
    <div className="quiz">
        {username ? 
        (<> 
            <div className="main">
            {   stop ? <h1 className="earnedText">You earned: {earned}</h1> :
            
                (<>
                <div className="top">
                    <div className="timer"><Timer setStop={setStop} questionNumber={questionNumber}/></div>
                </div>
                <div className="bottom">  
                    <Trivia data={data} setStop={setStop} questionNumber={questionNumber} setQuestionNumber={setQuestionNumber}/>
                </div>
                </>
                )
            }
        </div>

        <div className="pyramid">
            <div className="moneyList">
                { moneyPyramid.map((money)=>( 
                    <li className= {questionNumber === money.id ? "moneyListItem active" : "moneyListItem"} key={money.id} >
                        <span className="moneyListItemNumber"> {money.id} </span>
                        <span className="moneyListItemAmount"> {money.amount} </span>
                    </li>
                ))
                }
            </div>
        </div>
        </>) : 
        <Start setUsername={setUsername}/>}
        
    </div>
    );
}
 
export default Quiz;