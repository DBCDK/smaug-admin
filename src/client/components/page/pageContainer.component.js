import React from 'react';

function Menu({links}) {
  return (
    <nav>
      <ul>
        {links.map((link)=> <li key={link.display} className={link.classes || ''}><a href={link.url}>{link.display}</a></li>)}
      </ul>
    </nav>
  );
}

export default function PageContainer({children, id, title, links}) {
  return (
    <div className="page-wrapper">
      <header className="header">
        <div className="wrapper">
          <div className="logo"><a href="/">Smaug Admin</a></div>
          <Menu links={links}/>
        </div>
      </header>
      <div className={`wrapper page ${id}`}>
        <h1>{title}</h1>
        {children}
      </div>
    </div>
  );
}
