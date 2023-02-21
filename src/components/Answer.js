import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard';
import { useParams } from 'react-router-dom';
import { db } from '../utils/firebase';
import Sidebar from './Sidebar';

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    organization: "org-2DDqmQme6uZMfz64ezdcS3NT",
    apiKey: process.env.REACT_APP_API_KEY
});
const openai = new OpenAIApi(configuration);

const Answer = () => {
    const [answer, setAnswer] = useState('');
    const [question, setQuestion] = useState('')
    const [isCopied, setIsCopied] = useState(false);
    const [solution, setSolution] = useState('Loading ...');
    let { id } = useParams();

    const fetchQuestion = async (id) => {
        const docRef = doc(db, "categories", "health", "questions", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setQuestion(docSnap.data().question)
            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: docSnap.data().question,
                max_tokens: 100,
                temperature: 0,
            });
            setSolution(response.data.choices[0].text);
        } else {
            console.log("No such document!");
        }
    }
    useEffect(() => {
        fetchQuestion(id)
    }, [])
    return (
        <div >
            <div className="statement_nav">
                <h1>Results from statement</h1>
            </div>
            <div className='answer'>
                <div className='statement'>
                    <b>Statement:</b> {question}
                </div>
                <div className="App-container">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="title">Here is the result</h4>
                        </div>
                        <div className="card-body">
                            <p>{solution}</p>
                            {isCopied ? (
                                <p className="success-msg">Text copied to clipboard</p>
                            ) : null}

                            <CopyToClipboard
                                text={solution}
                                onCopy={() => {
                                    setIsCopied(true);
                                    setTimeout(() => {
                                        setIsCopied(false);
                                    }, 1000);
                                }}
                            >
                                <button className="btn">COPY</button>
                            </CopyToClipboard>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Answer;