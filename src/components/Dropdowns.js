const DropD = (props) => {
    const { data, keys } = props;
    const handleChange = (e) => {
        props.choosenOption(e.target.value);
    }
    return <div className="option__list" >
        <p className='guide submit__btn'>Choose option for {keys}</p>
        <select className="edit_dropdowns" name="questions" id="questions" onChange={(e) => { handleChange(e) }}>
            {data.length > 0 && data.map((item) => (<option value={item}>{item}</option>))}
        </select>
    </div>

};

export default DropD;
