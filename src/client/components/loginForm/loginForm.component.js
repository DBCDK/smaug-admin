import React from 'react';

export default function LoginForm({uri = ''}) {
  return (
    <div className="loginform">
      <form action="/login" method="post">
        <div className="element uri">
          <label for="uri">Url</label>
          <input type="text" name="uri" placeholder="https://auth.dbc.dk" autoComplete="on" defaultValue={uri}/>
        </div>
        <div className="element username">
          <label for="username">Username</label>
          <input type="text" name="username" autoComplete="on"/>
        </div>
        <div className="element password">
          <label for="username">Password</label>
          <input type="password" name="password" autoComplete="on"/>
        </div>
        <div className="element submit">
          <input type="submit" value="Login"/>
        </div>
      </form>
    </div>
  );
}
