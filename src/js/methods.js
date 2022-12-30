import { router } from "./router";
import { loadData } from "./util";

export const getData=()=>{
    const data=JSON.parse(localStorage.getItem('mydayapp-js')) || [];
    loadData(data);
    return data;
}


export const saveItems=(item)=>{
    const data=JSON.parse(localStorage.getItem('mydayapp-js'));

    if(!data){
        localStorage.setItem('mydayapp-js', JSON.stringify(item));
        loadData(item);
    }else{
        data.push(...item);
        localStorage.setItem('mydayapp-js', JSON.stringify(data));
        loadData(data)
    }
}



export const editData=(ele)=>{
    
    const data=JSON.parse(localStorage.getItem('mydayapp-js')) || [];;
    const dataModif=[];
   data.forEach(element => {
        if(element.id===ele.id){
            element=ele;
        }
        dataModif.push(element);
    });    
    localStorage.setItem('mydayapp-js', JSON.stringify(dataModif))


} 


export const deleteItem=(el)=>{
    const data=getData();
    const dataModif=[];
    data.filter(element => {
        if(element.id!==el.id){
            dataModif.push(element);
        }
    });

    localStorage.setItem('mydayapp-js', JSON.stringify(dataModif))
    router();
}
 
