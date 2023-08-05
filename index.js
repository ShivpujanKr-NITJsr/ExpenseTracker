var editing = null

function saveToLocalStorage(event){
    event.preventDefault();
    const price=event.target.name.value;

    const description=event.target.description.value;
    const category=event.target.category.value;
    const time=new Date().getMilliseconds();

    const obj={
        price,
        description,
        category,
        time
    }
      if (editing === null) {
        axios.post("https://crudcrud.com/api/f3b7901754874ecc9dc7c922c076d90a/appointmentData",obj)
        .then((response)=>{
            showUserOnScreen(response.data);
            // console.log(response);
        })
        .catch(err=>{
            document.body.innerHTML=err;
            console.log(err)

        })
    } else {
        const ur='https://crudcrud.com/api/f3b7901754874ecc9dc7c922c076d90a/appointmentData'+'/'+editing;
        axios.put(ur,obj)
        .then((response)=>{
            showUserOnScreen(response.data);
            // console.log(response.data);
        })
        .catch(err=>{
            document.body.innerHTML=err;
            console.log(err)

        })
        editing = null;
        
    }
    

    
            
            

    // localStorage.setItem(obj.description,JSON.stringify(obj));
    // showUserOnScreen(obj);
}

window.addEventListener("DOMContentLoaded",()=>{

    axios.get("https://crudcrud.com/api/f3b7901754874ecc9dc7c922c076d90a/appointmentData")
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
        
        const tim=obj.time;

        // axios.get('https://crudcrud.com/api/6ca6076d525f4757a50d7c0ba57abc44/appointmentData')
        //     .then((res)=>{
        //         console.log(res)
        //         res.data.forEach(element => {
        //             console.log(tim,element.time)
        //             if(element.time==tim){
        //                 const id=element._id;
        //                 // console.log(id);
        //                 const ur=`https://crudcrud.com/api/6ca6076d525f4757a50d7c0ba57abc44/appointmentData`+'/'+id
        //                 axios.delete(ur).then(()=>console.log("deleted object of id ",id))
        //                 .catch(err=>console.log(err));
                        
        //             }
        //         });
        //     })
        // console.log(obj._id);

        axios.delete(`https://crudcrud.com/api/f3b7901754874ecc9dc7c922c076d90a/appointmentData/${obj._id}`)
            .then(res=>(console.log('done')))
            .catch(err=>console.log(err));
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
        editing = obj._id;
        
    }
    children.appendChild(deletebtn)
    children.appendChild(editbtn)
    parentElemen.appendChild(children)
}



// function saveToLOcalStorage(e) {





// function showOnScreen(obj) {


//   editBtn.onCLick = (e) => {


//     
//   }
// }
