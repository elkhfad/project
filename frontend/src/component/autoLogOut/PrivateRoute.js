import { useNavigate } from 'react-router-dom';

import { useCurrentUser } from '../../services/currenUser';

const PrivateRoute = ({ children }) => {
  const { currentUser } = useCurrentUser();
  const navigate = useNavigate();

  if (!currentUser) {
    return navigate('/signIn');
  }

  return children;
};
export default PrivateRoute;
