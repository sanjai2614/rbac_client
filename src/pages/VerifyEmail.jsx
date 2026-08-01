import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useVerifyEmail } from "../hooks/useAuth";

const VerifyEmail = () => {
  const { token } = useParams();

  const { mutate, isPending } = useVerifyEmail();

  return (
    <div className="min-h-screen flex flex-col space-y-5 items-center justify-center">
      <h2 className="text-2xl font-semibold">
        Click here to verify your email
      </h2>
      <button disabled={isPending}
        onClick={() => mutate(token)}
        className="bg-blue-500 rounded-lg py-3 px-5
         text-sm text-white hover:bg-blue-700 active:scale-98 transition-all duration-75 disabled:bg-blue-100"
      >
        {isPending ? "Verifying" : "Verify"}
      </button>
    </div>
  );
};

export default VerifyEmail;
