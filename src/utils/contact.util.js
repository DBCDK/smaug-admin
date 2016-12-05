/**
 * Convert a list of contacts to an object.
 *
 * Smaug needs contacts to be an object, where contact role is key.
 *
 * @param contactList
 * @returns {{}}
 */
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
