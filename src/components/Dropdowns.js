const DropD = (props) => {
    const { data, keys } = props;
    const handleChange = (e) => {
        props.choosenOption(e.target.value);
    }
    return <div >
        <h2 id="for">Choose option for {keys}</h2>
        <select name="questions" id="questions" onChange={(e) => { handleChange(e) }}>
            {data.length > 0 && data.map((item) => (<option value={item}>{item}</option>))}
        </select>
    </div>

};

export default DropD;
