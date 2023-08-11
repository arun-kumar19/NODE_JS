const backdrop = document.querySelector('.backdrop');
const sideDrawer = document.querySelector('.mobile-nav');
const menuToggle = document.querySelector('#side-menu-toggle');

function backdropClickHandler() {
  backdrop.style.display = 'none';
  sideDrawer.classList.remove('open');
}

function menuToggleClickHandler() {
  backdrop.style.display = 'block';
  sideDrawer.classList.add('open');
}

backdrop.addEventListener('click', backdropClickHandler);
menuToggle.addEventListener('click', menuToggleClickHandler);


async function deleteItem(event){
    //  alert(event.target.id)
          const id=event;
    //      console.log('value of id=',id);
      console.log(`Button ${id-1} was clicked.`);
      try{
    const response=await axios.delete(`/deleteitem/${id}`)
    console.log('delete resonse from server=',response);
        location.reload();
    
      }catch(error){
              console.log('getting error while fetching data from server =',error);

      }
    
 } 
