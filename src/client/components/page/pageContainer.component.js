import React, {useState} from 'react';
import MagnifyingGlass from '../svg/MagnifyingGlass';

const noop = () => {
};

const InputField = ({value = '', onSearch = noop}) => {
  const [search, setSearch] = useState(value);
  const onSubmit = e => {
    onSearch(search);
    e.preventDefault();
  };
  return <form onSubmit={onSubmit} className='search-form'>
    <button type="submit" className='search-button'><MagnifyingGlass/></button>
    <input type="text" name="find" value={search} className='search-input'
           placeholder="Search clients and configurations"
           onInput={e => setSearch(e.target.value)} onChange={e => setSearch(e.target.value)}/>
  </form>;
  // In the above input tag, onChange is not able to handle deletion of the last character from the input field
  // - onInput handles it correctly therefore both onInput and onChange are used.
};

const Menu = ({userLoggedIn = false, findValue = '', onSearch = noop}) =>
  <div className='menu-container'>
    <div className='left-menu'>
      <div className='menu-item'><a href='/'>Client List</a></div>
      <div className='menu-item'><a href='/add'>Create Client</a></div>
    </div>
    <div className='right-menu'>
      {userLoggedIn && <div className='menu-item'><InputField value={findValue} onSearch={onSearch}/></div>}
      {userLoggedIn && <div className='menu-item'><a href='/logout'>Log out</a></div>}
    </div>
  </div>;


const PageContainer = ({children, id, title, userLoggedIn = false, searchString = '', onSearch = noop}) =>
  <div
    className="page-wrapper">
    <header className="header">
      <div className="wrapper">
        <div className="logo"><a href="/">Smaug Admin</a></div>
        <Menu userLoggedIn={userLoggedIn} findValue={searchString} onSearch={onSearch}/>
      </div>
    </header>
    <div className={`wrapper page ${id}`}>
      <h1>{title}</h1>
      {children}
    </div>
  </div>;

export default PageContainer;
