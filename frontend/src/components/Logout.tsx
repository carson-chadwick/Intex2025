import { useNavigate } from 'react-router-dom';

function Logout(props: { children: React.ReactNode }) {
  const navigate = useNavigate();

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        navigate('/LandingPage');
      } else {
        console.error('Logout failed:', response.status);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <button onClick={handleLogout}>
      {props.children}
    </button>
  );
}

export default Logout;

// import { useNavigate } from 'react-router-dom';

// function Logout(props: { children: React.ReactNode }) {
//   const navigate = useNavigate();

//   const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
//     e.preventDefault();

//     try {
//           const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

//           const response = await fetch(`${apiUrl}/logout`, {
//             method: 'POST',
//             credentials: 'include',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           });


//       if (response.ok) {
//         navigate('/LandingPage');
//       } else {
//         console.error('Logout failed:', response.status);
//       }
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   };

//   return (
//     <a className="logout text-dark" href="#" onClick={handleLogout}>
//       {props.children}
//     </a>
//   );
// }

// export default Logout;
