import  { useState } from "react";
import Logo from "/public/ctm.png";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const dispatch = useDispatch(); 
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [datao, setDatao] = useState('');

  
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(setNameTrainer(e.target.nameTrainer.value));
    const data = {
      nombre: name,
      password,
    };
    axios
    .post("https://laureles-ap.onrender.com/api/v1/login/login", data)
    .then((res) => {
      setDatao(res.data);
      localStorage.setItem('token', res.data.login.token)
      // Redirigir dentro del callback de `axios` después de que se actualiza el estado
      if (res.data.login) {
        
        navigate("/principal");
      }
    })
    .catch(err => {
      alert('Usuario O Clave Incorrecto', err)
    }
    );
};
  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <form action="" onSubmit={handleSubmit}>
          <div className="login_form border-2 border-green-500 p-10 pt-5 shadow-sm mx-auto flex rounded w-[500px] justify-center">
            <div className="sec flex-1">
              <img className="mb-3 mx-auto h-[250px] pb-4" src={Logo} alt="" />
              <span className="flex shadow-md mb-5 text-xs">
                <span className="bg-indigo-500 w-28 font-bold text-center text-gray-200 p-3 px-5 rounded-l">
                  Usuario
                </span>
                <input
                  className="field text-sm text-gray-600 p-2 px-3 rounded-r w-full"
                  type="text"
                  placeholder="Jostin Hurtado"
                  name="name"
                  // value={name} 
                  autoComplete="name"
                  onChange={handleNameChange} 
                />
              </span>
              <span className="flex shadow-md mb-5 text-xs">
                <span className="bg-indigo-500 w-28 font-bold text-center text-gray-200 p-3 px-5 rounded-l">
                  Clave
                </span>
                <input
                  className="field text-sm text-gray-600 p-2 px-3 rounded-r w-full"
                  type="password"
                  placeholder="********"
                  name="password"
                  // value={password} 
                  onChange={handlePasswordChange} 
                  autoComplete="current-password" 
                />
              </span>
              {/* <a className="text-indigo-500 hover:underline font-bold text-xs ml-auto cursor-pointer">Forget Password ?</a> */}
              <button className="border-2 border-indigo-500 hover:bg-indigo-500 hover:text-gray-100 mt-3 text-indigo-500 block text-center p-3 px-4 text-sm rounded cursor-pointer font-bold">
                Acceso
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
