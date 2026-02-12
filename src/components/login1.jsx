import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate, Link } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate()
    const [serverError, setServerError] = useState("")

    const token = localStorage.getItem("accessToken")

    if (token) {
        return <Navigate to="/todo" replace />
    }

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()

    const onSubmit = async(data) => {
        try{
            setServerError("")
            const response = await axios.post(
                "https://api.oluwasetemi.dev/auth/login",
                {
                    email: data.email,
                    password: data.password
                }
            )
            const result = response.data

            localStorage.setItem("accessToken", result.accessToken)
            localStorage.setItem("refreshToken", result.refreshToken)

            navigate("/todo")
        } catch(error) {
            setServerError(error.response?.data?.message || "Login failed. Try again.")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <section className="w-full max-w-md border rounded-lg p-6 shadow-sm">
                <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
                <p className="text-sm text-gray-500 mb-6">
                    Please enter your details
                </p>
                {serverError && (
                    <p className="text-red-500 text-sm mb-4">{serverError}</p>
                )}

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Email address
                        </label>
                        <input
                            type="email"
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focuse:ring-2 focus:ring-black"
                            {...register("email", {
                                required: "Email is required"
                            })}
                        />
                        {errors.email && (
                            <p className="mt-1 text-red-500 text-xs">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focuse:ring-2 focus:ring-black"
                            {...register("password", {
                                required: "Password is required"
                            })}
                        />
                        {errors.password && (
                            <p className="mt-1 text-red-500 text-xs">
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                    <button type="submit" disabled={isSubmitting} className="w-full bg-black text-white py-2 rounded-md hover:opacity-90 transition disbaled:opacity-50">
                        {isSubmitting ? "Logging in..." : "Log in"}
                    </button>

                    <p className="text-sm text-center mt-4">
                        Don’t have an account?{" "}
                        <Link
                            to="/register"
                            className="font-medium underline cursor-pointer"
                        >
                            Register
                        </Link>
                    </p>
                </form>
            </section>
        </div>
    )
}