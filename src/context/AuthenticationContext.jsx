import { createContext,useContext,useState } from "react"
import { useNavigate } from "react-router-dom"
import MoviesContext from "./MovieContext"

const AuthenticationContext = createContext()

const AuthenticationProvider = ({ children }) => {

  let KEY = `AIzaSyBPYoyux2woU3I1CoBjpWZf3e6HIM_dr8k`

  const {setIsLogin} = useContext(MoviesContext)

  const navigate = useNavigate()
  
  const [user, setUser] = useState(localStorage.getItem('user') || {
    username: '',
    email: '',
    password: '',
  })

  const [username, setUsername] = useState('')

  const [inHome, setInHome] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault();

    console.log(user);

    if (Object.values(user).includes('')) {
      console.log('campos vacios');
      return;
    } else if (user.password) {
      loginData();
      localStorage.setItem('username', user.username);
    } else {
      console.log('los campos no coinciden');
    }
  };

  const loginData = async () => {
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${KEY}`,
      {
        method: 'POST',
        body: JSON.stringify({
          email: user.email,
          password: user.password,
          returnSecureToken: true
        })
      }
    );

    const data = await res.json();

    console.log(data);

    localStorage.setItem('user', JSON.stringify(data));
    localStorage.setItem('username', user.username);

    setUsername(user.username);
  


    if(JSON.parse(localStorage.getItem('user').includes('400'))){
      console.log('account not found');
      localStorage.clear()
      navigate('/');
      return
    }else{
      setIsLogin(true)
      navigate('/home');
    }

  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (Object.values(user).includes('')) {
      console.log('campos vacios');
    } else if (user.password === user.password2) {
      if(user.password.length >=6){
        registerData();
        localStorage.setItem('username', user.username);
      }else{
        console.log('La password debe ser mayor a 6 caracteres')
      }
    } else {
      console.log('campos incorrectos');
    }
    console.log('user', user);
  };

  const registerData = async () => {
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${KEY}`,
      {
        method: 'POST',
        body: JSON.stringify({
          email: user.email,
          password: user.password,
          returnSecureToken: true
        })
      }
    );

    const data = await res.json();

    localStorage.setItem('user', JSON.stringify(data));
    localStorage.setItem('username', user.username);

    setUsername(user.username);
    setIsLogin(true)

    navigate('/home');
  };

  const handleChange = (e) => {
    setUser({
        ...user,
        [e.target.name]: e.target.value
    })
    console.log(e.target.value);
  }


  return (
    <AuthenticationContext.Provider
      value={{handleChange,handleLogin,handleRegister, inHome,setInHome}}
    >
      {children}
    </AuthenticationContext.Provider>
  )
}

export { AuthenticationProvider }

export default AuthenticationContext