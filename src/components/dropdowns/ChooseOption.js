import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import Model from '../Model';

const ChooseOption = () => {
    const [dropdownData, setDropdownData] = useState([]);
    const [popupValue, setPopupVAlue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation()
    const { data } = location.state
    // console.log(data, "from new component")
    const handleOption = (e) => {
        setPopupVAlue(e.target.name);
        setIsOpen((current) => !current);

    };

    const handleIsOpen = () => {
        setIsOpen(false);
    };

    console.log(dropdownData,"LLLLLLLLLLLLLLLL") 

    const handleOnSaveData = (e) => {
        setDropdownData(e);
        setCreateQuestion(true);
        setDisplay("block")
    };

    return (
        <div>
            <section className="splited__section">
               <h2>Choose a word to add a dropdown</h2>
                {data.length > 0 && data.map((item) => (
                    <button type="button" className="splited__questions btn btn-light" name={item.name} onClick={(e) => { handleOption(e); }}>{item.name}</button>
                ))}
            </section>

            {isOpen && <Model isOpen={handleIsOpen} onSaveData={handleOnSaveData} name={popupValue} />}
        </div>
    )
}

export default ChooseOption;