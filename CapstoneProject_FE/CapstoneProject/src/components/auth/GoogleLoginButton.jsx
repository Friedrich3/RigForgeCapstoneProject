import { GoogleLogin } from '@react-oauth/google';
import { SetToken } from '../../redux/actions/AccountApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function GoogleLoginButton() {
const navigate = useNavigate()
const dispatch = useDispatch()
        
const handleGoogleAuth = async(credentialResponse) =>{
    const url = "https://localhost:7099/api/Account/googleAuth";
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentialResponse.credential)
        });
        if (!response.ok) {
            throw new Error("Error while logging-in, Try Again!");
        } else {
            const data = await response.json();
            const localItem = JSON.stringify(data);
            localStorage.setItem("token", localItem);
            dispatch(SetToken())
            navigate("/")
        }
    } catch (error) {
        console.error("Error:", error);
        return false;
    }
}




    return (
        <div className='d-flex justify-content-center'>
            
        <GoogleLogin
            onSuccess={credentialResponse => {
                //console.log('Login success', credentialResponse);
                handleGoogleAuth(credentialResponse)
            }}
            onError={() => {
                //console.log('Login Failed');
            }}
            type='standard'
            size='large'
            width={400}
            text='continue_with'
            locale='en_EN'
            />
            </div>
    );
    }

    export default GoogleLoginButton;