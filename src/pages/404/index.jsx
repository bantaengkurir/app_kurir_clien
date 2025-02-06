import { Link, useNavigate } from "react-router-dom";
import useProductStore from "../../store/useProductStore";
import { useEffect } from "react";


const index = () => {


    const {logout, user, fetchUsers} = useProductStore();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate("/");
      };

      useEffect(()=>{
        fetchUsers();
      },[fetchUsers])
    
      const handleClick = () => {
        if(user[0].role == "seller"){
            navigate("/listproduct")
        }else{
            navigate("/")
        }
      }
    return(
       <>
        <div class="container-fluid page-header py-5">
        <h1 class="text-center text-white display-6">404 Error</h1>
        <ol class="breadcrumb justify-content-center mb-0">
            <li class="breadcrumb-item"><Link onClick={handleClick}>Home</Link></li>
            <li class="breadcrumb-item"><Link onClick={() => navigate(-1)}>Pages</Link></li>
            <li class="breadcrumb-item active text-white">404</li>
        </ol>
    </div>
    <div class="container-fluid ">
        <div class="container py-5 text-center">
            <div class="row justify-content-center">
                <div class="col-lg-6">
                    <i class="bi bi-exclamation-triangle display-1 text-secondary"></i>
                    <h1 class="display-1">404</h1>
                    <h1 class="mb-4">Page Not Found</h1>
                    <p class="mb-4">We’re sorry, the page you have looked for does not exist in our website! Maybe go to our home page or try to use a search?</p>
                    <Link 
                    onClick={handleClick}
                    class="btn border-secondary rounded-pill py-3 px-5" href="index.html">Go Back To Home</Link>
                </div>
            </div>
        </div>
    </div>
       </>
    )
}

export default index;