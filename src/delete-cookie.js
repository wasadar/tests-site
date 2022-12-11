import setCookie from './set-cookie.js';

export default function deleteCookie(name) {
    setCookie(name, "", {
      'max-age': -1
    })
}