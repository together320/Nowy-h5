export default function ({$axios, redirect}) {

  $axios.onRequest(config => {

  })

  $axios.onResponse(function (response) {
    if(response.data.code===401){
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
      console.log('no auth')
    }
  })
}
