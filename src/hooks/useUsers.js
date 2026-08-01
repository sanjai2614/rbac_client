import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  updateProfile,
  getProfile
} from "../api/userApi";
import { toast } from "react-toastify";

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
};

export const useGetSingleUser = (id) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getSingleUser(id),
    enabled: !!id,
  });
};

export const useUpdateUser = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      toast.success(data.msg)
    },
    onError:(err)=>{
      toast.error(err?.response?.data?.err)
    }
  });
};

export const useDeleteUser = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      toast.success(data.msg)
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,

    onSuccess: (data) => {

      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
      toast.success(data.msg)
    },
  });
};

export const useGetProfile=()=>{
    return useQuery({
      queryKey:['profile'],
      queryFn:getProfile,
      retry:false
    })
}
