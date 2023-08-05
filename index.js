function saveToLocalStorage(event){
    event.preventDefault();
    const price=event.target.name.value;

    const description=event.target.description.value;
    const category=event.target.category.value;

    const obj={
        price,
        description,
        category
    }


    axios.post("https://crudcrud.com/api/42d183f5000b488d9318d34970bf9a7f/appointmentData",obj)
        .then((response)=>{
            showUserOnScreen(response.data);
            // console.log(response);
        })
        .catch(err=>{
            document.body.innerHTML=err;
            console.log(err)

        })
            
            

    // localStorage.setItem(obj.description,JSON.stringify(obj));
    // showUserOnScreen(obj);
}

window.addEventListener("DOMContentLoaded",()=>{

    axios.get("https://crudcrud.com/api/42d183f5000b488d9318d34970bf9a7f/appointmentData")
        .then((res)=>{

            console.log(res)

            for(var i=0; i<res.data.length;i++){
                showUserOnScreen(res.data[i])
            }
        })
        .catch(err=>console.log(err))
    // const localStorageObj=localStorage;

    // const localStoragekeys=Object.keys(localStorage)

    // for(var i=0; i<localStoragekeys.length;i++){
    //     const key =localStoragekeys[i];
    //     const userDetailsString =localStorageObj[key]
    //     const userDetailsObj=JSON.parse(userDetailsString);
    //     showUserOnScreen(userDetailsObj);
    // }
})

function showUserOnScreen(obj){
    const parentElemen=document.getElementById('listofitems');
    const children=document.createElement('li');

    children.textContent=obj.price+'- '+obj.description+'- '+obj.category;

    const deletebtn=document.createElement('input');
    deletebtn.type='button'
    deletebtn.value='Deleteexpense'

    deletebtn.onclick=()=>{
        
        localStorage.removeItem(obj.description);
        parentElemen.removeChild(children)
    }

    children.appendChild(deletebtn)
    const editbtn=document.createElement('input')
    editbtn.type='button'
    editbtn.value='Editexpense'
    editbtn.onclick=()=>{
        localStorage.removeItem(obj.description)
        parentElemen.removeChild(children)
        document.getElementById('price').value=obj.price
        document.getElementById('description').value=obj.description
        document.getElementById('category').value=obj.category
    }
    children.appendChild(deletebtn)
    children.appendChild(editbtn)
    parentElemen.appendChild(children)
}
