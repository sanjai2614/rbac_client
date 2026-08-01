import { useMutation,useQueryClient } from "@tanstack/react-query";
import { changePassword, forgotPassword, loginUser, logoutUser, registerUser, resendVerification, resetPassword, verifyEmail } from "../api/userApi";
import { data, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useRegister = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log(data);
      toast.success(data.msg)
      navigate("/login")
    },
    onError: (err) => {
      toast.error(err?.response?.data?.err || err?.message);
      console.log(err.response)
    },
  });
};

export const useLogin = (options = {}) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginUser,

    onSuccess: (data) => {
      toast.success(data.msg);

      if (data.user.role === "user") {
        navigate("/profile");
      } else {
        navigate("/dashboard");
      }

      options.onSuccess?.(data);
    },

    onError: (err) => {
      toast.error(err?.response?.data?.err);
      options.onError?.(err);
    },
  });
};

export const useLogout=()=>{
  const navigate=useNavigate()
  const queryClient=useQueryClient()
  
  return useMutation({
    mutationFn:logoutUser,

    onSuccess:()=>{
      
      navigate('/login',{replace:true})
      queryClient.removeQueries({
        queryKey:['profile']
      })
      toast.success(data.msg)
    },
    onError:(err)=>{
      toast.error(err?.response?.data?.err)
      console.log(err)
    }

  })
}


export const useChangePassword=()=>{
    const navigate=useNavigate()

  return useMutation({
    mutationFn:changePassword,
    onSuccess:(data)=>{
        navigate('/login')
        toast.success(data.msg)
    },
    onError:(err)=>{
      toast.error(err?.response?.data?.err)
      console.log(err)
    }
  })
}

export const useForgotPassword=()=>{

  return useMutation({
    mutationFn:forgotPassword,
    onSuccess:(data)=>{
      toast.success(data.msg)
      console.log(data)
    },
    onError:(err)=>{
      toast.error(err?.response?.data?.err)
    }
  })
}

export const useResetPassword=()=>{
const navigate=useNavigate()

  return useMutation({
    mutationFn:resetPassword,
    onSuccess:(data)=>{
      console.log(data)
      toast.success(data.msg)
      setTimeout(()=>{
        navigate('/login')
      },1000)
    },
    onError:(err)=>{
      console.log(err)
      toast.error(err?.response?.data?.err)
    }
  })
}

export const useVerifyEmail=()=>{
  const navigate=useNavigate()

  return useMutation({
    mutationFn:verifyEmail,
    onSuccess:(data)=>{
      toast.success(data.msg,{toastId:"verify"})
      console.log(data)
      setTimeout(() => {
          navigate("/login");
        }, 2000);
    },
    onError:(err)=>{
      toast.error(err?.response?.data?.err)
      console.log(err?.response)
    }
  })
}

export const useResendVerification=()=>{
  return useMutation({
    mutationFn:resendVerification,
     onSuccess: (data) => {
      toast.success(data.msg);
    },

    onError: (err) => {
      toast.error(err.response?.data?.err);
    },
  })
}