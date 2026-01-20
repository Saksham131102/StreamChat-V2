import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Eye, EyeOff, Lock, Mail, Shield, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";
import audienceImg from "../../../assets/img/audienceImg.png";

const SignupSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
  });

type SignupFormData = z.infer<typeof SignupSchema>;

const SignupPage = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<"user" | "admin">("user");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignupFormData>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      // Simulate API Call
      console.log("Form Data:", data);
      reset();
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div className={`min-h-screen bg-black transition-colors duration-500`}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={audienceImg}
          alt="Signup Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className="mb-2 flex items-center text-white hover:text-gray-300 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back
          </button>

          {/* Signup Card */}
          <div
            className={`bg-transparent border border-gray-400 backdrop-blur-sm rounded-2xl shadow-2xl p-8`}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-linear-to-r from-red-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">SC</span>
                </div>
              </div>
              <h1 className="text-2xl text-white font-bold mb-2">
                Join StreamChat
              </h1>
              <p className={`text-gray-400`}>
                Create your account and start streaming
              </p>
            </div>

            {/* User Type Selection */}
            <div className="mb-6">
              <label className="block text-sm text-white font-medium mb-3">
                Account Type:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setUserType("user")}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                    userType === "user"
                      ? "border-red-500 bg-red-50 text-red-700"
                      : "border-gray-400 bg-transparent text-gray-300 hover:border-gray-500 hover:cursor-pointer"
                  }`}
                >
                  <User className="w-6 h-6 mx-auto mb-2" />
                  <span className="text-sm font-medium">User</span>
                </button>
                <button
                  type="button"
                  onClick={() => setUserType("admin")}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                    userType === "admin"
                      ? "border-purple-500 bg-purple-50 text-purple-700"
                      : "border-gray-400 bg-transparent text-gray-300 hover:border-gray-500 hover:cursor-pointer"
                  }`}
                >
                  <Shield className="w-6 h-6 mx-auto mb-2" />
                  <span className="text-sm font-medium">Admin</span>
                </button>
              </div>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Username Field */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm text-white font-medium mb-2"
                >
                  Username
                </label>
                <div className="relative">
                  <User
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                      errors.username
                        ? "text-red-500" // Highlight icon red on error
                        : "text-gray-300"
                    }`}
                  />
                  <input
                    id="username"
                    type="text"
                    {...register("username")} // Replaces name, value, and onChange
                    onClick={() => clearErrors("username")}
                    aria-invalid={errors.username ? "true" : "false"}
                    placeholder="Enter your email"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border bg-transparent border-gray-400 text-white placeholder-gray-300 ${
                      userType === "user"
                        ? "focus:border-red-500"
                        : "focus:border-purple-700"
                    } focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-colors`}
                  />
                </div>
                {/* Error Message */}
                {errors.username && (
                  <p className="mt-1 text-sm text-red-500 font-medium">
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm text-white font-medium mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                      errors.email
                        ? "text-red-500" // Highlight icon red on error
                        : "text-gray-300"
                    }`}
                  />
                  <input
                    id="email"
                    type="email"
                    {...register("email")} // React Hook Form registration
                    onClick={() => clearErrors("email")}
                    aria-invalid={errors.email ? "true" : "false"}
                    placeholder="Enter your email"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border bg-transparent border-gray-400 text-white placeholder-gray-300 ${
                      userType === "user"
                        ? "focus:border-red-500"
                        : "focus:border-purple-700"
                    } focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-colors`}
                  />
                </div>
                {/* Error Message */}
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500 font-medium">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 gap-4">
                {/* Password Field */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm text-white font-medium mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                        errors.password ? "text-red-500" : "text-gray-300"
                      }`}
                    />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                      onClick={() => clearErrors("password")}
                      aria-invalid={errors.password ? "true" : "false"}
                      className={`w-full pl-10 pr-12 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 bg-transparent border-gray-400 text-white placeholder-gray-300 ${
                        userType === "user"
                          ? "focus:border-red-500 focus:ring-red-500/20"
                          : "focus:border-purple-700 focus:ring-purple-700/20"
                      }`}
                      placeholder="Create password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 hover:cursor-pointer transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500 font-medium">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm text-white font-medium mb-2"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                        errors.confirmPassword
                          ? "text-red-500"
                          : "text-gray-300"
                      }`}
                    />
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      {...register("confirmPassword")}
                      onClick={() => clearErrors("confirmPassword")}
                      aria-invalid={errors.confirmPassword ? "true" : "false"}
                      className={`w-full pl-10 pr-12 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 bg-transparent border-gray-400 text-white placeholder-gray-300 ${
                        userType === "user"
                          ? "focus:border-red-500 focus:ring-red-500/20"
                          : "focus:border-purple-700 focus:ring-purple-700/20"
                      }`}
                      placeholder="Confirm password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 hover:cursor-pointer transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-500 font-medium">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Terms Agreement */}
              {/* <div className="flex items-start">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  required
                  className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 focus:ring-2 mt-1"
                />
                <label
                  className={`ml-2 text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}
                >
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="text-red-600 hover:text-red-500 transition-colors"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="text-red-600 hover:text-red-500 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div> */}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 transform hover:scale-105 hover:cursor-pointer ${
                  userType === "admin"
                    ? "bg-linear-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                    : "bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                } shadow-lg hover:shadow-xl`}
              >
                {isSubmitting ? (
                  <>Signing up...</>
                ) : (
                  <>Create {userType === "admin" ? "Admin" : "User"} Account</>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6">
              <div className="flex justify-center items-center">
                <span className={`px-2 text-sm bg-transparent text-gray-300`}>
                  Already have an account?
                </span>
              </div>
            </div>

            {/* Login Link */}
            <Link
              to="/signin"
              className={`block w-full text-center py-3 px-4 rounded-lg border-2 font-semibold transition-all duration-200
                border-gray-600 text-gray-300 hover:border-gray-500
              `}
            >
              Sign In Instead
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
