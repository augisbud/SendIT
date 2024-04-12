import './style.css'
import logo from '../../assets/logo.svg'

export default function AuthForm() {
    return (
        <div className='form'>
            <img src={logo} alt="Logo" className="logo" />    
            <div className='cont'>
                <div>
                    <h1 className='heading'>Login</h1>
                    <h3 className='sub-head'>Provide your email and password</h3>
                </div>
                
            </div>
            
            
        </div>
    );
}
