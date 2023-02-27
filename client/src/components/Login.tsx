export default function Login() {
  return (
    <div>Login

      <div>
        <label htmlFor="username">username</label>
        <input name="username" id="username" type="text" />
      </div>

      <div>
        <label htmlFor="password">password</label>
        <input name="password" id="password" type="text" />
      </div>

      <div>
        <label htmlFor="enter">enter</label>
        <button name="enter" id="enter">enter</button>
      </div>

    </div>
  )
}