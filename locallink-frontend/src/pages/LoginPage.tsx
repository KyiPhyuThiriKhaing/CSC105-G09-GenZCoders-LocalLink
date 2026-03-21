import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

const userSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string(),
});

type UserFormData = z.infer<typeof userSchema>;


function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  return (
    <div className="flex items-center justify-center h-screen bg-[#F3E8FF]">
      <div id="LoginPlate" className="flex flex-col items-center w-150 h-130 bg-[#9810FA] rounded-4xl pt-15">
        <h1 className="flex items-center justify-center text-white text-5xl font-bold pt-10">Login</h1>
        {/* <p className="text-white text-sm italic">Welcome Back! Sign in to your account</p> */}
        <div className="mt-10">
          <p className="text-white ">Email</p>
          <input type="email" {...register("email")} className="bg-gray-300 pl-3 rounded-md w-67 h-8" placeholder="Email"/>
          {errors.email && <p className="text-red-300 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div className="mt-2">
          <p className="text-white">Password</p>
          <input type="password" {...register("password")} className="bg-gray-300 pl-3 rounded-md w-67 h-8" placeholder="Password"/>
          {errors.password && <p className="text-red-300 text-xs">{errors.password.message}</p>}

        </div>
        
        <div id="CreateForgot-Password" className="flex items-center justify-between mt-2 text-sm w-67 text-white italic">
          <a href="#"><Link to="/signup">Create new account</Link></a>
          <a href="#">Forgot Password?</a>
        </div>

        <button onClick={handleSubmit(() => {})} className="mt-8 bg-gray-300 rounded-md w-67 h-8 text-gray-600">Login</button>
      </div>
    </div>
    
  );
}

export default LoginPage;