export function contactListToObject(contactList) {
  const contacts = {};
  for (const contact of contactList) {
    const {role, ...info} = contact;
    if (role) {
      contacts[role] = info;
    }
  }

  return contacts;
}

