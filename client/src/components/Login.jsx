import React from 'react';

const Login = () => (
  <form action="/login" method="post">
    <div>
      <label>Username:</label>
      <input type="text" name="username" /><br />
    </div>
    <div>
      <label>Password:</label>
      <input type="password" name="password" />
    </div>
    <div>
      <input type="submit" value="Submit" />
    </div>
  </form>
);

export default Login;
