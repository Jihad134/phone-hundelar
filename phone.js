const loadPage=async (seach,dataLimit)=>{
    const url=` https://openapi.programming-hero.com/api/phones?search=${seach}`
    const res=await fetch(url)
    const data=await res.json()
    displyShow(data.data,dataLimit)
}

const displyShow=(phones,dataLimit)=>{
    const container=document.getElementById("container")

    //hide button
    const hide=document.getElementById('show-btn')
    if(dataLimit && phones.length > 10){
        phones=phones.slice(0,10)
        hide.classList.remove("d-none")
    }
    else{
        hide.classList.add('d-none')
    }
    //hide button

    
    const noPhone=document.getElementById("contain-none")
    if(phones.length === 0){
        noPhone.classList.remove('d-none')
    }
    else{
        noPhone.classList.add("d-none")
    }
    container.innerHTML=``
   phones.forEach(phone => {
    
    const div=document.createElement("div")
    div.classList.add("col")
    div.innerHTML=`<div class="card">
    <img src="${phone.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${phone.phone_name}</h5>
      <p class="card-text"></p>
      <button onclick="phoneDetails('${phone.slug}')" href="#" class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#exampleModal">show details</button>
    </div>
  </div>`
  container.appendChild(div)
  
   })
   toggleLoader(false);
}
const procurment=(dataLimit)=>{
    toggleLoader(true)
    const inputFiled=document.getElementById("input")
    const inputtEXT= inputFiled.value;
    
   loadPage(inputtEXT,dataLimit) 
}

   document.getElementById('btn').addEventListener("click",function(){
   procurment(10)
   })


   document.getElementById("btn-show").addEventListener('click',function(){
    procurment();
    const inputFiled=document.getElementById("input")
    inputFiled.value=``
   })

   const toggleLoader=isSpiner=>{
    const lodaer=document.getElementById('loader')
    if(isSpiner){
        lodaer.classList.remove('d-none')
    }
    else{
        lodaer.classList.add('d-none')
    }
   }
  const phoneDetails=async(id)=>{
    const url=`https://openapi.programming-hero.com/api/phone/${id}`
    const res=await fetch(url)
    const data=await res.json()
    totalNumber(data.data)
  }
  const totalNumber=phone=>{
    const agerData=document.getElementById("exampleModalLabel")
    agerData.innerText=phone.name
    const pareData=document.getElementById("para")
    pareData.innerHTML=`<h3>btn: ${phone.name}</h3>
     <p>btn: ${phone.releaseDate}</p>
    `
  }
//enter press
document.getElementById("input").addEventListener('keypress',function(e){
    if(e.key==="Enter"){
        procurment(10)
    }
})
//enter press
loadPage()