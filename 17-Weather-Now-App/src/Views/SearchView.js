class SearchView{

    container = document.querySelector(".search-form")
     
    addSubmitController(controller)
    {
        if (typeof controller !== "function") throw new TypeError("Controller must be a function");
        this.container.addEventListener("submit",controller.bind(this))
    }
    clearForm()

    {
        return this.container.querySelector(".search-input").value=""

    }
    get query(){
        return this.container.querySelector(".search-input").value;
    }
}
export default new SearchView();