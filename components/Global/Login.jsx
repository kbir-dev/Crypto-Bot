import React ,{useState,useEffect} from 'react'

const Login = ({setActiveComponent,axios,notifyError,notifySuccess}) => {
  const [user,setUser] = useState({
    password:"",
  });

  const handleFormFieldChange =(fieldName,e)=>{
    setUser({...user,[fieldName]:e.target.value})
  }

  const apiLogin = async(e) =>{
    e.preventDefault()
    if(user.email==""||user.password==""){
      return notifyError("Please provide all the details")
    }
    notifySuccess("Wait login to your account...")
    try {
      // Api call
      const response = await axios({
        method:"POST",
        url:`api/v1/user/login`,
        withCredentials:true,
        data:{
          email:user.email,
          password:user.password,
        }
      })

      if(response.data.status == "success"){
        notifySuccess("Account login successfully...")
        localStorage.setItem(
          "USER_MEMBERSHIP",
          response.data.data.user.membershipType
        )
        localStorage.setItem(
          "Crypto_BackEnd",
          response.data.data.user._id
        )
        localStorage.setItem(
          "CryptoAUT_TOKEN",
          response.data.token
        )

        window.location.reload()


      }else if(response.data.status=="fail"){
        notifyError(response.data.message)
        notifyError("Error")
      }

    } catch (error) {

      console.log(error)
      notifyError("Please Provide Correct Email or Password")

      
    }
  }
  return (
    <div className="techwave_fn_sign">
    <div className="sign__content">
      <h1 className="logo">Designed by C-K-G</h1>
      <form className='login'>
        <div className='form__content'>
          <div className="form__title">Sign In</div>


          <div className="form__username">
            <label htmlFor="user_login">Email</label>
            <input type="text" 
            className='input'
            onChange={(e)=> handleFormFieldChange("email",e)}/>
          </div>


          <div className="form__username">
            <label htmlFor="user_login">Password</label>
            <input type="text" 
            className='input'
            onChange={(e)=> handleFormFieldChange("password",e)}/>
          </div>



          <div className="form__alternative">
            <a onClick={(e) => apiLogin(e)}
            className='techwave_fn_button'>
              <span>Login</span>
            </a>
          </div>
        </div>
      </form>

      <div className="sign__desc">
        <p>Not a member ?
           <a onClick={()=>setActiveComponent("Signup")}>Sign Up</a>
        </p>
      </div>
    </div>

  </div>
  )
}

export default Login