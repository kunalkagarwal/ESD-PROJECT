import './style.css'
import React, { useEffect, useState } from 'react';
import axios from '../../Auth/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Auth/AuthContext';

function App() {
    const navigate = useNavigate();
  
  const { setAuthenticated } = useAuth();
    

    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });
      const [message, setmessage] = useState();

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

      localStorage.setItem('isLogin', 'false');

  

 
    
    const Login = async (e,formData) => {
        e.preventDefault();
        try {
            
          await axios.post('/admin/login',formData).then((response) => {
            setmessage(response.data.message);
            if(response.data.message === "Success")
            {
                setAuthenticated(true);
                localStorage.setItem("token", response.data.token);
                localStorage.setItem('isLogin', 'true');
                let path ='/Student'
                navigate(path);
                
            }
            else if(response.data.message ==="Incorrect Password"){
                alert("Incorrect Username or Password ")
            }else{
                alert("Unauthorized")
            }
          });
        } catch (error) {
          console.error('Error:', error);   
        }
      };


    
    ///////////////////////////////////////


    return (
        <div style={{marginTop:'3cm'}}>

            <div class="container" id="container" >
                
                <div class="form-container sign-in-container">
                    <form >
                        <h1>Sign in</h1>
                        <div class="social-container">
                            <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
                            <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
                            <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
                        </div>
                        <span>or use your account</span>
                        <input type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange} placeholder="Email" />
                        <input type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange} placeholder="Password" />
                        <a href="#">Forgot your password?</a>
                        <button onClick={(e)=> Login(
                            e,formData
                        )}>Sign In</button>
                    </form>
                </div>
                <div class="overlay-container">
                    <div class="overlay">
                       
                       
                        <div class="overlay-panel overlay-right">
                        <img style={{height:'3cm'}}  src='https://upload.wikimedia.org/wikipedia/en/thumb/f/f8/IIIT_Bangalore_Logo.svg/1200px-IIIT_Bangalore_Logo.svg.png'></img>
                            <p>International Institute of Information Technology, Bangalore welcomes you</p>
                            <h1>Hello, Admin!</h1>
                           
                        </div>
                    </div>
                </div>
            </div>


        </div>

    );
}

export default App;