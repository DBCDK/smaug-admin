// Components
import ClientList from '../client/components/clientList/clientList.component';
import Client from '../client/components/clientForm/clientFormContainer.component';
import Newclient from '../client/components/createClient/newClient.component';
import LoginForm from '../client/components/loginForm/loginFormContainer.component';


export default function getComponentFromId(pageId) {
  switch (pageId) {
    case 'clientform':
      return Client;
    case 'newclient':
      return Newclient;
    case 'login':
      return LoginForm;
    default:
      return ClientList;
  }
}
