import { ContactPerson , state } from "./model";
import ContactContainerView from "./Views/ContactContainerView";
import AddContactView from "./Views/AddContactView";
import SearchView from "./Views/SearchView";
const getContactsFromLS=()=>
{
    return JSON.parse(localStorage.getItem("contacts")|| "[]")
}

const controlContactDelete = (id) => {
    let list = getContactsFromLS();
    if (Array.isArray(list)) {
      list = list.filter((contact) => {
        if (contact.id === id) return false;
        else return true;
      });
      ContactContainerView.render(list);
      if(state.isSearching) handleSearchClear();
      list = JSON.stringify(list);
      localStorage.setItem("contacts", list);
    }
  };
const controlAddContact =(event)=>
{
    event.preventDefault();
    const { Name,Email,Phone }= AddContactView;
    const newContact= new ContactPerson(Name,Email,Phone);
    newContact.saveContactInLS();
    AddContactView.clearForm();
    ContactContainerView.pushContactIntoContainer(newContact);
}

const handleSearch=(e)=>
{
    state.isSearching=true;
    e.preventDefault();
    const { query }= SearchView;
    location.hash=`#q=${query}`
    // SearchView.clearForm();
}
const search =(query)=>
{
    const list = getContactsFromLS();
    let results=[];
    if(Array.isArray(list))
    {
        list.forEach(contact=>
            {
                if(contact.name.includes(query)|| contact.phone.toString().includes(query)||contact.email.includes(query))
                {
results.push(contact);
// console.log(results);

}
})
}
return results;
}
const controlHashChange = () => {
    const query = location.hash.split("=")[1];
    console.log("query is ", query);
    const results = search(query);
    console.log(results)
    if (typeof query !== "undefined" && query.length > 0)
    { 
      ContactContainerView.render(results);
    }
    else ContactContainerView.render(getContactsFromLS());
  };

  const handleSearchClear = (e) => {
    state.isSearching = false;
    if(e) e.preventDefault();
    SearchView.toggleButtons();
    SearchView.clearForm();
    location.hash = "";
  };
const init=()=>
            {
                AddContactView.addContactSubmitListener(controlAddContact);
                ContactContainerView.addDeleteListener(controlContactDelete);
                ContactContainerView.render(getContactsFromLS());
                SearchView.addSubmitEvent(handleSearch);
                SearchView.addHandleClear(handleSearchClear)
                window.onhashchange = controlHashChange;
            }
init();