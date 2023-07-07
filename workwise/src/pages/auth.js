import React, { useEffect } from 'react'
import Loader from '../components/loader'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../utils/contexts/User'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Alert } from 'antd'

export default function Auth({setIsLoading}) {
    const { id } = useParams();
    const { isLoggedIn, setIsLoggedIn, user, setUser, baseUrl } = useContext(UserContext);
    const navigate = useNavigate();

    const getUser = async () => {
			try {
				const response = await axios.get(`${baseUrl}/auth/success`, 
                    {
                        headers: {
                            Authorization: `Bearer ${id}`,
                        },
                    }
                );

				if (response.status === 200) {
					setIsLoggedIn(true);
					setUser(response.data.user);
					localStorage.setItem("user", JSON.stringify(response.data.user));
                    navigate("/home");
                    setIsLoading(false);
				} else if (response.status === 401) {
					<Alert message="Error" type="error" showIcon />;
                    setIsLoading(false);

				}
			} catch (err) {
				console.error(err);
			}
		};

    useEffect(() => {
        setIsLoading(true);
		localStorage.setItem("jwt_token", id);
        getUser();
    }, [])

    
  return <div className="loader w-full h-full bg-white"></div>;
}
