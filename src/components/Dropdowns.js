import Dropdown from 'react-bootstrap/Dropdown';

const DropD = (props) => {
const {data, keys} =props;
    return <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
            Choose option for {keys}
        </Dropdown.Toggle>
        <Dropdown.Menu>
        {data.length > 0 && data.map((item)=>(<Dropdown.Item href="#/action-1">{item}</Dropdown.Item>))}
            
        </Dropdown.Menu>
    </Dropdown>
};

export default DropD;
