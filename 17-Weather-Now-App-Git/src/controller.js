import infoView from "./Views/infoView";
import SearchView from "./Views/SearchView";
import { getCityData,state, StateMan } from "./modal";
import "regenerator-runtime"

const handleSearch=async (event)=>{
    event.preventDefault();
    console.log("handle search triggered");
    const { query } = SearchView;
    StateMan.setState(
        {
            ...StateMan.state,
            isLoading:true,
        }
    )
    const data= await getCityData(query);
    StateMan.setState(
        {
            ...StateMan.state,
            isLoading:false,
            info:data
        }
    )
  SearchView.clearForm();
    console.log(data);

   }

window.addEventListener("stateUpdate",()=>{
    if(StateMan.state.isLoading)
    {
        infoView.renderSpinner();
    }
    else infoView.render(StateMan.state.info);
})

const init =()=>{
    SearchView.addSubmitController(handleSearch);
    // infoView.renderSpinner();
    // infoView.render(state.info);
}
init();