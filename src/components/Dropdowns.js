// import { useState } from 'react';

const DropD = (props) => {
    const { data, keys } = props;
    // const [option,setOption] = useState('');

    const handleChange=(e)=>{
        props.choosenOption(e.target.value);
    }
    return <div>
    <h2>Choose option for {keys}</h2>
        <select name="cars" id="cars" onChange={(e)=>{handleChange(e)}}>
            {data.length > 0 && data.map((item) => (<option value={item}>{item}</option>))}
        </select>
    </div>

};

export default DropD;
