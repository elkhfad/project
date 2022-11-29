import { AiOutlineCheck } from 'react-icons/ai';
import { AiOutlineClose } from 'react-icons/ai';
const ChooseIcon = ({ value, min }) => {
  if (value.length > 0 && value.length < min) {
    return (
      <div className="danger" style={{ textAlign: 'center', fontSize: '1.5em' }}>
        <AiOutlineClose />
      </div>
    );
  } else if (value.length > min) {
    return (
      <div className="success" style={{ fontSize: '1.5em' }}>
        <AiOutlineCheck />
      </div>
    );
  } else if (value.length !== 0) {
    return (
      <div className="success" style={{ fontSize: '1.5em' }}>
        <AiOutlineCheck />
      </div>
    );
  }
};
export default ChooseIcon;
