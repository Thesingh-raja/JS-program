import "regenerator-runtime";

const stateUpdateEvent =new Event("stateUpdate")

function StateManager(){
    this.state={
        isLoading:false,
     info:{},
    };
    this.setState=(newState)=>{
this.state={...newState};
dispatchEvent(stateUpdateEvent);
    }
};

export const StateMan= new StateManager();
// export let state=
// {
//     isLoading:false.valueOf,
//     info:{},

//     }                         
  
    
    const API_KEY = "f119b60be9bd4020804b85b799cb9cc9"
   export const getCityData = async(city)=>
    {
        return new Promise((resolve,reject)=>
        {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`,
            {
                headers:{
                Accept: "application/json",
            },
            method:"GET",
            mode: "cors",
        
        }).then(res=>res.json()).then(data=>{
            resolve(data);
        }).catch(err=>{
            reject(err);
        })
        
    });
    }
