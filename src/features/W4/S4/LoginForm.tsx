import "./../LoginForm.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Email is invalid"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

type LoginValues = z.infer<typeof loginSchema>;

async function fakeLogin(values: LoginValues) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (values.email !== "admin@example.com" || values.password !== "password123") {
    throw new Error("Invalid credentials");
  }
}

export const LoginForm: React.FC = () => {

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  async function onSubmit(values: LoginValues) {
    try {
      await fakeLogin(values);
      alert("Logged in successfully");
    } catch {
      setError("root", {
        message: "Invalid email or password",
      });
    }
  }

   return (
    <main className="login-page">
      <form className="login-card" onSubmit={ handleSubmit(onSubmit) } noValidate>
        <div className="login-card__header">
          <p>Welcome back</p>
          <h1>Log in to your account</h1>
        </div>

        {errors.root && (
          <p className="login-card__root-error" role="alert">
            { errors.root.message }
          </p>
        )}

        <div className="login-card__field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register("email")}
            autoComplete="email"
            placeholder="admin@example.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p className="login-card__field-error" id="email-error" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="login-card__field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register("password")}
            placeholder="password123"
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? "password-error" : undefined}
          />
          {errors.password && (
            <p className="login-card__field-error" id="password-error" role="alert">
              {errors.password.message}
            </p>
          )}
        </div>

        <button className="login-card__submit" type="submit" disabled={ isSubmitting }>
          { isSubmitting ? "Logging in..." : "Log in" }
        </button>
      </form>
    </main>
  );
}
