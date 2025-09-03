import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

interface User {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const SignupSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Enter your password"),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), undefined], "Passwords must match").required("Confirm your password"),
});

function Signup() {
    const navigate = useNavigate();

    const formik = useFormik<User>({
        initialValues: { name: "", email: "", password: "", confirmPassword: "" },
        validationSchema: SignupSchema,
        onSubmit: (values) => {
            const usersJson = localStorage.getItem("users");
            const users: User[] = usersJson ? JSON.parse(usersJson) : [];

            if (users.find((u) => u.email === values.email)) {
                alert("An account with this email already exists, use a different email");
                return;
            }

            users.push(values);
            localStorage.setItem("users", JSON.stringify(users));

            alert("Registered successfully");
            navigate("/");
        },
    });

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form
                onSubmit={formik.handleSubmit}
                className="bg-white p-8 rounded shadow-md w-96 flex flex-col gap-4"
            >
                <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                {formik.touched.name && formik.errors.name && (
                    <div className="text-red-500 text-sm">{formik.errors.name}</div>
                )}

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                {formik.touched.email && formik.errors.email && (
                    <div className="text-red-500 text-sm">{formik.errors.email}</div>
                )}

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                {formik.touched.password && formik.errors.password && (
                    <div className="text-red-500 text-sm">{formik.errors.password}</div>
                )}

                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
                )}

                <button
                    type="submit"
                    className="bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors"
                >
                    Signup
                </button>

                <p className="text-sm text-center">
                    Already have an account?{" "}
                    <span
                        className="text-green-500 cursor-pointer hover:underline"
                        onClick={() => navigate("/")}
                    >
                        Login
                    </span>
                </p>
            </form>
        </div>
    );
}

export default Signup;
