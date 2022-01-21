class ContactContainerView
{
    _container=document.querySelector(".contacts_container");
    render(data)
    {
        this.data=data;
        const html=this.#generateHTMLString();
        // console.log(html);
        this._container.innerHTML=html;
        this.applyDeleteEvent();
    }

    
    applyDeleteEvent()
    {
        const deleteBtns=document.querySelectorAll(".delete_contact");
        deleteBtns.forEach((btn)=>
            {
                btn.addEventListener("click",()=>
                {
                    this.onDelete(btn.id);
                })
            })
    }
    addDeleteListener(handler)
    {
        this.onDelete=handler;
    }
    pushContactIntoContainer(contact)
{
    const html=this.#generatCardContactHTML(contact);
    this._container.insertAdjacentHTML("afterbegin",html);
    this.applyDeleteEvent();

}
    #generateHTMLString(){
        const data=this.data;
        let html=""
        // console.log(html);
        // console.log(data);
        if(Array.isArray(data))
        {
            data.forEach((contact)=>
                {
                    html += this.#generatCardContactHTML(contact);
                        // console.log(html);
                })
return html;
        }
    }
    #generatCardContactHTML(contact) {
        return ` <div class="contact_card">
                <div class="contact_info">
                  <div style="font-size:x-large">${contact.name}</div>
                  <div>${contact.phone}</div>
                  <div>${contact.email}</div>
                </div>
                <button class="delete_contact" id="${contact.id}">delete</button>
            </div>`;
      }
}
export default new ContactContainerView();