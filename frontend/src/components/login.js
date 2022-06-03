import React, {useState} from 'react'
// import { useParams } from 'react-router-dom'

const Login = (props) => {

  const [name, setName] = useState("")
  const [id, setId] = useState("")

  const onChangeName = (e) =>{
    const name = e.target.value
    setName(name)
  }

  const onChangeId = (e) =>{
    const id = e.target.value
    setId(id)
  }

  const login = () =>{
    props.login({name:name, id:id})
    props.history.push('/')
  }

  return (
    <div>
      <div className='login-form'>
        <form action="">
          <div>
          <label htmlFor="name">Username</label>
          <input type="text" placeholder='Enter Username' value={name} onChange={onChangeName} />
          </div>
          <div>
            <label htmlFor="id">ID</label>
            <input type="text" placeholder='Enter id' value={id} onChange={onChangeId} />
          </div>
          <button onClick={login}>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Login;
