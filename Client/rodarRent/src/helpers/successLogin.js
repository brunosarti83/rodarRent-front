

export const checkLogin = (response,loginData) => {
if (response.status===200) {
    setLocalStorage
    toast.success('Welcome!, '+loginData.email, {position: "top-left"});//Mensaje al inicio en vista de usuario
    setTimeout(() => {
      navigate("/cars")
    }, "4000");
  } else {
    toast.error('Invalid login credentials', {position: "top-left"});
  }

}

