import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
// import './ForgotPassword.css';
import TopNav from './Navbar';
import axios from 'axios';
import {
	TextField,
	InputAdornment,
	IconButton,
	OutlinedInput,
	FormControl,
	InputLabel,
	FormHelperText,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Alert from 'react-bootstrap/Alert'

function ResetPasswordForm() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const {id} = useParams();
    let hasSixChar = password.length >= 6;
    let hasLowerChar = /(.*[a-z].*)/.test(password);
    let hasUpperChar = /(.*[A-Z].*)/.test(password);
    let hasNumber = /(.*[0-9].*)/.test(password);
    let hasSpecialChar = /(.*[^a-zA-Z0-9].*)/.test(password);
    const [showPassword, setShowPassword] = useState(false);
  
    function handleSubmit(){

        
        axios.post("https://evenues.herokuapp.com/resetpassword",{"_id":id,"password":password})
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error(error);
            });
          
    }
  
    return (
      <div className="bgs">
        <TopNav />
      <Card.Body>
      <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label style={{ color:"black"}}>Password</Form.Label>
      <Form.Control type="password" name='password' placeholder="Password" 
      value={password} 
      style={{ width: "300px", height: "50px" }}
      onChange={(event) => setPassword(event.target.value)
      } required 
      endAdornment={
        <InputAdornment>
          <IconButton
            edge="end"
            onClick={() =>
              setShowPassword(!showPassword)
            }
          >
            {showPassword ? (
              <VisibilityIcon />
            ) : (
              <VisibilityOffIcon />
            )}
          </IconButton>
        </InputAdornment>
      }
      />
      {password && (
        <div className="ml-1" style={{ columns: 2 }}>
          <div>
            {hasSixChar ? (
              <span className="text-success">
                <CheckCircleIcon
                  className="mr-1"
                  fontSize="small"
                />
                <small>at least 6 characters</small>
              </span>
            ) : (
              <span className="text-danger">
                <CancelIcon
                  className="mr-1"
                  fontSize="small"
                />
                <small>at least 6 characters</small>
              </span>
            )}
          </div>
          <div>
            {hasLowerChar ? (
              <span className="text-success">
                <CheckCircleIcon
                  className="mr-1"
                  fontSize="small"
                />
                <small>one lowercase</small>
              </span>
            ) : (
              <span className="text-danger">
                <CancelIcon
                  className="mr-1"
                  fontSize="small"
                />
                <small>one lowercase</small>
              </span>
            )}
          </div>
          <div>
            {hasUpperChar ? (
              <span className="text-success">
                <CheckCircleIcon
                  className="mr-1"
                  fontSize="small"
                />
                <small>one uppercase</small>
              </span>
            ) : (
              <span className="text-danger">
                <CancelIcon
                  className="mr-1"
                  fontSize="small"
                />
                <small>one uppercase</small>
              </span>
            )}
          </div>
          <div>
            {hasNumber ? (
              <span className="text-success">
                <CheckCircleIcon
                  className="mr-1"
                  fontSize="small"
                />
                <small>one number</small>
              </span>
            ) : (
              <span className="text-danger">
                <CancelIcon
                  className="mr-1"
                  fontSize="small"
                />
                <small>one number</small>
              </span>
            )}
          </div>
          <div>
            {hasSpecialChar ? (
              <span className="text-success">
                <CheckCircleIcon
                  className="mr-1"
                  fontSize="small"
                />
                <small>one special symbol</small>
              </span>
            ) : (
              <span className="text-danger">
                <CancelIcon
                  className="mr-1"
                  fontSize="small"
                />
                <small>one special symbol</small>
              </span>
            )}
          </div>
        </div>
      )}
    </Form.Group>
    <Form.Group className="mb-3" controlId="formConfirmPassword">
      <Form.Label style={{ color:"black"}}>Confirm Password</Form.Label>
      <Form.Control type="password" value={confirmPassword} placeholder="Confirm Password"
      style={{ width: "300px", height: "50px" }} 
      onChange={(event) => setConfirmPassword(event.target.value)} 
      required 
      />
      {password && confirmPassword && (
        <FormHelperText className="ml-1 mt-1">
          {password === confirmPassword ? (
            <span className="text-success">
              Password does match
            </span>
          ) : (
            <span className="text-danger">
              Password does not match
            </span>
          )}
        </FormHelperText>
      )}
    </Form.Group>

    <Button style={{backgroundColor: '#ffbd59', color: 'black', width: "300px", height: "50px"}} type='submit'
    disabled={
      !password ||
      !confirmPassword ||
      password != confirmPassword ||
      !hasSixChar ||
      !hasLowerChar ||
      !hasUpperChar ||
      !hasNumber ||
      !hasSpecialChar
    } 
    onClick={()=>handleSubmit()}>Change Password</Button>
    </Card.Body>
    </div>






      /*
      <div className="bgs">
        <TopNav />
         <form onSubmit={handleSubmit} className="container">
        <label>
          New Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)} placeholder="Enter New Password" required
          />
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Re-enter Same Password" required
          />
        </label>
        <button type="submit">Reset Password</button>
      </form> 
      </div>
      */
    );
  }
  
  export default ResetPasswordForm;
  
