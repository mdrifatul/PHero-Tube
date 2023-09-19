const categoryList = async() =>{
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const datas = data.data;
    // console.log(datas)

    const loadcategory = document.getElementById('load-category');

    
    datas.forEach(category => {

        const div = document.createElement('div');

        div.innerHTML = `
        <button onclick="handleCategorys(${category.category_id});" class="btn btn-error text-white mx-2 bg-gray-300 border-0 text-[#171717B2]">${category.category}</button>
        `;
        loadcategory.appendChild(div);
    });
};




// information api
const handleCategorys = async(categoryId) => {
  // console.log(categoryId)
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    const data = await res.json();
    const datas = data.data;
    // console.log(datas)
    // sortView(datas)
    videodiv(datas);
    emptyFun(datas)
    globalData = datas;
    displayData();
  } 

// document.getElementById('sort-view').addEventListener('click',displayData)

// const sortView =(data)=>{
//   const viewData = `${view.others.views}`;
//     console.log(viewData)
//     const floatView = parseFloat(viewData)
//     console.log(floatView)
//     const datas = [];
//     datas.push(floatView)
//     data = datas
//     console.log(datas)
// }
// function displayData(){
//   document.getElementById('video_container').innerHTML = sortView();
// }


// display card
const videodiv = (datas)=>{

    const videoContainer = document.getElementById('video_container')
    videoContainer.textContent = "";

    datas.forEach(videos =>{

        // convert time function
        function convertTime(time){
          let secondtoHours = Math.floor(`${time.others.posted_date / 3600}`);
          let remainder = secondtoHours % 3600
          let minutes = Math.floor(remainder / 60);

          const div = document.createElement('div')

          return div.innerHTML = `
          <div class = "flex justify-end">
          <p class="absolute bg-slate-800  p-1 rounded-lg text-white -mt-10 ">${secondtoHours}hrs ${minutes}min ago</p>
          </div>
          `     
        }

        // secont to hours convert
        const div = document.createElement('div');

        div.innerHTML = `
        <div class="card card-compact bg-base-100 shadow-xl">
            <figure>
              <img class="h-36 w-full"
                src="${videos?.thumbnail}"
                alt="Shoes"
              />
            </figure>

            <div>
            ${videos.others.posted_date? convertTime(videos) :""}
            </div>
                     
            <div class="card-body">
              <div class=" flex">
              <img class="h-8 w-8 rounded-full" src="${videos?.authors[0]?.profile_picture}" alt="image" />
                <h4 class="card-title text-base ml-2">${videos?.title}</h4>
              </div>
              <div class="flex ml-10 -mt-2">
              <p>${videos.authors[0].profile_name}
              <span class =" ">
              ${videos?.authors[0]?.verified === true ? '<i class="fa-solid fa-check bg-blue-500 text-white rounded-full px-1 py-0.5 text-xs"></i>' : " "}
              </span> </p>
              </div>
              <p class="ml-10">${videos.others.views}</p>
            </div>
          </div>    
            
        `;

        videoContainer.appendChild(div)
    });

  }

  //  no content condition
  const emptyFun = (datas)=> {
    const datafield = document.getElementById('datafield')
    datafield.textContent = "";
  
    if(datas.length === 0){
      // console.log(datas.length)  
      const newDiv = document.createElement('div')
      newDiv.innerHTML = `
      <div class="text-center">
      <img class="mx-auto my-10" src="./images/Icon.png">
      <p class="text-4xl font-bold">Oops!! Sorry, There is no content here</p>
      </div>
      `
      datafield.appendChild(newDiv)
    }
  }

  let globalData = [];

 const displayData = () =>{
  // console.log(datas)
  const videoContainer = document.getElementById('video_container')
  videoContainer.textContent = "";
  globalData.forEach(item =>{
    // console.log(item)
  // console.log(`${item.others.view}`)
  const div = document.createElement('div')
  div.textContent =  `${item.others.view}`
  videoContainer.appendChild(div)
})

 }





categoryList();

// handleCategorys()


