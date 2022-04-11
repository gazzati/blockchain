import { useEffect, useState } from 'react'
import Web3 from 'web3'
import { CONTACT_ABI, CONTACT_ADDRESS } from './config'

const App = () => {
  const [account, setAccount] = useState("")
  //const [contactList, setContactList] = useState<Array<any>>([])
  const [contacts, setContacts] = useState<any>([])

  useEffect(() => {
    const load = async () => {
      const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545')

      const accounts = await web3.eth.requestAccounts()
      setAccount(accounts[0])

      const contactList = new web3.eth.Contract(CONTACT_ABI, CONTACT_ADDRESS)  // Instantiate smart contract using ABI and address.
        console.log(contactList);
        //setContactList(contactList) // set contact list to state variable.

      const counter = await contactList.methods.count().call()  // Then we get total number of contacts for iteration
        console.log('counter',counter);
        for (let i = 1; i <= counter; i++) { // iterate through the amount of time of counter
        const contact = await contactList.methods.contacts(i).call() // call the contacts method to get that particular contact from smart contract
          console.log(contact)
          setContacts([...contact, contact]) // add recently fetched contact to state variable.
      }
    }

    load()

  }, [])

  return (
      <div>
        Your account is: {account}
        <h1>Contacts</h1>
        <ul>
          {
            Object.keys(contacts).map((contact, index) => (
                <li key={`${contacts[index].name}-${index}`}>
                  <h4>{contacts[index].name}</h4>
                  <span>
                    <b>Phone: </b> {contacts[index].phone}
                  </span>
                </li>
            ))
          }
        </ul>
      </div>
  )
}

export default App
