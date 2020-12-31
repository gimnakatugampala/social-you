
//JS SDK
window.fbAsyncInit = function() {
    FB.init({
      appId            : '404843883907130',
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v9.0'
    });
    
    //get the user status
    
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });

  };

  //Check if the user is logged in or not
function statusChangeCallback(response){
    console.log(response)
    if(response.status === 'connected'){
        console.log('User is Connected');
        setElements(true)
        testAPI();
    }else{
        console.log('User is not Authorized')
    }
}

//Chek if the user is logged in
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }


  //Call the data
  function testAPI(){
    FB.api('/me?fields=id,birthday,name,email,gender,posts,photos,videos,location,hometown,link', function(response){
      if(response && !response.error){
        console.log(response)
            buildProfile(response);
            buildFeed(response);
            showAlert(`Welcome ${!response.name || '' ? 'User': response.name} !`)
      }
    })
  }

  //Show or Hide Elements
  function setElements(isLoggedIn){
    if(isLoggedIn){
        document.querySelector('.login').style.display = 'none';
        document.getElementById('profile').style.display = 'block';
        document.getElementById('feed').style.display = 'block';
        document.getElementById('logout').style.display = 'block';
    }else{
        document.querySelector('.login').style.display = 'flex';
        document.getElementById('profile').style.display = 'none';
        document.getElementById('feed').style.display = 'none';
        document.getElementById('logout').style.display = 'none';
    }
  }

  //DOM Profile
  function buildProfile(user){
      let profile = `    
      <div class="card mb-3">
      <h3 class="card-header">Your Account Info</h3>
      <ul class="list-group list-group-flush">
          <li class="list-group-item"><i class="far fa-user-circle"></i> Name : ${!user.name || '' ? 'Name not Available': user.name}</li>
          <li class="list-group-item"><i class="far fa-envelope"> </i> Email : ${!user.email || '' ? 'N/A': user.email}</li>
          <li class="list-group-item"><i class="fas fa-user-friends"> </i> Gender : ${!user.gender || '' ? 'N/A': user.gender}</li>
          <li class="list-group-item"><i class="fas fa-birthday-cake"> </i> Birthday : ${!user.birthday || ''?'N/A': user.birthday}</li>
          <li class="list-group-item"><i class="far fa-compass"> </i> Location : ${!user.location || ''? 'N/A' : user.location.name}</li>
        </ul>
        <div class="card-body">
        <a href="${!user.link || ''? 'N/A': user.link}" class="card-link" target="_blank">Go to Your Profile</a>
      </div>
     </div>
      `;

      document.getElementById('profile').innerHTML = profile;
  }

  //DOM Feed
  function buildFeed(feed){
      const data  = feed.posts.data;
      let posts = '<h2 class="text-center">Your Feed</h2>';
      if(data === undefined || data === '' || data === null){
        posts += '<h2>Content Not Available</h2>';
        document.getElementById('feed').innerHTML = posts;
      }else{
        data.forEach(dat =>{
          posts += `
          <div class="card mb-3">
                     <div class="card-header"><h4>${!dat.message ? 'Content not available😌' : dat.message}</h4></div>
                     <small class="bg-primary p-2">${new Date(dat.created_time)}</small>
                 </div>
      `;
        })
  
        document.getElementById('feed').innerHTML = posts;

      }
     
  }

  // //Event delegation 
  // document.querySelector('body').addEventListener('click',function(e){
    
  //   if(e.target.classList.contains('btn-danger')){
  //       window.location.reload();
  //   }

  // })

  //Show alert
  function showAlert(message){
      const alert = document.getElementById('alert');
      const div = document.createElement('div');
      div.className = 'alert alert-info';
      div.appendChild(document.createTextNode(message));

      alert.appendChild(div);

      setTimeout(() => alert.remove(),3000)
      
  }
//   //Log out all
  function logout(){
    FB.logout(function(response){
        // window.location.reload()
      setElements(false);
      
    });


  }
