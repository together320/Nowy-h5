export default function ({$axios, redirect}) {

  $axios.onRequest(config => {
    const item = JSON.parse(localStorage.getItem('fpfp'));
    if(item){
      $axios.setHeader('token',item.token)
    }
  })

  $axios.onResponse(function (response) {
    if(response.data.code===401){
      localStorage.removeItem('fpfp')
      return Promise.reject('no auth')
    }else{
      return response
    }
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

  $axios.onError(error => {
    if(error === 'no auth'){
      let currentUrl = window.location.href
      currentUrl = currentUrl.replace(/^.*\/\/[^\/]+/, '')
      if(!(currentUrl.indexOf('login')>-1&&currentUrl.indexOf('redirect')>-1)){
        redirect(`/login/?redirect=${currentUrl}`)
      }
    }
    if (error.response.status === 500) {
      redirect('/sorry')
    }
  })
}
