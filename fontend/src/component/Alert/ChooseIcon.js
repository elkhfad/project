import { AiOutlineCheck } from 'react-icons/ai';
import { AiOutlineClose } from 'react-icons/ai';
const ChooseIcon = ({ value, min }) => {
  if (value.length > 0 && value.length < min) {
    return (
      <div className="danger" style={{ textAlign: 'center' }}>
        <AiOutlineClose />
      </div>
    );
  } else if (value.length >= min) {
    return (
      <div className="success">
        <AiOutlineCheck />
      </div>
    );
  }
};
export default ChooseIcon;
